<script setup lang="ts" >
import "@/assets/auth/login/LoginBoxCss.css"
// 引入表单
import {ruleForm, ruleFormRef, rules} from "@/forms/auth/login/EmailLoginForm.ts";
import {Lock, Message} from "@element-plus/icons-vue";
import {ref} from "vue";
import {ElMessage} from "element-plus";
import LoginButtonComponent from "@/components/auth/loginComponents/LoginButtonComponent.vue";
import {sendVerifyCodeCutTime,sendVerifyCodeTime} from "@/utils/auth/SendTimeUtils.ts"

// 是否勾选服务条款
const termsOfService = ref(true);

// 登录按钮事件
const loginButtonClick = ()=>{
  //校验表单完整性
  ruleFormRef.value?.validate(isValid => {
    if (isValid) {
      //表单校验通过进行查看用户是否查看服务条款
      if (termsOfService.value) {
        ElMessage.success("登录成功")
      }else {
        ElMessage.warning("请勾选服务条款")
      }
    }else {
      ElMessage.warning("请填写完整表单")
    }
  })

}


</script>

<template>
  <div class="form-item-style">
    <!--  完成登录组件-->
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
    >
      <el-form-item  prop="email"  >
        <label >邮箱</label>
        <el-input
            v-model="ruleForm.email"
            type="text"
            placeholder="请输入邮箱"
            maxlength="25"
        >
          <template #prefix>
            <el-icon><Message /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item  prop="code">
        <div style="display: flex">
          <label>校验码</label>
          <el-input
              v-model="ruleForm.code"
              type="text"
              autocomplete="off"
              placeholder="请输入校验码"
              maxlength="6"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
          <el-button class="verify-code-button" type="primary" :disabled="!ruleForm.email" @click="sendVerifyCodeCutTime(60)">
            {{sendVerifyCodeTime>0?`${sendVerifyCodeTime}s后重新获取`:'获取验证码'}}
          </el-button>
        </div>

      </el-form-item>
    </el-form>
<!--    登录按钮组件-->
    <div>
      <LoginButtonComponent
          :login-button-click="loginButtonClick"
          :terms-of-service="termsOfService"
          @update:termsOfService="(val: boolean) => termsOfService = val"
      />
    </div>
  </div>
</template>

<style scoped>

</style>