<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

// 年级数据类型
interface GradeData {
  id: number;
  code: string;
  name: string;
  description: string;
  status: string;
}

// 定义组件的 props
const props = defineProps<{
  loading: boolean;
  tableData: GradeData[];
  currentPage: number;
  pageSize: number;
  total: number;
}>();

// 定义组件的 emits
const emit = defineEmits<{
  'edit': [row: GradeData];
  'delete': [row: GradeData];
  'view-details': [row: GradeData];
  'toggle-status': [row: GradeData];
  'page-change': [page: number];
  'size-change': [size: number];
}>();

// 处理编辑
const handleEdit = (row: GradeData) => {
  emit('edit', row);
};

// 处理删除
const handleDelete = (row: GradeData) => {
  emit('delete', row);
};

// 处理查看详情
const handleView = (row: GradeData) => {
  emit('view-details', row);
};

// 处理状态切换
const handleToggleStatus = (row: GradeData) => {
  emit('toggle-status', row);
};

// 处理分页变化
const handlePageChange = (page: number) => {
  emit('page-change', page);
};

// 处理每页大小变化
const handleSizeChange = (size: number) => {
  emit('size-change', size);
};
</script>

<template>
  <el-card class="table-card">
    <!-- 表格内容 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      stripe
      border
    >
      <el-table-column prop="code" label="编码" width="120" />
      <el-table-column prop="name" label="年级名称" width="150" />
      <el-table-column prop="description" label="描述" width="200" />
      <el-table-column prop="status" label="状态" width="100" />
      <el-table-column label="操作" width="300" fixed="right">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="success" @click="handleView(row)">查看</el-button>
          <el-button size="small" type="warning" @click="handleToggleStatus(row)">{{ row.status === '启用' ? '禁用' : '启用' }}</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="props.currentPage"
        v-model:page-size="props.pageSize"
        :page-sizes="[5, 10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="props.total"
        prev-text="上一页"
        next-text="下一页"
        jumper-text="跳至"
        page-sizes-text="每页显示"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
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