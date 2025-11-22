<script setup lang="ts">
import "@/assets/teacher/homeCss/HomePageCss.css"
import TeacherSideNavigationComponent from "@/components/teacher/home/TeacherSideNavigationComponent.vue";
import TeacherHomeTopInfoComponent from "@/components/teacher/home/TeacherHomeTopInfoComponent.vue";
import WelcomeCardComponent from "@/components/teacher/function/WelcomeCardComponent.vue";
import PopularApplicationComponent from "@/components/teacher/function/PopularApplicationComponent.vue";
import TeachingPrepareComponent from "@/components/teacher/function/TeachingPrepareComponent.vue";
import GradingAreaComponent from "@/components/teacher/function/GradingAreaComponent.vue";
import AICreativeTeachingComponent from "@/components/teacher/function/AICreativeTeachingComponent.vue";
</script>

<template>
  <div class="teacher-home-box">
    <!--    顶部信息-->
    <teacher-home-top-info-component/>
    <div class="teacher-home-content">
      <!--    侧边栏导航-->
      <teacher-side-navigation-component/>
      <!--    功能选择区展示，卡片区域 -->
      <div class="teacher-home-products-box">
      <!--    欢迎卡片 -->
      <welcome-card-component/>
      <!--    热门应用卡片 -->
      <popular-application-component/>
      <!--    备课专区卡片 -->
      <teaching-prepare-component/>
      <!--    批改专区卡片 -->
      <grading-area-component/>
        <!--  AI创意教学专区卡片 -->
        <a-i-creative-teaching-component/>

      </div>
    </div>

  </div>
</template>

<style scoped>

</style>