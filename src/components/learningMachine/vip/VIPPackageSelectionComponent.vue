<script setup lang="ts">

import {vipPackages} from "@/data/learningMachine/VipContentData.ts";
import {purchaseVip, selectedPackage} from "@/utils/learningMachine/VipContentUtils.ts";
import {Check, Discount, Service, StarFilled} from "@element-plus/icons-vue";
</script>

<template>
  <div class="lm-section">
    <h2 class="lm-section-title">
      <el-icon>
        <StarFilled />
      </el-icon>
      VIP套餐选择
    </h2>
    <div class="lm-vip-packages">
      <el-row :gutter="20">
        <el-col v-for="pkg in vipPackages" :key="pkg.id" :xs="24" :sm="12" :md="8">
          <div
              :class="['lm-vip-package-card', { 'lm-popular': pkg.popular, 'lm-card-enter': false }]"
              :style="{ background: pkg.backgroundColor }"
              @click="purchaseVip(pkg.id)"
          >
            <div v-if="pkg.popular" class="lm-popular-tag">
              <el-icon>
                <StarFilled />
              </el-icon>
              <span>最受欢迎</span>
            </div>

            <div class="lm-package-header">
              <h3 class="lm-package-name">{{ pkg.name }}</h3>
              <div class="lm-price-section">
                <span class="lm-original-price">¥{{ pkg.originalPrice }}</span>
                <span class="lm-current-price">¥{{ pkg.price }}</span>
                <span class="lm-period">/{{ pkg.period }}</span>
              </div>
            </div>

            <ul class="lm-package-features">
              <li v-for="(feature, index) in pkg.features" :key="index" class="lm-feature-item">
                <el-icon color="#67c23a">
                  <Check />
                </el-icon>
                <span>{{ feature }}</span>
              </li>
            </ul>

            <el-button
                :type="pkg.popular ? 'primary' : 'default'"
                class="lm-buy-button"
                :class="{ 'lm-selected': selectedPackage === pkg.id }"
                @click.stop="purchaseVip(pkg.id)"
            >
              {{ selectedPackage === pkg.id ? '当前选择' : '立即开通' }}
            </el-button>
          </div>
        </el-col>
      </el-row>

      <div class="lm-security-tips">
        <el-icon color="#67c23a">
          <Check />
        </el-icon>
        <span>安全支付保障</span>
        <el-icon color="#409eff">
          <Service />
        </el-icon>
        <span>随时取消订阅</span>
        <el-icon color="#e6a23c">
          <Discount />
        </el-icon>
        <span>不满意7天退款</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>