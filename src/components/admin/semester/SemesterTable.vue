<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

// 学期数据类型
interface SemesterData {
  id: number;
  semesterCode: string;
  semesterName: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface Props {
  loading: boolean;
  tableData: SemesterData[];
  currentPage: number;
  pageSize: number;
  total: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'delete': [row: SemesterData];
  'edit': [row: SemesterData];
  'view-details': [row: SemesterData];
  'status-change': [row: SemesterData, newStatus: string];
  'page-change': [page: number];
  'size-change': [size: number];
}>();

const handleViewDetails = (row: SemesterData) => {
  emit('view-details', row);
};

const handleEdit = (row: SemesterData) => {
  emit('edit', row);
};

const handleDelete = (row: SemesterData) => {
  ElMessageBox.confirm(
    `确定要删除学期 ${row.semesterName} 吗？`,
    '删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    emit('delete', row);
    ElMessage.success('删除成功');
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

const handleStatusChange = (row: SemesterData, newStatus: string) => {
  ElMessageBox.confirm(
    `确定要将学期 ${row.semesterName} 状态修改为${newStatus}吗？`,
    '状态修改确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'info'
    }
  ).then(() => {
    emit('status-change', row, newStatus);
    ElMessage.success('状态修改成功');
  }).catch(() => {
    ElMessage.info('已取消状态修改');
  });
};

const handlePageChange = (page: number) => {
  emit('page-change', page);
};

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
      <el-table-column prop="semesterCode" label="学期代码" width="120" />
      <el-table-column prop="semesterName" label="学期名称" width="250" />
      <el-table-column prop="startDate" label="开始日期" width="120" />
      <el-table-column prop="endDate" label="结束日期" width="120" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag
            :type="row.status === '进行中' ? 'success' : (row.status === '已结束' ? 'info' : 'warning')"
          >
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280" fixed="right">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="success" @click="handleViewDetails(row)">查看</el-button>
          <el-button size="small" type="warning" v-if="row.status !== '进行中'" @click="handleStatusChange(row, '进行中')">设为当前</el-button>
          <el-button size="small" type="danger" v-if="row.status !== '进行中'" @click="handleDelete(row)">删除</el-button>
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
        @update:page-size="handleSizeChange"
        @update:current-page="handlePageChange"
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
</style>