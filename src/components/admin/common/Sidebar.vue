<script setup lang="ts">
import { ref } from 'vue';
import { Calendar, Document, User, Timer, Setting } from '@element-plus/icons-vue';

interface Props {
  currentTab: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'tab-change': [tab: string];
}>();

const handleTabChange = (tab: string) => {
  emit('tab-change', tab);
};
</script>

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
</template>

<style scoped>
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
</style>