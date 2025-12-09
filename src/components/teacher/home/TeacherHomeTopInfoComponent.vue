<script setup lang="ts">
import "@/assets/teacher/homeCss/HomeTopCss.css"
import "@/assets/system/homeCss/TopInfoCss.css"
import router from "@/router";
import {ref} from "vue";

const isLogin = ref(true)

// 处理下拉菜单命令
const handleCommand = (command: string) => {
  switch(command) {
    case 'userCenter':
      router.push("/user/dashboard")
      break
    case 'settings':
      router.push("/settings")
      break
    case 'logout':
      console.log('执行退出登录')
      isLogin.value = false
      break
  }
}

</script>

<template>
<!--  教师端首页头部信息-->
  <div class="teacher-home-top-Box">
<!--    logo-->
    <div class="teacher-side-logo-box">
      <img src="/src/static/logo.png" class="logo-img" alt="">
      <el-text class="logo-title">小知教师端</el-text>
    </div>
<!--    标题-->
    <div style="display: flex; align-items: center;">
      <el-text class="teacher-top-text">小知尽最大能力帮助教师们完成教学任务</el-text>
    </div>
    <!--    登录显示的组件-->
    <div class="auth-box-teacher" v-if="!isLogin">
      <el-button type="success" @click="router.push('/login')">
        登录
      </el-button>
      <el-button type="primary" @click="router.push('/register')">
        注册
      </el-button>
    </div>
    <!--    未来登录显示的组件-->
    <div class="auth-box-teacher" v-if="isLogin">
      <el-dropdown @command="handleCommand">
        <span class="dropdown-menu-teacher">
          <el-avatar :size="60" src=""></el-avatar>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
            <el-dropdown-item command="settings">设置</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

  </div>

</template>

<style scoped>


</style>