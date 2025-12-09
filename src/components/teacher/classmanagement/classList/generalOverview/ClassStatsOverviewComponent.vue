<script setup lang="ts">
import '@/assets/teacher/classmanagementCss/ClassListCss.css'
import '@/assets/teacher/classmanagementCss/classList/ClassListCommonCss.css'
import '@/assets/teacher/classmanagementCss/classList/ClassStatsOverviewCss.css'
import { classListStatic } from '@/data/teacher/classmanagement/ClassListData'
import { statsCardConfig } from '@/data/teacher/classmanagement/ClassStatsOverviewData'
import { computed } from 'vue'
import StatCardComponent from './StatCardComponent.vue'

// 计算统计数据
const stats = computed(() => {
  const totalClasses = classListStatic.length
  const totalStudents = classListStatic.reduce((sum, cls) => sum + cls.studentCount, 0)
  const avgStudentPerClass = Math.round(totalStudents / totalClasses)
  const activeClasses = classListStatic.filter(cls => cls.status === '正常').length

  return {
    totalClasses,
    totalStudents,
    avgStudentPerClass,
    activeClasses
  }
})

// 获取某个统计项的值
const getStatValue = (dataKey: keyof typeof stats.value): string | number => {
  return stats.value[dataKey]
}
</script>

<template>
  <div class="class-stats-overview">
    <el-row :gutter="16" class="stats-grid">
      <el-col
        v-for="card in statsCardConfig"
        :key="card.key"
        :xs="24"
        :sm="12"
        :md="6"
      >
        <stat-card-component
          :label="card.label"
          :value="getStatValue(card.dataKey)"
          :unit="card.unit"
          :icon="card.icon"
          :icon-color="card.iconColor"
        />
      </el-col>
    </el-row>
  </div>
</template>
