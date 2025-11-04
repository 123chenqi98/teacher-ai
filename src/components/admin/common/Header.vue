<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage, ElNotification } from 'element-plus';

interface Props {
  userName: string;
}

const props = defineProps<Props>();

const searchQuery = ref('');

const handleSearch = () => {
  ElMessage.success('搜索成功');
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

// 获取当前日期
const getCurrentDate = () => {
  const now = new Date();
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const month = now.getMonth() + 1;
  const date = now.getDate();
  return `${weekdays[now.getDay()]}，${month}月${date}日`;
};
</script>

<template>
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
</template>

<style scoped>
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
</style>