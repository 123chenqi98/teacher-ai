<script setup lang="ts">
import "@/assets/learningMachine/produce/LearningMachineProductDetailCss.css";
import {goBack} from "@/utils/produce/LearningMachineProductDetailUtils.ts";
import ProductDetailsBodyComponent from "@/components/learningMachine/produce/ProductDetailsBodyComponent.vue";
import ProductDetailsAreaComponent from "@/components/learningMachine/produce/ProductDetailsAreaComponent.vue";
import RelatedProductRecommendationsComponent
  from "@/components/learningMachine/produce/RelatedProductRecommendationsComponent.vue";
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
      <ProductDetailsBodyComponent/>

    <!-- 产品详细信息区 -->
    <product-details-area-component/>

    <!-- 相关产品推荐 -->
    <RelatedProductRecommendationsComponent/>
  </div>
</template>

<style scoped>
/* 局部样式 */
</style>