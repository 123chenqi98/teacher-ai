<script setup lang="ts">
import { ref } from 'vue'
import type { DashboardData } from '@/utils/types'
import { exportExcel, exportPdf } from '@/utils/export'

const props = defineProps<{ data: DashboardData | null; exportScope: 'global' | 'school' }>()
const exporting = ref(false)

async function onExcel() {
  if (!props.data) return
  exporting.value = true
  try {
    await exportExcel(props.data, props.exportScope)
  } finally { exporting.value = false }
}

async function onPdf() {
  if (!props.data) return
  exporting.value = true
  try {
    await exportPdf(props.data, props.exportScope)
  } finally { exporting.value = false }
}
</script>

<template>
  <div class="export elevated-card">
    <div class="section-title purple-gradient-text">统计报告生成与导出</div>
    <el-alert title="根据角色限制导出范围：管理员可导出全局，其它角色仅限所属学校" type="info" :closable="false" />
    <div class="buttons">
      <el-button type="primary" :disabled="!data || exporting" @click="onExcel">导出 Excel</el-button>
      <el-button type="primary" plain :disabled="!data || exporting" @click="onPdf">导出 PDF</el-button>
      <el-tag v-if="exportScope==='school'" type="warning">范围：所属学校</el-tag>
      <el-tag v-else type="success">范围：全局</el-tag>
    </div>
  </div>
</template>

<style scoped>
.buttons { margin-top: 8px; display: flex; gap: 8px; align-items: center; }
.export :deep(.el-button) { background: var(--color-primary); border-color: var(--color-primary); }
</style>