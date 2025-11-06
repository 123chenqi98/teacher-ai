<script setup lang="ts">
import { ref } from 'vue'
import type { RoleItem } from '@/utils/hooks/useRoles'

const props = defineProps<{ role: RoleItem; width?: string | number }>()
const width = props.width ?? 420
const visible = ref(true)
const emit = defineEmits<{ (e: 'confirm'): void; (e: 'close'): void }>()
</script>

<template>
  <el-dialog v-model="visible" title="删除角色" :width="width" append-to-body @closed="emit('close')">
    <div>确认删除角色「{{ props.role.name }}」？该操作不可撤销。</div>
    <template #footer>
      <el-button @click="emit('close')">取消</el-button>
      <el-button type="danger" plain @click="emit('confirm')">删除</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>