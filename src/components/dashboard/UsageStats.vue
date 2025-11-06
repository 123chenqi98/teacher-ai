<script setup lang="ts">
import { computed } from 'vue'
import type { UsageStats } from '@/utils/types'

const props = defineProps<{ usage: UsageStats | null }>()
const maxVisits = computed(() => {
  const list = props.usage?.moduleVisits ?? []
  return list.length ? Math.max(...list.map(i => i.visits)) : 1
})
</script>

<template>
  <div class="usage elevated-card">
    <div class="section-title purple-gradient-text">功能使用统计</div>
    <div class="grid" v-if="usage">
      <div class="left">
        <div class="sub">各模块访问次数</div>
        <div class="bars">
          <div v-for="item in usage.moduleVisits" :key="item.module" class="bar-row">
            <div class="name">{{ item.module }}</div>
            <div class="bar">
              <div class="fill" :style="{ width: Math.min(100, item.visits / maxVisits * 100) + '%' }"></div>
              <div class="val">{{ item.visits }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="sub">功能使用频率排行</div>
        <el-table :data="usage.ranking" size="small" stripe>
          <el-table-column prop="module" label="功能" />
          <el-table-column prop="visits" label="访问量" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 12px; }
.sub { color: var(--color-muted); margin-bottom: 8px; }
.bar-row { display: grid; grid-template-columns: 160px 1fr; align-items: center; gap: 8px; margin-bottom: 8px; }
.name { color: var(--color-text); }
.bar { position: relative; height: 18px; background: var(--color-border); border-radius: 9px; overflow: hidden; }
.fill { position: absolute; left: 0; top: 0; bottom: 0; background: linear-gradient(90deg, var(--color-primary), var(--color-primary-700)); }
.val { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); color: var(--color-text); font-size: 12px; }
</style>