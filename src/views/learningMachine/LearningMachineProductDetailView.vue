<script setup lang="ts">
import "@/assets/learningMachine/product/LearningMachineProductDetailCss.css";
import {goBack} from "@/utils/product/LearningMachineProductDetailUtils.ts";
import ProductDetailsBodyComponent from "@/components/learningMachine/product/ProductDetailsBodyComponent.vue";
import ProductDetailsAreaComponent from "@/components/learningMachine/product/ProductDetailsAreaComponent.vue";
import RelatedProductRecommendationsComponent from "@/components/learningMachine/product/RelatedProductRecommendationsComponent.vue";
</script>

<template>
  <div class="lm-product-detail-wrapper">
    <!-- 返回按钮 -->
    <div class="lm-product-detail-back">
      <el-button @click="goBack" class="lm-back-button">
        ← 返回产品中心
      </el-button>
    </div>

    <!-- 产品详情主体 -->
    <product-details-body-component/>

    <!-- 产品详细信息区 -->
    <product-details-area-component/>

    <!-- 相关产品推荐 -->
    <related-product-recommendations-component/>
  </div>
</template>

<style scoped>
/* 局部样式 */
</style>