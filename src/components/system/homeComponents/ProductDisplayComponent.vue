<script setup lang="ts">
import "@/assets/system/homeCss/ProductDisplayCss.css"
// 查看更多按钮点击事件
const handleViewMore = () => {
  console.log('跳转到产品详情页面')
}
</script>

<template>
  <div class="product-display-container">
    <!-- 标题区域 -->
    <div class="title-section">
      <h2 class="main-title">智能学习展示</h2>
      <p class="subtitle">探索我们精心设计的智能学习空间，为孩子、老师创造最佳的学习体验和教师工具</p>
    </div>

    <!-- 产品展示网格 -->
    <div class="product-grid">
      <!-- 使用 el-card 组件展示产品 -->
      <el-card v-for="index in 12" :key="index" class="product-card">
        <img src="@/static/logo.png" alt="智能学习环境" class="product-image">
        <div class="product-overlay">
          <span >智能学习环境</span>
        </div>
      </el-card>
    </div>

    <!-- 查看更多按钮 -->
    <div class="view-more-section">
      <el-button @click="handleViewMore" class="view-more-btn">
        查看更多
      </el-button>
    </div>
  </div>
</template>

<style scoped>

</style>
