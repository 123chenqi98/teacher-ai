<script setup lang="ts">
import "@/assets/teacher/homeCss/HomePageCss.css"
import TeacherHomeTopInfoComponent from "@/components/teacher/home/TeacherHomeTopInfoComponent.vue";
import TeacherSideNavigationComponent from "@/components/teacher/home/TeacherSideNavigationComponent.vue";
</script>

<template>
  <div class="teacher-home-box">
    <teacher-home-top-info-component/>
     <div class="teacher-home-content">
       <teacher-side-navigation-component />
       <div class="teacher-home-products-box">
         <router-view />
     </div>
    </div>
  </div>

</template>

<style scoped></style>