<script setup lang="ts">

import { ElMessage } from 'element-plus';

// Emits
const emit = defineEmits<{
  'add': [];
  'import': [];
  'export': [];
}>();

// 处理新增
const handleAdd = () => {
  emit('add');
};

// 处理导入
const handleImport = () => {
  emit('import');
};

// 处理导出
const handleExport = () => {
  emit('export');
};
</script>

<template>
  <div class="action-buttons">
    <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>新增</el-button>
    <el-button @click="handleImport">导入</el-button>
    <el-button @click="handleExport">导出</el-button>
    <div class="batch-actions">
      <el-button type="text">批量操作</el-button>
      <el-select placeholder="请选择" style="width: 120px;">
        <el-option label="删除所选" value="delete" />
        <el-option label="导出所选" value="export" />
      </el-select>
      <el-button type="primary">确定</el-button>
    </div>
  </div>
</template>

<style scoped>
.action-buttons {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
  white-space: nowrap;
}

.batch-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>