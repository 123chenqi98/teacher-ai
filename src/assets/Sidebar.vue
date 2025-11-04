<template>
  <div class="sidebar">
    <div class="sidebar-logo">
      <h1>管理系统</h1>
    </div>
    <ul class="nav-menu">
      <li><a href="#" class="active" @click.prevent="handleMenuClick('dashboard')"><i class="fa fa-dashboard"></i> 数据看板</a></li>
      <li><a href="#" @click.prevent="handleMenuClick('data')"><i class="fa fa-table"></i> 数据管理</a></li>
      <li><a href="#" @click.prevent="handleMenuClick('user')"><i class="fa fa-user"></i> 用户管理</a></li>
      <li><a href="#" @click.prevent="handleMenuClick('settings')"><i class="fa fa-cog"></i> 系统设置</a></li>
      <li><a href="#" @click.prevent="handleMenuClick('analysis')"><i class="fa fa-bar-chart"></i> 数据分析</a></li>
      <li><a href="#" @click.prevent="handleMenuClick('notifications')"><i class="fa fa-bell"></i> 消息通知</a></li>
      <li><a href="#" @click.prevent="handleMenuClick('help')"><i class="fa fa-question-circle"></i> 帮助中心</a></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
type MenuItem = 'dashboard' | 'data' | 'user' | 'settings' | 'analysis' | 'notifications' | 'help';

const handleMenuClick = (menu: MenuItem) => {
  // 处理菜单点击事件
  console.log('Menu clicked:', menu);
  // 这里可以添加路由跳转逻辑
};
</script>

<style scoped>
.sidebar {
  width: 220px;
  height: 100vh;
  background-color: var(--primary-color);
  color: var(--white);
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
}

.sidebar-logo {
  padding: 0 1.5rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1.5rem;
}

.sidebar-logo h1 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--white);
}

.nav-menu {
  list-style: none;
  padding: 0 0.5rem;
}

.nav-menu li {
  margin-bottom: 0.25rem;
}

.nav-menu a {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: var(--white);
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.nav-menu a:hover,
.nav-menu a.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.nav-menu i {
  margin-right: 0.75rem;
  width: 1.25rem;
  text-align: center;
}
</style>
