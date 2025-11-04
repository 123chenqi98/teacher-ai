<script setup lang="ts">
import "@/assets/system/LoginBoxCss.css"
import "@/assets/system/PageFooterCss.css"
// 引入登录组件
//页脚组件
import PageFooter from "@/components/system/PageFooterComponenet.vue"
// 登录方式组件
import LoginWaysComponent from "@/components/system/loginComponents/LoginWaysComponent.vue"
</script>

<template>
    <!--  登录界面-->
    <div class="login-container">
      <span class="system-title">小知智能教师系统</span>
      <!--    内容容器-->
      <div class="content-box" >
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
