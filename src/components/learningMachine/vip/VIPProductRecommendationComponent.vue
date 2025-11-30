<script setup lang="ts">

import {goToProducts} from "@/utils/learningMachine/VipContentUtils.ts";
import {ArrowRight, StarFilled} from "@element-plus/icons-vue";
</script>

<template>
  <div class="lm-section">
    <h2 class="lm-section-title">
      <el-icon>
        <StarFilled />
      </el-icon>
      热门产品推荐
    </h2>
    <div class="lm-product-recommendation">
      <el-alert
          title="VIP会员专享更多产品优惠"
          type="success"
          description="开通VIP会员可享受产品中心所有商品额外9折优惠"
          show-icon
          class="lm-product-alert"
          disabled="disabled"
      >
        <template #title>
          <strong>VIP会员专享更多产品优惠</strong>
        </template>
      </el-alert>

      <div class="lm-action-button">
        <el-button type="primary" @click="goToProducts">
          前往产品中心
          <el-icon>
            <ArrowRight />
          </el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>