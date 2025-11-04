<script setup lang="ts">
import { ref, computed } from 'vue';
import { Edit, Delete, Filter } from '@element-plus/icons-vue';

// 定义类型
interface TableColumn {
  key: string;
  title: string;
  sortable?: boolean;
  format?: string;
}

interface TableItem {
  id: number;
  [key: string]: any;
}

// 定义props
const props = defineProps<{
  data: TableItem[];
  columns: TableColumn[];
  pageSize?: number;
  searchFields?: string[];
}>();

// 定义事件
const emit = defineEmits<{
  (e: 'add'): void;
  (e: 'edit', id: number): void;
  (e: 'delete', id: number): void;
  (e: 'filter'): void;
  (e: 'search', query: string): void;
}>();

// 搜索查询
const searchQuery = ref('');
// 当前页码
const currentPage = ref(1);
// 筛选条件
const filterValue = ref('');
const semesterIdFilter = ref('');

// 计算过滤后的数据
const filteredData = computed(() => {
  let result = [...props.data];
  
  // 按学期ID筛选
  if (semesterIdFilter.value) {
    result = result.filter(item => item.id.toString().includes(semesterIdFilter.value));
  }
  
  // 按搜索条件筛选
  if (searchQuery.value && props.searchFields) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(item => 
      props.searchFields!.some(field => 
        String(item[field]).toLowerCase().includes(query)
      )
    );
  }
  
  return result;
});

// 计算分页数据
const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * (props.pageSize || 5);
  const endIndex = startIndex + (props.pageSize || 5);
  return filteredData.value.slice(startIndex, endIndex);
});

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / (props.pageSize || 5));
});

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1; // 重置到第一页
  emit('search', searchQuery.value);
};

// 处理筛选
const handleFilter = () => {
  currentPage.value = 1; // 重置到第一页
  emit('filter');
};

// 处理添加
const handleAdd = () => {
  emit('add');
};

// 处理编辑
const handleEdit = (id: number) => {
  emit('edit', id);
};

// 处理删除
const handleDelete = (id: number) => {
  if (confirm('确定要删除这条记录吗？')) {
    emit('delete', id);
  }
};

// 跳转到指定页码
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// 格式化日期
const formatDate = (date: any) => {
  if (!date) return '';
  const d = new Date(date);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
};

// 格式化状态
const formatStatus = (status: number) => {
  const statusMap: { [key: number]: string } = {
    1: '正常',
    2: '已停用',
    3: '已删除'
  };
  return statusMap[status] || '未知';
};

// 格式化单元格内容
const formatCell = (value: any, format?: string) => {
  switch (format) {
    case 'date':
      return formatDate(value);
    case 'status':
      return formatStatus(value);
    default:
      return value || '-';
  }
};
</script>

<template>
  <div class="data-table-container">
    <!-- 筛选区域 -->
    <div class="filter-section">
      <div class="filter-group">
        <label>学期编号：</label>
        <input
          type="text"
          v-model="semesterIdFilter"
          placeholder="请输入"
          @input="handleFilter"
        />
      </div>
      <div class="filter-group">
        <label>状态：</label>
        <select v-model="filterValue" @change="handleFilter">
          <option value="">全部状态</option>
          <option value="1">正常</option>
          <option value="2">已停用</option>
        </select>
      </div>
      <div class="search-group">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="搜索"
          @keyup.enter="handleSearch"
        />
        <button class="search-btn" @click="handleSearch">查询</button>
        <button class="reset-btn" @click="searchQuery = semesterIdFilter = filterValue = ''; currentPage = 1">重置</button>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-section">
      <button class="add-btn" @click="handleAdd">导入</button>
      <button class="add-btn" @click="handleAdd">新增</button>
    </div>

    <!-- 数据表格 -->
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">
            {{ column.title }}
            <span v-if="column.sortable" class="sort-icon">↕</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedData" :key="item.id">
          <td v-for="column in columns" :key="`${item.id}-${column.key}`">
            <template v-if="column.key === 'actions'">
              <button class="edit-btn" @click="handleEdit(item.id)">
                <Edit /> 编辑
              </button>
              <button class="delete-btn" @click="handleDelete(item.id)">
                <Delete /> 删除
              </button>
            </template>
            <template v-else>
              {{ formatCell(item[column.key], column.format) }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分页 -->
    <div class="pagination">
      <button 
        @click="goToPage(currentPage - 1)" 
        :disabled="currentPage === 1"
      >
        上一页
      </button>
      <span v-for="page in totalPages" :key="page" class="page-item">
        <button
          :class="{ active: page === currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </span>
      <button 
        @click="goToPage(currentPage + 1)" 
        :disabled="currentPage === totalPages"
      >
        下一页
      </button>
    </div>
  </div>
</template>

<style scoped>
.data-table-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.filter-section {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-group label {
  font-size: 14px;
  color: #606266;
  white-space: nowrap;
}

.filter-group input,
.filter-group select {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  min-width: 120px;
}

.search-group {
  display: flex;
  gap: 8px;
}

.search-group input {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  min-width: 150px;
}

.search-btn,
.reset-btn,
.add-btn {
  height: 32px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.search-btn {
  background-color: #6a11cb;
  color: white;
}

.reset-btn {
  background-color: #f5f7fa;
  color: #606266;
  border: 1px solid #dcdfe6;
}

.add-btn {
  background-color: #409eff;
  color: white;
}

.search-btn:hover {
  background-color: #8e2de2;
}

.reset-btn:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.add-btn:hover {
  background-color: #66b1ff;
}

.action-section {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
}

.data-table th {
  background-color: #f5f7fa;
  font-weight: 500;
  color: #606266;
  font-size: 14px;
}

.data-table td {
  color: #303133;
  font-size: 14px;
}

.sort-icon {
  margin-left: 4px;
  color: #c0c4cc;
  cursor: pointer;
}

.edit-btn,
.delete-btn {
  padding: 4px 12px;
  margin-right: 8px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.edit-btn {
  background-color: #f56c6c;
  color: white;
}

.delete-btn {
  background-color: #e6a23c;
  color: white;
}

.edit-btn:hover {
  background-color: #f78989;
}

.delete-btn:hover {
  background-color: #ebb563;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.pagination button {
  padding: 6px 12px;
  border: 1px solid #dcdfe6;
  background-color: white;
  color: #606266;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
}

.pagination button:hover:not(:disabled) {
  color: #409eff;
  border-color: #c6e2ff;
}

.pagination button.active {
  background-color: #6a11cb;
  color: white;
  border-color: #6a11cb;
}

.pagination button:disabled {
  cursor: not-allowed;
  color: #c0c4cc;
}

.page-item {
  display: inline;
}
</style>