<script setup lang="ts">
import "@/assets/user/userDashboardCss/PerformanceDashboardCss.css"
import { stats } from "@/data/user/userDashboardData/PerformanceDashboardData.ts"
import {ElAvatar, ElButton, ElCard, ElCol, ElIcon, ElRow, ElText} from "element-plus";
</script>

<template>
  <!-- 页面标题 -->
  <div class="page-title">
    <h1 >个人概览</h1>
    <p >涵盖个人信息概览、数据和收藏概览及使用趋势等核心内容。</p>
  </div>

  <el-divider /> <!-- 小写短横线形式 -->

  <!-- 教师效能仪表盘 -->
  <el-card shadow="hover" class="teacher-profile-card" :border="false">
    <!-- 教师基本信息区域 -->
    <!-- :gutter="20":表示子元素之间的间距为 20px-->
    <el-row :gutter="20" align="middle" class="teacher-info">
      <!-- 头像 -->
      <el-col :span="3">
        <el-avatar shape="circle" size="large" class="avatar-container">
          <img src="https://randomuser.me/api/portraits/men/80.jpg" alt="教师头像" class="avatar-img">
        </el-avatar>
      </el-col>

      <!-- 基本信息 -->
      <el-col :span="12">
        <el-row class="name-row">
          <el-text type="primary" class="teacher-name">内格老师</el-text>
        </el-row>
        <el-row class="desc-row">
          <el-text class="teacher-desc">数学教师 | 初中部 | 教龄 8 年</el-text>
        </el-row>
      </el-col>

      <!-- 操作按钮 -->
      <el-col :span="8" class="actions-col">
        <el-button type="primary" size="small" class="edit-btn">
          <i class="el-icon-edit mr-1"></i>编辑资料
        </el-button>
        <el-button type="success" size="small" class="message-btn">
          <i class="el-icon-message mr-1"></i>查看消息
        </el-button>
      </el-col>
    </el-row>

    <!-- 统计数据区域 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :span="5" v-for="(stat, index) in stats" :key="index">
        <el-card class="stat-card" :border="false">
          <!-- 新增图标显示区域 -->
          <div class="stat-icon">
            <el-icon :size="24">
              <component :is="stat.icon"></component>
            </el-icon>
          </div>
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>

</style>