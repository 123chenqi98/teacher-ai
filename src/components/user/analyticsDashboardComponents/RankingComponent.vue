<script setup lang="ts">
import {
  efficiencyRankingData,
  personalEfficiencyData
} from "@/data/user/AnalyticsDashboardData/AnalyticsDashboardData.ts";
import "@/assets/user/analyticsDashboardCss/RankingCss.css"
</script>

<template>
  <!-- 排行榜和效率分析 -->
  <div class="additional-sections">
    <div class="section-item">
      <div class="section-header">
        <h3>教学效率排行榜</h3>
        <p>同类型教师效率对比排行</p>
      </div>
      <div class="ranking-table">
        <el-table :data="efficiencyRankingData" style="width: 100%">
          <el-table-column prop="rank" label="排名" width="80">
            <template #default="scope">
                  <span :class="{'rank-first': scope.row.rank === 1, 'rank-second': scope.row.rank === 2, 'rank-third': scope.row.rank === 3}">
                    {{ scope.row.rank }}
                  </span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="150" />
          <el-table-column prop="department" label="部门" />
          <el-table-column prop="score" label="得分" width="100">
            <template #default="scope">
              <span class="score-value">{{ scope.row.score }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="section-item">
      <div class="section-header">
        <h3>个人效率趋势</h3>
        <p>个人各项指标达成情况</p>
      </div>
      <div class="efficiency-bars">
        <div v-for="(item, index) in personalEfficiencyData" :key="index" class="efficiency-item">
          <div class="efficiency-label">{{ item.name }}</div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: item.value + '%' }"></div>
          </div>
          <div class="efficiency-value">{{ item.value }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>