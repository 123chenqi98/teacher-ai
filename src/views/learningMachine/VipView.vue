<script setup lang="ts">
import "@/assets/learningMachine/vip/LearningMachineVipCss.css"
import LearningMachineSideNavigationComponent
  from "@/components/learningMachine/home/LearningMachineSideNavigationComponent.vue"
import TopInformationComponent from "@/components/system/homeComponents/TopInformationComponent.vue"
import { onMounted } from "vue"
import {
  promotion,

} from "@/data/learningMachine/VipContentData.ts";
import {
  updateCountdown,
} from "@/utils/learningMachine/VipContentUtils.ts";
import VIPContentHeaderComponent from "@/components/learningMachine/vip/VIPContentHeaderComponent.vue";
import VIPPackageSelectionComponent from "@/components/learningMachine/vip/VIPPackageSelectionComponent.vue";
import VIPMemberGrowthSystemComponent from "@/components/learningMachine/vip/VIPMemberGrowthSystemComponent.vue";
import VIPPrivilegesIntroductionComponent
  from "@/components/learningMachine/vip/VIPPrivilegesIntroductionComponent.vue";
import VIPExclusiveEventsComponent from "@/components/learningMachine/vip/VIPExclusiveEventsComponent.vue";
import VIPProductRecommendationComponent from "@/components/learningMachine/vip/VIPProductRecommendationComponent.vue";
import VIPUserTestimonialsComponent from "@/components/learningMachine/vip/VIPUserTestimonialsComponent.vue";
import VIPFAQComponent from "@/components/learningMachine/vip/VIPFAQComponent.vue";

// 页面加载时的动画效果
onMounted(() => {
  const cards = document.querySelectorAll('.lm-vip-package-card')
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('lm-card-enter')
    }, 150 * index)
  })

  // 如果有活动，启动倒计时
  if (promotion.active) {
    updateCountdown()
    setInterval(updateCountdown, 1000)
  }
})
</script>

<template>
  <div class="learning-machine-home-box">
    <!--顶部信息-->
    <TopInformationComponent/>
    <!-- 内容框-->
    <div class="learning-machine-home-content">
      <!--侧边栏导航-->
      <learning-machine-side-navigation-component/>
      <!--内容展示-->
      <div class="learning-machine-home-products-box">
        <!--VIP页面主要内容-->
        <div class="lm-vip-container">
          <!-- 页面标题 -->
          <VIPContentHeaderComponent/>
          <!-- VIP套餐选择 -->
          <VIPPackageSelectionComponent/>
          <!-- 会员成长体系 -->
          <VIPMemberGrowthSystemComponent/>
          <!-- VIP特权介绍 -->
          <VIPPrivilegesIntroductionComponent/>
          <!-- VIP专属活动 -->
          <VIPExclusiveEventsComponent/>
          <!-- 产品推荐 -->
          <VIPProductRecommendationComponent/>
          <!-- 用户评价 -->
          <VIPUserTestimonialsComponent/>
          <!-- 常见问题 -->
          <VIPFAQComponent/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>