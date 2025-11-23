<script setup lang="ts">
import { relatedProducts, initRouteWatcher } from "@/utils/produce/LearningMachineProductDetailUtils.ts";
import router from "@/router";
import { useRoute } from "vue-router";

// 初始化路由监听
initRouteWatcher();

const route = useRoute();
</script>

<template>
  <!-- 相关产品推荐 -->
  <div class="lm-related-products">
    <h2>相关产品推荐</h2>
    <div class="lm-related-products-grid">
      <el-card
          v-for="product in relatedProducts"
          :key="product.id"
      >
        <div class="lm-related-product-image">
          <img :src="product.image" :alt="product.name">
          <div v-if="product.isNew" class="lm-related-product-badge">
            <el-tag type="danger">NEW</el-tag>
          </div>
        </div>
        <div class="lm-related-product-info">
          <h4 class="lm-related-product-name">{{ product.name }}</h4>
          <p class="lm-related-product-price">{{ product.price }}</p>
          <el-button
              type="primary"
              size="small"
              @click="router.push({ name: 'learningMachineProductDetail', params: { id: product.id } })"
          >
            查看详情
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>

</style>