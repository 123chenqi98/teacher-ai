<template>
  <div class="header">
    <div class="header-left">
      <h2 class="page-title">{{ pageTitle }}</h2>
    </div>
    <div class="header-right">
      <div class="search-box">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="搜索..." v-model="searchQuery" @input="handleSearch">
      </div>
      <div class="user-menu">
        <button class="btn btn-outline" @click="handleNotificationClick">
          <i class="fa fa-bell"></i>
        </button>
        <div class="user-info" @click="handleUserMenuClick">
          <span class="user-name">{{ userName }}</span>
          <img src="https://p3-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/1b59835142474067b8e9e33d60fe0c6f.png~tplv-a9rns2rl98-24:720:720.png?rcl=2025110320103101F2E3023457EEB23F36&rk3s=8e244e95&rrcfp=8a172a1a&x-expires=1762776631&x-signature=XkAKgNJQdzgKpiMvFWXCz5Horic%3D" alt="用户头像" class="user-avatar">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

// 定义props
const props = defineProps<{
  pageTitle?: string;
  userName?: string;
}>();

// 定义emits
const emit = defineEmits<{
  (e: 'search', query: string): void;
  (e: 'notification-click'): void;
  (e: 'user-menu-click'): void;
}>();

// 响应式数据
const searchQuery = ref('');

// 方法
const handleSearch = () => {
  emit('search', searchQuery.value);
};

const handleNotificationClick = () => {
  emit('notification-click');
};

const handleUserMenuClick = () => {
  emit('user-menu-click');
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: var(--white);
  border-bottom: 1px solid var(--border-color);
  height: 64px;
}

.header-left .page-title {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text-color);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-box {
  position: relative;
  display: inline-block;
}

.search-box input {
  padding: 0.5rem 1rem 0.5rem 2rem;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  font-size: 0.875rem;
  width: 200px;
}

.search-box i {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.user-name {
  font-size: 0.875rem;
  color: var(--text-color);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
