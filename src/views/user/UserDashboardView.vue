<script setup lang="ts">
import LeftNavigationComponents from "@/components/user/LeftNavigationComponents.vue";
import TopNavigationComponents from "@/components/user/TopNavigationComponents.vue";
import "@/assets/user/UserDashboardCss.css"

</script>

<template>
  <div class="teacher-dashboard">
    <LeftNavigationComponents />
    <main class="main-content">
      <TopNavigationComponents />
    </main>
  </div>

</template>

<style scoped>
/* 右侧主内容区 */
.main-content {
  flex: 1;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
}
</style>