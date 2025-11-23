<script setup lang="ts">

import {activeTab, currentProduct, initRouteWatcher} from "@/utils/produce/LearningMachineProductDetailUtils.ts";
import {productFeatures, reviews, specifications} from "@/data/learningMachine/LearningMachineProductDetail.ts";

// 初始化路由监听
initRouteWatcher();
</script>

<template>
  <!-- 产品详细信息区 -->
  <div class="lm-product-details-tabs">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="产品详情" name="detail">
        <div class="lm-detail-features">
          <h3>核心功能特性</h3>
          <div class="lm-features-grid">
            <div
                v-for="feature in productFeatures"
                :key="feature.id"
                class="lm-feature-card"
            >
              <h4>{{ feature.title }}</h4>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>

        <div class="lm-detail-description">
          <h3>产品介绍</h3>
          <p>{{ currentProduct.description }}</p>
          <p>这款学习机采用先进的AI技术，能够根据每个学生的学习情况提供个性化的学习路径和内容推荐。内置丰富的教育资源，涵盖小学到高中的全部学科，同步最新教材版本。通过智能分析学生的学习数据，帮助家长和老师更好地了解学生的学习进度和难点。</p>
          <p>设备采用护眼屏幕设计，减少蓝光辐射，保护孩子视力。同时具备家长监控功能，可以实时了解孩子的学习情况，设置学习时间和内容限制，确保孩子健康学习。</p>
        </div>
      </el-tab-pane>

      <el-tab-pane label="规格参数" name="specs">
        <el-descriptions :column="1" border>
          <el-descriptions-item
              v-for="spec in specifications"
              :key="spec.key"
              :label="spec.key"
          >
            {{ spec.value }}
          </el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>

      <el-tab-pane label="用户评价" name="reviews">
        <div class="lm-reviews-container">
          <el-card
              v-for="review in reviews"
              :key="review.id"
              class="lm-review-card"
          >
            <template #header>
              <div class="lm-review-header">
                <span class="lm-review-user">{{ review.userName }}</span>
                <el-rate
                    v-model="review.rating"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}分"
                />
                <span class="lm-review-date">{{ review.date }}</span>
              </div>
            </template>
            <div class="lm-review-content">
              {{ review.content }}
            </div>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>

</style>