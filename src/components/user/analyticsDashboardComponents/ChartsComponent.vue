<script setup lang="ts">
import {onMounted} from "vue";
import * as echarts from "echarts";
import "@/assets/user/analyticsDashboardCss/ChartsCss.css"
import {initCharts} from "@/utils/echarts/teacher/info/AnalyticsDashboardEchartsUtils.ts";

onMounted(() => {
  initCharts()
  // 窗口大小改变时重置图表大小
  window.addEventListener('resize', () => {
    setTimeout(() => {
      echarts.getInstanceByDom(document.getElementById('usageTrendChart')!)?.resize()
      echarts.getInstanceByDom(document.getElementById('taskCompletionChart')!)?.resize()
      echarts.getInstanceByDom(document.getElementById('activityChart')!)?.resize()
      echarts.getInstanceByDom(document.getElementById('resourceDistributionChart')!)?.resize()
      echarts.getInstanceByDom(document.getElementById('comprehensiveTrendChart')!)?.resize()
    }, 100)
  })
})

</script>

<template>
  <!-- 图表区域 -->
  <div class="charts-container">
    <div class="chart-item">
      <div class="chart-header">
        <h3>使用时长趋势</h3>
        <p>使用时长趋势图（按日/周/月展示平台使用时长变化）</p>
      </div>
      <div id="usageTrendChart" class="chart-container-analytics"></div>
    </div>

    <div class="chart-row">
      <div class="chart-item half">
        <div class="chart-header">
          <h3>任务完成情况</h3>
          <p>各类任务完成比例</p>
        </div>
        <div id="taskCompletionChart" class="chart-container-analytics"></div>
      </div>

      <div class="chart-item half">
        <div class="chart-header">
          <h3>活跃度分析</h3>
          <p>不同时段活跃度分析</p>
        </div>
        <div id="activityChart" class="chart-container-analytics"></div>
      </div>
    </div>

    <div class="chart-row">
      <div class="chart-item half">
        <div class="chart-header">
          <h3>资源使用分布</h3>
          <p>不同类型资源使用占比</p>
        </div>
        <div id="resourceDistributionChart" class="chart-container-analytics"></div>
      </div>

      <div class="chart-item half">
        <div class="chart-header">
          <h3>综合指标趋势对比</h3>
          <p>多个维度指标发展趋势对比</p>
        </div>
        <div id="comprehensiveTrendChart" class="chart-container-analytics"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>