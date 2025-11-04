<script setup lang="ts">
import { Calendar, Document, User, Timer, Setting, ArrowDown, Plus } from '@element-plus/icons-vue';

// 导入公共组件
import AdminSidebar from '@/components/admin/common/AdminSidebar.vue';
import AdminHeader from '@/components/admin/common/AdminHeader.vue';
import Footer from '@/components/admin/common/Footer.vue';

// 导入逻辑文件
import { useStudentInfo } from './StudentInfoLogic';

// 使用组合式函数
const {
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
} = useStudentInfo();
</script>

<template>
  <el-container class="student-info-page">
    <!-- 侧边栏 -->
    <AdminSidebar :current-tab="currentTab" @tab-change="handleTabChange" />

    <!-- 主内容区 -->
    <el-container class="main-container">
      <!-- 顶部导航栏 -->
      <AdminHeader 
        title="学生信息"
        :user-name="userName"
        :search-query="searchQuery"
        @search="handleSearch"
        @notification-click="handleNotificationClick" 
        @user-menu-click="handleUserMenuClick" 
      />

      <!-- 页面内容 -->
      <el-main class="page-content">
        <!-- 筛选区域 -->
        <el-card class="filter-card" shadow="hover">
          <el-form :model="filterForm" inline>
            <el-form-item label="学号">
              <el-input
                v-model="filterForm.studentId"
                placeholder="请输入"
                style="width: 150px"
              />
            </el-form-item>
            <el-form-item label="姓名">
              <el-input
                v-model="filterForm.name"
                placeholder="请输入"
                style="width: 120px"
              />
            </el-form-item>
            <el-form-item label="院系">
              <el-select
                v-model="filterForm.department"
                placeholder="请选择"
                style="width: 150px"
                @change="handleDepartmentChange"
              >
                <el-option v-for="item in departmentList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="专业">
              <el-select
                v-model="filterForm.major"
                placeholder="请选择"
                style="width: 150px"
              >
                <el-option v-for="item in majorList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-select
                v-model="filterForm.status"
                placeholder="请选择"
                style="width: 120px"
              >
                <el-option label="全部状态" value="全部状态" />
                <el-option label="在读" value="在读" />
                <el-option label="休学" value="休学" />
                <el-option label="退学" value="退学" />
                <el-option label="毕业" value="毕业" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleQuery">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
              <el-button @click="handleExpandFilter">展开 <el-icon class="el-icon--right"><ArrowDown /></el-icon></el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <el-button type="primary" @click="handleAdd"><el-icon><Plus /></el-icon>新增</el-button>
          <el-button @click="handleImport">导入</el-button>
          <el-button @click="handleExport">导出</el-button>
          <div class="batch-actions">
            <el-button type="text">批量操作</el-button>
            <el-select placeholder="请选择" style="width: 120px;">
              <el-option label="删除所选" value="delete" />
              <el-option label="导出所选" value="export" />
            </el-select>
            <el-button type="primary">确定</el-button>
          </div>
        </div>

        <!-- 数据表格 -->
        <el-card class="table-card">
          <!-- 表格内容 -->
          <el-table
            v-loading="loading"
            :data="tableData"
            style="width: 100%"
            stripe
            border
          >
            <el-table-column prop="studentId" label="学号" width="120" />
            <el-table-column prop="name" label="姓名" width="100" />
            <el-table-column prop="gender" label="性别" width="80">
              <template #default="{ row }">
                <el-tag :type="row.gender === '男' ? 'primary' : 'danger'">
                  {{ row.gender }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="80" />
            <el-table-column prop="department" label="院系" width="120" />
            <el-table-column prop="major" label="专业" width="150" />
            <el-table-column prop="className" label="班级" width="100" />
            <el-table-column prop="admissionYear" label="入学年份" width="120" />
            <el-table-column prop="contact" label="联系方式" width="120" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="row.status === '在读' ? 'success' : 'info'">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="300" fixed="right">
              <template #default="{ row }">
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-view"
                  @click="handleViewDetails(row)"
                  style="margin-right: 5px"
                >
                  详情
                </el-button>
                <el-button
                  type="success"
                  size="small"
                  icon="el-icon-edit"
                  @click="handleEdit(row)"
                  style="margin-right: 5px"
                >
                  编辑
                </el-button>
                <el-button
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  @click="handleDelete(row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <div class="pagination-container">
            <el-pagination
              :current-page="currentPage"
              :page-size="pageSize"
              :page-sizes="[5, 10, 20, 50]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              prev-text="上一页"
              next-text="下一页"
              jumper-text="跳至"
              page-sizes-text="每页显示"
              @update:current-page="handlePageChange"
              @update:page-size="handleSizeChange"
            />
          </div>
        </el-card>
      </el-main>

      <!-- 页脚 -->
      <Footer />
    </el-container>
  </el-container>
</template>

<style scoped>
/* 页面特定样式 */
.student-info-page {
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
  background-color: #f5f7fa;
}

.filter-card {
  margin-bottom: 20px;
}

.action-buttons {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    gap: 10px;
    white-space: nowrap;
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

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>