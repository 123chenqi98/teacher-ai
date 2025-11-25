<script setup>
import LeftNavigationComponents from "@/components/user/LeftNavigationComponents.vue";
import TopNavigationComponents from "@/components/user/TopNavigationComponents.vue";
import "@/assets/user/UserOverallCss.css"
import "@/assets/user/UserOverallCss.css"
import HeaderStatComponent from "@/components/user/goalManagementComponents/HeaderStatComponent.vue";
import DataSheetComponent from "@/components/user/goalManagementComponents/DataSheetComponent.vue";
import TargetInfoComponent from "@/components/user/goalManagementComponents/TargetInfoComponent.vue";
import TargetEditDialogComponent from "@/components/user/goalManagementComponents/TargetEditDialogComponent.vue";
import KeyResultEditDialogComponent from "@/components/user/goalManagementComponents/KeyResultEditDialogComponent.vue";

</script>

<template>
  <div class="teacher-dashboard">
    <!-- 左侧导航栏 -->
    <LeftNavigationComponents />
    <main class="main-content-teacher-info">
      <!-- 顶部导航栏 -->
      <TopNavigationComponents />
      <!-- 内容区域 -->
      <div class="content-area">
        <!-- 头部信息 -->
        <HeaderStatComponent />
        <!-- 表格 -->
        <TargetInfoComponent />
        <!-- 统计数据 -->
        <DataSheetComponent />
        <!-- 对话框 -->
        <TargetEditDialogComponent />
        <KeyResultEditDialogComponent />
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>
