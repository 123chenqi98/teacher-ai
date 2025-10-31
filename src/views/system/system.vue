<script setup lang="ts">

</script>

<template>
  <div class="system-container">
    <!-- 这里可以添加公共的导航栏、侧边栏等 -->
    <div class="content-wrapper">
      <!-- 子路由内容将在这里渲染 -->
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.system-container {
  width: 100%;
  height: 100%;
}

.content-wrapper {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px);
}
</style>