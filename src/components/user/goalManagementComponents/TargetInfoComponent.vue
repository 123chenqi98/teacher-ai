<script setup lang="ts">
import "@/assets/user/goalManagementCss/okr-management.css"
import {ElCard, ElCol, ElProgress, ElRow} from "element-plus";
import {
  completedObjectives,
  completionRate,
  inProgressObjectives, notStartedObjectives
} from "@/utils/user/teacher/info/goalManagement/TargetDatautils.ts";
import {onMounted} from "vue";
import {updateStats} from "@/utils/user/teacher/info/goalManagement/DataUtlis.ts";
import {initCharts, resizeCharts} from "@/utils/echarts/teacher/info/GoalManagementEchartsUtils.ts";

onMounted(() => {
  initCharts()
  window.addEventListener('resize', resizeCharts)
  updateStats()
})
</script>

<template>
  <el-row :gutter="20" class="okr-chart-section">
    <el-col :span="16">
      <el-card class="okr-chart-card" shadow="hover">
        <template #header>
          <div class="okr-card-header">
            <span>目标进度概览</span>
          </div>
        </template>
        <div id="progressChart" style="height: 300px;"></div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="okr-completion-card" shadow="hover">
        <template #header>
          <div class="okr-card-header">
            <span>完成情况</span>
          </div>
        </template>
        <div class="okr-completion-content">
          <div class="okr-completion-chart">
            <el-progress type="circle" :percentage="completionRate" :width="120" />
          </div>
          <div class="okr-completion-stats">
            <div class="okr-stat-item">
              <span class="okr-stat-label">已完成</span>
              <span class="okr-stat-value">{{ completedObjectives }}</span>
            </div>
            <div class="okr-stat-item">
              <span class="okr-stat-label">进行中</span>
              <span class="okr-stat-value">{{ inProgressObjectives }}</span>
            </div>
            <div class="okr-stat-item">
              <span class="okr-stat-label">未开始</span>
              <span class="okr-stat-value">{{ notStartedObjectives }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>