<script setup lang="ts">
import '@/assets/teacher/classmanagementCss/classList/ScoreItemCss.css'

interface Props {
  label: string
  value: string | number
  labelColor?: string
  valueColor?: string
}

withDefaults(defineProps<Props>(), {
  labelColor: '#606266',
  valueColor: '#303133'
})
</script>

<template>
  <div class="score-item">
    <div class="score-item-content">
      <span class="score-item-label" :style="{ color: labelColor }">{{ label }}</span>
      <span class="score-item-value" :style="{ color: valueColor }">{{ value }}</span>
    </div>
  </div>
</template>
