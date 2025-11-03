<script setup lang="ts">
import {emailForm, emailRules,emailFormRef} from "@/forms/auth/register/EmailRegisterForm.ts";
import {Lock, Message} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import router from "@/router";
import RegisterIdentitySelectComponent from "@/components/auth/registerComponents/RegisterIdentitySelectComponent.vue";
import {sendVerifyCodeCutTime,sendVerifyCodeTime} from "@/utils/auth/SendTimeUtils.ts"
import RegisterButtonComponent from "@/components/auth/registerComponents/RegisterButtonComponent.vue";

// 获取验证码
const getVerifyCode = (type: 'email' | 'phone') => {
  if (type === 'email' && !emailForm.email) {
    ElMessage.warning('请输入邮箱地址')
    return
  }
  // 实际开发中这里应该调用发送验证码的API
  ElMessage.success('验证码已发送')
  sendVerifyCodeCutTime(60)
}

// 邮箱注册提交
const submitEmailForm = () => {
  emailFormRef.value?.validate((valid) => {
    if (valid) {
      // 实际开发中这里应该调用注册API
      ElMessage.success('注册成功')
      router.push('/login')
    } else {
      ElMessage.error('请正确填写表单信息')
    }
  })
}

</script>

<template>
  <el-tab-pane label="邮箱注册" name="email">
    <div class="form-item-style-register">
      <el-form
          ref="emailFormRef"
          :model="emailForm"
          :rules="emailRules"
          label-width="auto"
      >
        <el-form-item prop="identity">
          <label>身份</label>
          <register-identity-select-component v-model="emailForm.identity"/>
        </el-form-item>
        <el-form-item prop="email">
          <label>邮箱</label>
          <el-input
              v-model="emailForm.email"
              type="text"
              placeholder="请输入邮箱"
              maxlength="50"
          >
            <template #prefix>
              <el-icon><Message /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="code">
          <div class="verify-code-group">
            <label>验证码</label>
            <el-input
                v-model="emailForm.code"
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
                :disabled="!emailForm.email || sendVerifyCodeTime > 0"
                @click="getVerifyCode('email')"
            >
              {{ sendVerifyCodeTime > 0 ? `${sendVerifyCodeTime}s后重新获取` : '获取验证码' }}
            </el-button>
          </div>
        </el-form-item>

        <el-form-item prop="password">
          <label>密码</label>
          <el-input
              v-model="emailForm.password"
              type="password"
              autocomplete="off"
              placeholder="请输入密码"
              maxlength="18"
              show-password
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <label>确认密码</label>
          <el-input
              v-model="emailForm.confirmPassword"
              type="password"
              autocomplete="off"
              placeholder="请再次输入密码"
              maxlength="18"
              show-password
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
     <register-button-component :submit-phone-form="submitEmailForm"/>
    </div>
  </el-tab-pane>
</template>

<style scoped>

</style>