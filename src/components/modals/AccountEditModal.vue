<script setup lang="ts">
import { ref } from 'vue'
import type { RoleOpt, StatusOpt, AccountItem } from '@/utils/hooks/useAccounts'

const props = defineProps<{ account: AccountItem; width?: string | number }>()
const width = props.width ?? 640
const visible = ref(true)
const form = ref({
  name: props.account.name,
  role: props.account.role as RoleOpt,
  status: props.account.status as StatusOpt,
  school: props.account.school,
  region: props.account.region,
})
const emit = defineEmits<{ (e: 'confirm', payload: any): void; (e: 'close'): void }>()

function onConfirm() {
  emit('confirm', { id: props.account.id, ...form.value })
}
</script>

<template>
  <el-dialog v-model="visible" title="编辑账号" :width="width" append-to-body @closed="emit('close')">
    <el-form label-width="88px" :model="form">
      <el-form-item label="用户名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="form.role" style="width: 100%">
          <el-option label="教师" value="teacher" />
          <el-option label="学生" value="student" />
          <el-option label="家长" value="parent" />
          <el-option label="管理员" value="admin" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio-button label="enabled">启用</el-radio-button>
          <el-radio-button label="disabled">停用</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学校">
        <el-input v-model="form.school" />
      </el-form-item>
      <el-form-item label="区域">
        <el-select v-model="form.region" style="width: 100%">
          <el-option label="华东" value="east" />
          <el-option label="华南" value="south" />
          <el-option label="华北" value="north" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="emit('close')">取消</el-button>
      <el-button type="primary" @click="onConfirm">保存</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>