<script setup lang="ts">
import { useRouter } from 'vue-router';
import { User, Lock, Setting } from '@element-plus/icons-vue';

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div class="home-view">
    <el-card shadow="never">
      <template #header>
        <h2>系统管理模块</h2>
      </template>
      <div class="nav-grid">
        <el-card class="nav-card" shadow="hover" @click="navigateTo('/user-management')">
          <div class="nav-item">
            <el-icon :size="48" color="#409eff"><User /></el-icon>
            <h3>用户管理</h3>
            <p>用户列表、新增、编辑、权限管理</p>
            <p class="author">开发者：王煦登、吴忠艳</p>
          </div>
        </el-card>
        
        <el-card class="nav-card" shadow="hover" @click="navigateTo('/role-permission')">
          <div class="nav-item">
            <el-icon :size="48" color="#67c23a"><Lock /></el-icon>
            <h3>角色权限</h3>
            <p>角色管理、权限分配、角色复制</p>
            <p class="author">开发者：罗鑫</p>
          </div>
        </el-card>
        
        <el-card class="nav-card" shadow="hover" @click="navigateTo('/system-settings')">
          <div class="nav-item">
            <el-icon :size="48" color="#e6a23c"><Setting /></el-icon>
            <h3>系统设置</h3>
            <p>基础设置、安全设置、日志管理</p>
            <p class="author">开发者：罗桂生</p>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.home-view {
  padding: 20px;
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.nav-card {
  cursor: pointer;
  transition: all 0.3s;
}

.nav-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-item {
  text-align: center;
  padding: 20px;
}

.nav-item h3 {
  margin: 15px 0 10px 0;
  font-size: 20px;
  color: #303133;
}

.nav-item p {
  margin: 5px 0;
  color: #606266;
  font-size: 14px;
}

.nav-item .author {
  margin-top: 15px;
  color: #909399;
  font-size: 12px;
}
</style>
