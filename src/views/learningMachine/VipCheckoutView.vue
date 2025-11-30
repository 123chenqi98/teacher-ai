<script setup lang="ts">
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "@/assets/learningMachine/vip/LearningMachineVipCheckoutCss.css"
import {goBack, loadPackageInfo} from "@/utils/learningMachine/VipCheckoutUtils.ts"
import PackageInformationSectionComponent
  from "@/components/learningMachine/vip/checkout/PackageInformationSectionComponent.vue";
import PaymentMethodsSectionComponent
  from "@/components/learningMachine/vip/checkout/PaymentMethodsSectionComponent.vue";
import OrderSummarySectionComponent from "@/components/learningMachine/vip/checkout/OrderSummarySectionComponent.vue";
import UserFormInformationSectionComponent
  from "@/components/learningMachine/vip/checkout/UserFormInformationSectionComponent.vue";
import { onMounted } from "vue";

// 组件挂载时加载套餐信息
onMounted(() => {
  loadPackageInfo();
})
</script>

<template>
  <div class="lm-checkout-container">
    <div class="lm-checkout-header">
      <h1 class="lm-checkout-title">VIP会员开通</h1>
      <el-button 
        class="lm-back-button" 
        @click="goBack"
        type="primary"
        plain
      >
        <el-icon><ElementPlusIconsVue.ArrowLeft /></el-icon>
        返回VIP页面
      </el-button>
    </div>
    <div class="lm-checkout-content">
      <!-- 套餐信息板块 -->
      <PackageInformationSectionComponent/>
      <!-- 用户信息板块 -->
      <UserFormInformationSectionComponent/>
      <!-- 支付方式板块 -->
      <PaymentMethodsSectionComponent/>
      <!-- 订单汇总板块 支付按钮 -->
     <OrderSummarySectionComponent/>
    </div>
  </div>
</template>

<style scoped>

</style>