<script setup lang="ts">
import { useRouter } from 'vue-router';
import { User, Lock, Setting } from '@element-plus/icons-vue';

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <el-button>测试</el-button>
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
