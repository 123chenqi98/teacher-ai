<script setup lang="ts">
import "@/assets/user/goalManagementCss/okr-management.css"
import { ElButton, ElCard, ElCol, ElRow } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { addObjective } from "@/utils/user/teacher/info/goalManagement/DataUtlis.ts";
import { statsData } from "@/utils/user/teacher/info/goalManagement/TargetDatautils.ts";
</script>

<template>
    <div class="okr-page-header">
      <div class="okr-header-content">
        <h1>目标管理</h1>
        <p class="okr-header-subtitle">通过OKR方法管理您的教学目标和关键结果</p>
      </div>
      <el-button type="primary" @click="addObjective" class="okr-add-goal-btn">
        <el-icon><Plus /></el-icon> 添加目标
      </el-button>
    </div>

    <el-divider /> <!-- 小写短横线形式 -->

    <el-row :gutter="20" class="okr-stats-row">
      <el-col :span="6" v-for="stat in statsData" :key="stat.title">
        <el-card class="okr-stat-card" shadow="hover">
          <div class="okr-stat-content">
            <div class="okr-stat-icon-wrapper">
              <el-icon :size="24" :color="stat.color"><component :is="stat.icon" /></el-icon>
            </div>
            <div class="okr-stat-info">
              <div class="okr-stat-value">{{ stat.value }}</div>
              <div class="okr-stat-label">{{ stat.title }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
</template>

<style scoped>

</style>