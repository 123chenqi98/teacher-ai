<template>
  <div class="role-permission page-wrapper">
    <PageHeader title="角色权限管理" subtitle="管理系统角色及权限分配，支持自定义角色创建">
      <el-button @click="loadRoles">刷新</el-button>
      <el-button type="primary" plain @click="handleExport">导出角色</el-button>
      <el-button type="primary" @click="handleAdd">新建角色</el-button>
    </PageHeader>
    <!-- 概览统计 -->
    <StatsCards :items="stats" />
    <!-- 角色列表 -->
    <el-card class="section-card" shadow="never">
      <div class="role-list-header">
        <div class="list-title">角色列表</div>
        <div class="list-filters">
          <el-select v-model="filterType" placeholder="all" style="width: 80px" clearable>
            <el-option label="全部" value="" />
            <el-option label="系统角色" value="system" />
            <el-option label="自定义角色" value="custom" />
          </el-select>
          <el-input
            v-model="searchKeyword"
            placeholder="搜索角色..."
            clearable
            style="width: 200px; margin-left: 10px"
            @keyup.enter="handleSearch"
          />
        </div>
      </div>
      <el-table :data="filteredRoleList" border v-loading="loading" @row-click="handleRowClick" highlight-current-row>
        <el-table-column label="角色名称" width="150">
          <template #default="scope">
            <div class="role-name-cell">
              <span class="role-icon" :class="getRoleIconClass(scope.row.roleName)"></span>
              <span>{{ scope.row.roleName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" min-width="250" />
        <el-table-column prop="permissionScope" label="权限范围" min-width="200" />
        <el-table-column label="用户数量" width="100" align="center">
          <template #default="scope">
            {{ scope.row.userCount || 0 }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="类型" width="120" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.type === 'custom' ? 'primary' : 'success'" effect="light" size="small">
              {{ scope.row.type === 'custom' ? '自定义角色' : '系统角色' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280" fixed="right">
          <template #default="scope">
            <el-link type="primary" @click.stop="handleEdit(scope.row)">编辑</el-link>
            <el-link type="primary" @click.stop="handleCopy(scope.row)" style="margin-left: 12px">复制</el-link>
            <el-link
              :type="scope.row.type === 'custom' ? 'danger' : 'primary'"
              @click.stop="handleDelete(scope.row)"
              style="margin-left: 12px"
            >
              删除
            </el-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-wrapper">
        <div class="pagination-info">
          显示{{ (currentPage - 1) * pageSize + 1 }}到{{ Math.min(currentPage * pageSize, total) }}条,共{{ total }}个角色
        </div>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          :total="total"
          layout="prev, pager, next"
          @current-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </div>
    </el-card>

    <!-- 权限预览 -->
    <el-card class="section-card" shadow="never">
      <div class="toolbar">
        <div class="toolbar-left">
          <span class="block-title">角色权限预览</span>
          <span class="subtext" v-if="selectedRole">（{{ selectedRole.roleName }}）</span>
        </div>
        <div class="toolbar-right">
          <el-link type="primary" @click="handleEdit(selectedRole!)" :disabled="!selectedRole">编辑权限</el-link>
        </div>
      </div>
      <div class="permission-preview">
        <div class="perm-col">
          <div class="block-title">系统功能权限</div>
          <ul class="perm-list">
            <li>登录系统</li>
            <li>修改个人资料</li>
            <li>修改密码</li>
            <li>查看公告信息</li>
            <li>搜索功能</li>
            <li>消息提醒</li>
          </ul>
          <div class="block-title">学生信息权限</div>
          <ul class="perm-list">
            <li>查看学生基础信息</li>
            <li>查看学生档案</li>
            <li>导出学生名单</li>
          </ul>
        </div>
        <div class="perm-col">
          <div class="block-title">班级管理权限</div>
          <ul class="perm-list">
            <li>查看班级信息</li>
            <li>发布班级公告</li>
            <li>管理班级成员</li>
            <li>导出班级信息</li>
          </ul>
          <div class="block-title">课程与成绩权限</div>
          <ul class="perm-list">
            <li>查看课程表</li>
            <li>录入成绩</li>
            <li>发布作业</li>
            <li>导入考试成绩</li>
          </ul>
        </div>
      </div>
    </el-card>

    <!-- 角色对话框 -->
    <RoleDialog v-model="dialogVisible" @success="handleDialogSuccess" ref="roleDialogRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { Role } from '@/types/role';
import { getRoleList, addRole, editRole, deleteRole, copyRole, exportRoles } from '@/services/role';
import RoleDialog from '@/components/common/RoleDialog.vue';
import PageHeader from '@/components/common/PageHeader.vue'
import StatsCards, { type StatItem } from '@/components/common/StatsCards.vue'

const roleList = ref<Role[]>([]);
const filteredRoleList = ref<Role[]>([]);
const loading = ref(false);
const dialogVisible = ref(false);
const roleDialogRef = ref();
const stats = ref<StatItem[]>([])
const selectedRole = ref<Role | null>(null)
const searchKeyword = ref('');
const filterType = ref('');
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

// 加载角色列表
const loadRoles = async () => {
  loading.value = true;
  try {
    const res = await getRoleList();
    if (res.code === 200) {
      roleList.value = res.data;
      total.value = res.data.length;
      applyFilters();
      // 默认选中第一项
      if (filteredRoleList.value.length > 0) selectedRole.value = filteredRoleList.value[0]
      // 统计：角色数、含权限点、系统内置与自定义数量（模拟）
      const totalCount = res.data.length
      const builtin = res.data.filter(r => r.type === 'system').length
      const custom = res.data.filter(r => r.type === 'custom').length
      const permPoints = res.data.reduce((acc, r) => acc + (r.permissionIds?.length || 0), 0)
      stats.value = [
        { key: 'roles', name: '角色总数', value: totalCount, tag: '当前' },
        { key: 'builtin', name: '系统内置', value: builtin },
        { key: 'custom', name: '自定义角色', value: custom },
        { key: 'perm', name: '权限点总数', value: permPoints }
      ]
    }
  } catch (error) {
    ElMessage.error('加载角色列表失败');
  } finally {
    loading.value = false;
  }
};

// 应用筛选
const applyFilters = () => {
  let result = [...roleList.value];
  
  // 类型筛选
  if (filterType.value) {
    result = result.filter(r => r.type === filterType.value);
  }
  
  // 关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase();
    result = result.filter(r => 
      r.roleName.toLowerCase().includes(keyword) || 
      r.description.toLowerCase().includes(keyword)
    );
  }
  
  // 分页
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  filteredRoleList.value = result.slice(start, end);
  total.value = result.length;
};

// 搜索
const handleSearch = () => {
  currentPage.value = 1;
  applyFilters();
};

// 分页变化
const handlePageChange = () => {
  applyFilters();
};

const handleSizeChange = () => {
  currentPage.value = 1;
  applyFilters();
};

// 获取角色图标样式类
const getRoleIconClass = (roleName: string) => {
  if (roleName.includes('学生')) return 'icon-student';
  if (roleName.includes('教师')) return 'icon-teacher';
  if (roleName.includes('家长')) return 'icon-parent';
  if (roleName.includes('年级') || roleName.includes('组长')) return 'icon-leader';
  return 'icon-default';
};

// 新增角色
const handleAdd = () => {
  roleDialogRef.value?.openDialog('新增角色');
};

// 编辑角色
const handleEdit = (row: Role) => {
  roleDialogRef.value?.openDialog('编辑角色', {
    roleId: row.id,
    roleName: row.roleName,
    description: row.description,
    permissionIds: row.permissionIds || []
  });
};

// 删除角色
const handleDelete = async (row: Role) => {
  try {
    await ElMessageBox.confirm(`确定要删除角色 "${row.roleName}" 吗？`, '提示', {
      type: 'warning'
    });
    const res = await deleteRole(row.id!);
    if (res.code === 200) {
      ElMessage.success('删除成功');
      loadRoles();
    }
  } catch (error) {
    // 用户取消
  }
};

// 复制角色
const handleCopy = async (row: Role) => {
  try {
    const { value } = await ElMessageBox.prompt('请输入新角色名称', '复制角色', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /.+/,
      inputErrorMessage: '角色名称不能为空'
    });
    
    const res = await copyRole(row.id!, value);
    if (res.code === 200) {
      ElMessage.success('复制成功');
      loadRoles();
    }
  } catch (error) {
    // 用户取消
  }
};

// 对话框成功回调
const handleDialogSuccess = async () => {
  const formData = roleDialogRef.value?.getFormData();
  if (!formData) return;

  try {
    let res;
    if (formData.roleId) {
      res = await editRole(formData.roleId, formData);
    } else {
      res = await addRole(formData);
    }
    if (res.code === 200) {
      ElMessage.success(res.message);
      loadRoles();
    }
  } catch (error) {
    ElMessage.error('操作失败');
  }
};

onMounted(() => {
  loadRoles();
});

// 行点击切换下方预览
const handleRowClick = (row: Role) => {
  selectedRole.value = row
}

const handleExport = async () => {
  const res = await exportRoles()
  if (res.code === 200) {
    window.open(res.data.downloadUrl)
  }
}

// 监听筛选变化
watch([filterType, searchKeyword], () => {
  handleSearch();
});
</script>

<style scoped>
.role-permission { padding: 20px; }
.role-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--brand-border);
}
.list-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--brand-text);
}
.list-filters {
  display: flex;
  align-items: center;
}
.role-name-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}
.role-icon {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.role-icon.icon-student { background-color: #87ceeb; }
.role-icon.icon-teacher { background-color: #90ee90; }
.role-icon.icon-parent { background-color: #ffb347; }
.role-icon.icon-leader { background-color: #dda0dd; }
.role-icon.icon-default { background-color: #d3d3d3; }
.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--brand-border);
}
.pagination-info {
  color: var(--brand-subtext);
  font-size: 14px;
}
.permission-preview { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 10px 0; }
.perm-col { background: transparent; }
.perm-list { margin: 8px 0 18px 0; padding-left: 16px; color: var(--brand-text); }
.perm-list li { line-height: 28px; }
</style>

