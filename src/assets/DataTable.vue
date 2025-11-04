<template>
  <div class="data-table-container">
    <div class="table-header">
      <div class="table-title">
        <h3>{{ tableTitle }}</h3>
      </div>
      <div class="table-actions">
        <button class="btn btn-primary" @click="handleAdd">
          <i class="fa fa-plus"></i> 新增
        </button>
        <button class="btn btn-outline" @click="handleFilter">
          <i class="fa fa-filter"></i> 筛选
        </button>
      </div>
    </div>

    <div class="table-search">
      <div class="search-box">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="搜索..." v-model="searchQuery" @input="handleSearch">
      </div>
    </div>

    <div class="table-container">
      <table class="table">
        <thead>
        <tr>
          <th v-for="column in columns" :key="column.key" @click="handleSort(column.key)">
            {{ column.title }}
            <i v-if="sortKey === column.key" class="fa ml-1" :class="sortOrder === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc'"></i>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="paginatedData.length === 0">
          <td :colspan="columns.length" class="text-center py-4">
            暂无数据
          </td>
        </tr>
        <tr v-for="row in paginatedData" :key="row.id">
          <td v-for="column in columns" :key="column.key" v-html="renderCell(row, column)"></td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="table-footer">
      <div class="table-info">
        <span>共 <span>{{ filteredData.length }}</span> 条数据</span>
      </div>
      <div class="table-pagination">
        <ul class="pagination">
          <li :class="{ disabled: currentPage === 1 }">
            <a href="#" @click.prevent="handlePageChange(currentPage - 1)">
              <i class="fa fa-angle-left"></i>
            </a>
          </li>
          <li v-for="page in pageNumbers" :key="page" :class="{ active: page === currentPage }">
            <a href="#" @click.prevent="handlePageChange(page)">{{ page }}</a>
          </li>
          <li :class="{ disabled: currentPage === totalPages }">
            <a href="#" @click.prevent="handlePageChange(currentPage + 1)">
              <i class="fa fa-angle-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue';
import { TableColumn, TableItem } from '../types';

// 定义props
const props = defineProps<{
  data: TableItem[];
  columns: TableColumn[];
  tableTitle?: string;
  pageSize?: number;
  searchFields?: string[];
}>();

// 定义emits
const emit = defineEmits<{
  (e: 'add'): void;
  (e: 'edit', id: number): void;
  (e: 'delete', id: number): void;
  (e: 'filter'): void;
  (e: 'search', query: string): void;
}>();

// 响应式数据
const searchQuery = ref('');
const currentPage = ref(1);
const sortKey = ref('');
const sortOrder = ref<'asc' | 'desc'>('asc');

// 计算属性
const filteredData = computed<TableItem[]>(() => {
  let data = [...props.data];

  // 搜索过滤
  if (searchQuery.value && props.searchFields && props.searchFields.length) {
    const lowerSearchQuery = searchQuery.value.toLowerCase();
    data = data.filter(item => {
      return props.searchFields!.some(field => {
        const value = item[field as keyof TableItem];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(lowerSearchQuery);
      });
    });
  }

  // 排序
  if (sortKey.value) {
    data.sort((a, b) => {
      const aValue = a[sortKey.value as keyof TableItem];
      const bValue = b[sortKey.value as keyof TableItem];

      if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return data;
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / (props.pageSize || 10));
});

const paginatedData = computed<TableItem[]>(() => {
  const pageSize = props.pageSize || 10;
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return filteredData.value.slice(startIndex, endIndex);
});

const pageNumbers = computed<number[]>(() => {
  const maxVisiblePages = 5;
  const pages: number[] = [];

  if (totalPages.value <= maxVisiblePages) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    let startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  }

  return pages;
});

// 方法
const handleSearch = () => {
  currentPage.value = 1; // 重置为第一页
  emit('search', searchQuery.value);
};

const handleSort = (key: string) => {
  // 如果点击的是当前排序字段，则切换排序顺序
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const handleAdd = () => {
  emit('add');
};

const handleFilter = () => {
  emit('filter');
};

const handleEdit = (id: number) => {
  emit('edit', id);
};

const handleDelete = (id: number) => {
  emit('delete', id);
};

const renderCell = (row: TableItem, column: TableColumn): string => {
  if (column.render) {
    return column.render(row);
  }

  const value = row[column.key as keyof TableItem];

  // 处理日期格式化
  if (column.format === 'date') {
    return formatDate(value as Date);
  } else if (column.format === 'dateTime') {
    return formatDate(value as Date, 'yyyy-MM-dd HH:mm');
  } else if (column.format === 'status') {
    // 处理状态标签
    let statusClass = '';
    let statusText = '';

    switch (value) {
      case 1:
        statusClass = 'tag-success';
        statusText = '正常';
        break;
      case 2:
        statusClass = 'tag-warning';
        statusText = '警告';
        break;
      case 3:
        statusClass = 'tag-danger';
        statusText = '禁用';
        break;
      default:
        statusClass = 'tag-info';
        statusText = '未知';
    }

    return `<span class="tag ${statusClass}">${statusText}</span>`;
  } else if (column.key === 'actions') {
    // 处理操作列
    return `
      <div class="action-buttons">
        <button class="action-btn edit" @click.prevent="handleEdit(${row.id})">
          <i class="fa fa-edit"></i> 编辑
        </button>
        <button class="action-btn delete" @click.prevent="handleDelete(${row.id})">
          <i class="fa fa-trash"></i> 删除
        </button>
      </div>
    `;
  } else {
    return value !== null && value !== undefined ? String(value) : '';
  }
};

// 日期格式化函数
const formatDate = (date: Date, format: string = 'yyyy-MM-dd'): string => {
  if (!date) return '';

  const d = new Date(date);
  const o: Record<string, number> = {
    'M+': d.getMonth() + 1, // 月份
    'd+': d.getDate(), // 日
    'H+': d.getHours(), // 小时
    'm+': d.getMinutes(), // 分
    's+': d.getSeconds(), // 秒
    'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
    'S': d.getMilliseconds() // 毫秒
  };

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }

  return format;
};
</script>

<style scoped>
.data-table-container {
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.table-title h3 {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-color);
}

.table-actions {
  display: flex;
  gap: 0.5rem;
}

.table-search {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.table-container {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 0.75rem 1.5rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.875rem;
}

.table th {
  background-color: var(--bg-color);
  font-weight: 500;
  color: var(--text-light);
  cursor: pointer;
}

.table th:hover {
  background-color: #f0f0f0;
}

.table tr:hover {
  background-color: var(--bg-color);
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-color);
}

.table-info {
  font-size: 0.875rem;
  color: var(--text-light);
}

.table-pagination {
  display: flex;
  align-items: center;
}

.pagination {
  display: flex;
  list-style: none;
  gap: 0.25rem;
}

.pagination li a {
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.875rem;
}

.pagination li.active a {
  background-color: var(--primary-color);
  color: var(--white);
  border-color: var(--primary-color);
}

.pagination li.disabled a {
  color: var(--text-light);
  cursor: not-allowed;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.2s;
}

.action-btn.edit {
  background-color: rgba(33, 150, 243, 0.1);
  color: var(--info-color);
}

.action-btn.delete {
  background-color: rgba(244, 67, 54, 0.1);
  color: var(--danger-color);
}
</style>
