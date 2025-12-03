<script setup lang="ts">
import "@/assets/user/LeftNavigationCss.css"
import { Avatar, User, UserFilled, DataAnalysis, Aim, Notebook, Bell, Message } from '@element-plus/icons-vue';
import router from "@/router";
</script>

<template>
  <!-- 左侧导航栏 -->
  <el-aside class="sidebar">
    <!-- Logo区域：点击跳转个人概览 -->
    <div class="logo" @click="router.push('/user/dashboard')">
      <el-icon><Avatar /></el-icon>
      <span>教师个人中心</span>
    </div>

    <!-- 核心功能菜单：路由联动 + 当前项高亮 + 仅展开一个子菜单 -->
    <el-menu router :default-active="$route.path" class="nav-menu" :unique-opened="true">
      <el-menu-item index="/user/dashboard">
        <el-icon><User /></el-icon>
        <span>个人概览</span>
      </el-menu-item>
      <el-menu-item index="/user/profile">
        <el-icon><UserFilled /></el-icon>
        <span>基本信息</span>
      </el-menu-item>
      <el-menu-item index="/user/analytics">
        <el-icon><DataAnalysis /></el-icon>
        <span>数据统计</span>
      </el-menu-item>
      <el-menu-item index="/user/goals">
        <el-icon><Aim /></el-icon>
        <span>目标管理</span>
      </el-menu-item>
      <el-menu-item index="/user/lessonPlans">
        <el-icon><Notebook /></el-icon>
        <span>教案管理</span>
      </el-menu-item>
      <el-menu-item index="/user/notifications">
        <el-icon><Bell /></el-icon>
        <span>通知中心</span>
      </el-menu-item>
      <el-menu-item index="/user/messages">
        <el-icon><Message /></el-icon>
        <span>消息中心</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style scoped>

</style>
