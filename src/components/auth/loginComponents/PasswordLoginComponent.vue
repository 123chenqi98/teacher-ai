<script setup lang="ts" >
import "@/assets/auth/login/authBoxCss.css"
// 引入表单
import {ruleForm, ruleFormRef, rules} from "@/forms/auth/login/PasswordLoginForm.ts";
import {Lock, UserFilled} from "@element-plus/icons-vue";
import {ref} from "vue";
import router from "@/router";
import {ElMessage} from "element-plus";
import LoginButtonComponent from "@/components/auth/loginComponents/LoginButtonComponent.vue";

// 是否勾选服务条款
const termsOfService = ref(true);

// 登录按钮事件
const loginButtonClick = ()=>{
  // 校验表单完整性
  ruleFormRef.value?.validate(isValid => {
    if (isValid) {
      // 表单校验通过进行查看用户是否查看服务条款
      if (termsOfService.value) {
        ElMessage.success("登录成功")
        // 登录成功后跳转到管理页面
        setTimeout(() => {
          router.push('/')
        }, 1000)
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
    <!-- 1.：model="ruleForm" 绑定数据  2.:rules="rules" 绑定规则  3.ref="ruleFormRef" 4.绑定实例 prop 关联字段与规则 -->
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto">
      <el-form-item prop="username">
        <label>账号</label>
        <el-input v-model="ruleForm.username" type="text" placeholder="请输入邮箱\账号" maxlength="25">
          <template #prefix>
            <el-icon><UserFilled /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item  prop="password">
        <label>密码</label>
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" placeholder="请输入密码" maxlength="25" show-password>
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="passwordAgain">
        <label >确认密码</label>
        <el-input v-model="ruleForm.passwordAgain" type="password" autocomplete="off" placeholder="请再次输入密码" maxlength="25" show-password>
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div>
      <LoginButtonComponent
          :login-button-click="loginButtonClick"
          :terms-of-service="termsOfService"
          @update:termsOfService="(val) => termsOfService = val"
      />
    </div>
  </div>
</template>

<style scoped>

</style>