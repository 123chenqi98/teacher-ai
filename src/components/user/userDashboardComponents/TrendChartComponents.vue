<script setup lang="ts">
import "@/assets/user/userDashboardCss/TrendChartCss.css"
import { trendData, downloadReport } from "@/data/user/userDashboardData/TrendChartData.ts"
import { chartRef, setupTrendChart } from "@/utils/echarts/teacher/info/UserDashboardEchartsUtils.ts"
import { ElButton, ElCard, ElCol, ElIcon, ElRow } from "element-plus";
import { ArrowDown, ArrowUp, Download } from "@element-plus/icons-vue";

// 在组件内注册图表生命周期，确保挂载后初始化
setupTrendChart()
</script>

<template>
  <!-- 修改后的组件代码 -->
  <el-row :gutter="20">
    <el-col :span="24">
      <el-card shadow="hover" :border="false" class="trend-chart-card">
        <!-- 卡片头部：标题 + 环比增长 + 下载按钮（类名不变，靠CSS调整布局） -->
        <div class="chart-header">
          <h2 class="chart-title">本月平台使用趋势</h2>
          <div class="growth-stats">
            <div
                v-for="(item, index) in trendData.growth"
                :key="index"
                class="growth-item"
                :class="{ 'growth-up': item.trend === 'up', 'growth-down': item.trend === 'down' }"
            >
              <span class="growth-label">{{ item.label }}：</span>
              <span class="growth-value-wrapper">
                <el-icon :size="14" class="trend-icon">
                  <ArrowUp v-if="item.trend === 'up'" />
                  <ArrowDown v-else />
                </el-icon>
                <span class="growth-value">{{ item.value }}</span>
              </span>
            </div>
          </div>
          <el-button type="primary" size="default" class="download-btn" @click="downloadReport">
            <el-icon :size="14"><Download /></el-icon>
            <span class="ml-1">下载报表</span>
          </el-button>
        </div>
        <!-- 图表容器 -->
        <div ref="chartRef" class="chart-container"></div>
      </el-card>
    </el-col>
  </el-row>

</template>

<style scoped>

</style>
