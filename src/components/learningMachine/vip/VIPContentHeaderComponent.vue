<script setup lang="ts">
import {promotion} from "@/data/learningMachine/VipContentData.ts";
import {Box} from "@element-plus/icons-vue";
</script>

<template>
  <div class="lm-vip-header">
    <div class="lm-badge">
      <el-icon :size="20">
        <Box/>
      </el-icon>
      <span>会员专享</span>
    </div>
    <h1 class="lm-vip-title">学习机VIP会员</h1>
    <p class="lm-vip-subtitle">解锁全部功能，畅享智能学习体验，助力学业全面提升</p>

    <div class="lm-stats">
      <div class="lm-stat-item">
        <span class="lm-stat-number">50000+</span>
        <span class="lm-stat-label">VIP用户</span>
      </div>
      <div class="lm-stat-item">
        <span class="lm-stat-number">98%</span>
        <span class="lm-stat-label">满意度</span>
      </div>
      <div class="lm-stat-item">
        <span class="lm-stat-number">2000+</span>
        <span class="lm-stat-label">精品课程</span>
      </div>
    </div>
  </div>

  <!-- 限时优惠横幅 -->
  <div v-if="promotion.active" class="lm-promotion-banner">
    <div class="lm-promotion-content">
      <div class="lm-promotion-text">
        <h3>{{ promotion.title }}</h3>
        <p>{{ promotion.description }}</p>
      </div>
      <div class="lm-promotion-countdown">
        <span>距离活动结束还剩:</span>
        <span class="lm-countdown-time">{{ promotion.countdown }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>