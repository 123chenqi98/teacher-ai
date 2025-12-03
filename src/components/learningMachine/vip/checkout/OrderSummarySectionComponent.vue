<script setup lang="ts">

import {selectedPackage} from "@/utils/learningMachine/VipCheckoutUtils.ts";
import {Wallet} from "@element-plus/icons-vue";
import {buyVipFormRef} from "@/forms/learningMachine/BuyVipForm.ts";
import {ElMessage} from "element-plus";
import router from "@/router";

// 提交订单
const submitOrder = () => {
  // 给一点延迟确保表单引用已建立
  setTimeout(() => {
    if (!buyVipFormRef.value) {
      console.error('buyVipFormRef is not defined')
      ElMessage.error('系统初始化中，请稍后再试')
      return
    }

    buyVipFormRef.value.validate((valid: boolean) => {
      if (valid) {
        // 模拟提交订单
        ElMessage.success('订单提交成功，正在跳转支付页面...')
        // 这里可以调用支付接口
        setTimeout(() => {
          ElMessage.success('支付成功！VIP权益已开通')
          router.push('/learningMachine/vip').then()
        }, 2000)
      } else {
        ElMessage.error('请完善个人信息')
        return false
      }
    })
  }, 100)
}
</script>

<template>
  <div class="lm-section">
    <h2 class="lm-section-title">订单汇总</h2>
    <div class="lm-order-summary">
      <h3 class="lm-summary-title">费用明细</h3>
      <div class="lm-summary-content">
        <div class="lm-summary-item">
          <span>套餐费用</span>
          <span>¥{{ selectedPackage.price }}</span>
        </div>
        <div class="lm-summary-item">
          <span>优惠金额</span>
          <span>-¥{{ (Number(selectedPackage.originalPrice) - Number(selectedPackage.price)).toFixed(1) }}</span>
        </div>
        <div class="lm-summary-total">
          <span>总计</span>
          <span class="lm-total-price">¥{{ selectedPackage.price }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="lm-pay-button-container">
    <el-button class="lm-pay-button" type="primary" @click="submitOrder" size="large">
      <el-icon><Wallet /></el-icon>
      立即支付 ¥{{ selectedPackage.price }}
    </el-button>
  </div>
</template>

<style scoped>

</style>