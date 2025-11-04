<template>
  <el-dialog :title="dialogTitle" v-model="dialogVisible" width="600px" @close="handleClose">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" :disabled="isEdit" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="!isEdit">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
      </el-form-item>
      <el-form-item label="真实姓名" prop="realName">
        <el-input v-model="form.realName" placeholder="请输入真实姓名" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select v-model="form.roleId" placeholder="请选择角色" style="width: 100%">
          <el-option
            v-for="role in roleOptions"
            :key="role.id"
            :label="role.roleName"
            :value="role.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="学科" prop="subject">
        <el-select v-model="form.subject" placeholder="请选择学科" style="width: 100%" clearable>
          <el-option label="数学" value="数学" />
          <el-option label="语文" value="语文" />
          <el-option label="英语" value="英语" />
          <el-option label="物理" value="物理" />
          <el-option label="化学" value="化学" />
        </el-select>
      </el-form-item>
      <el-form-item label="年级" prop="grade">
        <el-select v-model="form.grade" placeholder="请选择年级" style="width: 100%" clearable>
          <el-option label="高一" value="高一" />
          <el-option label="高二" value="高二" />
          <el-option label="高三" value="高三" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status" v-if="isEdit">
        <el-radio-group v-model="form.status">
          <el-radio value="enable">启用</el-radio>
          <el-radio value="disable">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import type { UserForm } from '@/types/user';
import { getRoleList } from '@/services/role';
import type { Role } from '@/types/role';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'success'): void;
}>();

const dialogVisible = ref(false);
const dialogTitle = ref('新增用户');
const isEdit = ref(false);
const formRef = ref<FormInstance>();
const currentUserId = ref<number | string>('');

const form = reactive<UserForm>({
  username: '',
  password: '',
  roleId: '',
  phone: '',
  email: '',
  realName: '',
  subject: '',
  grade: '',
  status: 'enable'
});

const roleOptions = ref<Role[]>([]);

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
  email: [
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
};

// 监听 modelValue 变化
watch(() => props.modelValue, (val) => {
  dialogVisible.value = val;
});

// 监听 dialogVisible 变化，同步到父组件
watch(dialogVisible, (val) => {
  emit('update:modelValue', val);
});

// 加载角色列表
const loadRoles = async () => {
  const res = await getRoleList();
  if (res.code === 200) {
    roleOptions.value = res.data;
  }
};

// 打开对话框
const openDialog = (title: string, data?: UserForm & { userId?: number | string }) => {
  dialogTitle.value = title;
  isEdit.value = title.includes('编辑');
  
  // 重置表单
  Object.assign(form, {
    username: '',
    password: '',
    roleId: '',
    phone: '',
    email: '',
    realName: '',
    subject: '',
    grade: '',
    status: 'enable'
  });
  
  if (data) {
    currentUserId.value = data.userId || '';
    Object.assign(form, {
      username: data.username || '',
      roleId: data.roleId || '',
      phone: data.phone || '',
      email: data.email || '',
      realName: data.realName || '',
      subject: data.subject || '',
      grade: data.grade || '',
      status: data.status || 'enable'
    });
  }
  
  dialogVisible.value = true;
  formRef.value?.clearValidate();
};

// 关闭对话框
const handleClose = () => {
  formRef.value?.resetFields();
  formRef.value?.clearValidate();
};

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return;
  
  await formRef.value.validate((valid) => {
    if (valid) {
      emit('success');
      dialogVisible.value = false;
    }
  });
};

// 暴露方法供父组件调用
defineExpose({
  openDialog,
  getFormData: () => ({ ...form, userId: currentUserId.value })
});

// 初始化加载角色列表
loadRoles();
</script>

