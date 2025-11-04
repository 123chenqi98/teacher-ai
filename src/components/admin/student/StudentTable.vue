<script setup lang="ts">
import { computed } from 'vue';

interface StudentData {
  id: number;
  studentId: string;
  name: string;
  gender: string;
  age: number;
  grade: string;
  class: string;
  major: string;
  status: string;
  contact: string;
  admissionDate: string;
}

const props = defineProps<{
  loading: boolean;
  tableData: StudentData[];
  currentPage: number;
  pageSize: number;
  total: number;
  filterForm: {
    studentId: string;
    name: string;
    gender: string;
    grade: string;
    status: string;
  };
}>();

const emit = defineEmits<{
  edit: [row: StudentData];
  delete: [row: StudentData];
  viewDetails: [row: StudentData];
  toggleStatus: [row: StudentData];
  pageChange: [page: number];
  sizeChange: [size: number];
}>();

// 筛选数据
const filteredData = computed(() => {
  return props.tableData.filter((item) => {
    const matchesId = 
      !props.filterForm.studentId || 
      item.studentId.toLowerCase().includes(props.filterForm.studentId.toLowerCase());
    const matchesName = 
      !props.filterForm.name || 
      item.name.toLowerCase().includes(props.filterForm.name.toLowerCase());
    const matchesGender = props.filterForm.gender === '全部' || item.gender === props.filterForm.gender;
    const matchesGrade = props.filterForm.grade === '全部年级' || item.grade === props.filterForm.grade;
    const matchesStatus = props.filterForm.status === '全部状态' || item.status === props.filterForm.status;
    return matchesId && matchesName && matchesGender && matchesGrade && matchesStatus;
  });
});

// 获取状态标签类型
const getStatusType = (status: string): string => {
  const typeMap: Record<string, string> = {
    '在读': 'success',
    '休学': 'warning',
    '退学': 'danger',
    '毕业': 'info'
  };
  return typeMap[status] || 'info';
};

// 处理分页变化
const handlePageChange = (page: number) => {
  emit('pageChange', page);
};

// 处理页面大小变化
const handleSizeChange = (size: number) => {
  emit('sizeChange', size);
};
</script>

<template>
  <el-card class="table-card">
    <!-- 表格内容 -->
    <el-table
      v-loading="loading"
      :data="filteredData"
      style="width: 100%"
      stripe
      border
    >
      <el-table-column prop="studentId" label="学号" width="120" />
      <el-table-column prop="name" label="姓名" width="100" />
      <el-table-column prop="gender" label="性别" width="80">
        <template #default="{ row }">
          <el-tag :type="row.gender === '男' ? 'primary' : 'success'">
            {{ row.gender }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="80" />
      <el-table-column prop="grade" label="年级" width="100" />
      <el-table-column prop="class" label="班级" width="120" />
      <el-table-column prop="major" label="专业" width="180" />
      <el-table-column prop="contact" label="联系方式" width="120" show-overflow-tooltip />
      <el-table-column prop="admissionDate" label="入学日期" width="120" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" fixed="right">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="emit('edit', row)">编辑</el-button>
          <el-button size="small" type="success" @click="emit('viewDetails', row)">查看</el-button>
          <el-button size="small" type="warning" @click="emit('toggleStatus', row)">{{ row.status === '启用' ? '禁用' : '启用' }}</el-button>
          <el-button size="small" type="danger" @click="emit('delete', row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        prev-text="上一页"
        next-text="下一页"
        jumper-text="跳至"
        page-sizes-text="每页显示"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
  </el-card>
</template>

<style scoped>
.table-card {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-table .el-table-column__content .el-button) {
  margin-right: 0;
  padding: 6px 12px;
}

:deep(.el-table .el-table-column__content) {
  display: flex;
  align-items: center;
}
</style>