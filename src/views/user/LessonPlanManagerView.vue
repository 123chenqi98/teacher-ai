<script setup>
import LeftNavigationComponents from "@/components/user/LeftNavigationComponents.vue";
import TopNavigationComponents from "@/components/user/TopNavigationComponents.vue";
import "@/assets/user/UserOverallCss.css"
import DataStatisticsComponents from "@/components/user/lessonPlanManagerComponents/DataStatisticsComponents.vue";
import LessonListComponents from "@/components/user/lessonPlanManagerComponents/LessonListComponents.vue";
</script>

<template>
  <div class="teacher-dashboard">
    <!-- 左侧导航栏-->
    <LeftNavigationComponents />
    <main class="main-content-teacher-info">
      <!-- 顶部导航栏 -->
      <TopNavigationComponents />
      <div class="content-area">
        <!-- 数据统计卡片 -->
        <DataStatisticsComponents />
        <!-- 课程列表卡片 -->
        <LessonListComponents />
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>