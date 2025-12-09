<script setup lang="ts">
import '@/assets/teacher/classmanagementCss/ClassListCss.css'
import VChart from 'vue-echarts'
import { attendanceTrendStatic } from '@/data/teacher/classmanagement/AttendanceChartData.ts'
import { ref } from 'vue'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import * as echarts from 'echarts/core'
import ClassSelectComponent from '../ClassSelectComponent.vue'

// 注册必要的 ECharts 组件
echarts.use([GridComponent, TooltipComponent, LegendComponent, LineChart, CanvasRenderer])

const activeTab = ref('week')
const selectedClass = ref('')

// 生成图表配置
const getChartOption = () => {
  const trendData = activeTab.value === 'week'
    ? attendanceTrendStatic.weekTrend
    : activeTab.value === 'month'
    ? attendanceTrendStatic.monthTrend
    : attendanceTrendStatic.semesterTrend

  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(50, 50, 50, 0.8)',
      borderColor: '#333',
      textStyle: { color: '#fff' }
    },
    legend: {
      data: trendData.seriesData.map(item => item.name),
      top: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: trendData.xAxisData,
      axisLine: { lineStyle: { color: '#EBEEF5' } },
      axisLabel: { color: '#909399' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { formatter: '{value}%', color: '#909399' },
      splitLine: { lineStyle: { color: '#EBEEF5' } }
    },
    series: trendData.seriesData.map((item, index) => {
      const colors = ['#67C23A', '#E6A23C', '#F56C6C']
      return {
        name: item.name,
        type: 'line',
        data: item.data,
        smooth: true,
        stroke: 2,
        symbolSize: 4,
        lineStyle: { color: colors[index], width: 2 },
        itemStyle: { color: colors[index] },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: colors[index] + '33' },
              { offset: 1, color: colors[index] + '00' }
            ]
          }
        }
      }
    })
  }
}

const chartOption = ref(getChartOption())

// 监听选项卡切换
const handleTabChange = () => {
  chartOption.value = getChartOption()
}
</script>

<template>
  <div>
    <el-card>
      <template #header>
        <div class="chart-header">
          <span style="font-weight: bold">出勤趋势</span>
          <class-select-component v-model="selectedClass" />
        </div>
      </template>

      <el-tabs
        v-model="activeTab"
        @tab-change="handleTabChange"
        style="margin-bottom: 16px"
      >
        <el-tab-pane label="周趋势" name="week" />
        <el-tab-pane label="月趋势" name="month" />
        <el-tab-pane label="学期趋势" name="semester" />
      </el-tabs>

      <div class="chart-container">
        <v-chart :option="chartOption" autoresize />
      </div>
    </el-card>
  </div>
</template>
