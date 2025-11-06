<script setup lang="ts">
import { ref } from 'vue'
import type { RoleStatus } from '@/utils/hooks/useRoles'

const props = defineProps<{ width?: string | number }>()
const width = props.width ?? 520
const visible = ref(true)
const form = ref<{ name: string; status: RoleStatus; permissions: string[] }>({
  name: '',
  status: 'enabled',
  permissions: [],
})
const emit = defineEmits<{ (e: 'confirm', payload: any): void; (e: 'close'): void }>()

const allPermissions = [
  '系统配置', '用户管理', '审计查看',
  '智能备课', '作业管理', '课堂互动',
  '作业提交', '学情查看', '资源库',
]

function onConfirm() {
  if (!form.value.name.trim()) return
  emit('confirm', { ...form.value })
}
</script>

<template>
  <el-dialog v-model="visible" title="新增角色" :width="width" append-to-body @closed="emit('close')">
    <el-form label-width="88px" :model="form">
      <el-form-item label="角色名称">
        <el-input v-model="form.name" placeholder="请输入角色名" />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio-button label="enabled">启用</el-radio-button>
          <el-radio-button label="disabled">停用</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限选择">
        <el-select v-model="form.permissions" multiple filterable style="width: 100%" placeholder="选择权限">
          <el-option v-for="p in allPermissions" :key="p" :label="p" :value="p" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="emit('close')">取消</el-button>
      <el-button :disabled="!form.name" type="success" @click="onConfirm">创建</el-button>
    </template>
  </el-dialog>
  
</template>

<style scoped>
</style>