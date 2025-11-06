<script setup lang="ts">
import AdminShell from '@/components/layout/AdminShell.vue'
import FiltersPanel from '@/components/dashboard/FiltersPanel.vue'
import SystemOverview from '@/components/dashboard/SystemOverview.vue'
import UsageStats from '@/components/dashboard/UsageStats.vue'
import ChartsPanel from '@/components/dashboard/ChartsPanel.vue'
import ReportExport from '@/components/dashboard/ReportExport.vue'
import CoreOverview from '@/components/dashboard/CoreOverview.vue'
import DistributionPanel from '@/components/dashboard/DistributionPanel.vue'
import SubjectStats from '@/components/dashboard/SubjectStats.vue'
import AlertsPanel from '@/components/dashboard/AlertsPanel.vue'
import SnapshotShare from '@/components/dashboard/SnapshotShare.vue'
import WebContainer from '@/components/layout/WebContainer.vue'
import { useDashboard } from '@/utils/hooks/useDashboard'

// 模拟当前登录角色，实际项目可从store获取
const currentRole: 'teacher' | 'student' | 'parent' | 'admin' = 'admin'

const { filter, loading, data, refresh, hasData, canExportScope } = useDashboard()

refresh()
</script>

<template>
  <AdminShell>
    <WebContainer pad>
      <div id="dashboard-root" class="dashboard">
      <FiltersPanel v-model="filter" @refresh="refresh" />

      <el-row :gutter="12">
        <el-col :span="24">
          <CoreOverview :core="data?.core ?? null" />
        </el-col>
      </el-row>

      <el-row :gutter="12" style="margin-top: 12px">
        <el-col :span="24">
          <SystemOverview :overview="data?.overview ?? null" />
        </el-col>
      </el-row>

      <el-row :gutter="12" style="margin-top: 12px">
        <el-col :span="24">
          <UsageStats :usage="data?.usage ?? null" />
        </el-col>
      </el-row>

      <el-row :gutter="12" style="margin-top: 12px">
        <el-col :span="24">
          <ChartsPanel :series="data?.trends ?? []" />
        </el-col>
      </el-row>

      <el-row :gutter="12" style="margin-top: 12px">
        <el-col :span="24">
          <DistributionPanel :distributions="data?.distributions ?? null" />
        </el-col>
      </el-row>

      <el-row :gutter="12" style="margin-top: 12px">
        <el-col :span="24">
          <SubjectStats :subjects="data?.subjects ?? null" />
        </el-col>
      </el-row>

      <el-row :gutter="12" style="margin-top: 12px">
        <el-col :span="24">
          <ReportExport :data="data ?? null" :exportScope="canExportScope(currentRole)" />
        </el-col>
      </el-row>

      <el-row :gutter="12" style="margin-top: 12px">
        <el-col :span="24">
          <SnapshotShare targetSelector="#dashboard-root" />
        </el-col>
      </el-row>

      <el-row :gutter="12" style="margin-top: 12px">
        <el-col :span="24">
          <AlertsPanel :core="data?.core ?? null" :trends="data?.trends ?? []" />
        </el-col>
      </el-row>

        <el-empty v-if="!hasData && !loading" description="暂无数据" />
        <el-skeleton v-if="loading" :rows="6" animated />
      </div>
    </WebContainer>
  </AdminShell>
  
</template>

<style scoped>
.dashboard { padding: 12px; }
</style>