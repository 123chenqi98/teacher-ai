<script setup lang="ts">
import { ref } from 'vue'
import "@/assets/learningMachine/homeCss/ProductOverviewCss.css"
import { carouselItems } from "@/data/learningMachine/ProductOverviewData.ts";

// 当前轮播项索引（保留，不影响功能，如需隐藏指示器可后续调整）
const currentIndex = ref(0)

// 处理轮播切换（保留，与索引联动）
const handleCarouselChange = (index: number) => {
  currentIndex.value = index
}
</script>

<template>
  <div class="carousel-container">
    <!-- 走马灯组件：保持原有配置，仅修改轮播项内容 -->
    <el-carousel
        :interval="3000"
        arrow="always"
        indicator-position=""
        @change="handleCarouselChange"
    >
      <el-carousel-item v-for="(item) in carouselItems" :key="item.id">
        <div class="carousel-item">
          <!-- 仅保留图片标签，删除 content-wrapper 及内部文字、按钮 -->
          <img :src="item.image" alt="轮播图" class="carousel-image">
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>

</style>