<script setup lang="ts">
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';

// 定义组件的 emits
const emit = defineEmits<{
  query: [];
  reset: [];
  expand: [];
}>();

// 筛选条件
const filterForm = reactive({
  name: '',
  status: '全部状态'
});

// 状态选项
const statusOptions = [
  { label: '全部状态', value: '全部状态' },
  { label: '已完成', value: '已完成' },
  { label: '未完成', value: '未完成' }
];

// 查询方法
const handleQuery = () => {
  emit('query');
};

// 重置方法
const handleReset = () => {
  Object.assign(filterForm, { name: '', status: '全部状态' });
  emit('reset');
};

// 展开筛选条件
const handleExpandFilter = () => {
  emit('expand');
};
</script>

<template>
  <el-card class="filter-card" shadow="hover">
    <el-form :model="filterForm" inline>
      <el-form-item label="数据名称">
        <el-input
          v-model="filterForm.name"
          placeholder="请输入"
          style="width: 180px"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="filterForm.status"
          placeholder="请选择"
          style="width: 120px"
        >
          <el-option 
            v-for="option in statusOptions" 
            :key="option.value" 
            :label="option.label" 
            :value="option.value" 
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
        <el-button @click="handleExpandFilter">展开 <el-icon class="el-icon--right"><ArrowDown /></el-icon></el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
.filter-card {
  margin-bottom: 20px;
}
</style>