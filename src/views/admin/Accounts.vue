<script setup lang="ts">
import AdminShell from '@/components/layout/AdminShell.vue'
import WebContainer from '@/components/layout/WebContainer.vue'
import { useAccounts } from '@/utils/hooks/useAccounts'
import { ElMessage } from 'element-plus'
import { Edit, Key, Check, Close, Lightning, Warning } from '@element-plus/icons-vue'

const { loading, filter, list, query, reset, add, toggle, edit, resetPwd, authorize, riskFlag } = useAccounts()

function onQuery() { query(); ElMessage.success('已刷新筛选结果') }
function onReset() { reset(); onQuery() }
</script>

<template>
  <AdminShell>
    <WebContainer pad>
      <div class="accounts">
      <div class="title-bar">
        <div class="left">
          <div class="page-title">用户账号</div>
        </div>
        <div class="right">
          <el-switch active-text="风险标记" inactive-text="风险标记" />
        </div>
      </div>

      <div class="elevated-card controls">
        <div class="filters">
          <el-input v-model="filter.keyword" placeholder="搜索用户名/编号" clearable />
          <el-select v-model="filter.role" placeholder="角色" clearable>
            <el-option label="教师" value="teacher" />
            <el-option label="学生" value="student" />
            <el-option label="家长" value="parent" />
            <el-option label="管理员" value="admin" />
          </el-select>
          <el-select v-model="filter.status" placeholder="状态" clearable>
            <el-option label="启用" value="enabled" />
            <el-option label="停用" value="disabled" />
          </el-select>
          <el-select v-model="filter.region" placeholder="区域" clearable>
            <el-option label="华东" value="east" />
            <el-option label="华南" value="south" />
            <el-option label="华北" value="north" />
          </el-select>
          <el-select v-model="filter.school" placeholder="学校" clearable>
            <el-option label="一中" value="一中" />
            <el-option label="二中" value="二中" />
            <el-option label="实验高中" value="实验高中" />
            <el-option label="外国语" value="外国语" />
          </el-select>
        </div>
        <div class="ops">
          <el-button type="primary" @click="onQuery">查询</el-button>
          <el-button @click="onReset">重置</el-button>
          <el-button type="success" @click="add">新增</el-button>
        </div>
      </div>

      <div class="elevated-card table-card">
        <el-table :data="list" size="small" stripe v-loading="loading">
          <el-table-column prop="name" label="用户名" min-width="140" />
          <el-table-column prop="role" label="角色" width="100">
            <template #default="{ row }">
              <el-tag type="info" v-if="row.role==='teacher'">教师</el-tag>
              <el-tag type="success" v-else-if="row.role==='student'">学生</el-tag>
              <el-tag type="warning" v-else-if="row.role==='parent'">家长</el-tag>
              <el-tag type="danger" v-else>管理员</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="90">
            <template #default="{ row }">
              <el-tag type="success" v-if="row.status==='enabled'">启用</el-tag>
              <el-tag type="info" v-else>停用</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="风险" width="80">
            <template #default="{ row }">
              <span :class="['risk-dot', row.risk]" />
            </template>
          </el-table-column>
          <el-table-column prop="school" label="学校" width="120" />
          <el-table-column prop="region" label="区域" width="100" />
          <el-table-column prop="lastLogin" label="最近登录" min-width="160" />
          <el-table-column label="操作" width="400" fixed="right">
            <template #default="{ row }">
              <el-space>
                <el-button size="small" type="primary" plain :icon="Edit" @click="edit(row.id)">编辑</el-button>
                <el-button size="small" type="warning" plain :icon="Key" @click="resetPwd(row.id)">重置密码</el-button>
                <el-button size="small" type="danger" plain :icon="Warning" @click="riskFlag(row.id)">风险标记</el-button>
                <el-button size="small" :type="row.status==='enabled' ? 'danger' : 'success'" plain :icon="row.status==='enabled' ? Close : Check" @click="toggle(row.id)">{{ row.status==='enabled' ? '停用' : '启用' }}</el-button>
                <el-button size="small" type="info" plain :icon="Lightning" @click="authorize(row.id)">授权</el-button>
              </el-space>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="footer">
        <div class="qr">QR</div>
        <div class="links">© 紫教育数据科技 | 隐私与安全 | 个人信息保护 | 联系我们</div>
      </div>
      </div>
    </WebContainer>
  </AdminShell>
</template>

<style scoped>
.accounts { padding: 12px; }
.title-bar { height: 42px; display: flex; align-items: center; justify-content: space-between; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; padding: 0 12px; margin-bottom: 10px; }
.page-title { font-weight: 600; }
.controls { display: grid; gap: 10px; }
.filters { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; }
.ops { display: flex; gap: 8px; justify-content: flex-start; }
.table-card { margin-top: 8px; }
.table-card { overflow-x: auto; }
.risk-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; }
.risk-dot.low { background: #2ecc71; }
.risk-dot.medium { background: #f4c542; }
.risk-dot.high { background: #e74c3c; }
.footer { margin-top: 12px; background: #efeff7; border: 1px solid var(--color-border); border-radius: 8px; padding: 12px; display: flex; align-items: center; justify-content: space-between; color: var(--color-muted); }
.qr { width: 60px; height: 60px; background: #d9d6f2; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #6b6792; }
</style>