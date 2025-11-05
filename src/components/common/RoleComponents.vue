<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getRoleList } from '@/services/role';
import type { Role } from '@/types/role';

// 角色列表数据
const roleList = ref<Role[]>([]);
const searchQuery = ref('');
const currentPage = ref(1);
const pageSize = ref(10);

// 加载角色列表
const loadRoles = async () => {
  const res = await getRoleList({
    query: searchQuery.value,
    page: currentPage.value,
    size: pageSize.value
  });
  console.log('角色列表数据:', res.data);
  roleList.value = res.data;
};

// 编辑角色
const handleEdit = (row: Role) => {
  console.log('编辑角色:', row);
};

// 删除角色
const handleDelete = (row: Role) => {
  console.log('删除角色:', row);
};

// 复制角色
const handleCopy = (row: Role) => {
  console.log('复制角色:', row);
};

onMounted(loadRoles);
</script>

<template>
  <div class="role-list">
    <el-table :data="roleList" border style="width: 100%">
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="permissionScope" label="权限范围" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="small" type="primary" @click="handleCopy(scope.row)">复制</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.role-list {
  padding: 20px;
}
</style>