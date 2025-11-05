<template>
  <div class="user-management page-wrapper">
    <PageHeader title="用户管理" subtitle="用户列表展示，支持筛选、批量操作与详情查看">
      <el-button type="primary" @click="handleAdd">新增用户</el-button>
    </PageHeader>
    <!-- 筛选区域 -->
    <el-card class="filter-card section-card" shadow="never">
      <el-form :model="filterForm" :inline="true">
        <el-form-item label="角色">
          <el-select v-model="filterForm.role" placeholder="请选择角色" clearable style="width: 150px">
            <el-option
              v-for="role in roleOptions"
              :key="role.id"
              :label="role.roleName"
              :value="role.roleName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filterForm.status" placeholder="请选择状态" clearable style="width: 120px">
            <el-option label="启用" value="enable" />
            <el-option label="禁用" value="disable" />
          </el-select>
        </el-form-item>
        <el-form-item label="学科">
          <el-select v-model="filterForm.subject" placeholder="请选择学科" clearable style="width: 120px">
            <el-option label="数学" value="数学" />
            <el-option label="语文" value="语文" />
            <el-option label="英语" value="英语" />
            <el-option label="物理" value="物理" />
            <el-option label="化学" value="化学" />
          </el-select>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="filterForm.grade" placeholder="请选择年级" clearable style="width: 120px">
            <el-option label="高一" value="高一" />
            <el-option label="高二" value="高二" />
            <el-option label="高三" value="高三" />
          </el-select>
        </el-form-item>
        <el-form-item label="搜索">
          <el-input
            v-model="filterForm.keyword"
            placeholder="用户名/手机号"
            clearable
            style="width: 200px"
            @keyup.enter="handleSearch"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 操作栏 -->
    <el-card class="action-card section-card" shadow="never">
      <div class="toolbar">
        <div class="toolbar-left">
          <el-button type="primary" @click="handleAdd">新增用户</el-button>
          <el-button
            type="warning"
            :disabled="selectedUsers.length === 0"
            @click="handleBatchDisable"
          >
            批量禁用
          </el-button>
          <el-button
            type="success"
            :disabled="selectedUsers.length === 0"
            @click="handleBatchEnable"
          >
            批量启用
          </el-button>
          <el-button type="info" @click="handleExport">导出</el-button>
        </div>
        <div class="toolbar-right">
          <el-button @click="loadUsers">刷新</el-button>
        </div>
      </div>
    </el-card>

    <!-- 用户列表 -->
    <el-card class="section-card" shadow="never">
      <el-table
        :data="userList"
        border
        v-loading="loading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="username" label="用户名" width="140" />
        <el-table-column prop="role" label="角色" width="110">
          <template #default="scope">
            <el-tag :type="getRoleTagType(scope.row.role)" effect="light">{{ scope.row.role }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="130" />
        <el-table-column prop="subject" label="学科" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.subject" type="info" effect="plain">{{ scope.row.subject }}</el-tag>
            <span v-else class="subtext">-</span>
          </template>
        </el-table-column>
        <el-table-column prop="grade" label="年级" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.grade" type="info" effect="plain">{{ scope.row.grade }}</el-tag>
            <span v-else class="subtext">-</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'enable' ? 'success' : 'danger'">
              {{ scope.row.status === 'enable' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="420" fixed="right">
          <template #default="scope">
            <el-button size="small" type="primary" plain @click="handleViewDetail(scope.row)">详情</el-button>
            <el-button size="small" type="warning" plain @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="small"
              :type="scope.row.status === 'enable' ? 'warning' : 'success'"
              @click="handleToggleStatus(scope.row)"
            >
              {{ scope.row.status === 'enable' ? '禁用' : '启用' }}
            </el-button>
            <el-button size="small" type="info" plain @click="handleResetPassword(scope.row)">重置密码</el-button>
            <el-button size="small" type="danger" plain @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <div class="subtext">共 {{ total }} 条</div>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>

    <!-- 用户对话框 -->
    <UserDialog v-model="dialogVisible" @success="handleDialogSuccess" ref="userDialogRef" />

    <!-- 用户详情 -->
    <UserDetail v-model="detailVisible" ref="userDetailRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { User, UserFilter } from '@/types/user';
import type { Role } from '@/types/role';
import {
  getUserList,
  getUserDetail,
  addUser,
  editUser,
  deleteUser,
  batchToggleUserStatus,
  toggleUserStatus,
  resetPassword,
  exportUsers
} from '@/services/user';
import { getRoleList } from '@/services/role';
import UserDialog from '@/components/common/UserDialog.vue';
import UserDetail from '@/components/common/UserDetail.vue';
import PageHeader from '@/components/common/PageHeader.vue'

const userList = ref<User[]>([]);
const roleOptions = ref<Role[]>([]);
const loading = ref(false);
const selectedUsers = ref<User[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const dialogVisible = ref(false);
const detailVisible = ref(false);
const userDialogRef = ref();
const userDetailRef = ref();

const filterForm = reactive<UserFilter>({
  role: '',
  status: '',
  subject: '',
  grade: '',
  keyword: ''
});

// 加载角色列表
const loadRoles = async () => {
  const res = await getRoleList();
  if (res.code === 200) {
    roleOptions.value = res.data;
  }
};

// 加载用户列表
const loadUsers = async () => {
  loading.value = true;
  try {
    const res = await getUserList(filterForm);
    if (res.code === 200) {
      userList.value = res.data;
      total.value = res.total || res.data.length;
    }
  } catch (error) {
    ElMessage.error('加载用户列表失败');
  } finally {
    loading.value = false;
  }
};

// 搜索
const handleSearch = () => {
  currentPage.value = 1;
  loadUsers();
};

// 重置筛选
const handleReset = () => {
  Object.assign(filterForm, {
    role: '',
    status: '',
    subject: '',
    grade: '',
    keyword: ''
  });
  handleSearch();
};

// 新增用户
const handleAdd = () => {
  userDialogRef.value?.openDialog('新增用户');
};

// 编辑用户
const handleEdit = (row: User) => {
  userDialogRef.value?.openDialog('编辑用户', {
    userId: row.userId,
    username: row.username,
    roleId: row.roleId,
    phone: row.phone,
    email: row.email,
    realName: row.realName,
    subject: row.subject,
    grade: row.grade,
    status: row.status
  });
};

// 删除用户
const handleDelete = async (row: User) => {
  try {
    await ElMessageBox.confirm(`确定要删除用户 "${row.username}" 吗？`, '提示', {
      type: 'warning'
    });
    const res = await deleteUser(row.userId);
    if (res.code === 200) {
      ElMessage.success('删除成功');
      loadUsers();
    }
  } catch (error) {
    // 用户取消
  }
};

// 启用/禁用用户
const handleToggleStatus = async (row: User) => {
  const newStatus = row.status === 'enable' ? 'disable' : 'enable';
  const action = newStatus === 'enable' ? '启用' : '禁用';
  try {
    await ElMessageBox.confirm(`确定要${action}用户 "${row.username}" 吗？`, '提示', {
      type: 'warning'
    });
    const res = await toggleUserStatus(row.userId, newStatus);
    if (res.code === 200) {
      ElMessage.success(`${action}成功`);
      loadUsers();
    }
  } catch (error) {
    // 用户取消
  }
};

// 重置密码
const handleResetPassword = async (row: User) => {
  try {
    await ElMessageBox.confirm(`确定要重置用户 "${row.username}" 的密码吗？`, '提示', {
      type: 'warning'
    });
    const res = await resetPassword(row.userId);
    if (res.code === 200) {
      ElMessage.success(res.message);
    }
  } catch (error) {
    // 用户取消
  }
};

// 查看详情
const handleViewDetail = async (row: User) => {
  const res = await getUserDetail(row.userId);
  if (res.code === 200) {
    userDetailRef.value?.openDialog(res.data);
  }
};

// 批量禁用
const handleBatchDisable = async () => {
  if (selectedUsers.value.length === 0) {
    ElMessage.warning('请先选择要禁用的用户');
    return;
  }
  try {
    await ElMessageBox.confirm(`确定要批量禁用 ${selectedUsers.value.length} 个用户吗？`, '提示', {
      type: 'warning'
    });
    const userIds = selectedUsers.value.map(u => u.userId);
    const res = await batchToggleUserStatus(userIds, 'disable');
    if (res.code === 200) {
      ElMessage.success('批量禁用成功');
      loadUsers();
      selectedUsers.value = [];
    }
  } catch (error) {
    // 用户取消
  }
};

// 批量启用
const handleBatchEnable = async () => {
  if (selectedUsers.value.length === 0) {
    ElMessage.warning('请先选择要启用的用户');
    return;
  }
  try {
    await ElMessageBox.confirm(`确定要批量启用 ${selectedUsers.value.length} 个用户吗？`, '提示', {
      type: 'warning'
    });
    const userIds = selectedUsers.value.map(u => u.userId);
    const res = await batchToggleUserStatus(userIds, 'enable');
    if (res.code === 200) {
      ElMessage.success('批量启用成功');
      loadUsers();
      selectedUsers.value = [];
    }
  } catch (error) {
    // 用户取消
  }
};

// 导出
const handleExport = async () => {
  try {
    const res = await exportUsers(filterForm);
    if (res.code === 200) {
      ElMessage.success('导出成功');
      // 实际项目中应该触发文件下载
      window.open(res.data.downloadUrl);
    }
  } catch (error) {
    ElMessage.error('导出失败');
  }
};

// 选择变化
const handleSelectionChange = (selection: User[]) => {
  selectedUsers.value = selection;
};

// 对话框成功回调
const handleDialogSuccess = async () => {
  const formData = userDialogRef.value?.getFormData();
  if (!formData) return;

  try {
    let res;
    if (formData.userId) {
      res = await editUser(formData.userId, formData);
    } else {
      res = await addUser(formData);
    }
    if (res.code === 200) {
      ElMessage.success(res.message);
      loadUsers();
    }
  } catch (error) {
    ElMessage.error('操作失败');
  }
};

// 分页变化
const handleSizeChange = () => {
  loadUsers();
};

const handlePageChange = () => {
  loadUsers();
};

// 角色标签配色
const getRoleTagType = (role: string) => {
  if (role.includes('管')) return 'danger'
  if (role.includes('教')) return 'warning'
  if (role.includes('学')) return 'success'
  return 'info'
}

onMounted(() => {
  loadRoles();
  loadUsers();
});
</script>

<style scoped>
.user-management {
  padding: 20px;
}

.filter-card {
  margin-bottom: 20px;
}

.action-card {
  margin-bottom: 20px;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-actions {
  display: flex;
  gap: 10px;
}

.right-actions {
  display: flex;
  gap: 10px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>

