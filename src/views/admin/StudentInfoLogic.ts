// StudentInfo逻辑文件
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';

// 学生数据类型
export interface StudentData {
  id: number;
  studentId: string;
  name: string;
  gender: string;
  age: number;
  department: string;
  major: string;
  className: string;
  admissionYear: number;
  contact: string;
  status: string;
}

// 导出组合式函数
export function useStudentInfo() {
  // 路由
  const router = useRouter();

  // 页面数据
  const userName = ref('用户名');
  const currentTab = ref('student');
  const searchQuery = ref('');
  const loading = ref(false);

  // 表格数据
  const tableData = ref<StudentData[]>([
    {
      id: 1,
      studentId: '2022001',
      name: '张三',
      gender: '男',
      age: 20,
      department: '计算机学院',
      major: '计算机科学与技术',
      className: '计科2201',
      admissionYear: 2022,
      contact: '13800138001',
      status: '在读'
    },
    {
      id: 2,
      studentId: '2022002',
      name: '李四',
      gender: '女',
      age: 19,
      department: '计算机学院',
      major: '软件工程',
      className: '软工2202',
      admissionYear: 2022,
      contact: '13800138002',
      status: '在读'
    },
    {
      id: 3,
      studentId: '2022003',
      name: '王五',
      gender: '男',
      age: 21,
      department: '理学院',
      major: '数学与应用数学',
      className: '数学2201',
      admissionYear: 2022,
      contact: '13800138003',
      status: '在读'
    },
    {
      id: 4,
      studentId: '2021001',
      name: '赵六',
      gender: '男',
      age: 21,
      department: '计算机学院',
      major: '数据科学与大数据技术',
      className: '数据2101',
      admissionYear: 2021,
      contact: '13800138004',
      status: '在读'
    },
    {
      id: 5,
      studentId: '2021002',
      name: '钱七',
      gender: '女',
      age: 20,
      department: '外国语学院',
      major: '英语',
      className: '英语2101',
      admissionYear: 2021,
      contact: '13800138005',
      status: '在读'
    },
    {
      id: 6,
      studentId: '2020001',
      name: '孙八',
      gender: '男',
      age: 22,
      department: '计算机学院',
      major: '人工智能',
      className: '智能2001',
      admissionYear: 2020,
      contact: '13800138006',
      status: '在读'
    },
    {
      id: 7,
      studentId: '2020002',
      name: '周九',
      gender: '女',
      age: 22,
      department: '商学院',
      major: '会计学',
      className: '会计2001',
      admissionYear: 2020,
      contact: '13800138007',
      status: '在读'
    },
    {
      id: 8,
      studentId: '2023001',
      name: '吴十',
      gender: '男',
      age: 18,
      department: '计算机学院',
      major: '计算机科学与技术',
      className: '计科2301',
      admissionYear: 2023,
      contact: '13800138008',
      status: '在读'
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
    department: '全部院系',
    major: '全部专业',
    status: '全部状态'
  });

  // 获取当前日期
  const getCurrentDate = () => {
    const now = new Date();
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const month = now.getMonth() + 1;
    const date = now.getDate();
    return `${weekdays[now.getDay()]}，${month}月${date}日`;
  };

  // 获取院系列表（用于下拉框）
  const departmentList = computed(() => {
    const depts = ['全部院系', ...Array.from(new Set(tableData.value.map(item => item.department)))];
    return depts.map(dept => ({ label: dept, value: dept }));
  });

  // 根据选中的院系获取专业列表
  const majorList = computed(() => {
    const majorSet = new Set<string>();
    if (filterForm.department === '全部院系') {
      tableData.value.forEach(item => majorSet.add(item.major));
    } else {
      tableData.value
        .filter(item => item.department === filterForm.department)
        .forEach(item => majorSet.add(item.major));
    }
    return ['全部专业', ...Array.from(majorSet)].map(major => ({ label: major, value: major }));
  });

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

  const handleUserMenuClick = (command: string) => {
    if (command === 'logout') {
      router.push('/login');
    } else {
      ElMessage.info(`用户菜单已点击: ${command}`);
    }
  };

  const handleAdd = () => {
    ElMessage.info('新增学生功能待实现');
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

  const handleQuery = () => {
    loading.value = true;
    // 模拟查询延迟
    setTimeout(() => {
      loading.value = false;
      ElMessage.success('查询成功');
    }, 500);
  };

  const handleReset = () => {
    Object.assign(filterForm, { 
      studentId: '', 
      name: '', 
      department: '全部院系',
      major: '全部专业',
      status: '全部状态' 
    });
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

  const handleViewDetails = (row: StudentData) => {
    ElMessage.info(`查看学生 ${row.name} 的详细信息`);
  };

  const handleDepartmentChange = () => {
    // 当院系改变时，重置专业选择
    filterForm.major = '全部专业';
  };

  return {
    userName,
    currentTab,
    searchQuery,
    loading,
    tableData,
    currentPage,
    pageSize,
    total,
    filterForm,
    getCurrentDate,
    departmentList,
    majorList,
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
    handleDepartmentChange
  };
}