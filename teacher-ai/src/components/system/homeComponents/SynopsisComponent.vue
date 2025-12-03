<script setup lang="ts">
import "@/assets/system/homeCss/SynopsisBoxCss.css"
// 导航按钮点击事件
const handleLearnMore = () => {
  console.log('跳转到详情页面')
}

const handleWatchDemo = () => {
  console.log('播放演示视频')
}
</script>

<template>
  <div class="synopsis-container">
    <!-- 左侧内容区域 -->
    <div class="content-left">
      <h1 class="main-title">
        让学习更<span class="highlight">高效</span>，让教育更<span class="highlight">智能</span>
      </h1>
      <p class="description">
        小知智能家教平台，结合人工智能技术，为每个孩子提供个性化学习方案，激发学习兴趣，提升学习效率。
        帮助老师、家长和学生共同打造一个学习平台，实现教育升级。
      </p>
      <div class="button-group">
        <el-button type="primary" @click="handleLearnMore" class="learn-more-btn">
          了解更多
        </el-button>
        <el-button @click="handleWatchDemo" class="watch-demo-btn">
          观看演示
        </el-button>
      </div>
    </div>

    <!-- 右侧图片区域 -->
    <div class="content-right">
      <img src="/src/static/logo.png" alt="小知智能家教平台" class="main-image">
    </div>
  </div>
</template>

<style scoped>

</style>
