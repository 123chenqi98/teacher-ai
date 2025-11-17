<script setup>
import LeftNavigationComponents from "@/components/user/LeftNavigationComponents.vue";
import TopNavigationComponents from "@/components/user/TopNavigationComponents.vue";
import PersonalInformationComponents from "@/components/user/userProfileComponents/PersonalInformationComponents.vue";
import AccountSecurityComponents from "@/components/user/userProfileComponents/AccountSecurityComponents.vue";
import LoginLogComponents from "@/components/user/userProfileComponents/LoginLogComponents.vue";
import "@/assets/user/UserOverallCss.css"



</script>

<template>
  <div class="teacher-dashboard">
    <!-- 左侧导航栏 -->
    <LeftNavigationComponents />
    <main class="main-content">
      <!-- 顶部导航栏 -->
      <TopNavigationComponents />
      <!-- 内容区域 -->
      <div class="content-area">
        <PersonalInformationComponents />
        <AccountSecurityComponents />
        <LoginLogComponents />
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>
