<script setup lang="ts">
// 导入逻辑文件
import { useYearList } from './YearListLogic';

// 使用组合式函数
const { 
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
} = useYearList();
</script>

<template>
  <el-container class="year-list-page">
    <!-- 侧边栏 -->
    <el-aside width="240px" class="sidebar">
      <div class="sidebar-content">
        <div class="logo">
          <h2>教师管理系统</h2>
        </div>
        <el-menu
          :default-active="currentTab"
          class="el-menu-vertical"
          router
          @select="handleTabChange"
        >
          <el-menu-item index="semester">
            <el-icon><Calendar /></el-icon>
            <span>学期管理</span>
          </el-menu-item>
          <el-menu-item index="subject">
            <el-icon><Document /></el-icon>
            <span>学科管理</span>
          </el-menu-item>
          <el-menu-item index="student">
            <el-icon><User /></el-icon>
            <span>学生信息</span>
          </el-menu-item>
          <el-menu-item index="year">
            <el-icon><Timer /></el-icon>
            <span>年级列表</span>
          </el-menu-item>
          <el-menu-item index="data">
            <el-icon><Setting /></el-icon>
            <span>数据初始管理</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>

    <!-- 主内容区 -->
    <el-container class="main-container">
      <!-- 顶部导航栏 -->
      <el-header height="80px" class="header">
        <div class="header-top">
          <div class="header-left">
            <h1 class="page-title">管理页面</h1>
          </div>
          <div class="header-right">
            <el-input
              v-model="searchQuery"
              placeholder="搜索..."
              prefix-icon="el-icon-search"
              style="width: 200px; margin-right: 15px"
              @keyup.enter="handleSearch"
            />
            <el-button
              type="text"
              icon="el-icon-setting"
              style="margin-right: 15px"
            />
            <el-button
              type="text"
              icon="el-icon-bell"
              style="margin-right: 15px"
              @click="handleNotificationClick"
            />
            <el-dropdown @command="handleUserMenuClick">
              <span class="user-dropdown">
                <el-avatar size="small" icon="el-icon-user" />
                <span style="margin-left: 5px">{{ userName }}</span>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">个人资料</el-dropdown-item>
                  <el-dropdown-item command="settings">设置</el-dropdown-item>
                  <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="header-bottom">
          <p>欢迎回来，张三老师！今天是{{ getCurrentDate() }}</p>
        </div>
      </el-header>

      <!-- 页面内容 -->
      <el-main class="page-content">
        <!-- 导航标签 -->
        <el-tabs v-model="currentTab" class="nav-tabs" @tab-click="handleTabChange">
          <el-tab-pane label="学期管理" name="semester" />
          <el-tab-pane label="学科管理" name="subject" />
          <el-tab-pane label="学生信息" name="student" />
          <el-tab-pane label="年级列表" name="year" />
          <el-tab-pane label="数据初始管理" name="data" />
        </el-tabs>

        <!-- 筛选区域 -->
        <el-card class="filter-card" shadow="hover">
          <el-form :model="filterForm" inline>
            <el-form-item label="年级名称">
              <el-input
                v-model="filterForm.yearName"
                placeholder="请输入"
                style="width: 150px"
              />
            </el-form-item>
            <el-form-item label="年级主任">
              <el-input
                v-model="filterForm.headTeacher"
                placeholder="请输入"
                style="width: 150px"
              />
            </el-form-item>
            <el-form-item label="状态">
              <el-select
                v-model="filterForm.status"
                placeholder="请选择"
                style="width: 120px"
              >
                <el-option label="全部状态" value="全部状态" />
                <el-option label="在读" value="在读" />
                <el-option label="毕业" value="毕业" />
                <el-option label="招生中" value="招生中" />
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
        <div class="action-section">
          <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
          <el-button type="success" @click="handleImport">导入</el-button>
          <el-button type="warning" @click="handleExport">导出</el-button>
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
            <el-table-column prop="yearName" label="年级名称" width="120" />
            <el-table-column prop="classCount" label="班级数" width="100" />
            <el-table-column prop="studentCount" label="学生数" width="100" />
            <el-table-column prop="headTeacher" label="年级主任" width="100" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="row.status === '在读' ? 'success' : (row.status === '招生中' ? 'primary' : 'info')">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" />
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
                  icon="el-icon-document-copy"
                  @click="handleClassList(row)"
                  style="margin-right: 5px"
                >
                  班级列表
                </el-button>
                <el-button
                  type="warning"
                  size="small"
                  icon="el-icon-user-solid"
                  @click="handleStudentList(row)"
                  style="margin-right: 5px"
                >
                  学生列表
                </el-button>
                <el-button
                  type="info"
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
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[5, 10, 20, 50]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handlePageChange"
            />
          </div>
        </el-card>
      </el-main>

      <!-- 页脚 -->
      <el-footer height="60px" class="footer">
        <div class="footer-content">
          <div class="footer-left">
            <span>© 2025 智慧科技有限公司 版权所有</span>
          </div>
          <div class="footer-right">
            <el-link type="default" :underline="false">服务条款</el-link>
            <el-link type="default" :underline="false" style="margin: 0 20px">个人信息保护</el-link>
            <el-link type="default" :underline="false">隐私中心</el-link>
          </div>
        </div>
      </el-footer>
    </el-container>
  </el-container>
</template>

<style scoped>
.year-list-page {
  height: 100vh;
  overflow: hidden;
}

.sidebar {
  background-color: #6a11cb;
  color: white;
}

.sidebar-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.logo {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo h2 {
  margin: 0;
  color: white;
  font-size: 18px;
}

.el-menu-vertical {
  flex: 1;
  background-color: transparent;
  border-right: none;
}

.el-menu-item {
  color: rgba(255, 255, 255, 0.8);
  height: 50px;
  line-height: 50px;
}

.el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.el-menu-item.is-active {
  background-color: #ffffff;
  color: #6a11cb;
}

.main-container {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #f9f9f9;
  border-bottom: 1px solid #e4e7ed;
  padding: 10px 20px;
  height: auto !important;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.page-title {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #303133;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-dropdown {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.header-bottom {
  color: #606266;
  font-size: 14px;
}

.page-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f7fa;
}

.nav-tabs {
  margin-bottom: 20px;
}

.filter-card {
  margin-bottom: 20px;
}

.action-section {
  margin-bottom: 20px;
  display: flex;
  gap: 12px;
}

.table-card {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.footer {
  background-color: #ffffff;
  border-top: 1px solid #ebeef5;
  padding: 0;
}

.footer-content {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  font-size: 14px;
  color: #606266;
}
</style>