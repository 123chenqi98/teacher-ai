<script setup lang="ts">
// 产品中心页面组件
import "@/assets/learningMachine/produce/LearningMachineProductCenterCss.css"
import ProductCenterMainComponent from "@/components/learningMachine/produce/ProductCenterMainComponent.vue";
import LearningMachineHomeTopInfoComponent
  from "@/components/learningMachine/home/LearningMachineHomeTopInfoComponent.vue";
import LearningMachineSideNavigationComponent
  from "@/components/learningMachine/home/LearningMachineSideNavigationComponent.vue";
</script>

<template>
  <div class="learning-machine-home-box">
    <!--顶部信息-->
    <learning-machine-home-top-info-component/>
    <!-- 内容框-->
    <div class="learning-machine-home-content">
      <!--侧边栏导航-->
      <learning-machine-side-navigation-component/>
      <!--内容展示-->
      <div class="learning-machine-home-products-box">
        <!--产品中心主要内容-->
        <product-center-main-component/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.learning-machine-home-content {
  display: flex;
  flex-direction: row;
  gap: 28px;
  padding: 25px;
  flex: 1;
  height: calc(100vh - 200px);
}

.learning-machine-home-products-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 35px;
  height: 100%;
}
</style>