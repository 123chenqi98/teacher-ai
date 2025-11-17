<script setup lang="ts">
import "@/assets/learningMachine/homeCss/PopularProductsCss.css";
import { hotProducts } from "@/data/learningMachine/PopularProductsData.ts";
import { ref, onMounted, onUnmounted } from "vue";

// 收集产品卡片 DOM 引用（用于滚动动画）
const productCards = ref<HTMLDivElement[]>([]);

// 滚动监听：卡片进入视口时触发弹出动画（参考教师端交互逻辑，简化判断）
const handleScroll = () => {
  productCards.value.forEach(card => {
    if (!card || card.classList.contains("animate-in")) return;
    const rect = card.getBoundingClientRect();
    // 视口下方100px触发，适配不同屏幕
    if (rect.top < window.innerHeight - 100) {
      card.classList.add("animate-in");
    }
  });
};

// 生命周期管理（参考教师端组件的简洁写法）
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // 初始化检查（已在视口的卡片直接显示）
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  productCards.value = []; // 清空引用，避免内存泄漏
});
</script>

<template>
  <div class="products-section">
    <!-- 标题（沿用你的原样式，结构参考教师端title层级） -->
    <h2 class="section-title">热门产品</h2>

    <!-- 3个独立产品部分（无轮播，垂直排列，对应教师端轮播项） -->
    <div class="products-list">
      <!-- 单个独立产品卡片（参考教师端carousel-item，作为独立容器） -->
      <div
          class="product-card"
          v-for="product in hotProducts.value"
      :key="product.id"
      ref="(el) => el && productCards.push(el)"
      >
      <!-- 产品内部布局（左右排列，参考教师端carousel-item的flex结构） -->
      <div class="product-container">
        <!-- 文字区域（参考教师端content-wrapper，保持文字层级） -->
        <div class="product-info">
          <h3 class="product-name">{{ product.title }}</h3> <!-- 去掉?.，直接绑定（报错更明显） -->
          <p class="product-desc">{{ product.desc }}</p>
          <!-- 按钮（参考教师端custom-button，绑定动态文字） -->
          <button class="product-btn">{{ product.button }}</button>
        </div>

        <!-- 图片区域（参考教师端carousel-image，保持图片展示逻辑） -->
        <div class="product-image-wrapper">
          <img
              :src="product.image || 'src/static/default-product.png'"
              :alt="product.title || '热门产品图片'"
              class="product-image"
              @error="(e: Event) => (e.target as HTMLImageElement).src = 'src/static/default-product.png'"
          >
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>

</style>