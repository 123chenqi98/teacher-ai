<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';

// 导入公共组件
import AdminSidebar from '@/components/admin/common/AdminSidebar.vue';
import AdminHeader from '@/components/admin/common/AdminHeader.vue';
import Footer from '@/components/admin/common/Footer.vue';

// 路由
const router = useRouter();

// 页面数据
const userName = ref('用户名');
const currentTab = ref('syllabus');
const searchQuery = ref('');
const loading = ref(false);

// 教学大纲数据类型
interface SyllabusData {
  id: number;
  grade: string;
  syllabus: string;
  subject: string;
  phase: string;
}

// 表格数据
const tableData = ref<SyllabusData[]>([
  {
    id: 1,
    grade: '大一',
    syllabus: '《语文(必修)》',
    subject: '语文',
    phase: '春季'
  },
  {
    id: 2,
    grade: '大二',
    syllabus: '《数学(必修)》',
    subject: '数学',
    phase: '春季'
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
  ElMessage.info('新增教学大纲功能待实现');
};

const handleEdit = (row: SyllabusData) => {
  ElMessage.info(`编辑教学大纲: ${row.syllabus}`);
};

const handleDelete = (row: SyllabusData) => {
  ElMessageBox.confirm(
    `确定要删除 ${row.syllabus} 的教学大纲数据吗？`,
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

const handleBatchDelete = () => {
  ElMessage.info('批量删除功能待实现');
};

const handleBatchImport = () => {
  ElMessage.info('批量导入功能待实现');
};
</script>

<template>
  <el-container class="syllabus-management-page">
    <!-- 使用侧边栏组件 -->
    <AdminSidebar :currentTab="currentTab" @tab-change="handleTabChange" />

    <!-- 主内容区 -->
    <el-container class="main-container">
      <!-- 使用头部组件 -->
      <AdminHeader 
        title="教学大纲管理"
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
          <el-tab-pane label="年级列表" name="year" />
          <el-tab-pane label="教学大纲管理" name="syllabus" />
        </el-tabs>

        <!-- 筛选区域 -->
        <el-card class="filter-card">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="年级：">
              <el-select v-model="searchQuery" placeholder="请选择年级" clearable>
                <el-option label="大一" value="大一" />
                <el-option label="大二" value="大二" />
                <el-option label="大三" value="大三" />
                <el-option label="大四" value="大四" />
              </el-select>
            </el-form-item>
            <el-form-item label="课程：">
              <el-input v-model="searchQuery" placeholder="请输入课程名称" clearable />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleQuery">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
              <el-button type="text" @click="handleExpandFilter">高级筛选</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 操作按钮区域 -->
        <div class="action-buttons">
          <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>新增</el-button>
          <el-button @click="handleBatchDelete">批量删除</el-button>
          <el-button @click="handleImport">导入</el-button>
          <el-button @click="handleExport">导出</el-button>
          <div class="batch-actions">
            <el-button type="text">批量操作</el-button>
            <el-select v-model="searchQuery" placeholder="请选择" style="width: 120px;">
              <el-option label="删除所选" value="delete" />
              <el-option label="导出所选" value="export" />
            </el-select>
            <el-button type="primary">确定</el-button>
          </div>
        </div>

        <!-- 表格区域 -->
        <el-card class="table-card">
          <el-table 
            :data="tableData" 
            style="width: 100%" 
            :loading="loading"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="grade" label="年级" width="120" />
            <el-table-column prop="syllabus" label="大纲名称" width="200" />
            <el-table-column prop="subject" label="课程" width="120" />
            <el-table-column prop="phase" label="阶段" width="120" />
            <el-table-column label="操作" width="280" fixed="right">
              <template #default="{ row }">
                <el-button size="small" type="primary" @click="handleEdit(row)">编辑</el-button>
                <el-button size="small" type="success">查看</el-button>
                <el-button size="small" type="warning">禁用</el-button>
                <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[10, 20, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handlePageChange"
            />
          </div>
        </el-card>
      </el-main>

      <!-- 使用页脚组件 -->
      <Footer />
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Plus, Calendar, Document, User, Cpu } from '@element-plus/icons-vue';

export default {
  components: {
    Plus,
    Calendar,
    Document,
    User,
    Cpu
  }
};
</script>

<style scoped>
/* 页面容器样式 */
.syllabus-management-page {
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
  overflow-y: auto;
  padding: 20px;
  background-color: #f0f2f5;
}

.nav-tabs {
  margin-bottom: 20px;
}

.filter-card {
  margin-bottom: 20px;
}

.action-buttons {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
}

.batch-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
}

.table-card {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>