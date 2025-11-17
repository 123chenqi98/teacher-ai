<script setup lang="ts">
import "@/assets/user/userDashboardCss/TrendChartCss.css"
import { trendData, downloadReport } from "@/data/user/userDashboardData/TrendChartData.ts"
import { chartRef, setupTrendChart } from "@/forms/user/userDashboardForms/TrendChartForms.ts"
import {ElButton, ElCard, ElCol, ElIcon, ElRow} from "element-plus";
import {ArrowDown, ArrowUp, Download} from "@element-plus/icons-vue";

// 在组件内注册图表生命周期，确保挂载后初始化
setupTrendChart()
</script>

<template>
  <!-- 本月平台使用趋势（echarts 原生实现折线图） -->
  <el-row :gutter="20" class="card-row mt-4">
    <el-col :span="24">
      <el-card shadow="hover" :border="false" class="trend-card">
        <!-- 卡片头部：标题 + 环比增长 + 下载按钮（类名不变，靠CSS调整布局） -->
        <div class="card-header flex items-center justify-between mb-4 gap-4">
          <h2 class="top-title">本月平台使用趋势</h2>
          <!-- 环比增长统计 -->
          <div class="growth-stats">
            <div v-for="(item, index) in trendData.growth" :key="index" class="growth-item flex items-center gap-1">
              <span class="growth-label text-sm text-gray-600">{{ item.label }}：</span>
              <span class="growth-value text-sm" :class="item.trend === 'up' ? 'text-green-600' : 'text-red-600'">
                        <el-icon :size="14" v-if="item.trend === 'up'"><ArrowUp /></el-icon>
                        <el-icon :size="14" v-else><ArrowDown /></el-icon>
                        {{ item.value }}
                      </span>
            </div>
          </div>
          <!-- 下载按钮 -->
          <el-button type="primary" size="small" class="download-btn" @click="downloadReport">
            <el-icon :size="14"><Download /></el-icon>
            <span class="ml-1">下载报表</span>
          </el-button>
        </div>
        <!-- 图表容器 -->
        <div ref="chartRef" class="chart-container" style="width: 100% !important; height: 300px !important; border: 1px solid #f0f2f5; border-radius: 8px; background: white;"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>