<script setup lang="ts">
// 样式
import "@/assets/system/homeCss/homeBoxCss.css"
//顶部信息组件
import TopInformationComponent from "@/components/system/homeComponents/TopInformationComponent.vue";
import SynopsisComponent from "@/components/system/homeComponents/SynopsisComponent.vue";
import ProductDisplayComponent from "@/components/system/homeComponents/ProductDisplayComponent.vue";
import FeatureDisplayComponent from "@/components/system/homeComponents/FeatureDisplayComponent.vue";
</script>

<template>
  <div class="homeBox">
    <!-- 顶部信息 -->
    <top-information-component/>
    <!-- 简介信息 -->
    <synopsis-component/>
    <!-- 产品展示 -->
    <product-display-component/>
    <!-- 功能介绍区 -->
    <feature-display-component/>
  </div>

</template>

<style scoped>

</style>