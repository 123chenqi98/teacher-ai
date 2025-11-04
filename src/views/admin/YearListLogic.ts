// YearList逻辑文件
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';

// 年级数据类型
export interface YearData {
  id: number;
  yearName: string;
  classCount: number;
  studentCount: number;
  headTeacher: string;
  status: string;
  remark: string;
}

// 导出组合式函数
export function useYearList() {
  // 路由
  const router = useRouter();

  // 页面数据
  const pageTitle = ref('年级列表');
  const userName = ref('用户名');
  const currentTab = ref('year');
  const searchQuery = ref('');
  const loading = ref(false);

  // 表格数据
  const tableData = ref<YearData[]>([
    {
      id: 1,
      yearName: '一年级',
      classCount: 6,
      studentCount: 240,
      headTeacher: '张老师',
      status: '在读',
      remark: '2025年入学'
    },
    {
      id: 2,
      yearName: '二年级',
      classCount: 6,
      studentCount: 235,
      headTeacher: '李老师',
      status: '在读',
      remark: '2024年入学'
    },
    {
      id: 3,
      yearName: '三年级',
      classCount: 6,
      studentCount: 242,
      headTeacher: '王老师',
      status: '在读',
      remark: '2023年入学'
    },
    {
      id: 4,
      yearName: '四年级',
      classCount: 6,
      studentCount: 238,
      headTeacher: '刘老师',
      status: '在读',
      remark: '2022年入学'
    },
    {
      id: 5,
      yearName: '五年级',
      classCount: 6,
      studentCount: 245,
      headTeacher: '陈老师',
      status: '在读',
      remark: '2021年入学'
    },
    {
      id: 6,
      yearName: '六年级',
      classCount: 6,
      studentCount: 241,
      headTeacher: '赵老师',
      status: '在读',
      remark: '2020年入学'
    }
  ]);

  // 分页数据
  const currentPage = ref(1);
  const pageSize = ref(10);
  const total = ref(tableData.value.length);

  // 筛选条件
  const filterForm = reactive({
    yearName: '',
    headTeacher: '',
    status: '全部状态'
  });

  // 问候语
  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 6) return '凌晨好';
    if (hour < 12) return '早上好';
    if (hour < 14) return '中午好';
    if (hour < 18) return '下午好';
    return '晚上好';
  };

  // 获取当前日期
  const getCurrentDate = () => {
    const now = new Date();
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const month = now.getMonth() + 1;
    const date = now.getDate();
    return `${weekdays[now.getDay()]}，${month}月${date}日`;
  };

  // 方法
  const handleSearch = () => {
    loading.value = true;
    // 模拟搜索延迟
    setTimeout(() => {
      loading.value = false;
      ElMessage.success('搜索成功');
    }, 500);
  };

  const handleNotificationClick = () => {
    ElNotification.info({
      title: '通知中心',
      message: '暂无新通知',
      position: 'bottom-right'
    });
  };

  const handleUserMenuClick = () => {
    ElMessage.info('用户菜单已点击');
  };

  const handleAdd = () => {
    ElMessage.info('新增年级功能待实现');
  };

  const handleEdit = (row: YearData) => {
    ElMessage.info(`编辑年级: ${row.yearName}`);
  };

  const handleDelete = (row: YearData) => {
    ElMessageBox.confirm(
      `确定要删除年级 ${row.yearName} 的信息吗？`,
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

  const handleQuery = () => {
    loading.value = true;
    // 模拟查询延迟
    setTimeout(() => {
      loading.value = false;
      ElMessage.success('查询成功');
    }, 500);
  };

  const handleReset = () => {
    Object.assign(filterForm, { yearName: '', headTeacher: '', status: '全部状态' });
    currentPage.value = 1;
    ElMessage.success('已重置筛选条件');
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

  const handleViewDetails = (row: YearData) => {
    ElMessage.info(`查看年级 ${row.yearName} 的详细信息`);
  };

  const handleClassList = (row: YearData) => {
    ElMessage.info(`查看年级 ${row.yearName} 的班级列表`);
  };

  const handleStudentList = (row: YearData) => {
    ElMessage.info(`查看年级 ${row.yearName} 的学生列表`);
  };

  return {
    pageTitle,
    userName,
    currentTab,
    searchQuery,
    loading,
    tableData,
    currentPage,
    pageSize,
    total,
    filterForm,
    getGreeting,
    getCurrentDate,
    handleSearch,
    handleNotificationClick,
    handleUserMenuClick,
    handleAdd,
    handleEdit,
    handleDelete,
    handleQuery,
    handleReset,
    handleImport,
    handleExport,
    handleTabChange,
    handlePageChange,
    handleSizeChange,
    handleExpandFilter,
    handleViewDetails,
    handleClassList,
    handleStudentList
  };
}