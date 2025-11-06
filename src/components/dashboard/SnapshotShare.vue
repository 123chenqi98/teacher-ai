<script setup lang="ts">
import html2canvas from 'html2canvas'

const props = defineProps<{ targetSelector?: string }>()

async function onSnapshot() {
  const selector = props.targetSelector ?? '#dashboard-root'
  const el = document.querySelector(selector) as HTMLElement | null
  if (!el) return alert('未找到可截图的区域')
  const canvas = await html2canvas(el, { backgroundColor: '#ffffff', scale: 2 })
  const url = canvas.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = url
  a.download = '统计报表快照.png'
  a.click()
}
</script>

<template>
  <div class="snapshot elevated-card">
    <div class="section-title purple-gradient-text">数据导出与分享</div>
    <div class="row">
      <el-button type="primary" @click="onSnapshot">保存当前页面为 PNG</el-button>
      <el-text type="info">用于汇报文档插图</el-text>
    </div>
  </div>
</template>

<style scoped>
.row { display: flex; gap: 8px; align-items: center; }
.snapshot :deep(.el-button) { background: var(--color-primary); border-color: var(--color-primary); }
</style>