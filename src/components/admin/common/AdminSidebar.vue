<template>
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
        <el-menu-item index="grade">
          <el-icon><Cpu /></el-icon>
          <span>年级管理</span>
        </el-menu-item>
        <el-menu-item index="student">
          <el-icon><User /></el-icon>
          <span>学生信息</span>
        </el-menu-item>
        <el-menu-item index="syllabus">
          <el-icon><Document /></el-icon>
          <span>教学大纲管理</span>
        </el-menu-item>
      </el-menu>
    </div>
  </el-aside>
</template>

<script setup lang="ts">
import { Calendar, Document, User, Cpu, Setting } from '@element-plus/icons-vue';

// 定义props
const props = defineProps<{
  currentTab: string;
}>();

// 定义事件
const emit = defineEmits<{
  'tab-change': [tab: string];
}>();

// 处理标签切换
const handleTabChange = (tab: string) => {
  emit('tab-change', tab);
};
</script>

<style scoped>
.sidebar {
  background-color: #6a11cb;
  color: white;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
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
  background-color: transparent;
  border-right: none;
  flex: 1;
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
</style>