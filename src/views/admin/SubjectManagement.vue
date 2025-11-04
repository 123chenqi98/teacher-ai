<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import AdminSidebar from '@/components/admin/common/AdminSidebar.vue';
import AdminHeader from '@/components/admin/common/AdminHeader.vue';
import Footer from '@/components/admin/common/Footer.vue';
import SubjectFilter from '@/components/admin/subject/SubjectFilter.vue';
import SubjectTable from '@/components/admin/subject/SubjectTable.vue';
import SubjectActions from '@/components/admin/subject/SubjectActions.vue';

// 路由
const router = useRouter();

// 页面数据
const userName = ref('用户名');
const searchQuery = ref('');
const currentTab = ref('subject');
const loading = ref(false);

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

// 表格数据
const tableData = ref<SubjectData[]>([
  {
    id: 1,
    subjectCode: 'CS101',
    subjectName: '计算机基础',
    category: '公共课',
    credits: 3,
    classHours: 48,
    department: '计算机学院',
    status: '启用',
    createTime: '2024-01-15'
  },
  {
    id: 2,
    subjectCode: 'CS201',
    subjectName: '数据结构',
    category: '专业基础课',
    credits: 4,
    classHours: 64,
    department: '计算机学院',
    status: '启用',
    createTime: '2024-01-15'
  },
  {
    id: 3,
    subjectCode: 'CS301',
    subjectName: '操作系统',
    category: '专业核心课',
    credits: 4,
    classHours: 64,
    department: '计算机学院',
    status: '启用',
    createTime: '2024-01-15'
  },
  {
    id: 4,
    subjectCode: 'CS302',
    subjectName: '计算机网络',
    category: '专业核心课',
    credits: 4,
    classHours: 64,
    department: '计算机学院',
    status: '启用',
    createTime: '2024-01-15'
  },
  {
    id: 5,
    subjectCode: 'CS401',
    subjectName: '人工智能导论',
    category: '专业选修课',
    credits: 3,
    classHours: 48,
    department: '计算机学院',
    status: '启用',
    createTime: '2024-01-15'
  }
]);

// 分页数据
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: tableData.value.length
});

// 筛选条件
const filterForm = reactive({
  subjectCode: '',
  subjectName: '',
  category: '全部类别',
  status: '全部状态'
});

// 计算筛选后的数据
const filteredData = computed(() => {
  return tableData.value.filter(item => {
    const matchesCode = item.subjectCode.toLowerCase().includes(filterForm.subjectCode.toLowerCase());
    const matchesName = item.subjectName.toLowerCase().includes(filterForm.subjectName.toLowerCase());
    const matchesCategory = filterForm.category === '全部类别' || item.category === filterForm.category;
    const matchesStatus = filterForm.status === '全部状态' || item.status === filterForm.status;
    return matchesCode && matchesName && matchesCategory && matchesStatus;
  });
});

// 方法
const handleSearch = () => {
  ElMessage.success('搜索成功');
};

const handleEdit = (row: SubjectData) => {
  ElMessage.info(`编辑学科: ${row.subjectName}`);
};

const handleDelete = (row: SubjectData) => {
  ElMessageBox.confirm(
    `确定要删除学科 ${row.subjectName} 吗？`,
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
      pagination.total = tableData.value.length;
    }
    ElMessage.success('删除成功');
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

const handleViewDetails = (row: SubjectData) => {
  ElMessage.info(`查看学科详情: ${row.subjectName}`);
};

const handleStatusChange = (row: SubjectData) => {
  const newStatus = row.status === '启用' ? '禁用' : '启用';
  ElMessage.info(`修改学科状态: ${row.subjectName} -> ${newStatus}`);
};

const handleReset = () => {
  pagination.currentPage = 1;
  ElMessage.success('已重置筛选条件');
};

const handleFilterChange = (filters: any) => {
  Object.assign(filterForm, filters);
  handleQuery();
};

const handleAdd = () => {
  ElMessage.info('新增学科功能待实现');
};

const handleImport = () => {
  ElMessage.info('导入功能待实现');
};

const handleExport = () => {
  ElMessage.info('导出功能待实现');
};

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

const handleCurrentChange = (val: number) => {
  pagination.currentPage = val;
  handleQuery();
};

const handleSizeChange = (val: number) => {
  pagination.pageSize = val;
  pagination.currentPage = 1;
  handleQuery();
};

const handleNotificationClick = () => {
  ElMessage.info('通知功能待实现');
};

const handleUserMenuClick = () => {
  ElMessage.info('用户菜单功能待实现');
};
</script>

<template>
  <el-container class="subject-management-page">
    <!-- 侧边栏 -->
    <AdminSidebar :current-tab="currentTab" @tab-change="handleTabChange" />

    <!-- 主内容区 -->
    <el-container class="main-container">
      <!-- 顶部导航栏 -->
      <AdminHeader 
        title="学科管理"
        :user-name="userName"
        :search-query="searchQuery"
        @search="handleSearch"
        @notification-click="handleNotificationClick" 
        @user-menu-click="handleUserMenuClick" 
      />

      <!-- 页面内容 -->
      <el-main class="page-content">
        <!-- 筛选区域 -->
        <SubjectFilter 
          @filter-change="handleFilterChange"
          @reset="handleReset"
        />

        <!-- 操作按钮 -->
        <SubjectActions @add="handleAdd" @import="handleImport" @export="handleExport" />

        <!-- 数据表格 -->
        <SubjectTable
          :table-data="tableData"
          :current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          :loading="loading"
          :filter-form="filterForm"
          @edit="handleEdit"
          @delete="handleDelete"
          @view-details="handleViewDetails"
          @toggle-status="handleStatusChange"
          @page-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-main>

      <!-- 页脚 -->
      <Footer />
    </el-container>
  </el-container>
</template>

<style scoped>
.subject-management-page {
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

.page-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f7fa;
}
</style>