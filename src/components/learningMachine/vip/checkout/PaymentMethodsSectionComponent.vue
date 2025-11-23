<script setup lang="ts">

import {paymentMethods} from "@/data/learningMachine/VipCheckoutData.ts";
import {selectedPayment} from "@/utils/learningMachine/VipCheckoutUtils.ts";
</script>

<template>
  <div class="lm-section">
    <h2 class="lm-section-title">支付方式</h2>
    <div class="lm-payment-methods">
      <h3 class="lm-methods-title">选择支付方式</h3>
      <div class="lm-methods-list">
        <div
            v-for="method in paymentMethods"
            :key="method.id"
            :class="['lm-method-item', { 'lm-method-selected': selectedPayment === method.id }]"
            @click="selectedPayment = method.id"
        >
          <span class="lm-method-icon">{{ method.icon }}</span>
          <span class="lm-method-name">{{ method.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>