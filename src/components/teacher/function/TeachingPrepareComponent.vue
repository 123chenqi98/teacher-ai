<script setup lang="ts">
import "@/assets/teacher/functionCss/TeachingPrepareCss.css"
import SectionHeaderComponent from "@/components/teacher/SectionHeaderComponent.vue";
import {ElMessage} from "element-plus";
import {teachingResources} from "@/data/teacher/funtion/TeachingPrepareData.ts";
import router from "@/router";

// 定义查看全部教学资源的处理函数
const ViewAllTeachingResources = () => {
  ElMessage.success('查看全部备课资源')
}
</script>

<template>
  <!-- 备课专区容器 -->
  <div class="teaching-prepare-container">
    <!-- 区间头组件：包含标题"备课专区"和"查看全部"按钮 -->
    <section-header-component
        title="备课专区"
        titleColor="#40389e"
        @viewAll="ViewAllTeachingResources"
    />
    <!-- 课程资源卡片网格容器 -->
    <div class="resources-grid">
      <!-- v-for循环遍历教学资源数据 -->
      <el-card
          v-for="(resource) in teachingResources"
          :key="resource.id"
          class="prepare-card"
          shadow="hover"
          @click="router.push(resource.routerPath)"
      >
        <!-- 彩色背景图片区域：使用图片作为卡片头部背景 -->
        <div class="resource-image-wrapper">
          <img  :src="resource.icon" alt="资源图片" class="resource-image" />
        </div>
        <!-- 资源内容区域 -->
        <div class="resource-content">
          <!-- 资源标题 -->
          <h3 class="resource-title">{{ resource.title }}</h3>
          <!-- 资源详细描述 -->
          <p class="resource-description">{{ resource.description }}</p>
          <!-- 底部信息区域：包含下载次数和发布日期 -->
          <div class="resource-footer">
            <!-- 资源下载次数统计 -->
            <span class="resource-downloads">下载 {{ resource.downloads }}</span>
            <!-- 资源发布日期 -->
            <span class="resource-date">{{ resource.date }}</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>

</style>