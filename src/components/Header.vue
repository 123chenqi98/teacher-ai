<script setup lang="ts">
import { ref } from 'vue';
import { Search, Setting, Bell, Message, User } from '@element-plus/icons-vue';

// 定义props
const props = defineProps<{
  pageTitle?: string;
  userName?: string;
}>();

// 定义事件
const emit = defineEmits<{
  (e: 'search', query: string): void;
  (e: 'notification-click'): void;
  (e: 'user-menu-click'): void;
}>();

// 搜索查询
const searchQuery = ref('');

// 处理搜索
const handleSearch = () => {
  emit('search', searchQuery.value);
};

// 处理通知点击
const handleNotificationClick = () => {
  emit('notification-click');
};

// 处理用户菜单点击
const handleUserMenuClick = () => {
  emit('user-menu-click');
};

// 获取当前日期和问候语
const getCurrentDate = () => {
  const now = new Date();
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  
  return `${weekdays[now.getDay()]}，${now.getFullYear()}年${months[now.getMonth()]}${now.getDate()}日`;
};
</script>

<template>
  <header class="header">
    <div class="header-left">
      <div class="date-info">
        <span>{{ getCurrentDate() }}</span>
      </div>
    </div>
    <div class="header-center">
      <h1 class="page-title">{{ props.pageTitle || '管理页面' }}</h1>
    </div>
    <div class="header-right">
      <div class="search-box">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="搜索..."
          @keyup.enter="handleSearch"
        />
        <button class="search-btn" @click="handleSearch">
          <Search />
        </button>
      </div>
      <div class="header-actions">
        <button class="action-btn" @click="handleNotificationClick">
          <Setting />
        </button>
        <button class="action-btn" @click="handleNotificationClick">
          <Message />
        </button>
        <button class="action-btn" @click="handleNotificationClick">
          <Bell />
        </button>
        <div class="user-info" @click="handleUserMenuClick">
          <User />
          <span>{{ props.userName || '用户名' }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  height: 64px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-left: 240px;
}

.header-left .date-info {
  color: #606266;
  font-size: 14px;
}

.header-center .page-title {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #303133;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-box {
  position: relative;
}

.search-box input {
  width: 200px;
  height: 32px;
  padding: 0 36px 0 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s;
}

.search-box input:focus {
  outline: none;
  border-color: #6a11cb;
}

.search-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #909399;
  padding: 4px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #606266;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.3s;
  position: relative;
}

.action-btn:hover {
  background-color: #f5f7fa;
  color: #6a11cb;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #606266;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.3s;
}

.user-info:hover {
  background-color: #f5f7fa;
  color: #6a11cb;
}

.user-info span {
  font-size: 14px;
}
</style>