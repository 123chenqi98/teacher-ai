<script setup lang="ts">
import "@/assets/auth/login/authBoxCss.css"
import "@/assets/system/PageFooterCss.css"
import LoginWaysComponent from "@/components/auth/loginComponents/LoginWaysComponent.vue"
import router from "@/router";
</script>

<template>
  <!--  登录界面-->
  <div class="auth-container">
    <span class="system-title">小知智能教师系统</span>
    <!--    内容容器-->
    <div class="content-box" >
      <!-- 返回首页按钮 -->
      <el-button
          type="text"
          size="large"
          @click="router.push('/')"
          class="back-home-btn"
      >
        返回首页
      </el-button>
      <span class="login-title">欢迎登录</span>
      <!--        登录方式组件-->
      <login-ways-component />
      <!--      动态路由切换登录方式-->
      <div class="login-component-box">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
