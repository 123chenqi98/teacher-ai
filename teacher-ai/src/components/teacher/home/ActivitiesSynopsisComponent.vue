<script setup lang="ts">
import "@/assets/teacher/homeCss/ActivitiesSynopsisCss.css"
import {activities} from "@/data/teacher/SynopsisActivitiesData.ts";


// 查看全部点击事件
const handleViewAll = () => {
  // 可以在这里添加跳转到活动列表页面的逻辑
  console.log('查看全部活动')
}
</script>

<template>
<!--  顶部信息-->
  <div class="activities-container">
    <div class="header">
      <h2 class="title">近期教学活动</h2>
      <el-button
          type="text"
          @click="handleViewAll"
          class="view-all-btn"
      >
        查看全部
      </el-button>
    </div>
<!--    卡片展示-->
    <div class="activities-grid">
      <el-card
          v-for="(activity) in activities"
          :key="activity.id"
          class="activity-card"
          shadow="hover"
      >
        <!-- 活动图片 -->
        <div class="activity-image-wrapper">
          <img
              :src="activity.image"
              alt="活动图片"
              class="activity-image"
          />
        </div>


        <!-- 活动内容 -->
        <div class="activity-content">
          <h3 class="activity-title">{{ activity.title }}</h3>
          <p class="activity-time">{{ activity.time }}</p>

          <div class="activity-meta">
            <div class="teacher-info">
              <i class="el-icon-user"></i>
              {{ activity.teacher }}
            </div>
            <div class="participants-info">
              已有{{ activity.participants }}人报名
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>

</style>
