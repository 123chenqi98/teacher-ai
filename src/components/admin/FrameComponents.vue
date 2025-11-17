<!-- 通用组件：侧边栏+页头 -->
<script setup lang="ts">
// 导入图标组件
import { Search, User } from '@element-plus/icons-vue'
//导入FrameCss样式
import '@/assets/admin/FrameCss.css'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" class="sidebar">
          <el-menu
            class="el-menu-vertical sidebar-menu"
            router
          >
            <el-menu-item index="/grade">
                <el-icon><i-ep-grid /></el-icon>
                <span>年级管理</span>
            </el-menu-item>
            <el-menu-item index="/subject">
                <el-icon><i-ep-document /></el-icon>
                <span>科目管理</span>
            </el-menu-item>
            <el-menu-item index="/semester">
                <el-icon><i-ep-calendar /></el-icon>
                <span>学期管理</span>
            </el-menu-item>
            <el-menu-item index="/syllabas">
                <el-icon><i-ep-collection /></el-icon>
                <span>大纲管理</span>
            </el-menu-item>
          </el-menu>
      </el-aside>
      <el-container direction="vertical">
        <!-- 页头 -->
        <el-header>
            <!-- 头部内容 -->
          <div class="header-content">
            <div class="header-title">
              <h2>管理系统</h2>
            </div>
            <!-- 搜索图标 -->
            <div class="search-icon">
              <el-icon><Search /></el-icon>
            </div>
          <!-- 用户头像图标 -->
            <div class="user-icon">
              <el-icon><User /></el-icon>
            </div>
          </div>
        </el-header>
        <el-divider />
        <!-- 主内容区域 -->
        <el-main>
          <h2>
            主页面
          </h2>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
