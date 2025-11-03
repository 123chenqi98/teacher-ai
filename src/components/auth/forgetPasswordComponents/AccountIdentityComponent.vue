<script setup lang="ts">
import {accountForm, accountFormRef, accountRules} from "@/forms/auth/forgetPassword/AccountVerificationForm.ts";
import {Message} from "@element-plus/icons-vue";
import router from "@/router";

const props = defineProps<{
  activeStep: number
  nextStep:any
}>()

</script>

<template>
  <div v-if="props.activeStep === 0" class="form-item-style">
    <el-form
        ref="accountFormRef"
        :model="accountForm"
        :rules="accountRules"
        label-width="auto"
    >
      <el-form-item prop="email">
        <label>邮箱</label>
        <el-input
            v-model="accountForm.email"
            type="text"
            placeholder="请输入注册邮箱"
            maxlength="25"
        >
          <template #prefix>
            <el-icon><Message /></el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>

    <div class="button-group">
      <el-button @click="()=>{router.push('/login')}">返回登录</el-button>
      <el-button type="primary" @click="props.nextStep(accountFormRef, accountForm)">
        下一步
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>