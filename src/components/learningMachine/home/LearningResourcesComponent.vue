<script setup lang="ts">
import "@/assets/learningMachine/homeCss/LearningResourcesCss.css"
import { teachers } from "@/data/learningMachine/LearningResourcesData.ts";
</script>
<template>
  <div class="teacher-section">
    <!-- 顶部数据标题区 -->
    <div class="teacher-stats-header">
      <h2 class="main-title">22年深耕教育 小知名师领衔教研</h2>
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-number">3000+</div>
          <div class="stat-desc">专业教研团队</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">985/211</div>
          <div class="stat-desc">名师领衔授课</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">15年+</div>
          <div class="stat-desc">平均教学经验</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">严选师资</div>
          <div class="stat-desc">8轮筛选 5次试讲</div>
        </div>
      </div>
    </div>

    <!-- 教师卡片（关联数据） -->
    <div class="teachers-grid">
      <!-- 遍历导入的teachers数据 -->
      <el-card v-for="(teacher, index) in teachers" :key="index" class="teacher-card" shadow="hover">
        <!-- 图片：绑定teacher.image -->
        <div class="teacher-img-wrapper">
          <img :src="teacher.image" :alt="teacher.name" class="teacher-img">
        </div>
        <!-- 信息：绑定name/education/description/certId -->
        <div class="teacher-info">
          <h3 class="teacher-name">{{ teacher.name }}</h3>
          <div class="teacher-edu">{{ teacher.education }}</div>
          <p class="teacher-desc">{{ teacher.description }}</p>
          <div class="teacher-cert">教师资格证编号：{{ teacher.certId }}</div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>

</style>
