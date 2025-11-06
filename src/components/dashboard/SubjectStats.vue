<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as echarts from 'echarts'
import type { DistributionItem } from '@/utils/types'

const props = defineProps<{ subjects: DistributionItem[] | null }>()
const dom = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null

function render() {
  if (!dom.value || !props.subjects) return
  if (!chart) chart = echarts.init(dom.value)
  const categories = props.subjects.map(s => s.name)
  const values = props.subjects.map(s => s.value)
  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    title: { text: '各学科使用量统计', left: 'center', textStyle: { color: 'var(--color-text)' } },
    tooltip: { trigger: 'axis' },
    grid: { left: 40, right: 20, bottom: 40, top: 50 },
    xAxis: { type: 'category', data: categories, axisLabel: { color: 'var(--color-muted)' }, axisLine: { lineStyle: { color: 'var(--color-border)' } } },
    yAxis: { type: 'value', axisLabel: { color: 'var(--color-muted)' }, splitLine: { lineStyle: { color: 'var(--color-border)' } } },
    series: [{
      type: 'bar',
      data: values,
      itemStyle: { color: '#d9c8ff' },
      emphasis: { itemStyle: { color: '#b99cff' } }
    }],
  }
  chart.setOption(option)
}

function onResize() { chart?.resize() }
onMounted(() => { render(); window.addEventListener('resize', onResize) })
onBeforeUnmount(() => window.removeEventListener('resize', onResize))
watch(() => props.subjects, render)
</script>

<template>
  <div class="subject-stats elevated-card">
    <div class="section-title purple-gradient-text">学科数据分析</div>
    <div ref="dom" class="canvas"></div>
    <div v-if="subjects" class="table-wrap">
      <el-table :data="subjects" size="small" stripe>
        <el-table-column prop="name" label="学科" />
        <el-table-column prop="value" label="使用量" />
      </el-table>
    </div>
  </div>
  
</template>

<style scoped>
.canvas { height: 320px; }
.table-wrap { margin-top: 8px; }
</style>