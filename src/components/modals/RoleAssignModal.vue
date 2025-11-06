<script setup lang="ts">
import { ref } from 'vue'
import type { RoleItem } from '@/utils/hooks/useRoles'

const props = defineProps<{ role: RoleItem; width?: string | number }>()
const width = props.width ?? 640
const visible = ref(true)
const permissions = ref<string[]>([...props.role.permissions])
const emit = defineEmits<{ (e: 'confirm', payload: any): void; (e: 'close'): void }>()

const allPermissions = [
  '系统配置', '用户管理', '审计查看',
  '智能备课', '作业管理', '课堂互动',
  '作业提交', '学情查看', '资源库',
]

function onConfirm() {
  emit('confirm', { id: props.role.id, permissions: permissions.value })
}
</script>

<template>
  <el-dialog v-model="visible" :title="'分配权限 - ' + props.role.name" :width="width" append-to-body @closed="emit('close')">
    <el-form label-width="88px">
      <el-form-item label="权限列表">
        <el-select v-model="permissions" multiple filterable style="width: 100%">
          <el-option v-for="p in allPermissions" :key="p" :label="p" :value="p" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="emit('close')">取消</el-button>
      <el-button type="warning" @click="onConfirm">确认分配</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>