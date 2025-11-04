<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

// 当前选中的菜单项
const activeMenu = ref('semester');

// 处理菜单点击
const handleMenuClick = (menuKey: string) => {
  activeMenu.value = menuKey;
};
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h2>管理页面</h2>
    </div>
    <div class="sidebar-menu">
      <ul>
        <li
          :class="{ active: activeMenu === 'semester' }"
          @click="handleMenuClick('semester')"
        >
          <RouterLink to="/admin/semester" class="menu-link">
            学期管理
          </RouterLink>
        </li>
        <li
          :class="{ active: activeMenu === 'student' }"
          @click="handleMenuClick('student')"
        >
          <RouterLink to="/admin/student" class="menu-link">
            学生信息
          </RouterLink>
        </li>
        <li
          :class="{ active: activeMenu === 'year' }"
          @click="handleMenuClick('year')"
        >
          <RouterLink to="/admin/year" class="menu-link">
            年级列表
          </RouterLink>
        </li>
        <li
          :class="{ active: activeMenu === 'data' }"
          @click="handleMenuClick('data')"
        >
          <RouterLink to="/admin/data" class="menu-link">
            数据初始管理
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 240px;
  height: 100vh;
  background-color: #6a11cb;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.sidebar-menu {
  padding: 20px 0;
}

.sidebar-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  padding: 0;
}

.menu-link {
  display: block;
  padding: 12px 20px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s;
}

.menu-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

li.active .menu-link {
  background-color: #8e2de2;
  color: white;
  border-right: 3px solid #fff;
}
</style>