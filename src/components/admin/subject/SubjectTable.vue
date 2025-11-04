<script setup lang="ts">
import { computed } from 'vue';
import { ElTag } from 'element-plus';

// 学科数据类型
interface SubjectData {
  id: number;
  subjectCode: string;
  subjectName: string;
  category: string;
  credits: number;
  classHours: number;
  department: string;
  status: string;
  createTime: string;
}

// Props
const props = defineProps<{
  loading: boolean;
  tableData: SubjectData[];
  currentPage: number;
  pageSize: number;
  total: number;
  filterForm: {
    subjectCode: string;
    subjectName: string;
    category: string;
    status: string;
  };
}>();

// Emits
const emit = defineEmits<{
  'edit': [row: SubjectData];
  'delete': [row: SubjectData];
  'view-details': [row: SubjectData];
  'toggle-status': [row: SubjectData];
  'page-change': [page: number];
  'size-change': [size: number];
}>();

// 计算筛选后的数据
const filteredData = computed(() => {
  return props.tableData.filter(item => {
    const matchesCode = item.subjectCode.toLowerCase().includes(props.filterForm.subjectCode.toLowerCase());
    const matchesName = item.subjectName.toLowerCase().includes(props.filterForm.subjectName.toLowerCase());
    const matchesCategory = props.filterForm.category === '全部类别' || item.category === props.filterForm.category;
    const matchesStatus = props.filterForm.status === '全部状态' || item.status === props.filterForm.status;
    return matchesCode && matchesName && matchesCategory && matchesStatus;
  });
});

// 获取状态标签类型
const getStatusType = (status: string): string => {
  return status === '启用' ? 'success' : 'danger';
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
      <el-table-column prop="subjectCode" label="课程编码" width="120" />
      <el-table-column prop="subjectName" label="课程名称" width="180" show-overflow-tooltip />
      <el-table-column prop="category" label="课程类别" width="100" />
      <el-table-column prop="credits" label="学分" width="80" />
      <el-table-column prop="classHours" label="学时" width="80" />
      <el-table-column prop="department" label="所属院系" width="150" />
      <el-table-column prop="createTime" label="创建时间" width="150" />
      <el-table-column prop="status" label="状态" width="80">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" fixed="right">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="emit('edit', row)">编辑</el-button>
          <el-button size="small" type="success" @click="emit('view-details', row)">查看</el-button>
          <el-button size="small" type="warning" @click="emit('toggle-status', row)">{{ row.status === '启用' ? '禁用' : '启用' }}</el-button>
          <el-button size="small" type="danger" @click="emit('delete', row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        prev-text="上一页"
        next-text="下一页"
        jumper-text="跳至"
        page-sizes-text="每页显示"
        @update:current-page="emit('page-change', $event)"
        @update:page-size="emit('size-change', $event)"
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