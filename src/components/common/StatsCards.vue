<template>
  <div class="stats-grid">
    <el-card v-for="item in items" :key="item.key" class="stat-card" shadow="never">
      <div class="top">
        <div class="name">{{ item.name }}</div>
        <el-tag v-if="item.tag" size="small" effect="plain">{{ item.tag }}</el-tag>
      </div>
      <div class="value">
        {{ item.value }}<span v-if="item.suffix" class="suffix">{{ item.suffix }}</span>
      </div>
      <div v-if="item.desc" class="desc subtext">{{ item.desc }}</div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
export interface StatItem {
  key: string | number
  name: string
  value: string | number
  suffix?: string
  desc?: string
  tag?: string
}

defineProps<{ items: StatItem[] }>()
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin-bottom: 14px;
}
.stat-card { border-radius: 10px; }
.top { display:flex; justify-content: space-between; align-items: center; }
.name { font-size: 14px; color: var(--brand-subtext); }
.value { font-size: 28px; font-weight: 700; margin-top: 8px; color: var(--brand-text); }
.suffix { font-size: 14px; margin-left: 4px; color: var(--brand-subtext); }
.desc { margin-top: 6px; }
</style>


