<script setup>
import LeftNavigationComponents from "@/components/user/LeftNavigationComponents.vue";
import PerformanceDashboardComponents from "@/components/user/userDashboardComponents/PerformanceDashboardComponents.vue";
import DataOverviewComponents from "@/components/user/userDashboardComponents/DataOverviewComponents.vue";
import RecentActivitiesComponents from "@/components/user/userDashboardComponents/RecentActivitiesComponents.vue";
import PersonalizedSettingsComponents from "@/components/user/userDashboardComponents/PersonalizedSettingsComponents.vue";
import CollectionOverviewComponents from "@/components/user/userDashboardComponents/CollectionOverviewComponents.vue";
import TodoListComponents from "@/components/user/userDashboardComponents/TodoListComponents.vue";
import TrendChartComponents from "@/components/user/userDashboardComponents/TrendChartComponents.vue";
import "@/assets/user/UserOverallCss.css"
import TopNavigationComponents from "@/components/user/TopNavigationComponents.vue";

</script>

<template>
  <div class="teacher-dashboard">
    <!-- 左侧导航栏-->
    <LeftNavigationComponents />
    <main class="main-content-teacher-info">
      <!-- 顶部导航栏 -->
      <TopNavigationComponents />
      <div class="content-area">
        <!-- 教师效能仪表盘组件 -->
        <performance-dashboard-components/>
        <!-- 本周数据概览组件 -->
        <data-overview-components/>
        <!-- 第一行：近期操作历史 + 个性化设置 -->
        <el-row :gutter="20" class="dashboard-row">
          <el-col :span="12">
            <recent-activities-components/>
          </el-col>
          <el-col :span="12">
            <personalized-settings-components/>
          </el-col>
        </el-row>

        <!-- 第二行：收藏概览 + 待办任务 -->
        <el-row :gutter="20" class="dashboard-row mt-4">
          <el-col :span="12">
            <collection-overview-components/>
          </el-col>
          <el-col :span="12">
            <todo-list-components/>
          </el-col>
        </el-row>
        <!-- 本月平台使用趋势组件 -->
        <trend-chart-components/>
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>