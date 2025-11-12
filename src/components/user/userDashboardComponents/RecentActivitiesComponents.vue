<script setup lang="ts">
import "@/assets/user/userDashboardCss/RecentActivitiesCss.css"
import { activityList } from "@/data/user/userDashboardData/RecentActivitiesData.ts"
import {ElAvatar, ElCard, ElCol, ElIcon, ElRow} from "element-plus";
</script>

<template>
  <el-row :gutter="20" class="card-row">
    <!-- 近期操作历史卡片 -->
    <el-col :span="24">
      <el-card shadow="hover" :border="false" class="recent-activities-card">
        <div class="card-header">
          <h2 class="top-title">近期操作历史</h2>
        </div>
        <!-- 手动渲染列表，避免自动导入路径问题 -->
        <div class="activity-list">
          <div v-for="(item, index) in activityList" :key="index" class="activity-item">
            <el-avatar class="activity-avatar" size="small">
              <el-icon :size="16"><component :is="item.icon" /></el-icon>
            </el-avatar>
            <div class="activity-content">
              <p class="activity-desc">{{ item.content }}</p>
              <span class="activity-time">{{ item.time }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>