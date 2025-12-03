<script setup lang="ts">
import "@/assets/auth/login/authBoxCss.css"
import router from "@/router";

// 将父组件的方法传入
const props = defineProps<{
  loginButtonClick?: () => void
  termsOfService?: boolean
}>()

// 定义 emit 事件
const emit = defineEmits<{
  (e: 'update:termsOfService', value: boolean): void
}>()

// 处理复选框值变化
const handleTermsChange = (value: boolean) => {
  emit('update:termsOfService', value)
}
</script>

<template>
  <div>
    <el-link type="warning"  @click="()=>{router.push('/forgetPassword')}" style="margin-left: 75%">
      忘记密码？
    </el-link>
    <el-button @click="loginButtonClick" class="button-login" >
      登录
    </el-button>
    <el-checkbox :model-value="termsOfService" @update:model-value="handleTermsChange" size="large">
      <el-link type="primary" style="font-size: 1.0rem;color:#d3debf ">
        我已阅读并同意
        <el-link type="primary"  @click="" style="font-size: 1.0rem;color:#d3debf ">
          《用户协议》
        </el-link>
        和
        <el-link type="primary"  @click="" style="font-size: 1.0rem;color:#d3debf ">
          《隐私政策》
        </el-link>
      </el-link>
    </el-checkbox>
    <el-link @click="()=>{router.push('/register')}" style="font-size: 1.0rem;color:#d3debf;margin-top: 50px ">
      没有账号去注册
    </el-link>
  </div>
</template>

<style scoped>
/*登录按钮*/
.button-login{
  width: 100%;
  height: 35px;
  background: rgb(153, 171, 129);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  color: #131319;
  margin-top: 10px;
  font-size: 1.2rem;
}

</style>