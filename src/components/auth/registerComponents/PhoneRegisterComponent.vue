<script setup lang="ts">
import {phoneForm, phoneRules,phoneFormRef} from "@/forms/auth/register/PhoneRegisterForm.ts";
import {ElMessage} from "element-plus";
import router from "@/router";
import {Iphone, Lock} from "@element-plus/icons-vue";
import RegisterIdentitySelectComponent from "@/components/auth/registerComponents/RegisterIdentitySelectComponent.vue";
import {sendVerifyCodeCutTime,sendVerifyCodeTime} from "@/utils/auth/SendTimeUtils.ts"
import RegisterButtonComponent from "@/components/auth/registerComponents/RegisterButtonComponent.vue";


// 获取验证码
const getVerifyCode = (type: 'email' | 'phone') => {
  if (type === 'phone' && !phoneForm.phone) {
    ElMessage.warning('请输入手机号')
    return
  }
  // 实际开发中这里应该调用发送验证码的API
  ElMessage.success('验证码已发送')
  sendVerifyCodeCutTime(60)
}

// 手机号注册提交
const submitPhoneForm = () => {
  phoneFormRef.value?.validate((valid) => {
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
  <el-tab-pane label="手机号注册" name="phone">
    <div class="form-item-style-register">
      <el-form ref="phoneFormRef" :model="phoneForm" :rules="phoneRules" label-width="auto">
        <el-form-item prop="identity">
          <label>身份</label>
          <register-identity-select-component v-model="phoneForm.identity"/>
        </el-form-item>
        <el-form-item prop="phone">
          <label>手机号</label>
          <el-input v-model="phoneForm.phone" type="text" placeholder="请输入手机号" maxlength="11">
            <template #prefix>
              <el-icon><Iphone /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="code">
          <div class="verify-code-group">
            <label>验证码</label>
            <el-input v-model="phoneForm.code" type="text" autocomplete="off" placeholder="请输入验证码" maxlength="6">
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
            <el-button class="verify-code-button" type="primary" :disabled="!phoneForm.phone || sendVerifyCodeTime > 0" @click="getVerifyCode('phone')">
              {{ sendVerifyCodeTime > 0 ? `${sendVerifyCodeTime}s后重新获取` : '获取验证码' }}
            </el-button>
          </div>
        </el-form-item>

        <el-form-item prop="password">
          <label>密码</label>
          <el-input v-model="phoneForm.password" type="password" autocomplete="off" placeholder="请输入密码" maxlength="18" show-password>
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="confirmPassword">
          <label>确认密码</label>
          <el-input v-model="phoneForm.confirmPassword" type="password" autocomplete="off" placeholder="请再次输入密码" maxlength="18" show-password>
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <register-button-component :submit-phone-form="submitPhoneForm"/>
    </div>
  </el-tab-pane>
</template>

<style scoped>

</style>