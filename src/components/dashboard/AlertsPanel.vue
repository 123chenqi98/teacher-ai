<script setup lang="ts">
import { computed, ref } from "vue";
import type { CoreOverview, TrendSeries } from "@/utils/types";

const props = defineProps<{ core: CoreOverview | null; trends: TrendSeries[] }>();

// 简易阈值：可按需暴露为 props
const dauMin = ref(1000);
const errorMax = ref(50);

const warnings = computed(() => {
  const list: { type: string; message: string }[] = [];
  if (props.core) {
    if (props.core.user.active.dau < dauMin.value)
      list.push({
        type: "dau",
        message: `日活低于阈值（${props.core.user.active.dau} < ${dauMin.value}）`,
      });
    if (props.core.system.errorLogsToday > errorMax.value)
      list.push({
        type: "error",
        message: `错误日志超过阈值（${props.core.system.errorLogsToday} > ${errorMax.value}）`,
      });
  }
  return list;
});

// 简单异常点标注：相邻点降幅超过20%
const anomalies = computed(() => {
  const res: {
    series: string;
    idx: number;
    from: number;
    to: number;
    drop: number;
  }[] = [];
  for (const s of props.trends) {
    for (let i = 1; i < s.points.length; i++) {
      const prev = s.points[i - 1].value;
      const cur = s.points[i].value;
      const drop = prev ? (prev - cur) / prev : 0;
      if (drop > 0.2) res.push({ series: s.name, idx: i, from: prev, to: cur, drop });
    }
  }
  return res;
});
</script>

<template>
  <div class="alerts elevated-card">
    <div class="section-title purple-gradient-text">异常数据预警</div>
    <div class="thresholds">
      <el-space>
        <el-input-number v-model="dauMin" :min="0" :step="100" label="DAU阈值" />
        <el-input-number v-model="errorMax" :min="0" :step="5" label="错误日志阈值" />
      </el-space>
    </div>
    <div class="list">
      <el-alert
        v-if="warnings.length === 0"
        title="当前无预警"
        type="success"
        :closable="false"
      />
      <el-alert
        v-for="w in warnings"
        :key="w.message"
        :title="w.message"
        type="error"
        show-icon
      />
    </div>
    <div v-if="anomalies.length" class="anomalies">
      <div class="sub">趋势异常标注（相邻点降幅>20%）</div>
      <el-table :data="anomalies" size="small" stripe>
        <el-table-column prop="series" label="序列" />
        <el-table-column prop="idx" label="位置" />
        <el-table-column prop="from" label="前值" />
        <el-table-column prop="to" label="现值" />
        <el-table-column label="降幅">
          <template #default="{ row }">{{ (row.drop * 100).toFixed(1) }}%</template>
        </el-table-column>
      </el-table>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.thresholds {
  margin-bottom: 8px;
}
.sub {
  color: var(--color-muted);
  margin: 8px 0;
}
.anomalies {
  margin-top: 8px;
}
</style>
