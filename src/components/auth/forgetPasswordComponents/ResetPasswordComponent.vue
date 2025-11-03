<script setup lang="ts">
import {
  clearResetPasswordForm,
  passwordForm,
  passwordFormRef,
  passwordRules
} from "@/forms/auth/forgetPassword/ResetPasswordForm.ts";
import {Lock} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {accountForm, resetAccountForm} from "@/forms/auth/forgetPassword/AccountVerificationForm.ts";
import {clearVerifyForm} from "@/forms/auth/forgetPassword/VerifyIdentityForm.ts";
import {sendVerifyCodeTime} from "@/utils/auth/SendTimeUtils.ts";
import {watch} from "vue";
import router from "@/router";

const props = defineProps<{
  activeStep: number
  nextStep:any
  prevStep:any
}>()

const emit = defineEmits(['update:activeStep'])
const hanChange = (value: any) => {
  emit('update:activeStep', value)
}

// 完成重置密码
const finishReset = async () => {
  if (!passwordFormRef.value) return
  try {
    await passwordFormRef.value.validate()
    // 模拟密码重置
    ElMessage.success('密码重置成功，请使用新密码登录')
    // 重置表单
    resetAccountForm()
    clearResetPasswordForm()
    clearVerifyForm()
    hanChange(0)
    sendVerifyCodeTime.value = 0
    await router.push('/login')
  } catch (error) {
    ElMessage.warning('密码重置失败')
  }
}

watch(() => accountForm.email, (newValue) => {
  passwordForm.email = newValue
},{immediate: true})

</script>

<template>
  <div v-if="props.activeStep === 2" class="form-item-style">
    <el-form
        ref="passwordFormRef"
        :model="passwordForm"
        :rules="passwordRules"
        label-width="auto"
    >
      <el-form-item prop="password">
        <label>新密码</label>
        <el-input
            v-model="passwordForm.password"
            type="password"
            placeholder="请输入新密码"
            show-password
            maxlength="25"
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="confirmPassword">
        <label>确认密码</label>
        <el-input
            v-model="passwordForm.confirmPassword"
            type="password"
            placeholder="请再次输入新密码"
            show-password
            maxlength="25"
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>

    <div>
      <el-button @click="props.prevStep">上一步</el-button>
      <el-button type="primary" @click="finishReset">
        完成
      </el-button>
    </div>
  </div>
</template>

<style scoped>

</style>