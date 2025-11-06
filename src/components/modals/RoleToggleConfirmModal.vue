<script setup lang="ts">
import { ref } from 'vue'
import type { RoleItem } from '@/utils/hooks/useRoles'

const props = defineProps<{ role: RoleItem; width?: string | number }>()
const width = props.width ?? 420
const visible = ref(true)
const emit = defineEmits<{ (e: 'confirm'): void; (e: 'close'): void }>()

const nextText = props.role.status === 'enabled' ? '停用' : '启用'
</script>

<template>
  <el-dialog v-model="visible" :title="nextText + '角色'" :width="width" append-to-body @closed="emit('close')">
    <div>是否确认{{ nextText }}角色「{{ props.role.name }}」？</div>
    <template #footer>
      <el-button @click="emit('close')">取消</el-button>
      <el-button :type="props.role.status==='enabled' ? 'danger' : 'success'" plain @click="emit('confirm')">确认</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>