<script setup lang="ts">
import "@/assets/teacher/homeCss/VipSynopsisComponentCss.css"
import { benefits, feedbacks, priceInfo } from "@/data/teacher/SynopsisVipData.ts"
</script>

<template>
  <div class="vip-synopsis-container">
    <!-- 会员专享标题 -->
    <div class="vip-title">
      <h2>会员专享</h2>
    </div>

    <div class="cards-container">
      <!-- 会员权益卡片 -->
      <el-card class="vip-benefit-card">
        <h3>会员权益</h3>
        <ul class="benefit-list">
          <li v-for="item in benefits" :key="item.text">{{ item.text }}</li>
        </ul>
      </el-card>

      <!-- 年度会员卡片 -->
      <el-card class="vip-price-card" body-style="padding: 24px;">
        <div class="price-header">
          <h3>{{ priceInfo.title }}</h3>
          <div class="price-info">
            <div class="current-price">{{ priceInfo.currentPrice }}</div>
            <div class="original-price">{{ priceInfo.originalPrice }}</div>
          </div>
        </div>
<!--        内容-->
        <div class="features-list">
          <p v-for="feature in priceInfo.features" :key="feature">{{ feature }}</p>
        </div>

        <el-button type="primary" class="activate-btn">{{ priceInfo.buttonText }}</el-button>
      </el-card>

      <!-- 会员反馈卡片 -->
      <el-card class="vip-feedback-card">
        <h3>会员反馈</h3>
        <div class="feedback-list">
          <div v-for="(item, index) in feedbacks" :key="index" class="feedback-item">
            <div class="user-info">
              <span class="user-name">{{ item.name }}</span>
              <span class="membership-duration">{{ item.duration }}</span>
            </div>
<!--            卡便内容-->
            <p class="feedback-content">{{ item.content }}</p>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>

</style>
