<script setup lang="ts">
import "@/assets/learningMachine/homeCss/CoreAlgorithmModelCss.css"
import { coreModels } from "@/data/learningMachine/CoreAlgorithmModel.ts";
import { onMounted, ref } from "vue";

// 控制整个区域的可见状态（初始隐藏，滑入后显示）
const containerVisible = ref(false);

onMounted(() => {
  // 创建Intersection Observer，监听整个卡片容器
  const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 当容器进入视口（可见比例>10%）时，触发滑入动画
          if (entry.isIntersecting) {
            containerVisible.value = true;
            // 只监听一次，避免重复触发
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // 视口交叉比例：10%可见时触发
        rootMargin: "0px 0px 50px 0px" // 提前50px触发，动画更自然
      }
  );

  // 监听卡片网格容器（整个模型区域的核心容器）
  const modelGrid = document.querySelector(".model-grid");
  if (modelGrid) {
    observer.observe(modelGrid);
  }

  // 组件卸载时停止监听，避免内存泄漏
  return () => {
    if (modelGrid) {
      observer.unobserve(modelGrid);
    }
  };
});
</script>

<template>
  <div class="model-container">
    <!-- 头部标题 -->
    <div class="model-header">
      <h2 class="main-title">核心模型/工具</h2>
    </div>

    <!-- 卡片容器：绑定可见状态，控制动画触发 -->
    <div
        class="model-grid"
        :class="{ 'model-grid-visible': containerVisible }"
    >
      <el-row :gutter="24">
        <el-col
            :xs="12"
            :sm="8"
            :md="6"
            :lg="4"
            v-for="(model, index) in coreModels"
            :key="index"
        >
          <el-card class="model-card" shadow="hover">
            <div class="model-number">{{ index + 1 }}</div>
            <h3 class="model-name">{{ model.name }}</h3>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>