<script setup lang="ts">
import "@/assets/teacher/functionCss/WelcomeCardCss.css"

/*  按钮配置数组  */
const buttons = [
  { class: 'btn-quick-start', text: '快速开始', href: '#' },
  { class: 'btn-tutorial', text: '观看教程', href: '#' }
]
</script>


<template>
  <div class="function-welcome-container">
    <!-- 欢迎卡片 -->
    <el-card class="welcome-card">
      <!-- 标题：平台名称 -->
      <h2 class="welcome-title">欢迎使用智能教学平台</h2>
      <!-- 副标题：平台功能描述 -->
      <el-text class="welcome-subtitle" size="small">
        高效管理教学流程，智能分析学习数据，助力个性化教学，提升教学质量与效率
      </el-text>
      <!-- 操作按钮区 -->
      <!-- 使用v-for循环渲染 -->
      <el-button
          v-for="button in buttons"
          :key="button.text"
          :class="button.class"
          :href="button.href"
      >
        {{ button.text }}
      </el-button>
    </el-card>
  </div>
</template>

<style scoped>
</style>
