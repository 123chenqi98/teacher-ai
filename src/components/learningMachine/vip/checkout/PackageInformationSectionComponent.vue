<script setup lang="ts">
import {loadPackageInfo, selectedPackage} from "@/utils/learningMachine/VipCheckoutUtils.ts";
import {Check} from "@element-plus/icons-vue";
import { onMounted } from 'vue';

// 确保在组件挂载时加载套餐信息
onMounted(() => {
  loadPackageInfo();
});
</script>

<template>
  <div class="lm-section">
    <h2 class="lm-section-title">套餐信息</h2>
    <div class="lm-package-summary" :style="{ background: selectedPackage.backgroundColor }">
      <h3 class="lm-package-name">{{ selectedPackage.name }}</h3>
      <div class="lm-package-price-info">
        <span class="lm-original-price">¥{{ selectedPackage.originalPrice }}</span>
        <span class="lm-current-price">¥{{ selectedPackage.price }}</span>
        <span class="lm-period">/{{ selectedPackage.period }}</span>
      </div>
    </div>

    <div class="lm-package-features">
      <h3 class="lm-features-title">套餐权益</h3>
      <ul class="lm-features-list">
        <li v-for="(feature, index) in selectedPackage.features" :key="index" class="lm-feature-item">
          <el-icon color="#67c23a"><Check /></el-icon>
          <span>{{ feature }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>