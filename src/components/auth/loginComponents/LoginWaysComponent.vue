<script setup lang="ts">
// 引入css
import '@/assets/auth/login/authBoxCss.css'
import router from "@/router";
// 密码登录按钮执行方法
function passwordLoginWay(){
  router.push('/login/')
}
// 邮箱登录按钮执行方法
function emailLoginWay(){
  router.push('/login/emailLogin')
}
// 微信登录按钮执行方法
function wechatLoginWay(){
  router.push('/login/wechatLogin')
}

</script>

<template>
  <!-- 登录方式按钮组件 -->
  <div class="login-way-box">
    <el-button class="login-button"  @click="passwordLoginWay">
      密码登录
    </el-button>
    <el-button class="login-button" @click="emailLoginWay" >
      邮箱登录
    </el-button>
    <el-button class="login-button" @click="wechatLoginWay">
      扫码登录
    </el-button>
  </div>

</template>

<style scoped>

.login-button{
  width: 100%;
  margin-top: 0;
  height: 100%;
  font-size: 1.3rem;
  color: #131319;
  background: rgb(199, 199, 217);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
}
/* 鼠标移入样式 */
.login-button:hover{
  background: rgb(148, 185, 164);
  color: #131319;
}

</style>