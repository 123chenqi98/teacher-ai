<script setup lang="ts">
// 样式
import "@/assets/teacher/homeCss/SynopsisClassCss.css"
// 查看全部点击事件
import {courses} from "@/data/teacher/SynopsisClassData.ts";
import {ElMessage} from "element-plus";

const handleViewAll = () => {
  // 可以在这里添加跳转到课程列表页面的逻辑
  ElMessage.success('查看全部课程')
}
</script>

<template>
  <div class="course-container">
<!--    头部信息-->
    <div class="synopsis-class-header">
      <h2 class="title">特色课程</h2>
      <el-button
          type="text"
          @click="handleViewAll"
          class="view-all-btn"
      >
        查看全部
      </el-button>
    </div>
<!--    卡片展示-->
    <div class="courses-grid">
      <el-card
          v-for="(course) in courses"
          :key="course.id"
          class="course-card"
          shadow="hover"
      >
<!--        图片-->
        <div class="course-image-wrapper">
          <img
              :src="course.image"
              alt="课程图片"
              class="course-image"
          />
        </div>
<!--        介绍-->
        <div class="course-content">
          <h3 class="course-title">{{ course.title }}</h3>
          <p class="course-description">{{ course.description }}</p>
          <el-button
              type="primary"
              plain
              size="small"
              class="detail-btn"
          >
            查看详情
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>

</style>
