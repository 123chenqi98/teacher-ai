<script setup lang="ts">
import '@/assets/teacher/classmanagementCss/classList/SubjectScoreCardCss.css'

interface Props {
  subject: string
  score: number
}

defineProps<Props>()
</script>

<template>
  <el-card shadow="hover" class="subject-score-card">
    <div class="subject-score-content">
      <div class="subject-name">{{ subject }}</div>
      <div class="subject-score">{{ score }}</div>
    </div>
  </el-card>
</template>
