<script setup lang="ts">
import type { SystemOverviewStats } from '@/utils/types'

defineProps<{ overview: SystemOverviewStats | null }>()
</script>

<template>
  <div class="overview elevated-card">
    <div class="section-title purple-gradient-text">系统运营概览</div>
    <div v-if="overview" class="kpi-grid">
      <div class="kpi">
        <div class="label">总用户数</div>
        <div class="value">{{ overview.totalUsers }}</div>
      </div>
      <div class="kpi">
        <div class="label">教师</div>
        <div class="value">{{ overview.roleDistribution.teacher }}</div>
      </div>
      <div class="kpi">
        <div class="label">学生</div>
        <div class="value">{{ overview.roleDistribution.student }}</div>
      </div>
      <div class="kpi">
        <div class="label">家长</div>
        <div class="value">{{ overview.roleDistribution.parent }}</div>
      </div>
      <div class="kpi">
        <div class="label">管理员</div>
        <div class="value">{{ overview.roleDistribution.admin }}</div>
      </div>
    </div>

    <div v-if="overview" class="active-grid">
      <div class="tile">
        <div class="label">活跃（日）</div>
        <div class="value">{{ overview.activeUsers.day }}</div>
      </div>
      <div class="tile">
        <div class="label">活跃（周）</div>
        <div class="value">{{ overview.activeUsers.week }}</div>
      </div>
      <div class="tile">
        <div class="label">活跃（月）</div>
        <div class="value">{{ overview.activeUsers.month }}</div>
      </div>
    </div>
    
    <div v-if="overview" class="share">
      <div class="label">各端使用占比</div>
      <div class="bars">
        <div class="bar teacher" :style="{ width: (overview.activityShare.teacher * 100).toFixed(0) + '%' }">教师 {{ (overview.activityShare.teacher * 100).toFixed(0) }}%</div>
        <div class="bar student" :style="{ width: (overview.activityShare.student * 100).toFixed(0) + '%' }">学生 {{ (overview.activityShare.student * 100).toFixed(0) }}%</div>
        <div class="bar parent" :style="{ width: (overview.activityShare.parent * 100).toFixed(0) + '%' }">家长 {{ (overview.activityShare.parent * 100).toFixed(0) }}%</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overview { display: grid; gap: 12px; }
.kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.kpi { background: var(--color-surface); border: 1px solid var(--color-border); padding: 14px; border-radius: 12px; box-shadow: 0 4px 12px rgba(124,77,255,0.06); }
.label { color: var(--color-muted); font-size: 12px; }
.value { font-size: 20px; font-weight: 600; }
.active-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.tile { background: var(--color-surface); border: 1px solid var(--color-border); padding: 14px; border-radius: 12px; }
.share .bars { display: grid; gap: 6px; }
.bar { background: var(--color-primary-50); color: var(--color-text); border-radius: 8px; padding: 6px 8px; }
.bar.teacher { background: linear-gradient(90deg, #7c4dff, #5b2dff); }
.bar.student { background: linear-gradient(90deg, #7c4dff55, #5b2dff55); }
.bar.parent { background: linear-gradient(90deg, #7c4dff33, #5b2dff33); }
</style>