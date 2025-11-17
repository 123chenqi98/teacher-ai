<script setup lang="ts">
import "@/assets/teacher/homeCss/HomePageCss.css"
import TeacherSideNavigationComponent from "@/components/teacher/home/TeacherSideNavigationComponent.vue";
import TeacherHomeTopInfoComponent from "@/components/teacher/home/TeacherHomeTopInfoComponent.vue";
import WelcomeCardComponent from "@/components/teacher/function/WelcomeCardComponent.vue";
</script>

<template>
  <div class="teacher-home-box">
    <!--    顶部信息-->
    <teacher-home-top-info-component/>
    <div class="teacher-home-content">
      <!--    侧边栏导航-->
      <teacher-side-navigation-component/>
      <!--    功能选择区展示 -->
      <!--    欢迎卡片 -->
      <welcome-card-component/>

    </div>

  </div>
</template>

<style scoped>

</style>