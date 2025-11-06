<script setup lang="ts">
import type { CoreOverview } from '@/utils/types'

defineProps<{ core: CoreOverview | null }>()
</script>

<template>
  <div class="core-overview elevated-card">
    <div class="section-title purple-gradient-text">核心数据概览</div>
    <div v-if="core" class="groups">
      <div class="group">
        <div class="group-title">用户类</div>
        <div class="cards">
          <div class="card">
            <div class="label">总用户数</div>
            <div class="value">{{ core.user.totalUsers }}</div>
          </div>
          <div class="card">
            <div class="label">新增（今日/昨日/近7日）</div>
            <div class="value">{{ core.user.newUsers.today }} / {{ core.user.newUsers.yesterday }} / {{ core.user.newUsers.last7d }}</div>
          </div>
          <div class="card">
            <div class="label">活跃（DAU/MAU）</div>
            <div class="value">{{ core.user.active.dau }} / {{ core.user.active.mau }}</div>
          </div>
          <div class="card">
            <div class="label">留存率（次日/7日）</div>
            <div class="value">{{ (core.user.retention.d1*100).toFixed(0) }}% / {{ (core.user.retention.d7*100).toFixed(0) }}%</div>
          </div>
        </div>
      </div>

      <div class="group">
        <div class="group-title">业务类</div>
        <div class="cards">
          <div class="card">
            <div class="label">核心操作总次数</div>
            <div class="value">{{ core.business.operationsTotal }}</div>
          </div>
          <div class="card">
            <div class="label">待处理任务数</div>
            <div class="value">{{ core.business.pendingTasks }}</div>
          </div>
          <div class="card">
            <div class="label">成交金额</div>
            <div class="value">¥{{ core.business.revenue.toLocaleString() }}</div>
          </div>
          <div class="card">
            <div class="label">转化率</div>
            <div class="value">{{ (core.business.conversionRate*100).toFixed(1) }}%</div>
          </div>
        </div>
      </div>

      <div class="group">
        <div class="group-title">系统类</div>
        <div class="cards">
          <div class="card">
            <div class="label">当前在线人数</div>
            <div class="value">{{ core.system.onlineUsers }}</div>
          </div>
          <div class="card">
            <div class="label">今日接口调用总量</div>
            <div class="value">{{ core.system.apiCallsToday }}</div>
          </div>
          <div class="card">
            <div class="label">系统错误日志数</div>
            <div class="value">{{ core.system.errorLogsToday }}</div>
          </div>
          <div class="card">
            <div class="label">服务器资源（CPU/内存）</div>
            <div class="value">{{ Math.round(core.system.resourceUsage.cpu*100) }}% / {{ Math.round(core.system.resourceUsage.memory*100) }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.groups { display: grid; gap: 12px; }
.group-title { font-weight: 600; color: var(--color-muted); margin-bottom: 6px; }
.cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 12px; padding: 14px; box-shadow: 0 4px 12px rgba(124,77,255,0.06); }
.label { font-size: 12px; color: var(--color-muted); }
.value { font-size: 18px; font-weight: 600; }
</style>