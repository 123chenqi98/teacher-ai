<script setup lang="ts">
import { ref} from "vue";
import "@/assets/auth/login/authBoxCss.css"
import "@/assets/auth/register/RegisterCss.css"
import StepsComponent from "@/components/auth/forgetPasswordComponents/StepsComponent.vue";
import AccountIdentityComponent from "@/components/auth/forgetPasswordComponents/AccountIdentityComponent.vue";
import VerifyIdentityComponent from "@/components/auth/forgetPasswordComponents/VerifyIdentityComponent.vue";
import ResetPasswordComponent from "@/components/auth/forgetPasswordComponents/ResetPasswordComponent.vue";
import router from "@/router";
const activeStep = ref(0)
// 下一步
const nextStep = async (formRef: any, form: any) => {
  if (!formRef) return
  try {
    await formRef.validate()
    activeStep.value++
  } catch (error) {
    console.log('表单验证失败:', error)
  }
}
// 上一步
const prevStep = () => {
  activeStep.value--
}

</script>

<template>
  <div class="auth-container">
    <span class="system-title">小知智能教师系统</span>
    <div class="content-box">
      <!-- 返回首页按钮 -->
      <el-button type="text" size="large" @click="router.push('/')" class="back-home-btn">
        返回首页
      </el-button>
      <span class="login-title">忘记密码</span>
      
      <!-- 步骤条 -->
      <StepsComponent :active-step="activeStep" />
      
      <!-- 步骤内容 -->
      <div class="login-component-box">
        <!-- 步骤1: 验证账户 -->
        <account-identity-component :active-step="activeStep" :next-step="nextStep"/>

        <!-- 步骤2: 身份验证 -->
        <verify-identity-component :active-step="activeStep" :prev-step="prevStep" :next-step="nextStep"/>
        
        <!-- 步骤3: 重置密码 -->
        <reset-password-component :active-step="activeStep" :prev-step="prevStep" :next-step="nextStep" @update:active-step="activeStep=0"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>