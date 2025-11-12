<script setup lang="ts">
import "@/assets/teacher/homeCss/HomePageCss.css"
import SynopsisComponent from "@/components/teacher/home/SynopsisComponent.vue";
import TeacherHomeTopInfoComponent from "@/components/teacher/home/TeacherHomeTopInfoComponent.vue";
import TeacherSideNavigationComponent from "@/components/teacher/home/TeacherSideNavigationComponent.vue";
import SynopsisClassComponent from "@/components/teacher/home/SynopsisClassComponent.vue";
import ActivitiesSynopsisComponent from "@/components/teacher/home/ActivitiesSynopsisComponent.vue";
import VipSynopsisComponent from "@/components/teacher/home/VipSynopsisComponent.vue";

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
<!--        简介-->
        <synopsis-component/>
<!--        课程介绍-->
        <synopsis-class-component/>
<!--        活动介绍-->
        <activities-synopsis-component/>
<!--        会员简介-->
        <vip-synopsis-component/>
      </div>


    </div>

  </div>

</template>

<style scoped>

</style>