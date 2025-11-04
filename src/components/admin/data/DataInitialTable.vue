<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

// 初始化数据类型
interface InitDataType {
  id: number;
  name: string;
  description: string;
  status: string;
  lastUpdate: string;
}

// 定义组件的 props
const props = defineProps<{
  loading: boolean;
  tableData: InitDataType[];
  currentPage: number;
  pageSize: number;
  total: number;
}>();

// 定义组件的 emits
const emit = defineEmits<{
  'init': [row: InitDataType];
  'clear': [row: InitDataType];
  'page-change': [page: number];
  'size-change': [size: number];
}>();

// 处理初始化
const handleInit = (row: InitDataType) => {
  emit('init', row);
};

// 处理清除数据
const handleClear = (row: InitDataType) => {
  emit('clear', row);
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
      <el-table-column prop="name" label="数据名称" width="180" />
      <el-table-column prop="description" label="描述" min-width="200" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.status === '已完成' ? 'success' : 'danger'">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="lastUpdate" label="最后更新" width="180" />
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-refresh"
            @click="handleInit(row)"
            style="margin-right: 5px"
          >
            {{ row.status === '已完成' ? '重新初始化' : '初始化' }}
          </el-button>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="handleClear(row)"
            :disabled="row.status === '未完成'"
          >
            清除数据
          </el-button>
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
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
  </el-card>
  
  <!-- 提示信息 -->
  <el-card class="tip-card" shadow="hover">
    <div class="tip-content">
      <h4 style="margin-bottom: 10px; color: #606266;">温馨提示</h4>
      <ul style="margin: 0; padding-left: 20px; color: #909399; font-size: 14px;">
        <li>数据初始化操作会覆盖现有数据，请谨慎操作</li>
        <li>清除数据操作不可恢复，请确认后再执行</li>
        <li>建议在系统上线初期或重要节点备份数据</li>
        <li>导入数据前请确保文件格式正确，建议先下载模板参考</li>
      </ul>
    </div>
  </el-card>
</template>

<style scoped>
.table-card {
  margin-bottom: 20px;
}

.tip-card {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>