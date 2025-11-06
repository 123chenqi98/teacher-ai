<script setup lang="ts">
import { computed } from 'vue'
import type { FilterState, TimeGranularity } from '@/utils/types'

const props = defineProps<{
  modelValue: FilterState
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', v: FilterState): void
  (e: 'refresh'): void
}>()

const granularityOptions: { label: string; value: TimeGranularity }[] = [
  { label: '按日', value: 'day' },
  { label: '按周', value: 'week' },
  { label: '按月', value: 'month' },
]

const internal = computed({
  get: () => props.modelValue,
  set: (v: FilterState) => emits('update:modelValue', v),
})

const quickRanges = [
  { label: '今日', days: 0 },
  { label: '本周', days: 7 },
  { label: '本月', days: 30 },
]

function setQuick(days: number) {
  const now = new Date()
  const start = new Date()
  start.setDate(now.getDate() - days)
  internal.value = { ...internal.value, range: [start, now] }
  emits('refresh')
}

function onRefresh() {
  emits('refresh')
}
</script>

<template>
  <div class="filters elevated-card">
    <div class="row">
      <div class="page-title purple-gradient-text">后台管理统计</div>
      <div class="actions">
        <el-button type="primary" @click="onRefresh">刷新数据</el-button>
      </div>
    </div>
    <div class="soft-divider" />
    <div class="grid">
      <el-date-picker
        v-model="internal.range"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        unlink-panels
      />
      <el-select v-model="internal.granularity" placeholder="时间维度" class="granularity" style="width: 160px">
        <el-option v-for="opt in granularityOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
      </el-select>
      <el-select v-model="internal.region" placeholder="区域" style="width: 160px">
        <el-option label="全部区域" :value="null" />
        <el-option label="华东" value="east" />
        <el-option label="华南" value="south" />
        <el-option label="华北" value="north" />
      </el-select>
      <el-select v-model="internal.school" placeholder="学校" style="width: 160px">
        <el-option label="全部学校" :value="null" />
        <el-option label="一中" value="no1" />
        <el-option label="二中" value="no2" />
        <el-option label="实验高中" value="exp" />
      </el-select>
      <div class="quick">
        <el-space>
          <el-text type="info">快捷选择：</el-text>
          <el-button v-for="q in quickRanges" :key="q.label" size="small" @click="setQuick(q.days)">{{ q.label }}</el-button>
        </el-space>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.filters { margin-bottom: 16px; }
.row { display: flex; justify-content: space-between; align-items: center; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; align-items: center; }
.granularity { 
  margin-left: 0; 
  grid-column: 1; /* 强制换到下一行的第一列 */
  margin-top: 8px; 
}
.quick { justify-self: start; }
.actions :deep(.el-button) { background: var(--color-primary); border-color: var(--color-primary); }
</style>
