<script setup lang="ts">
import '@/assets/teacher/classmanagementCss/classList/StatCardCss.css'

interface Props {
  label: string
  value: string | number
  unit: string
  iconColor?: string
  icon?: any
}

withDefaults(defineProps<Props>(), {
  iconColor: '#303133'
})
</script>

<template>
  <el-card class="stat-card">
    <template #header>
      <el-space  :size="8" style="width: 100%; justify-content: space-between">
        <span class="stat-card-title">{{ label }}</span>
        <el-icon
          v-if="icon"
          class="stat-card-icon"
          :style="{ color: iconColor }"
        >
          <component :is="icon" />
        </el-icon>
      </el-space>
    </template>

    <div class="stat-card-content">
      <span class="stat-card-number">{{ value }}</span>
      <span class="stat-card-unit">{{ unit }}</span>
    </div>
  </el-card>
</template>
