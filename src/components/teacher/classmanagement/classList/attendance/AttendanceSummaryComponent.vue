<script setup lang="ts">
import '@/assets/teacher/classmanagementCss/ClassListCss.css'
import '@/assets/teacher/classmanagementCss/classList/ClassListCommonCss.css'
import '@/assets/teacher/classmanagementCss/classList/AttendanceSummaryCss.css'
import { attendanceOverviewStatic, todayUnpunchStatic, attendanceTabsConfig, attendanceStatItemsConfig } from '@/data/teacher/classmanagement/AttendanceOverviewData.ts'
import { ref } from 'vue'
import { Connection, Clock } from '@element-plus/icons-vue'
import ClassSelectComponent from '../ClassSelectComponent.vue'
import AttendanceStatItemComponent from './AttendanceStatItemComponent.vue'

const activeTab = ref('week')
const selectedClass = ref('')

// 获取当前标签页的数据
const getCurrentTabData = () => {
  const tabConfig = attendanceTabsConfig.find(tab => tab.name === activeTab.value)
  if (!tabConfig) return null

  const dataKey = tabConfig.dataKey as keyof typeof attendanceOverviewStatic
  const data = attendanceOverviewStatic[dataKey]
  const compareKey = tabConfig.compareKey as string
  const compare = (data as any)[compareKey]

  return {
    tabConfig,
    data,
    compare
  }
}

// 获取某项的值
const getItemValue = (itemKey: string): string | number => {
  const current = getCurrentTabData()
  if (!current) return ''
  const value = current.data[itemKey as keyof typeof current.data]
  return typeof value === 'string' || typeof value === 'number' ? value : ''
}

// 获取某项的比较值
const getItemCompare = (itemKey: string): string | number => {
  const current = getCurrentTabData()
  if (!current) return ''
  const compareValue = current.compare[itemKey as keyof typeof current.compare]
  return typeof compareValue === 'string' || typeof compareValue === 'number' ? compareValue : ''
}

// 获取当前标签页的字体大小
const getCurrentFontSizes = () => {
  const current = getCurrentTabData()
  if (!current) return { label: '15px', value: '24px', compare: '16px' }
  return current.tabConfig.fontSize
}
</script>

<template>
    <el-card class="score-summary">
      <template #header>
        <div class="summary-header">
          <span>出勤概览</span>
          <div class="attendance-summary-header-container">
            <class-select-component v-model="selectedClass" />
            <el-icon class="attendance-summary-header-icon">
              <Connection />
            </el-icon>
          </div>
        </div>
      </template>

      <!-- 选项卡 -->
      <el-tabs v-model="activeTab" class="summary-tabs">
        <el-tab-pane
          v-for="tab in attendanceTabsConfig"
          :key="tab.name"
          :label="tab.label"
          :name="tab.name"
        >
          <el-row :gutter="16">
            <el-col
              v-for="item in attendanceStatItemsConfig"
              :key="item.key"
              :xs="24"
              :sm="6"
            >
              <attendance-stat-item-component
                :label="item.label"
                :value="getItemValue(item.key)"
                :compare-value="getItemCompare(item.key)"
                :color="item.color"
                :label-font-size="getCurrentFontSizes().label"
                :value-font-size="getCurrentFontSizes().value"
                :compare-font-size="getCurrentFontSizes().compare"
              />
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <!-- 今日未打卡学生 -->
      <el-divider />
      <div class="attendance-summary-header">
        <el-icon class="icon">
          <Clock />
        </el-icon>
        <span class="title">今日未打卡学生 ({{ todayUnpunchStatic.count }})</span>
      </div>
      <div class="unpunch-list">
        <div v-for="student in todayUnpunchStatic.list" :key="student.studentId" class="unpunch-item">
          <div class="unpunch-item-row">
            <div class="unpunch-item-info">
              <div class="unpunch-student-name">{{ student.studentName }}</div>
              <div class="unpunch-student-courses">
                {{ student.unpunchedCourses.join(', ') }}
              </div>
            </div>
            <el-button link type="primary" size="small" class="unpunch-contact-btn">联系</el-button>
          </div>
        </div>
      </div>
    </el-card>
</template>
