<script setup lang="ts">
import { ref } from 'vue'
import type { AuditLog } from '@/utils/hooks/useAudit'

const props = defineProps<{ log: AuditLog; width?: string | number }>()
const width = props.width ?? 560
const visible = ref(true)
const emit = defineEmits<{ (e: 'close'): void }>()
</script>

<template>
  <el-dialog v-model="visible" title="审计详情" :width="width" append-to-body @closed="emit('close')">
    <el-descriptions :column="1" border>
      <el-descriptions-item label="时间">{{ props.log.time }}</el-descriptions-item>
      <el-descriptions-item label="用户">{{ props.log.user }}</el-descriptions-item>
      <el-descriptions-item label="动作">{{ props.log.action }}</el-descriptions-item>
      <el-descriptions-item label="目标">{{ props.log.target }}</el-descriptions-item>
      <el-descriptions-item label="状态">
        <el-tag :type="props.log.status==='success' ? 'success' : 'danger'">{{ props.log.status==='success' ? '成功' : '失败' }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="IP">{{ props.log.ip }}</el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <el-button @click="emit('close')">关闭</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>