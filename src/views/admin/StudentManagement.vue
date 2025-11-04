<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';

// 导入组件
import Sidebar from '@/components/admin/common/Sidebar.vue';
import Header from '@/components/admin/common/Header.vue';
import Footer from '@/components/admin/common/Footer.vue';
import NavTabs from '@/components/admin/common/NavTabs.vue';
import StudentFilter from '@/components/admin/student/StudentFilter.vue';
import StudentTable from '@/components/admin/student/StudentTable.vue';
import StudentActions from '@/components/admin/student/StudentActions.vue';

// 导入样式
import '@/styles/admin/common.scss';
import '@/styles/admin/student.scss';

// 路由
const router = useRouter();

// 页面数据
const userName = ref('用户名');
const currentTab = ref('student');
const searchQuery = ref('');
const loading = ref(false);

// 学生数据类型
interface StudentData {
  id: number;
  studentId: string;
  name: string;
  gender: string;
  age: number;
  class: string;
  grade: string;
  major: string;
  status: string;
  contact: string;
  admissionDate: string;
}

// 表格数据
const tableData = ref<StudentData[]>([
  {
    id: 1,
    studentId: '2022001',
    name: '张三',
    gender: '男',
    age: 20,
    class: '计算机1班',
    grade: '大三',
    major: '计算机科学与技术',
    status: '在读',
    contact: '13800138001',
    admissionDate: '2022-09-01'
  },
  {
    id: 2,
    studentId: '2022002',
    name: '李四',
    gender: '女',
    age: 19,
    class: '计算机1班',
    grade: '大三',
    major: '计算机科学与技术',
    status: '在读',
    contact: '13800138002',
    admissionDate: '2022-09-01'
  },
  {
    id: 3,
    studentId: '2022003',
    name: '王五',
    gender: '男',
    age: 20,
    class: '计算机2班',
    grade: '大三',
    major: '计算机科学与技术',
    status: '在读',
    contact: '13800138003',
    admissionDate: '2022-09-01'
  },
  {
    id: 4,
    studentId: '2022004',
    name: '赵六',
    gender: '女',
    age: 20,
    class: '计算机2班',
    grade: '大三',
    major: '计算机科学与技术',
    status: '在读',
    contact: '13800138004',
    admissionDate: '2022-09-01'
  },
  {
    id: 5,
    studentId: '2022005',
    name: '钱七',
    gender: '男',
    age: 19,
    class: '软件工程1班',
    grade: '大三',
    major: '软件工程',
    status: '在读',
    contact: '13800138005',
    admissionDate: '2022-09-01'
  },
  {
    id: 6,
    studentId: '2023001',
    name: '孙八',
    gender: '女',
    age: 18,
    class: '计算机1班',
    grade: '大二',
    major: '计算机科学与技术',
    status: '在读',
    contact: '13800138006',
    admissionDate: '2023-09-01'
  },
  {
    id: 7,
    studentId: '2023002',
    name: '周九',
    gender: '男',
    age: 18,
    class: '计算机1班',
    grade: '大二',
    major: '计算机科学与技术',
    status: '在读',
    contact: '13800138007',
    admissionDate: '2023-09-01'
  },
  {
    id: 8,
    studentId: '2023003',
    name: '吴十',
    gender: '女',
    age: 18,
    class: '软件工程2班',
    grade: '大二',
    major: '软件工程',
    status: '在读',
    contact: '13800138008',
    admissionDate: '2023-09-01'
  },
  {
    id: 9,
    studentId: '2024001',
    name: '郑十一',
    gender: '男',
    age: 17,
    class: '计算机1班',
    grade: '大一',
    major: '计算机科学与技术',
    status: '在读',
    contact: '13800138009',
    admissionDate: '2024-09-01'
  },
  {
    id: 10,
    studentId: '2024002',
    name: '陈十二',
    gender: '女',
    age: 17,
    class: '计算机1班',
    grade: '大一',
    major: '计算机科学与技术',
    status: '在读',
    contact: '13800138010',
    admissionDate: '2024-09-01'
  }
]);

// 分页数据
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(tableData.value.length);

// 筛选条件
const filterForm = reactive({
  studentId: '',
  name: '',
  gender: '全部',
  grade: '全部年级',
  status: '全部状态'
});

// 状态选项
const statusOptions = ['全部状态', '在读', '休学', '退学', '毕业'];

// 获取当前日期
const getCurrentDate = () => {
  const now = new Date();
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const month = now.getMonth() + 1;
  const date = now.getDate();
  return `${weekdays[now.getDay()]}，${month}月${date}日`;
};

// 事件处理方法
const handleSearch = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    ElMessage.success('搜索成功');
  }, 500);
};

const handleTabChange = (tab: string) => {
  currentTab.value = tab;
  router.push(`/admin/${tab}`);
};

const handleQuery = (form: any) => {
  Object.assign(filterForm, form);
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    ElMessage.success('查询成功');
  }, 500);
};

const handleReset = () => {
  currentPage.value = 1;
};

const handleEdit = (row: StudentData) => {
  ElMessage.info(`编辑学生: ${row.name}`);
};

const handleDelete = (row: StudentData) => {
  ElMessageBox.confirm(
    `确定要删除学生 ${row.name} 的信息吗？`,
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

const handleViewDetails = (row: StudentData) => {
  ElMessage.info(`查看学生 ${row.name} 的详细信息`);
};

const handleToggleStatus = (row: StudentData) => {
  ElMessageBox.prompt(
    `请选择新的状态：`,
    `修改学生 ${row.name} 状态`,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      input: 'select',
      inputOptions: {
        options: statusOptions.filter(option => option !== '全部状态')
      }
    }
  ).then(({ value }) => {
    const item = tableData.value.find(item => item.id === row.id);
    if (item) {
      item.status = value;
    }
    ElMessage.success('状态修改成功');
  }).catch(() => {
    ElMessage.info('已取消状态修改');
  });
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const handleSizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
};

const handleNotificationClick = () => {
  ElNotification.info({
    title: '通知中心',
    message: '暂无新通知',
    position: 'bottom-right'
  });
};

const handleUserMenuClick = (command: string) => {
  ElMessage.info(`用户菜单命令: ${command}`);
};
</script>

<template>
  <el-container class="student-management-page">
    <!-- 侧边栏 -->
    <Sidebar :current-tab="currentTab" @tab-change="handleTabChange" />

    <!-- 主内容区 -->
    <el-container class="main-container">
      <!-- 顶部导航栏 -->
      <Header
        :user-name="userName"
        :search-query="searchQuery"
        @search="handleSearch"
        @notification-click="handleNotificationClick"
        @user-menu-click="handleUserMenuClick"
      />

      <!-- 页面内容 -->
      <el-main class="page-content">
        <!-- 导航标签 -->
        <NavTabs :current-tab="currentTab" @tab-click="handleTabChange" />

        <!-- 筛选区域 -->
        <StudentFilter
          @query="handleQuery"
          @reset="handleReset"
          @expand="() => {}"
        />

        <!-- 操作按钮 -->
        <StudentActions
          @add="handleEdit({} as StudentData)"
          @import="() => {}"
          @export="() => {}"
        />

        <!-- 数据表格 -->
        <StudentTable
          :loading="loading"
          :table-data="tableData"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          :filter-form="filterForm"
          @edit="handleEdit"
          @delete="handleDelete"
          @view-details="handleViewDetails"
          @toggle-status="handleToggleStatus"
          @page-change="handlePageChange"
          @size-change="handleSizeChange"
        />
      </el-main>

      <!-- 页脚 -->
      <Footer />
    </el-container>
  </el-container>
</template>

<style scoped>
/* 保留页面特定样式，大部分样式已移至外部样式文件 */
.student-management-page {
  height: 100vh;
  overflow: hidden;
}
</style>