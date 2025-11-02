<script setup lang="ts">
import { ref } from 'vue'
import '@/assets/auth/register/RegisterCss.css'
import '@/assets/auth/login/LoginBoxCss.css'
import WechatLoginComponent from "@/components/auth/loginComponents/WechatLoginComponent.vue";
import EmailRegisterComponent from "@/components/auth/registerComponents/EmailRegisterComponent.vue";
import PhoneRegisterComponent from "@/components/auth/registerComponents/PhoneRegisterComponent.vue";

// 注册方式选项卡
const activeTab = ref('email')

</script>

<template>
  <div class="register-container">
    <div class="system-title-register">小知智能教师系统</div>
    <div class="content-box">
      <div class="register-title">用户注册</div>
      <div class="register-way-box">
        <div class="wechat-register-section">
          <h3>微信扫码注册</h3>
            <wechat-login-component/>
        </div>

        <div class="divider"></div>
        
        <div class="form-register-section">
          <el-tabs v-model="activeTab" class="register-tabs">
            <EmailRegisterComponent/>
            <phone-register-component/>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>