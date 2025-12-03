<script setup lang="ts">
import { ref } from 'vue'
import "@/assets/teacher/homeCss/SynopsisComponentCss.css"
import {carouselItems} from "@/data/teacher/SynopsisData.ts";


// 当前轮播项索引
const currentIndex = ref(0)

// 处理轮播切换
const handleCarouselChange = (index: number) => {
  currentIndex.value = index
}
</script>

<template>
  <div class="carousel-container">
    <!-- 走马灯组件 -->
    <el-carousel
        :interval="3000"
        arrow="always"
        indicator-position=""
        @change="handleCarouselChange"
    >
      <el-carousel-item v-for="(item) in carouselItems" :key="item.id">
        <div class="carousel-item">
          <img :src="item.image" alt="轮播图" class="carousel-image">
          <div class="content-wrapper">
            <h1 class="title">{{ item.title }}</h1>
            <p class="subtitle">{{ item.subtitle }}</p>
            <button class="custom-button">{{ item.button }}</button>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>

</style>
