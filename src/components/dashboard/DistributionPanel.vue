<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as echarts from 'echarts'
import type { Distributions } from '@/utils/types'
import { openModal } from '@/utils/modal'
import FeatureHelpModal from '@/components/modals/FeatureHelpModal.vue'

const props = defineProps<{ distributions: Distributions | null }>()

const regionRef = ref<HTMLDivElement | null>(null)
const deviceRef = ref<HTMLDivElement | null>(null)
const roleRef = ref<HTMLDivElement | null>(null)
const orderTypeRef = ref<HTMLDivElement | null>(null)
const taskStatusRef = ref<HTMLDivElement | null>(null)

const charts: Record<string, echarts.ECharts | null> = {
  region: null, device: null, role: null, orderType: null, taskStatus: null,
}

function pieOption(title: string, data: { name: string; value: number }[]): echarts.EChartsOption {
  return {
    title: { text: title, left: 'center', textStyle: { color: 'var(--color-text)', fontSize: 12 } },
    tooltip: { trigger: 'item' },
    legend: { bottom: 0, textStyle: { color: 'var(--color-muted)' } },
    series: [{ type: 'pie', radius: ['45%', '70%'], itemStyle: { borderColor: 'var(--color-bg)', borderWidth: 2 },
      data, label: { color: 'var(--color-text)' } }],
  }
}

function renderAll() {
  if (!props.distributions) return
  if (!charts.region && regionRef.value) charts.region = echarts.init(regionRef.value)
  if (!charts.device && deviceRef.value) charts.device = echarts.init(deviceRef.value)
  if (!charts.role && roleRef.value) charts.role = echarts.init(roleRef.value)
  if (!charts.orderType && orderTypeRef.value) charts.orderType = echarts.init(orderTypeRef.value)
  if (!charts.taskStatus && taskStatusRef.value) charts.taskStatus = echarts.init(taskStatusRef.value)

  charts.region?.setOption(pieOption('用户地域分布', props.distributions.userRegion))
  charts.device?.setOption(pieOption('终端设备分布', props.distributions.device))
  charts.role?.setOption(pieOption('角色分布', props.distributions.role))
  charts.orderType?.setOption(pieOption('订单类型分布', props.distributions.orderType))
  charts.taskStatus?.setOption(pieOption('任务状态分布', props.distributions.taskStatus))
}

function onResize() { Object.values(charts).forEach(c => c?.resize()) }

onMounted(() => { renderAll(); window.addEventListener('resize', onResize) })
onBeforeUnmount(() => window.removeEventListener('resize', onResize))

function onHelp() {
  openModal(FeatureHelpModal, { featureName: '分类统计报表', description: '展示地域、设备、角色、订单类型与任务状态的分布情况。' })
}
</script>

<template>
  <div class="distribution elevated-card">
    <div class="section-title purple-gradient-text">分类统计报表</div>
    <div class="toolbar">
      <el-button size="small" text type="primary" @click="onHelp">功能说明</el-button>
    </div>
        <CategoryStatistics />
    <!-- <div class="grid" v-if="distributions">
      <div ref="regionRef" class="pie" />
      <div ref="deviceRef" class="pie" />
      <div ref="roleRef" class="pie" />
      <div ref="orderTypeRef" class="pie" />
      <div ref="taskStatusRef" class="pie" />
    </div> -->
  </div>
</template>

<style scoped>
.toolbar { display: flex; justify-content: flex-end; margin: 4px 0 8px; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.pie { height: 260px; background: transparent; }
@media (max-width: 1200px) { .grid { grid-template-columns: repeat(2, 1fr); } }
</style>