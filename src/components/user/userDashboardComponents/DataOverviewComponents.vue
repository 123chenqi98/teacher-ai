<script setup lang="ts">
import "@/assets/user/userDashboardCss/DataOverviewCss.css"
import { weeklyStats } from "@/data/user/DataOverviewData.ts";
import {ElButton, ElCard, ElCol, ElIcon, ElRow} from "element-plus";
</script>

<template>
  <!-- 本周数据概览卡片 -->
  <el-card shadow="hover" class="weekly-stats-card" :border="false">
    <!-- 标题 + 查看详情按钮 行 -->
    <el-row :gutter="20" class="card-header-row">
      <el-col :span="20">
        <h2 class="top-title">本周数据概览</h2>
      </el-col>
      <el-col :span="4" class="text-right">
        <el-button type="primary" size="small" class="view-detail-btn" icon="ArrowRight">
          查看详情
        </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="16" class="weekly-stats-row">
      <el-col :span="6" v-for="(item, index) in weeklyStats" :key="index">
        <el-card class="weekly-stat-card" :border="false">
          <el-icon class="stat-icon">
            <component :is="item.icon"></component>
          </el-icon>
          <div class="stat-value">{{ item.value }}</div>
          <div class="stat-label">{{ item.label }}</div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>

</style>