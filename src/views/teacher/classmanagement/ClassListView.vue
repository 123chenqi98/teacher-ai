<script setup lang="ts">
import { ref } from 'vue'
import ClassListTableComponent from '@/components/teacher/classmanagement/classList/ClassListTableComponent.vue'
import ClassListAddDialogComponent from '@/components/teacher/classmanagement/classList/ClassListAddDialogComponent.vue'
import ClassStatsOverviewComponent from '@/components/teacher/classmanagement/classList/generalOverview/ClassStatsOverviewComponent.vue'
import AttendanceSummaryComponent from '@/components/teacher/classmanagement/classList/attendance/AttendanceSummaryComponent.vue'
import ScoreSummaryComponent from '@/components/teacher/classmanagement/classList/grade/ScoreSummaryComponent.vue'
import AttendanceTrendChartComponent from '@/components/teacher/classmanagement/classList/attendance/AttendanceTrendChartComponent.vue'
import ScoreTrendChartComponent from '@/components/teacher/classmanagement/classList/grade/ScoreTrendChartComponent.vue'
import TeacherRoleIndicatorComponent from '@/components/teacher/classmanagement/classList/status/TeacherRoleIndicatorComponent.vue'

// 对话框可见性状态
const dialogVisible = ref(false)

// 打开对话框
const handleAddClass = () => {
  dialogVisible.value = true
}
</script>

<template>
  <div class="class-list-container">
    <!-- 班级统计卡片 -->
    <class-stats-overview-component />

    <!-- 出勤概览和成绩概览 -->
    <el-row :gutter="16">
      <el-col :xs="24" :lg="12">
        <attendance-summary-component />
      </el-col>
      <el-col :xs="24" :lg="12">
        <score-summary-component />
      </el-col>
    </el-row>

    <!-- 图表展示 -->
    <el-row :gutter="16" style="margin-bottom: 20px">
      <el-col :xs="24" :lg="12">
        <attendance-trend-chart-component />
      </el-col>
      <el-col :xs="24" :lg="12">
        <score-trend-chart-component />
      </el-col>
    </el-row>

    <!-- 教师身份 -->
    <teacher-role-indicator-component />

    <!-- 班级列表表格组件 -->
    <class-list-table-component @add-click="handleAddClass"/>
    <!-- 新增班级对话框组件 -->
    <class-list-add-dialog-component :visible="dialogVisible" @update:visible="dialogVisible = $event"/>
  </div>
</template>

