<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';

// 导入公共组件
import AdminSidebar from '@/components/admin/common/AdminSidebar.vue';
import AdminHeader from '@/components/admin/common/AdminHeader.vue';
import Footer from '@/components/admin/common/Footer.vue';

// 导入年级管理专用组件
import GradeFilter from '@/components/admin/grade/GradeFilter.vue';
import GradeTable from '@/components/admin/grade/GradeTable.vue';
import GradeActions from '@/components/admin/grade/GradeActions.vue';

// 路由
const router = useRouter();

// 页面数据
const userName = ref('用户名');
const currentTab = ref('grade');
const searchQuery = ref('');
const loading = ref(false);

// 年级数据类型
interface GradeData {
  id: number;
  code: string;
  name: string;
  description: string;
  status: string;
}

// 表格数据
const tableData = ref<GradeData[]>([
  {
    id: 1,
    code: 'G001',
    name: '一年级',
    description: '小学一年级',
    status: '启用'
  },
  {
    id: 2,
    code: 'G002',
    name: '二年级',
    description: '小学二年级',
    status: '启用'
  },
  {
    id: 3,
    code: 'G003',
    name: '三年级',
    description: '小学三年级',
    status: '启用'
  },
  {
    id: 4,
    code: 'G004',
    name: '四年级',
    description: '小学四年级',
    status: '启用'
  },
  {
    id: 5,
    code: 'G005',
    name: '五年级',
    description: '小学五年级',
    status: '启用'
  },
  {
    id: 6,
    code: 'G006',
    name: '六年级',
    description: '小学六年级',
    status: '启用'
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

const handleAdd = () => {
  ElMessage.info('新增年级功能待实现');
};

const handleEdit = (row: GradeData) => {
  ElMessage.info(`编辑年级: ${row.name}`);
};

const handleDelete = (row: GradeData) => {
  ElMessageBox.confirm(
    `确定要删除 ${row.name} 的年级数据吗？`,
    '删除确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    tableData.value = tableData.value.filter(item => item.id !== row.id);
    total.value = tableData.value.length;
    ElMessage.success('删除成功');
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
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

<script lang="ts">
import { Calendar, Document, User, Cpu, Setting } from '@element-plus/icons-vue';

export default {
  components: {
    Calendar,
    Document,
    User,
    Cpu,
    Setting
  }
};
</script>

<template>
  <el-container class="grade-management-page">
    <!-- 使用侧边栏组件 -->
    <AdminSidebar :currentTab="currentTab" @tab-change="handleTabChange" />

    <!-- 主内容区 -->
    <el-container class="main-container">
      <!-- 使用头部组件 -->
      <AdminHeader 
        title="年级管理"
        :userName="userName" 
        :searchQuery="searchQuery" 
        @search="handleSearch" 
        @notification-click="handleNotificationClick" 
        @user-menu-click="handleUserMenuClick" 
      />

      <!-- 页面内容 -->
      <el-main class="page-content">
        <!-- 导航标签 -->
        <el-tabs v-model="currentTab" class="nav-tabs" @tab-click="handleTabChange">
          <el-tab-pane label="学期管理" name="semester" />
          <el-tab-pane label="学科管理" name="subject" />
          <el-tab-pane label="年级管理" name="grade" />
          <el-tab-pane label="教学大纲管理" name="syllabus" />
        </el-tabs>

        <!-- 使用筛选组件 -->
        <GradeFilter 
          @query="handleQuery" 
          @reset="handleReset" 
          @expand="handleExpandFilter" 
        />

        <!-- 使用操作按钮组件 -->
        <GradeActions 
          @add="handleAdd" 
          @import="handleImport" 
          @export="handleExport" 
        />

        <!-- 使用表格组件 -->
        <GradeTable 
          :loading="loading"
          :tableData="tableData"
          :currentPage="currentPage"
          :pageSize="pageSize"
          :total="total"
          @edit="handleEdit"
          @delete="handleDelete"
          @page-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </el-main>

      <!-- 使用页脚组件 -->
      <Footer />
    </el-container>
  </el-container>
</template>

<style scoped>
/* 页面容器样式 */
.grade-management-page {
  height: 100vh;
  overflow: hidden;
  display: flex;
}

.main-container {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-left: 240px; /* 为侧边栏留出空间 */
  flex: 1;
}
</style>