<script setup lang="ts">
import "@/assets/teacher/functionCss/PopularApplicationCss.css"
import SectionHeaderComponent from "@/components/teacher/SectionHeaderComponent.vue";
import {ElMessage} from "element-plus";
import {applications} from "@/data/teacher/funtion/PopularApplicationData.ts";
import router from "@/router";

// 定义查看全部热门应用的处理函数
const ViewAllPopularApplications = () => {
  ElMessage.success('查看全部热门应用')
}
</script>

<template>
  <!-- 热门应用容器 -->
  <div class="popular-course-container">
    <!-- 区间头组件：包含标题"热门应用"和"查看全部"按钮 -->
    <section-header-component
        title="热门应用"
        titleColor="#40389e"
        @viewAll="ViewAllPopularApplications"
    />
    <!-- 应用卡片网格容器 -->
    <div class="applications-grid">
      <!-- v-for循环遍历热门应用数据 -->
      <el-card
          v-for="(application) in applications"
          :key="application.id"
          class="application-card"
          shadow="hover"
          @click="router.push(application.routerPath)"
      >
        <!-- 应用图标容器 -->
        <div class="app-icon-wrapper"
        >
          <!-- 应用图标图片 -->
          <img
              :src="application.icon"
              alt="应用图标"
              class="app-icon"
          />
        </div>
        <!-- 应用内容区域 -->
        <div class="app-content">
          <!-- 应用名称标题 -->
          <h3 class="app-title">{{ application.title }}</h3>
          <!-- 应用功能描述 -->
          <p class="app-description">{{ application.description }}</p>
          <!-- 底部信息区域：包含使用人数和评分 -->
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>

</style>