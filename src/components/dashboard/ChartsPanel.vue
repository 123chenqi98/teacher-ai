<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as echarts from 'echarts'
import type { TrendSeries } from '@/utils/types'
import { openModal } from '@/utils/modal'
import FeatureHelpModal from '@/components/modals/FeatureHelpModal.vue'

const props = defineProps<{
  series: TrendSeries[]
}>()

const chartType = ref<'bar' | 'pie' | 'line'>('line')
const dom = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null

function render() {
  if (!dom.value) return
  if (!chart) chart = echarts.init(dom.value)
  try {
    const option: echarts.EChartsOption = buildOption(chartType.value, props.series)
    chart.clear()
    chart.setOption(option, true)
  } catch (e) {
    const fallback: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      xAxis: { type: 'category', data: [] },
      yAxis: { type: 'value' },
      series: [],
    }
    chart.clear()
    chart.setOption(fallback, true)
    console.warn('ChartsPanel render fallback due to error:', e)
  }
}

function buildOption(type: 'bar' | 'pie' | 'line', series: TrendSeries[] | undefined | null): echarts.EChartsOption {
  const safeSeries: TrendSeries[] = Array.isArray(series) ? series : []
  if (type === 'pie') {
    const s = safeSeries[0]
    const data = s && Array.isArray(s.points) ? s.points.map(p => ({ name: p.label, value: p.value })) : []
    return {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'item' },
      legend: { textStyle: { color: '#e8e6f5' } },
      series: [{ type: 'pie', radius: '60%', data }],
    }
  }
  const categories = safeSeries[0] && Array.isArray(safeSeries[0].points) ? safeSeries[0].points.map(p => p.label) : []
  return {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: categories, axisLabel: { color: 'var(--color-muted)' }, axisLine: { lineStyle: { color: 'var(--color-border)' } } },
    yAxis: { type: 'value', axisLabel: { color: 'var(--color-muted)' }, splitLine: { lineStyle: { color: 'var(--color-border)' } } },
    legend: { textStyle: { color: 'var(--color-text)' } },
    series: safeSeries.map(s => ({
      type,
      name: s.name ?? '',
      data: Array.isArray(s.points) ? s.points.map(p => p.value) : [],
      smooth: type === 'line',
      itemStyle: { color: 'var(--color-primary)' },
      areaStyle: type === 'line' ? { color: 'rgba(124,77,255,0.15)' } : undefined,
    })),
  }
}

onMounted(render)
watch([chartType, () => props.series], render)

function onResize() { if (chart) chart.resize() }
onMounted(() => window.addEventListener('resize', onResize))
onBeforeUnmount(() => window.removeEventListener('resize', onResize))

function onHelp() {
  openModal(FeatureHelpModal, { featureName: '数据图表展示', description: '在此切换折线/柱状/饼图，展示用户趋势与功能使用波动。' })
}
</script>

<template>
  <div class="charts elevated-card">
    <div class="section-title purple-gradient-text">数据图表展示</div>
    <div class="toolbar">
      <el-button size="small" text type="primary" @click="onHelp">功能说明</el-button>
      <el-radio-group v-model="chartType" size="small">
        <el-radio-button label="line">折线图</el-radio-button>
        <el-radio-button label="bar">柱状图</el-radio-button>
        <el-radio-button label="pie">饼图</el-radio-button>
      </el-radio-group>
    </div>
    <div ref="dom" class="canvas"></div>
  </div>
</template>

<style scoped>
.toolbar { display: flex; justify-content: flex-end; margin-bottom: 8px; }
.canvas { height: 420px; }
</style>