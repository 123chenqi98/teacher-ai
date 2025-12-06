<script setup lang="ts">
import '@/assets/teacher/classmanagementCss/ClassListCss.css'
import '@/assets/teacher/classmanagementCss/classList/ClassListCommonCss.css'
import '@/assets/teacher/classmanagementCss/classList/ScoreSummaryCss.css'
import { scoreOverviewStatic, homeworkStatsStatic } from '@/data/teacher/classmanagement/ClassDetailScoreData.ts'
import { scoreItemsConfig, homeworkLabels } from '@/data/teacher/classmanagement/ScoreSummaryData.ts'
import { ref } from 'vue'
import { Promotion } from '@element-plus/icons-vue'
import ClassSelectComponent from '../ClassSelectComponent.vue'
import ScoreItemComponent from './ScoreItemComponent.vue'
import SubjectScoreCard from './SubjectScoreCard.vue'

const selectedClass = ref('')

// 获取成绩项的值
const getScoreValue = (key: string): string | number => {
  const value = scoreOverviewStatic[key as keyof typeof scoreOverviewStatic]
  // 过滤掉数组类型，只返回 string 或 number
  if (Array.isArray(value)) {
    return ''
  }
  return value || ''
}

// 获取成绩项的颜色
const getScoreValueColor = (key: string): string => {
  const item = scoreItemsConfig.find(config => config.key === key)
  return item?.valueColor || '#303133'
}
</script>

<template>
    <el-card class="score-summary">
      <template #header>
        <div class="score-header">
          <span>成绩概览</span>
          <div style="display: flex; align-items: center; gap: 12px">
            <class-select-component v-model="selectedClass" />
            <el-icon style="font-size: 18px; color: #909399">
              <Promotion />
            </el-icon>
          </div>
        </div>
      </template>

      <!-- 主要指标 -->
      <el-row :gutter="16" class="score-stats">
        <el-col
          v-for="item in scoreItemsConfig"
          :key="item.key"
          :xs="12"
          :sm="6"
        >
          <score-item-component
            :label="item.label"
            :value="getScoreValue(item.key)"
            :label-color="item.color"
            :value-color="getScoreValueColor(item.key)"
          />
        </el-col>
      </el-row>

      <el-divider />

      <!-- 各科平均分 -->
      <div class="score-summary-title">各科平均分</div>
      <el-row :gutter="16">
        <el-col
          v-for="subject in scoreOverviewStatic.subjectAverage"
          :key="subject.subject"
          :xs="12"
          :sm="8"
          :md="4"
        >
          <subject-score-card :subject="subject.subject" :score="subject.score" />
        </el-col>
      </el-row>

      <el-divider />

      <!-- 作业统计 -->
      <div class="homework-stats-header">
        <span class="homework-stats-title">{{ homeworkLabels.title }}</span>
        <el-tag>{{ homeworkStatsStatic.publishedCount }} 次发布</el-tag>
      </div>
      <el-row :gutter="16">
        <el-col :sm="25">
          <div class="homework-completion-item">
            <span class="homework-completion-label">{{ homeworkLabels.completionRateLabel }}</span>
            <span class="homework-completion-value">{{ homeworkStatsStatic.completionRate }}</span>
          </div>
        </el-col>
      </el-row>

      <!-- 未提交TOP -->
      <div class="unsubmitted-top3-container">
        <div class="unsubmitted-top3-title">{{ homeworkLabels.unsubmittedTop3Label }}</div>
        <el-row :gutter="16">
          <el-col
            v-for="item in homeworkStatsStatic.unsubmittedTop3"
            :key="item.subject"
            :sm="8"
          >
            <div class="unsubmitted-item">
              <span class="unsubmitted-subject">{{ item.subject }}</span>
              <el-tag type="warning">{{ item.unsubmittedCount }} 人</el-tag>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
</template>
