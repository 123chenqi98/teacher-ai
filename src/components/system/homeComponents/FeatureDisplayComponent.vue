<script setup lang="ts">
// 数据
import features from "@/data/system/FeaturesDatas.ts";
//样式
import "@/assets/system/homeCss/FeatureBoxCss.css";

</script>

<template>
  <div class="feature-display-container">
    <!-- 标题区域 -->
    <div class="title-section">
      <h2 class="main-title">为什么选择小知智能</h2>
      <p class="subtitle">我们的智能教育方案，为孩子、老师提供全方位的学习支持</p>
    </div>

    <!-- 特性展示区域 -->
    <div class="features-grid">
      <el-card v-for="(feature, index) in features" :key="index" class="feature-card">
        <div class="feature-icon">
          <img :src="feature.icon" alt="图标" class="icon-img">
        </div>
        <h3 class="feature-title">{{ feature.title }}</h3>
        <p class="feature-description">{{ feature.description }}</p>
      </el-card>
    </div>
  </div>
</template>

<style scoped>

</style>
