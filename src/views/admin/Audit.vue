<script setup lang="ts">
import AdminShell from '@/components/layout/AdminShell.vue'
import WebContainer from '@/components/layout/WebContainer.vue'
import { useAudit } from '@/utils/hooks/useAudit'
import { ElMessage } from 'element-plus'
import { View, Download } from '@element-plus/icons-vue'

const { loading, filter, list, query, reset, exportLogs, view } = useAudit()

function onQuery() { query(); ElMessage.success('已刷新筛选结果') }
function onReset() { reset(); onQuery() }
</script>

<template>
  <AdminShell>
    <WebContainer pad>
      <div class="audit">
        <div class="title-bar">
          <div class="left">
            <div class="page-title">操作审计</div>
          </div>
          <div class="right">
            <el-button type="info" @click="exportLogs" :icon="Download">导出日志</el-button>
          </div>
        </div>

        <div class="elevated-card controls">
          <div class="filters">
            <el-input v-model="filter.keyword" placeholder="搜索用户/目标" clearable />
            <el-select v-model="filter.action" placeholder="动作类型" clearable>
              <el-option label="登录" value="登录" />
              <el-option label="修改配置" value="修改配置" />
              <el-option label="新增用户" value="新增用户" />
              <el-option label="停用账号" value="停用账号" />
              <el-option label="导出报告" value="导出报告" />
            </el-select>
            <el-select v-model="filter.status" placeholder="状态" clearable>
              <el-option label="成功" value="success" />
              <el-option label="失败" value="fail" />
            </el-select>
            <el-date-picker v-model="filter.range" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" />
          </div>
          <div class="ops">
            <el-button type="primary" @click="onQuery">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </div>
        </div>

        <div class="elevated-card table-card">
          <el-table :data="list" size="small" stripe v-loading="loading">
            <el-table-column prop="time" label="时间" min-width="160" />
            <el-table-column prop="user" label="用户" width="140" />
            <el-table-column prop="action" label="动作" width="120" />
            <el-table-column prop="target" label="目标" min-width="160" />
            <el-table-column prop="status" label="状态" width="90">
              <template #default="{ row }">
                <el-tag :type="row.status==='success' ? 'success' : 'danger'">{{ row.status==='success' ? '成功' : '失败' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="ip" label="IP" width="120" />
            <el-table-column label="操作" width="140" fixed="right">
              <template #default="{ row }">
                <el-button size="small" type="primary" plain :icon="View" @click="view(row.id)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </WebContainer>
  </AdminShell>
</template>

<style scoped>
.audit { padding: 12px; }
.title-bar { height: 42px; display: flex; align-items: center; justify-content: space-between; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; padding: 0 12px; margin-bottom: 10px; }
.page-title { font-weight: 600; }
.controls { display: grid; gap: 10px; }
.filters { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; }
.ops { display: flex; gap: 8px; justify-content: flex-start; }
.table-card { margin-top: 8px; }
</style>