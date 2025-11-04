<script setup lang="ts">
// Footer组件
</script>

<template>
  <el-footer height="60px" class="footer">
    <div class="footer-content">
      <div class="footer-left">
        <span>© 2025 智慧科技有限公司 版权所有</span>
      </div>
      <div class="footer-right">
        <el-link type="default" :underline="false">服务条款</el-link>
        <el-link type="default" :underline="false" style="margin: 0 20px">个人信息保护</el-link>
        <el-link type="default" :underline="false">隐私中心</el-link>
      </div>
    </div>
  </el-footer>
</template>

<style scoped>
.footer {
  background-color: #ffffff;
  border-top: 1px solid #ebeef5;
  padding: 0;
}

.footer-content {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  font-size: 14px;
  color: #606266;
}
</style>