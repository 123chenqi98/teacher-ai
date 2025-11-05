<template>
  <el-dialog title="用户详情" v-model="dialogVisible" width="800px">
    <el-tabs v-model="activeTab">
      <!-- 基本信息 -->
      <el-tab-pane label="基本信息" name="basic">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="用户名">{{ userDetail?.username }}</el-descriptions-item>
          <el-descriptions-item label="真实姓名">{{ userDetail?.realName || '-' }}</el-descriptions-item>
          <el-descriptions-item label="角色">{{ userDetail?.role }}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{ userDetail?.phone }}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{ userDetail?.email || '-' }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="userDetail?.status === 'enable' ? 'success' : 'danger'">
              {{ userDetail?.status === 'enable' ? '启用' : '禁用' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="学科">{{ userDetail?.subject || '-' }}</el-descriptions-item>
          <el-descriptions-item label="年级">{{ userDetail?.grade || '-' }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ userDetail?.createTime }}</el-descriptions-item>
          <el-descriptions-item label="最后登录时间">{{ userDetail?.lastLoginTime || '-' }}</el-descriptions-item>
          <el-descriptions-item label="最后登录IP" :span="2">{{ userDetail?.lastLoginIp || '-' }}</el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>

      <!-- 角色权限 -->
      <el-tab-pane label="角色权限" name="permissions">
        <el-table :data="userDetail?.permissions || []" border>
          <el-table-column prop="name" label="权限名称" />
          <el-table-column prop="code" label="权限代码" />
          <el-table-column prop="type" label="类型">
            <template #default="scope">
              <el-tag :type="scope.row.type === 'menu' ? 'primary' : 'success'">
                {{ scope.row.type === 'menu' ? '菜单' : '按钮' }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="!userDetail?.permissions || userDetail.permissions.length === 0" style="text-align: center; padding: 20px; color: #999;">
          暂无权限信息
        </div>
      </el-tab-pane>

      <!-- 操作日志 -->
      <el-tab-pane label="操作日志" name="logs">
        <el-table :data="userDetail?.operationLogs || []" border>
          <el-table-column prop="operation" label="操作" />
          <el-table-column prop="operator" label="操作人" />
          <el-table-column prop="operationTime" label="操作时间" />
          <el-table-column prop="ip" label="IP地址" />
          <el-table-column prop="result" label="结果">
            <template #default="scope">
              <el-tag :type="scope.row.result === '成功' ? 'success' : 'danger'">
                {{ scope.row.result || '-' }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="!userDetail?.operationLogs || userDetail.operationLogs.length === 0" style="text-align: center; padding: 20px; color: #999;">
          暂无操作日志
        </div>
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { UserDetail } from '@/types/user';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const dialogVisible = ref(false);
const activeTab = ref('basic');
const userDetail = ref<UserDetail | null>(null);

watch(() => props.modelValue, (val) => {
  dialogVisible.value = val;
});

watch(dialogVisible, (val) => {
  emit('update:modelValue', val);
  if (!val) {
    activeTab.value = 'basic';
    userDetail.value = null;
  }
});

// 打开对话框并加载数据
const openDialog = (detail: UserDetail) => {
  userDetail.value = detail;
  dialogVisible.value = true;
  activeTab.value = 'basic';
};

defineExpose({
  openDialog
});
</script>

