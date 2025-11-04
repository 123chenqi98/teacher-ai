<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';

// 导入公共组件
import AdminSidebar from '@/components/admin/common/AdminSidebar.vue';
import AdminHeader from '@/components/admin/common/AdminHeader.vue';
import Footer from '@/components/admin/common/Footer.vue';
import NavTabs from '@/components/admin/common/NavTabs.vue';

// 导入学期管理专用组件
import SemesterFilter from '@/components/admin/semester/SemesterFilter.vue';
import SemesterTable from '@/components/admin/semester/SemesterTable.vue';
import SemesterActions from '@/components/admin/semester/SemesterActions.vue';

// 路由
const router = useRouter();

// 页面数据
const userName = ref('用户名');
const currentTab = ref('semester');
const searchQuery = ref('');
const loading = ref(false);

// 学期数据类型
interface SemesterData {
  id: number;
  semesterCode: string;
  semesterName: string;
  startDate: string;
  endDate: string;
  status: string;
}

// 表格数据
const tableData = ref<SemesterData[]>([
  {
    id: 1,
    semesterCode: '2024-2025-1',
    semesterName: '2024-2025学年第一学期',
    startDate: '2024-09-01',
    endDate: '2025-01-15',
    status: '进行中'
  },
  {
    id: 2,
    semesterCode: '2024-2025-2',
    semesterName: '2024-2025学年第二学期',
    startDate: '2025-02-20',
    endDate: '2025-06-30',
    status: '未开始'
  },
  {
    id: 3,
    semesterCode: '2023-2024-2',
    semesterName: '2023-2024学年第二学期',
    startDate: '2024-02-21',
    endDate: '2024-07-05',
    status: '已结束'
  }
]);

// 分页数据
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(tableData.value.length);

// 方法
const handleTabChange = (tab: string) => {
  currentTab.value = tab;
  router.push(`/admin/${tab}`);
};

const handleSearch = () => {
  ElMessage.success('搜索成功');
};

const handleNotificationClick = () => {
  ElMessage.info('通知中心');
};

const handleUserMenuClick = () => {
  ElMessage.info('用户菜单');
};

const handleAdd = () => {
  ElMessage.info('新增学期');
};

const handleEdit = (row: SemesterData) => {
  ElMessage.info(`编辑学期: ${row.semesterName}`);
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
    // 模拟删除
    const index = tableData.value.findIndex(item => item.id === row.id);
    if (index > -1) {
      tableData.value.splice(index, 1);
      total.value = tableData.value.length;
    }
    ElMessage.success('删除成功');
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

const handleQuery = () => {
  loading.value = true;
  // 模拟查询延迟
  setTimeout(() => {
    loading.value = false;
    ElMessage.success('查询成功');
  }, 500);
};

const handleReset = () => {
  currentPage.value = 1;
  ElMessage.success('已重置筛选条件');
};

const handleImport = () => {
  ElMessage.info('导入功能待实现');
};

const handleExport = () => {
  ElMessage.info('导出功能待实现');
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const handleSizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
};

const handleExpandFilter = () => {
  ElMessage.info('展开筛选条件功能待实现');
};

const handleViewDetails = (row: SemesterData) => {
  ElMessage.info(`查看学期详情: ${row.semesterName}`);
};

const handleStatusChange = (row: SemesterData, newStatus: string) => {
  ElMessage.info(`修改学期状态: ${row.semesterName} -> ${newStatus}`);
};
</script>

<template>
  <div class="semester-management-page">
    <AdminSidebar 
      :current-tab="currentTab" 
      @tab-change="handleTabChange"
    />
    
    <div class="main-container">
      <AdminHeader 
        title="学期管理"
        :user-name="userName"
        :search-query="searchQuery"
        @search="handleSearch"
        @notification-click="handleNotificationClick"
        @user-menu-click="handleUserMenuClick"
      />
      
      <SemesterFilter 
        @query="handleQuery"
        @reset="handleReset"
        @expand-filter="handleExpandFilter"
      />
      
      <SemesterActions 
        @add="handleAdd"
        @import="handleImport"
        @export="handleExport"
      />
      
      <SemesterTable 
        :loading="loading"
        :table-data="tableData"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @edit="handleEdit"
        @delete="handleDelete"
        @view-details="handleViewDetails"
        @status-change="handleStatusChange"
        @page-change="handlePageChange"
        @size-change="handleSizeChange"
      />
      
      <Footer />
    </div>
  </div>
</template>

<style scoped>
/* 页面容器样式 */
.semester-management-page {
  height: 100vh;
  overflow: hidden;
  display: flex;
  background-color: #f5f7fa;
}

/* 主内容区域样式 */
.main-container {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-left: 240px; /* 为侧边栏留出空间 */
  flex: 1;
}
</style>