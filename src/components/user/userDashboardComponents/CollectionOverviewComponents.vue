<script setup lang="ts">
import "@/assets/user/userDashboardCss/CollectionOverviewCss.css"
import {collectionStats, collectionList } from "@/data/user/userDashboardData/CollectionOverviewData.ts"
import {ElAvatar, ElButton, ElCard, ElCol, ElIcon, ElRow} from "element-plus";
import router from "@/router"
</script>

<template>
  <!-- 收藏概览 + 待办任务 行 -->
  <el-row :gutter="20" class="card-row mt-4">
    <!-- 收藏概览卡片 -->
    <el-col :span="24">
      <el-card shadow="hover" :border="false" class="collection-card">
        <div class="card-header">
          <h2 class="top-title">收藏概览</h2>
          <el-button type="text" size="small" class="view-all-btn" @click="router.push('/user/lessonPlans')">查看全部</el-button>
        </div>

        <!-- 收藏分类统计 -->
        <el-row :gutter="16" class="collection-stats-row mb-4">
          <el-col :span="6" v-for="(item, index) in collectionStats" :key="index">
            <div class="collection-stat-item" :style="{ '--color': item.color }">
              <el-icon class="stat-icon" :style="{ '--color': item.color }">
                <component :is="item.icon"></component>
              </el-icon>
              <div class="stat-value">{{ item.count }}</div>
              <div class="stat-label">{{ item.category }}</div>
            </div>
          </el-col>
        </el-row>

        <!-- 最近收藏列表 -->
        <div class="collection-list">
          <div v-for="(item, index) in collectionList" :key="index" class="collection-item">
            <el-avatar class="collection-avatar" :style="{ backgroundColor: '#f0f2f5' }">
              <el-icon :size="16"><component :is="item.icon" /></el-icon>
            </el-avatar>
            <div class="collection-content">
              <p class="collection-title">{{ item.title }}</p>
              <div class="collection-meta">
                <span class="collection-type">{{ item.type }}</span>
                <span class="collection-source">· {{ item.source }}</span>
              </div>
            </div>
            <div class="collection-time">{{ item.time }}</div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>