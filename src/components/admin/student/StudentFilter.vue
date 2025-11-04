<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

interface FilterForm {
  studentId: string;
  name: string;
  gender: string;
  grade: string;
  status: string;
}

const emit = defineEmits<{
  query: [form: FilterForm];
  reset: [];
  expand: [];
}>();

const genderOptions = ['全部', '男', '女'];
const gradeOptions = ['全部年级', '一年级', '二年级', '三年级', '四年级'];
const statusOptions = ['全部状态', '在读', '休学', '退学', '毕业'];

const filterForm = ref<FilterForm>({
  studentId: '',
  name: '',
  gender: '全部',
  grade: '全部年级',
  status: '全部状态'
});

const handleQuery = () => {
  emit('query', filterForm.value);
};

const handleReset = () => {
  Object.assign(filterForm.value, {
    studentId: '',
    name: '',
    gender: '全部',
    grade: '全部年级',
    status: '全部状态'
  });
  emit('reset');
  ElMessage.success('已重置筛选条件');
};

const handleExpandFilter = () => {
  emit('expand');
  ElMessage.info('展开筛选条件功能待实现');
};
</script>

<template>
  <el-card class="filter-card" shadow="hover">
    <el-form :model="filterForm" inline>
      <el-form-item label="学号">
        <el-input
          v-model="filterForm.studentId"
          placeholder="请输入"
          style="width: 150px"
        />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input
          v-model="filterForm.name"
          placeholder="请输入"
          style="width: 150px"
        />
      </el-form-item>
      <el-form-item label="性别">
        <el-select
          v-model="filterForm.gender"
          placeholder="请选择"
          style="width: 100px"
        >
          <el-option v-for="option in genderOptions" :key="option" :label="option" :value="option" />
        </el-select>
      </el-form-item>
      <el-form-item label="年级">
        <el-select
          v-model="filterForm.grade"
          placeholder="请选择"
          style="width: 120px"
        >
          <el-option v-for="option in gradeOptions" :key="option" :label="option" :value="option" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="filterForm.status"
          placeholder="请选择"
          style="width: 120px"
        >
          <el-option v-for="option in statusOptions" :key="option" :label="option" :value="option" />
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