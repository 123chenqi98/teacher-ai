<script setup lang="ts">
import "@/assets/teacher/functionCss/AICreativeTeachingCss.css"
import SectionHeaderComponent from "@/components/teacher/SectionHeaderComponent.vue";
import {ElMessage} from "element-plus";
import {aiCreativeTools} from "@/data/teacher/funtion/AICreativeTeachingData.ts";

// 定义查看全部AI工具的处理函数
const ViewAllAITools = () => {
  ElMessage.success('查看全部AI创意教学工具')
}
</script>

<template>
  <!-- AI创意教学容器 -->
  <div class="ai-creative-container">
    <!-- 区间头组件：包含标题"AI创意教学"和"查看全部"按钮 -->
    <section-header-component
        title="AI创意教学"
        titleColor="#40389e"
        @viewAll="ViewAllAITools"
    />
    <!-- AI工具卡片网格容器 -->
    <div class="tools-grid">
      <!-- v-for循环遍历AI创意教学工具数据 -->
      <div
          v-for="(tool) in aiCreativeTools"
          :key="tool.id"
          class="tool-card"
          :style="{ backgroundColor: tool.backgroundColor }"
      >
        <!-- 工具图标容器：圆形背景的icon区域 -->
        <div class="icon-wrapper" :style="{ backgroundColor: tool.iconBackgroundColor }">
          <!-- 工具图标图片 -->
          <img
              :src="tool.icon"
              alt="工具图标"
              class="tool-icon"
          />
        </div>

        <!-- 工具内容区域：包含标题、描述和操作链接 -->
        <div class="tool-content">
          <!-- 工具名称标题 -->
          <h3 class="tool-title">{{ tool.title }}</h3>
          <!-- 工具功能描述 -->
          <p class="tool-description">{{ tool.description }}</p>
          <!-- 立即使用操作链接 -->
          <a href="#" class="use-link">{{ tool.actionText }} →</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
