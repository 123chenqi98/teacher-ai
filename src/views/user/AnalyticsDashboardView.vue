<script setup>
import LeftNavigationComponents from "@/components/user/LeftNavigationComponents.vue";
import TopNavigationComponents from "@/components/user/TopNavigationComponents.vue";
import "@/assets/user/UserOverallCss.css"
import StatisticsComponent from "@/components/user/analyticsDashboardComponents/StatisticsComponent.vue";
import ChartsComponent from "@/components/user/analyticsDashboardComponents/ChartsComponent.vue";
import "@/assets/user/UserOverallCss.css"
import RankingComponent from "@/components/user/analyticsDashboardComponents/RankingComponent.vue";

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
<!--        统计数据-->
        <StatisticsComponent/>
<!--        图表数据-->
        <ChartsComponent/>
<!--        排行榜-->
        <RankingComponent />

      </div>
    </main>
  </div>
</template>

<style scoped>

</style>
