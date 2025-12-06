<script setup lang="ts">
import '@/assets/teacher/classmanagementCss/ClassListCss.css'
import VChart from 'vue-echarts'
import { scoreTrendStatic } from '@/data/teacher/classmanagement/ClassDetailScoreData.ts'
import { ref } from 'vue'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import * as echarts from 'echarts/core'
import ClassSelectComponent from '../ClassSelectComponent.vue'

// 注册必要的 ECharts 组件
echarts.use([GridComponent, TooltipComponent, LegendComponent, LineChart, CanvasRenderer])

const selectedClass = ref('')

// 生成图表配置
const chartOption = ref({
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
    borderColor: '#333',
    textStyle: { color: '#fff' }
  },
  legend: {
    data: ['班级平均分', '年级平均分'],
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
    data: scoreTrendStatic.examTypes,
    axisLine: { lineStyle: { color: '#EBEEF5' } },
    axisLabel: { color: '#909399' }
  },
  yAxis: {
    type: 'value',
    axisLabel: { color: '#909399' },
    splitLine: { lineStyle: { color: '#EBEEF5' } }
  },
  series: [
    {
      name: '班级平均分',
      type: 'line',
      data: scoreTrendStatic.classScores,
      smooth: true,
      symbolSize: 6,
      lineStyle: { color: '#409EFF', width: 2 },
      itemStyle: { color: '#409EFF' },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#409EFF33' },
            { offset: 1, color: '#409EFF00' }
          ]
        }
      }
    },
    {
      name: '年级平均分',
      type: 'line',
      data: scoreTrendStatic.gradeScores,
      smooth: true,
      symbolSize: 6,
      lineStyle: { color: '#E6A23C', width: 2 },
      itemStyle: { color: '#E6A23C' },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#E6A23C33' },
            { offset: 1, color: '#E6A23C00' }
          ]
        }
      }
    }
  ]
})
</script>

<template>
  <div>
    <el-card>
      <template #header>
        <div class="chart-header">
          <span style="font-weight: bold">成绩趋势</span>
          <class-select-component v-model="selectedClass" />
        </div>
      </template>


      <div class="chart-container">
        <v-chart :option="chartOption" autoresize />
      </div>
      <div
          style="height: 54px;"

      ></div>
    </el-card>
  </div>
</template>
