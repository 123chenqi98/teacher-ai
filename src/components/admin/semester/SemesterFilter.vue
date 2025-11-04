<script setup lang="ts">
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';

// 筛选条件
const filterForm = reactive({
  semesterCode: '',
  semesterName: '',
  status: '全部状态'
});

const emit = defineEmits<{
  'query': [form: typeof filterForm];
  'reset': [];
}>();

const handleQuery = () => {
  emit('query', { ...filterForm });
  ElMessage.success('查询成功');
};

const handleReset = () => {
  Object.assign(filterForm, { 
    semesterCode: '', 
    semesterName: '', 
    status: '全部状态' 
  });
  emit('reset');
  ElMessage.success('已重置筛选条件');
};

const handleExpandFilter = () => {
  ElMessage.info('展开筛选条件功能待实现');
};
</script>

<template>
  <el-card class="filter-card" shadow="hover">
    <el-form :model="filterForm" inline>
      <el-form-item label="学期代码">
        <el-input
          v-model="filterForm.semesterCode"
          placeholder="请输入"
          style="width: 150px"
        />
      </el-form-item>
      <el-form-item label="学期名称">
        <el-input
          v-model="filterForm.semesterName"
          placeholder="请输入"
          style="width: 200px"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="filterForm.status"
          placeholder="请选择"
          style="width: 120px"
        >
          <el-option label="全部状态" value="全部状态" />
          <el-option label="进行中" value="进行中" />
          <el-option label="已结束" value="已结束" />
          <el-option label="未开始" value="未开始" />
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