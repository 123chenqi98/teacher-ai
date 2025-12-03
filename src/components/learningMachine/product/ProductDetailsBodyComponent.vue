<script setup lang="ts">
import {addToCart, buyNow, currentProduct, initRouteWatcher, quantity, selectThumbnail} from "@/utils/product/LearningMachineProductDetailUtils.ts";

// 初始化路由监听
initRouteWatcher();
</script>

<template>
  <!-- 产品详情主体 -->
  <div class="lm-product-detail-container">
    <!-- 产品图片展示区 -->
    <div class="lm-product-image-section">
      <div class="lm-main-image">
        <img :src="currentProduct.image" :alt="currentProduct.name" class="lm-product-main-image">
      </div>
      <div class="lm-thumbnail-images">
        <div
            class="lm-thumbnail-item active"
            v-for="(thumb, index) in [currentProduct.image, '/src/static/logo.png', '/src/static/logo.png', '/src/static/logo.png']"
            :key="index"
            @click="selectThumbnail(index)"
        >
          <img :src="thumb" :alt="`产品细节图${index + 1}`">
        </div>
      </div>
    </div>

    <!-- 产品信息区 -->
    <div class="lm-product-info-section">
      <h1 class="lm-product-detail-title">{{ currentProduct.name }}</h1>
      <p class="lm-product-detail-description">{{ currentProduct.description }}</p>

      <div class="lm-product-price-section">
        <span class="lm-current-price">{{ currentProduct.price }}</span>
        <span class="lm-original-price">¥3999.00</span>
      </div>

      <div class="lm-product-tags">
        <el-tag v-if="currentProduct.isNew" class="lm-tag-new" type="danger">新品</el-tag>
        <el-tag class="lm-tag-discount" type="primary">限时优惠</el-tag>
      </div>

      <div class="lm-product-actions-detail">
        <div class="lm-quantity-selector">
          <el-input-number v-model="quantity" :min="1" :max="99" size="large" class="lm-quantity-input"/>
        </div>
        <el-button type="primary" class="lm-add-to-cart-btn" @click="addToCart">
          加入购物车
        </el-button>
        <el-button type="primary" class="lm-buy-now-btn" @click="buyNow">
          立即购买
        </el-button>
      </div>

      <div class="lm-product-guarantee">
        <span class="lm-guarantee-item">✓ 正品保证</span>
        <span class="lm-guarantee-item">✓ 7天无理由退货</span>
        <span class="lm-guarantee-item">✓ 满99元包邮</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>