<script setup lang="ts">
import AdminShell from '@/components/layout/AdminShell.vue'
import WebContainer from '@/components/layout/WebContainer.vue'
import { useRoles } from '@/utils/hooks/useRoles'
import { ElMessage } from 'element-plus'
import { Edit, Delete, Check, Close, Lock, Tickets } from '@element-plus/icons-vue'

const { loading, filter, list, query, reset, add, edit, toggle, assign, remove } = useRoles()

function onQuery() { query(); ElMessage.success('已刷新筛选结果') }
function onReset() { reset(); onQuery() }
</script>

<template>
  <AdminShell>
    <WebContainer pad>
      <div class="roles">
        <div class="title-bar">
          <div class="left">
            <div class="page-title">角色权限</div>
          </div>
          <div class="right">
            <el-button type="success" @click="add">新增角色</el-button>
          </div>
        </div>

        <div class="elevated-card controls">
          <div class="filters">
            <el-input v-model="filter.keyword" placeholder="搜索角色名" clearable />
            <el-select v-model="filter.status" placeholder="状态" clearable>
              <el-option label="启用" value="enabled" />
              <el-option label="停用" value="disabled" />
            </el-select>
            <el-input v-model="filter.permGroup" placeholder="权限包含" clearable />
          </div>
          <div class="ops">
            <el-button type="primary" @click="onQuery">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </div>
        </div>

        <div class="elevated-card table-card">
          <el-table :data="list" size="small" stripe v-loading="loading">
            <el-table-column prop="name" label="角色" min-width="140" />
            <el-table-column prop="usersCount" label="关联用户" width="100" />
            <el-table-column label="权限" min-width="260">
              <template #default="{ row }">
                <el-space wrap>
                  <el-tag v-for="p in row.permissions" :key="p" type="info" effect="light">{{ p }}</el-tag>
                </el-space>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="90">
              <template #default="{ row }">
                <el-tag :type="row.status==='enabled' ? 'success' : 'info'">{{ row.status==='enabled' ? '启用' : '停用' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="400" fixed="right">
              <template #default="{ row }">
                <el-space>
                  <el-button size="small" type="primary" plain :icon="Edit" @click="edit(row.id)">编辑</el-button>
                  <el-button size="small" type="warning" plain :icon="Tickets" @click="assign(row.id)">分配权限</el-button>
                  <el-button size="small" :type="row.status==='enabled' ? 'danger' : 'success'" plain :icon="row.status==='enabled' ? Close : Check" @click="toggle(row.id)">{{ row.status==='enabled' ? '停用' : '启用' }}</el-button>
                  <el-button size="small" type="danger" plain :icon="Delete" @click="remove(row.id)">删除</el-button>
                </el-space>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </WebContainer>
  </AdminShell>
</template>

<style scoped>
.roles { padding: 12px; }
.title-bar { height: 42px; display: flex; align-items: center; justify-content: space-between; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; padding: 0 12px; margin-bottom: 10px; }
.page-title { font-weight: 600; }
.controls { display: grid; gap: 10px; }
.filters { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; }
.ops { display: flex; gap: 8px; justify-content: flex-start; }
.table-card { margin-top: 8px; }
</style>