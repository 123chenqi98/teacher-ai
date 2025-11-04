<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';

// 导入公共组件
import AdminSidebar from '@/components/admin/common/AdminSidebar.vue';
import AdminHeader from '@/components/admin/common/AdminHeader.vue';
import Footer from '@/components/admin/common/Footer.vue';

// 导入数据初始化管理专用组件
import DataInitialFilter from '@/components/admin/data/DataInitialFilter.vue';
import DataInitialActions from '@/components/admin/data/DataInitialActions.vue';
import DataInitialTable from '@/components/admin/data/DataInitialTable.vue';

// 路由
const router = useRouter();

// 页面数据
const userName = ref('用户名');
const currentTab = ref('data');
const searchQuery = ref('');
const loading = ref(false);

// 初始化数据类型
interface InitDataType {
  id: number;
  name: string;
  description: string;
  status: string;
  lastUpdate: string;
}

// 表格数据
const tableData = ref<InitDataType[]>([
  {
    id: 1,
    name: '学期数据',
    description: '初始化学期基本数据',
    status: '已完成',
    lastUpdate: '2025-10-15 10:30:00'
  },
  {
    id: 2,
    name: '学科数据',
    description: '初始化学科基本数据',
    status: '已完成',
    lastUpdate: '2025-10-16 14:20:00'
  },
  {
    id: 3,
    name: '年级数据',
    description: '初始化年级基本数据',
    status: '已完成',
    lastUpdate: '2025-10-17 09:15:00'
  },
  {
    id: 4,
    name: '学生信息',
    description: '初始化学生基本信息',
    status: '未完成',
    lastUpdate: ''
  },
  {
    id: 5,
    name: '教师信息',
    description: '初始化教师基本信息',
    status: '未完成',
    lastUpdate: ''
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

const handleExpandFilter = () => {
  ElMessage.info('展开筛选条件功能待实现');
};

const handleInit = (row: InitDataType) => {
  if (row.status === '已完成') {
    ElMessageBox.confirm(
      `确定要重新初始化 ${row.name} 吗？这将会覆盖现有数据。`,
      '重新初始化确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(() => {
      loading.value = true;
      // 模拟初始化延迟
      setTimeout(() => {
        const now = new Date();
        row.lastUpdate = now.toLocaleString('zh-CN');
        loading.value = false;
        ElMessage.success(`成功重新初始化 ${row.name}`);
      }, 1000);
    }).catch(() => {
      ElMessage.info('已取消初始化');
    });
  } else {
    loading.value = true;
    // 模拟初始化延迟
    setTimeout(() => {
      row.status = '已完成';
      const now = new Date();
      row.lastUpdate = now.toLocaleString('zh-CN');
      loading.value = false;
      ElMessage.success(`成功初始化 ${row.name}`);
    }, 1000);
  }
};

const handleClear = (row: InitDataType) => {
  ElMessageBox.confirm(
    `确定要清除 ${row.name} 的所有数据吗？此操作不可恢复。`,
    '清除数据确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error'
    }
  ).then(() => {
    loading.value = true;
    // 模拟清除延迟
    setTimeout(() => {
      row.status = '未完成';
      row.lastUpdate = '';
      loading.value = false;
      ElMessage.success(`成功清除 ${row.name} 数据`);
    }, 1000);
  }).catch(() => {
    ElMessage.info('已取消清除操作');
  });
};

const handleUpload = (file: File) => {
  loading.value = true;
  // 模拟上传延迟
  setTimeout(() => {
    loading.value = false;
    ElMessage.success(`成功上传文件: ${file.name}`);
  }, 1500);
};

const handleImportTemplate = () => {
  ElMessage.info('导入模板功能待实现');
};

const handleExportData = () => {
  ElMessage.info('导出数据功能待实现');
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const handleSizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
};

const handleSearch = () => {
  ElMessage.success('搜索成功');
};

const handleNotificationClick = () => {
  ElMessage.info('通知点击');
};

const handleUserMenuClick = () => {
  ElMessage.info('用户菜单点击');
};
</script>

<template>
  <div class="data-initial-management-page">
    <AdminSidebar 
      :current-tab="currentTab" 
      @tab-change="handleTabChange"
    />
    
    <div class="main-container">
      <AdminHeader 
        title="数据初始化管理"
        :user-name="userName"
        :search-query="searchQuery"
        @search="handleSearch"
        @notification-click="handleNotificationClick"
        @user-menu-click="handleUserMenuClick"
      />
      
      <DataInitialFilter 
        @query="handleQuery"
        @reset="handleReset"
        @expand-filter="handleExpandFilter"
      />
      
      <DataInitialActions 
        @upload="handleUpload"
        @import-template="handleImportTemplate"
        @export-data="handleExportData"
      />
      
      <DataInitialTable 
        :data="tableData"
        :loading="loading"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @init="handleInit"
        @clear="handleClear"
        @page-change="handlePageChange"
        @size-change="handleSizeChange"
      />
      
      <Footer />
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/admin/data.scss';

.data-initial-management-page {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>