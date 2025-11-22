<script setup lang="ts">
import "@/assets/teacher/homeCss/HomePageCss.css"
import TeacherHomeTopInfoComponent from "@/components/teacher/home/TeacherHomeTopInfoComponent.vue";
import TeacherSideNavigationComponent from "@/components/teacher/home/TeacherSideNavigationComponent.vue";
</script>

<template>
  <div class="teacher-home-box">
    <!--    顶部信息-->
    <teacher-home-top-info-component/>
    <!--    内容框-->
    <div class="teacher-home-content">
      <!--    侧边栏导航-->
      <teacher-side-navigation-component/>
      <!--    内容展示-->
      <div class="teacher-home-products-box" >
<!--         上传页面-->
        <router-view />
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>