<script setup lang="ts">
import "@/assets/user/analyticsDashboardCss/StatisticsCss.css"
import {statsData} from "@/data/user/AnalyticsDashboardData/AnalyticsDashboardData.ts";
</script>

<template>
  <div class="stats-header">
    <h2>数据统计</h2>
    <p>常用的教学用数据和统计信息，分析教师工作效率</p>
  </div>

  <!-- 统计卡片 -->
  <div class="stats-container">
    <div v-for="(stat, index) in statsData" :key="index" class="stats-card">
      <div class="stats-icon">
        <el-icon>
          <component :is="stat.icon" />
        </el-icon>
      </div>
      <div class="stats-content">
        <div class="stats-value">{{ stat.value }}</div>
        <div class="stats-label">{{ stat.label }}</div>
        <div class="stats-change" :class="{ positive: stat.change.startsWith('+') }">
          {{ stat.change }}
        </div>
      </div>
    </div>
  </div>
</template>
