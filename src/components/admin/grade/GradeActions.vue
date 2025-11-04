<script setup lang="ts">
import { ElMessage } from 'element-plus';

// 定义组件的 emits
const emit = defineEmits<{
  add: [];
  import: [];
  export: [];
}>();

// 新增年级
const handleAdd = () => {
  emit('add');
};

// 导入年级数据
const handleImport = () => {
  emit('import');
};

// 导出年级数据
const handleExport = () => {
  emit('export');
};
</script>

<template>
  <div class="action-buttons">
    <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>新建</el-button>
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

<script lang="ts">
import { Plus } from '@element-plus/icons-vue';

export default {
  components: {
    Plus
  }
};
</script>

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