<script setup lang="ts">
import {verifyForm, verifyFormRef, verifyRules} from "@/forms/auth/forgetPassword/VerifyIdentityForm.ts";
import {sendVerifyCodeCutTime, sendVerifyCodeTime} from "@/utils/auth/SendTimeUtils.ts";
import {Lock, Message} from "@element-plus/icons-vue";
import {watch} from "vue";
import {accountForm} from "@/forms/auth/forgetPassword/AccountVerificationForm.ts";
import {ElMessage} from "element-plus";

const props = defineProps<{
  activeStep: number
  nextStep:any
  prevStep:any
}>()


// 发送验证码
const sendVerifyCode = () => {
  if (!accountForm.email) {
    ElMessage.warning('请先输入邮箱')
    return
  }
  // 模拟发送验证码
  sendVerifyCodeCutTime(60)
  ElMessage.success('验证码已发送，请查收')
}

watch(() => accountForm.email, (newValue) => {
  verifyForm.email = newValue
},{immediate: true})


</script>

<template>
  <div v-if="props.activeStep === 1" class="form-item-style">
    <el-form
        ref="verifyFormRef"
        :model="verifyForm"
        :rules="verifyRules"
        label-width="auto"
    >
      <el-form-item prop="email">
        <label>邮箱</label>
        <el-input
            v-model="verifyForm.email"
            type="text"
            disabled
        >
          <template #prefix>
            <el-icon><Message /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="code">
        <div style="display: flex">
          <label>验证码</label>
          <el-input
              v-model="verifyForm.code"
              type="text"
              autocomplete="off"
              placeholder="请输入验证码"
              maxlength="6"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
          <el-button
              class="verify-code-button"
              type="primary"
              :disabled="sendVerifyCodeTime > 0"
              @click="sendVerifyCode"
          >
            {{sendVerifyCodeTime > 0 ? `${sendVerifyCodeTime}s后重新获取` : '获取验证码'}}
          </el-button>
        </div>
      </el-form-item>
    </el-form>

    <div>
      <el-button @click="props.prevStep">上一步</el-button>
      <el-button type="primary" @click="props.nextStep(verifyFormRef, verifyForm)">
        下一步
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.verify-code-button {
  margin-left: 10px;
  white-space: nowrap;
}
</style>