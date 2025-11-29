<script setup>
import LeftNavigationComponents from "@/components/user/LeftNavigationComponents.vue";
import TopNavigationComponents from "@/components/user/TopNavigationComponents.vue";
import "@/assets/user/UserOverallCss.css"
</script>

<template>
  <div class="teacher-dashboard">
    <!-- 左侧导航栏-->
    <LeftNavigationComponents />
    <main class="main-content-teacher-info">
      <!-- 顶部导航栏 -->
      <TopNavigationComponents />
      <div class="content-area">

      </div>
    </main>
  </div>
</template>

<style scoped>

</style>