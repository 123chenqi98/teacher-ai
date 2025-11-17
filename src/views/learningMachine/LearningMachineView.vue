<script setup lang="ts">
import "@/assets/learningMachine/homeCss/LearningMachineHomePageCss.css"
import LearningMachineHomeTopInfoComponent from "@/components/learningMachine/home/LearningMachineHomeTopInfoComponent.vue";
import LearningMachineSideNavigationComponent from "@/components/learningMachine/home/LearningMachineSideNavigationComponent.vue";
import ProductIntroductionComponent from "@/components/learningMachine/home/ProductIntroductionComponent.vue";
import ProductOverviewComponent from "@/components/learningMachine/home/ProductOverviewComponent.vue";
import LearningResourcesComponent from "@/components/learningMachine/home/LearningResourcesComponent.vue";
import CoreAlgorithmModelComponent from "@/components/learningMachine/home/CoreAlgorithmModelComponent.vue";

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
      <div class="learning-machine-home-products-box" >
        <!--产品概况-->
        <product-overview-component/>
        <!--产品介绍-->
        <product-introduction-component/>
        <!--学习资源-->
        <learning-resources-component/>
        <!--核心算法模型-->
        <core-algorithm-model-Component/>
      </div>


    </div>

  </div>

</template>

<style scoped>

</style>
