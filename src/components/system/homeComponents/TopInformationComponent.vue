<script setup lang="ts">
// 样式
import "@/assets/system/homeCss/homeBoxCss.css"
import "@/assets/system/homeCss/TopInfoCss.css"
import TopNavigationComponent from "@/components/system/homeComponents/TopNavigationComponent.vue";
import {ref} from "vue";
import router from "@/router";

// 模拟数据，使用store中的数据进行更改
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
  <!-- 顶部信息组件-->
  <div class="homeTopInfoBox">
    <div class="logo-box">
      <img src="@/static/logo.png" class="logo-img" alt="智慧科技logo"/>
      <el-text class="home-title">智慧科技</el-text>
    </div>
    <div class="navigation-box">
      <!-- 导航栏 -->
      <top-navigation-component/>
    </div>
    <!-- 登录显示的组件 -->
    <div class="auth-box" v-if="!isLogin">
      <el-button type="success" @click="router.push('/login')">
        登录
      </el-button>
      <el-button type="primary" @click="router.push('/register')">
        注册
      </el-button>
    </div>
    <!-- 未来登录显示的组件 -->
    <div class="auth-box" v-if="isLogin">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <!-- 绑定响应式变量，必须带:   属性值是数字60,Element Plus 会自动解析为60px-->
          <el-avatar :size="60" src="https://empty"></el-avatar>
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
/* 标题样式 */
.home-title{
  font-size: 1.4rem;
  font-weight: 700;
  margin-left: 0.5rem;
  font-family: 楷体,serif;
  color: rgb(13, 23, 42);
}
.auth-box{
  display: flex;
  align-items: center;
  margin-left:15%;
}

/* 下拉菜单样式 */
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}

</style>