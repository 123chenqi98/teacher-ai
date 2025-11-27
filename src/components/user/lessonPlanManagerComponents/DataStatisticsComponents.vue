<script setup lang="ts">
import {Check, Clock, Plus, Star, Collection, Document, FolderDelete} from "@element-plus/icons-vue";
import {stats} from "@/utils/user/teacher/info/lessonPlanManager/StatisticsDataUtils.ts";
import { openNewLessonModal } from "@/forms/user/teacherInfo/lessonPlanManagerForms/DataStatisticsForms.ts";
import "@/assets/user/lessonPlanManagerCss/DataStatisticsCss.css"
</script>

<template>
  <div class="lesson-page-header">
    <div class="lesson-header-content">
      <h1>教案管理</h1>
      <p class="lesson-header-subtitle">高效管理您的教学资源，提升教学质量。</p>
    </div>
    <el-button type="primary" @click="openNewLessonModal" class="lesson-add-btn">
      <el-icon><Plus /></el-icon> 新增教案
    </el-button>
  </div>

  <el-divider /> <!-- 小写短横线形式 -->
  <!-- 数据统计卡片 -->
  <el-row :gutter="16" class="lesson-stats-row">
    <el-col :span="4">
      <el-card shadow="hover" class="lesson-stat-card">
        <div class="lesson-stat-header">
          <el-icon class="lesson-stat-icon"><Collection /></el-icon>
        </div>
        <div class="lesson-stat-value">{{ stats.total }}</div>
        <div class="lesson-stat-label">全部教案</div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card shadow="hover" class="lesson-stat-card">
        <div class="lesson-stat-header">
          <el-icon class="lesson-stat-icon" color="#1989fa"><Check /></el-icon>
        </div>
        <div class="lesson-stat-value">{{ stats.published }}</div>
        <div class="lesson-stat-label">已发布</div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card shadow="hover" class="lesson-stat-card">
        <div class="lesson-stat-header">
          <el-icon class="lesson-stat-icon" color="#67c23a"><Document /></el-icon>
        </div>
        <div class="lesson-stat-value">{{ stats.draft }}</div>
        <div class="lesson-stat-label">草稿</div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card shadow="hover" class="lesson-stat-card">
        <div class="lesson-stat-header">
          <el-icon class="lesson-stat-icon" color="#e6a23c"><Clock /></el-icon>
        </div>
        <div class="lesson-stat-value">{{ stats.reviewing }}</div>
        <div class="lesson-stat-label">审核中</div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card shadow="hover" class="lesson-stat-card">
        <div class="lesson-stat-header">
          <el-icon class="lesson-stat-icon" color="#f56c6c"><FolderDelete /></el-icon>
        </div>
        <div class="lesson-stat-value">{{ stats.rejected }}</div>
        <div class="lesson-stat-label">已驳回</div>
      </el-card>
    </el-col>
    <el-col :span="4">
      <el-card shadow="hover" class="lesson-stat-card">
        <div class="lesson-stat-header">
          <el-icon class="lesson-stat-icon" color="#f7ba1e"><Star /></el-icon>
        </div>
        <div class="lesson-stat-value">{{ stats.collected }}</div>
        <div class="lesson-stat-label">我的收藏</div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>