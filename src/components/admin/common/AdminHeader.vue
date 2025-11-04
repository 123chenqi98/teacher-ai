<template>
  <el-header class="header">
    <div class="header-top">
      <div class="header-left">
        <h1 class="page-title">{{ title }}</h1>
      </div>
      <div class="header-right">
        <el-input
            :value="searchQuery"
            placeholder="搜索..."
            prefix-icon="el-icon-search"
            style="width: 200px; margin-right: 15px"
            @input="(value) => emit('update:searchQuery', value)"
            @keyup.enter="handleSearch"
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
      <p>欢迎回来，{{ userName }}！今天是{{ getCurrentDate() }}</p>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { ref } from 'vue'; // 移除未使用的computed导入

// 定义props
const props = defineProps<{
  title: string;
  userName: string;
  searchQuery: string;
}>();

// 定义事件
const emit = defineEmits<{
  search: [];
  'notification-click': [];
  'user-menu-click': [command: string];
  'update:searchQuery': [value: string];
}>();

// 获取当前日期
const getCurrentDate = () => {
  const now = new Date();
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const month = now.getMonth() + 1;
  const date = now.getDate();
  return `${weekdays[now.getDay()]}，${month}月${date}日`;
};

// 处理搜索
const handleSearch = () => {
  emit('search');
};

// 处理通知点击
const handleNotificationClick = () => {
  emit('notification-click');
};

// 处理用户菜单点击
const handleUserMenuClick = (command: string) => {
  emit('user-menu-click', command);
};
</script>

<style scoped>
.header {
  background-color: #f9f9f9;
  border-bottom: 1px solid #e4e7ed;
  height: auto !important;
  padding: 10px 20px;
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
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.3s;
}

.user-dropdown:hover {
  background-color: #f0f0f0;
}

.header-bottom {
  color: #606266;
  font-size: 14px;
}
</style>