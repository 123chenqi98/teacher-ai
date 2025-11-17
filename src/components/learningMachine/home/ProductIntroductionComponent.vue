<script setup lang="ts">
import "@/assets/learningMachine/homeCss/PopularProductsCss.css";
import { hotProducts } from "@/data/learningMachine/PopularProductsData.ts";
import HotProductCard from "./HotProductCard.vue";
</script>

<template>
  <div class="products-section">
    <h2 class="section-title">热门产品</h2>

    <div class="products-list">
      <HotProductCard
          v-for="product in hotProducts"
          :key="product.id"
          :product="product"
      />
    </div>
  </div>
</template>

<style scoped>

</style>