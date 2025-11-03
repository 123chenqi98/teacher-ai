<template>
  <div class="role-permission page-wrapper">
    <PageHeader title="角色权限管理" subtitle="管理系统角色及权限分配，支持自定义角色创建">
      <el-button @click="loadRoles">刷新</el-button>
      <el-button type="primary" plain @click="handleExport">导出角色</el-button>
      <el-button type="primary" @click="handleAdd">新建角色</el-button>
    </PageHeader>
    <!-- 概览统计 -->
    <StatsCards :items="stats" />
    <!-- 操作栏 -->
    <el-card class="action-card section-card" shadow="never">
      <div class="toolbar">
        <div class="toolbar-left subtext">角色列表</div>
        <div class="toolbar-right"><el-button @click="loadRoles">刷新</el-button></div>
      </div>
    </el-card>

    <!-- 角色列表 -->
    <el-card class="section-card" shadow="never">
      <el-table :data="roleList" border v-loading="loading" @row-click="handleRowClick" highlight-current-row>
        <el-table-column prop="roleName" label="角色名称" width="150" />
        <el-table-column prop="description" label="描述" min-width="200" />
        <el-table-column prop="permissionScope" label="权限范围" width="150" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="280" fixed="right">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="success" @click="handleCopy(scope.row)">复制</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { Role } from '@/types/role';
import { getRoleList, addRole, editRole, deleteRole, copyRole, exportRoles } from '@/services/role';
import RoleDialog from '@/components/common/RoleDialog.vue';
import PageHeader from '@/components/common/PageHeader.vue'
import StatsCards, { type StatItem } from '@/components/common/StatsCards.vue'

const roleList = ref<Role[]>([]);
const loading = ref(false);
const dialogVisible = ref(false);
const roleDialogRef = ref();
const stats = ref<StatItem[]>([])
const selectedRole = ref<Role | null>(null)

// 加载角色列表
const loadRoles = async () => {
  loading.value = true;
  try {
    const res = await getRoleList();
    if (res.code === 200) {
      roleList.value = res.data;
      // 默认选中第一项
      if (res.data.length > 0) selectedRole.value = res.data[0]
      // 统计：角色数、含权限点、系统内置与自定义数量（模拟）
      const total = res.data.length
      const builtin = res.data.filter(r => r.permissionScope === '全部' || r.roleName.includes('管理员')).length
      const custom = total - builtin
      const permPoints = res.data.reduce((acc, r) => acc + (r.permissionIds?.length || 0), 0)
      stats.value = [
        { key: 'roles', name: '角色总数', value: total, tag: '当前' },
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
</script>

<style scoped>
.role-permission { padding: 20px; }
.permission-preview { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 10px 0; }
.perm-col { background: transparent; }
.perm-list { margin: 8px 0 18px 0; padding-left: 16px; color: var(--brand-text); }
.perm-list li { line-height: 28px; }
</style>

