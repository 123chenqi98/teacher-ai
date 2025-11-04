<script setup lang="ts">
import { ElMessage } from 'element-plus';

const emit = defineEmits<{
  'add': [];
  'import': [];
  'export': [];
}>();

const handleAdd = () => {
  emit('add');
};

const handleImport = () => {
  emit('import');
};

const handleExport = () => {
  emit('export');
};
</script>

<template>
  <div class="action-section">
    <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
    <el-button type="success" @click="handleImport">导入</el-button>
    <el-button type="warning" @click="handleExport">导出</el-button>
  </div>
</template>

<style scoped>
.action-section {
  margin-bottom: 20px;
  display: flex;
  gap: 12px;
}
</style>