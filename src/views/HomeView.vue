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
