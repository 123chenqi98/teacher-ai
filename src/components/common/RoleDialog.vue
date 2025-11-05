<template>
  <el-dialog :title="dialogTitle" v-model="dialogVisible" width="70%" @close="handleClose">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="3"
          placeholder="请输入角色描述"
        />
      </el-form-item>
      <el-form-item label="权限分配" prop="permissionIds">
        <RolePermissionTree
          ref="permissionTreeRef"
          :permission-tree="permissionTree"
          :default-checked-keys="form.permissionIds"
          :preview-visible="true"
          @change="handlePermissionChange"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import type { RoleForm } from '@/types/role';
import type { PermissionNode } from '@/types/role';
import { getPermissionTree } from '@/services/role';
import RolePermissionTree from './RolePermissionTree.vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'success'): void;
}>();

const dialogVisible = ref(false);
const dialogTitle = ref('新增角色');
const formRef = ref<FormInstance>();
const permissionTreeRef = ref();
const permissionTree = ref<PermissionNode[]>([]);
const currentRoleId = ref<number | string>('');

const form = reactive<RoleForm>({
  roleName: '',
  description: '',
  permissionIds: []
});

const rules: FormRules = {
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  description: [{ required: true, message: '请输入角色描述', trigger: 'blur' }],
  permissionIds: [
    { required: true, message: '请至少选择一个权限', trigger: 'change', validator: () => {
      return form.permissionIds.length > 0;
    }}
  ]
};

// 监听 modelValue 变化
watch(() => props.modelValue, (val) => {
  dialogVisible.value = val;
});

// 监听 dialogVisible 变化
watch(dialogVisible, (val) => {
  emit('update:modelValue', val);
});

// 加载权限树
const loadPermissionTree = async () => {
  const res = await getPermissionTree();
  if (res.code === 200) {
    permissionTree.value = res.data;
  }
};

// 权限变化
const handlePermissionChange = (checkedKeys: (number | string)[], checkedNodes: PermissionNode[]) => {
  form.permissionIds = checkedKeys;
  formRef.value?.validateField('permissionIds');
};

// 打开对话框
const openDialog = (title: string, data?: RoleForm & { roleId?: number | string }) => {
  dialogTitle.value = title;
  
  // 重置表单
  Object.assign(form, {
    roleName: '',
    description: '',
    permissionIds: []
  });
  
  if (data) {
    currentRoleId.value = data.roleId || '';
    Object.assign(form, {
      roleName: data.roleName || '',
      description: data.description || '',
      permissionIds: data.permissionIds || []
    });
  }
  
  dialogVisible.value = true;
  formRef.value?.clearValidate();
  
  // 延迟设置选中keys，确保树组件已渲染
  setTimeout(() => {
    if (data?.permissionIds && permissionTreeRef.value) {
      permissionTreeRef.value.setCheckedKeys(data.permissionIds);
    }
  }, 100);
};

// 关闭对话框
const handleClose = () => {
  formRef.value?.resetFields();
  formRef.value?.clearValidate();
  permissionTreeRef.value?.clearChecked();
};

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return;
  
  // 获取选中的权限
  const checkedKeys = permissionTreeRef.value?.getCheckedKeys() || [];
  form.permissionIds = checkedKeys;
  
  await formRef.value.validate((valid) => {
    if (valid) {
      if (form.permissionIds.length === 0) {
        ElMessage.warning('请至少选择一个权限');
        return;
      }
      emit('success');
      dialogVisible.value = false;
    }
  });
};

// 暴露方法供父组件调用
defineExpose({
  openDialog,
  getFormData: () => ({ ...form, roleId: currentRoleId.value })
});

// 初始化加载权限树
onMounted(() => {
  loadPermissionTree();
});
</script>