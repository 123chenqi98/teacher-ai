<script setup>
import LeftNavigationComponents from "@/components/user/LeftNavigationComponents.vue";
import TopNavigationComponents from "@/components/user/TopNavigationComponents.vue";
import PersonalInformationComponents from "@/components/user/userProfileComponents/PersonalInformationComponents.vue";
import AccountSecurityComponents from "@/components/user/userProfileComponents/AccountSecurityComponents.vue";
import LoginLogComponents from "@/components/user/userProfileComponents/LoginLogComponents.vue";
import { activeTab } from "@/data/user/userProfileData/PersonalInformationData.ts";
import { headerTitle, headerSubtitle } from "@/data/user/userProfileData/PersonalInformationData.ts";
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
        <!-- 标题与横线，分离并置于卡片上方，三个标签页均显示 -->
        <div class="page-title">
          <h1 class="el-title el-title--large">{{ headerTitle }}</h1>
          <p class="el-text el-text--secondary">{{ headerSubtitle }}</p>
        </div>
        <el-divider />
        <el-card shadow="hover" class="profile-card-container">
          <template #header>
            <el-tabs v-model="activeTab" type="card" class="tabs-inside">
              <el-tab-pane label="个人资料" name="profile" />
              <el-tab-pane label="账号安全" name="security" />
              <el-tab-pane label="登录日志" name="login-log" />
            </el-tabs>
          </template>
          <PersonalInformationComponents v-if="activeTab === 'profile'" />
          <AccountSecurityComponents v-else-if="activeTab === 'security'" />
          <LoginLogComponents v-else />
        </el-card>
      </div>
    </main>
  </div>
</template>

<style scoped>
.profile-card-container :deep(.el-card__header) {
  padding: 0;
  border-bottom: none; /* 移除卡片头部底部边线 */
}
.tabs-inside {
  margin: 0;
}
/* 移除卡片样式下的 tabs 组件下边线（card 类型）*/
.profile-card-container :deep(.el-tabs--card .el-tabs__header) {
  border-bottom: none;
}
</style>
