<script setup lang="ts">
import { reactive } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';


// Emits
const emit = defineEmits<{
  'query': [form: any];
  'reset': [];
  'expand': [];
}>();

// 筛选条件
const filterForm = reactive({
  subjectCode: '',
  subjectName: '',
  category: '全部类别',
  status: '全部状态'
});

// 选项数据
const categoryOptions = ['全部类别', '公共课', '专业课', '选修课'];
const statusOptions = ['全部状态', '启用', '禁用'];

// 处理查询
const handleQuery = () => {
  emit('query', { ...filterForm });
};

// 处理重置
const handleReset = () => {
  Object.assign(filterForm, {
    subjectCode: '',
    subjectName: '',
    category: '全部类别',
    status: '全部状态'
  });
  emit('reset');
  ElMessage.success('已重置筛选条件');
};

// 处理展开筛选
const handleExpand = () => {
  emit('expand');
};
</script>

<template>
  <el-card class="filter-card" shadow="hover">
    <el-form :model="filterForm" inline>
      <el-form-item label="课程编码">
        <el-input
          v-model="filterForm.subjectCode"
          placeholder="请输入"
          style="width: 150px"
        />
      </el-form-item>
      <el-form-item label="课程名称">
        <el-input
          v-model="filterForm.subjectName"
          placeholder="请输入"
          style="width: 180px"
        />
      </el-form-item>
      <el-form-item label="课程类别">
        <el-select
          v-model="filterForm.category"
          placeholder="请选择"
          style="width: 120px"
        >
          <el-option v-for="option in categoryOptions" :key="option" :label="option" :value="option" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="filterForm.status"
          placeholder="请选择"
          style="width: 100px"
        >
          <el-option v-for="option in statusOptions" :key="option" :label="option" :value="option" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
        <el-button @click="handleExpand">展开 <el-icon class="el-icon--right"><ArrowDown /></el-icon></el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
.filter-card {
  margin-bottom: 20px;
}
</style>