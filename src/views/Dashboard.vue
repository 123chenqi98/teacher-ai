<template>
  <div class="dashboard-page">
    <div class="app-container">
      <!-- 侧边栏 -->
      <Sidebar />

      <!-- 主内容区 -->
      <div class="main-content">
        <!-- 顶部导航栏 -->
        <Header
            :page-title="pageTitle"
            :user-name="userName"
            @search="handleSearch"
            @notification-click="handleNotificationClick"
            @user-menu-click="handleUserMenuClick"
        />

        <!-- 页面内容 -->
        <div class="page-content">
          <div class="card p-6">
            <!-- 数据表格 -->
            <DataTable
                :data="tableData"
                :columns="tableColumns"
                :page-size="5"
                :search-fields="['name', 'type']"
                @add="handleAdd"
                @edit="handleEdit"
                @delete="handleDelete"
                @filter="handleFilter"
                @search="handleTableSearch"
            />
          </div>
        </div>

        <!-- 页脚 -->
        <footer class="app-footer">
          <div class="footer-content">
            <div class="footer-left">
              <img src="https://p3-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/1b59835142474067b8e9e33d60fe0c6f.png~tplv-a9rns2rl98-24:720:720.png?rcl=2025110320103101F2E3023457EEB23F36&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1762776631&x-signature=XkAKgNJQdzgKpiMvFWXCz5Horic%3D" alt="Logo" class="footer-logo">
            </div>
            <div class="footer-center">
              <p>© 2025 公司名称 版权所有</p>
              <p>客服热线：400-123-4567</p>
            </div>
            <div class="footer-right">
              <a href="#" class="footer-link">关于我们</a>
              <a href="#" class="footer-link">隐私政策</a>
              <a href="#" class="footer-link">帮助中心</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';
import DataTable from '../components/DataTable.vue';

// 页面数据
const pageTitle = ref('数据管理');
const userName = ref('用户名');

// 表格数据
const tableData = ref<TableItem[]>([
  { id: 1, name: '数据项1', type: '类型A', status: 1, createTime: new Date('2023-01-15') },
  { id: 2, name: '数据项2', type: '类型B', status: 2, createTime: new Date('2023-02-20') },
  { id: 3, name: '数据项3', type: '类型A', status: 1, createTime: new Date('2023-03-10') },
  { id: 4, name: '数据项4', type: '类型C', status: 3, createTime: new Date('2023-04-05') },
  { id: 5, name: '数据项5', type: '类型B', status: 1, createTime: new Date('2023-05-18') },
  { id: 6, name: '数据项6', type: '类型A', status: 2, createTime: new Date('2023-06-22') },
  { id: 7, name: '数据项7', type: '类型C', status: 1, createTime: new Date('2023-07-08') },
  { id: 8, name: '数据项8', type: '类型B', status: 3, createTime: new Date('2023-08-14') },
  { id: 9, name: '数据项9', type: '类型A', status: 1, createTime: new Date('2023-09-30') },
  { id: 10, name: '数据项10', type: '类型C', status: 2, createTime: new Date('2023-10-12') },
  { id: 11, name: '数据项11', type: '类型B', status: 1, createTime: new Date('2023-11-17') },
  { id: 12, name: '数据项12', type: '类型A', status: 3, createTime: new Date('2023-12-05') },
  { id: 13, name: '数据项13', type: '类型C', status: 1, createTime: new Date('2024-01-20') },
  { id: 14, name: '数据项14', type: '类型B', status: 2, createTime: new Date('2024-02-15') },
  { id: 15, name: '数据项15', type: '类型A', status: 1, createTime: new Date('2024-03-10') },
]);

// 表格列定义
const tableColumns = ref<TableColumn[]>([
  { key: 'id', title: 'ID', sortable: true },
  { key: 'name', title: '名称', sortable: true },
  { key: 'type', title: '类型', sortable: true },
  {
    key: 'status',
    title: '状态',
    sortable: true,
    format: 'status'
  },
  {
    key: 'createTime',
    title: '创建时间',
    sortable: true,
    format: 'date'
  },
  {
    key: 'actions',
    title: '操作'
  }
]);

// 方法
const handleSearch = (query: string) => {
  console.log('Search query:', query);
};

const handleNotificationClick = () => {
  console.log('Notification clicked');
  alert('通知中心');
};

const handleUserMenuClick = () => {
  console.log('User menu clicked');
  alert('用户菜单');
};

const handleAdd = () => {
  console.log('Add button clicked');
  alert('新增功能');
};

const handleEdit = (id: number) => {
  console.log('Edit button clicked for id:', id);
  alert(`编辑 ID: ${id}`);
};

const handleDelete = (id: number) => {
  console.log('Delete button clicked for id:', id);
  if (confirm(`确定要删除 ID: ${id} 的数据吗？`)) {
    // 从数据中删除
    tableData.value = tableData.value.filter(item => item.id !== id);
    alert(`删除 ID: ${id}`);
  }
};

const handleFilter = () => {
  console.log('Filter button clicked');
  alert('筛选功能');
};

const handleTableSearch = (query: string) => {
  console.log('Table search query:', query);
};
</script>

<style scoped>
.dashboard-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-container {
  display: flex;
  flex: 1;
  height: calc(100vh - 64px);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  background-color: var(--bg-color);
}

.app-footer {
  height: 64px;
  background-color: var(--white);
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.footer-logo {
  height: 32px;
}

.footer-center {
  text-align: center;
}

.footer-center p {
  font-size: 0.75rem;
  color: var(--text-light);
  margin: 0;
}

.footer-right {
  display: flex;
  gap: 1rem;
}

.footer-link {
  font-size: 0.75rem;
  color: var(--text-light);
  text-decoration: none;
}

.footer-link:hover {
  color: var(--primary-color);
}
</style>
