<script setup lang="ts">
import "@/assets/user/UserOverallCss.css"
import LeftNavigationComponents from "@/components/user/LeftNavigationComponents.vue";
import TopNavigationComponents from "@/components/user/TopNavigationComponents.vue";
import PersonalInformationComponents from "@/components/user/userProfileComponents/PersonalInformationComponents.vue";
</script>

<template>
  <div class="teacher-dashboard">
    <!-- 左侧导航栏 -->
    <LeftNavigationComponents />
    <main class="main-content-teacher-info">
      <!-- 顶部导航栏 -->
      <TopNavigationComponents />
      <div class="content-area">
        <PersonalInformationComponents />
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>
