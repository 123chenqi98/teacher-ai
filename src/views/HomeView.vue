<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 页面加载时自动重定向到登录页面
onMounted(() => {
  router.push('/login');
});
</script>

<template>
  <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <p>正在跳转到登录页面...</p>
  </div>
</template>
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
