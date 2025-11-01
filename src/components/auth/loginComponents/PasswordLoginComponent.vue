<script setup lang="ts" >
import "@/assets/system/LoginBoxCss.css"
// 引入表单
import {ruleForm, ruleFormRef, rules} from "@/forms/auth/PasswordLoginForms.ts";
import {Lock, UserFilled} from "@element-plus/icons-vue";
import {ref} from "vue";
import {ElMessage} from "element-plus";

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
      <el-form-item  prop="username"  >
        <label >账号</label>
        <el-input
            v-model="ruleForm.username"
            type="text"
            placeholder="请输入邮箱\账号"
            maxlength="25"
        >
          <template #prefix>
            <el-icon><UserFilled /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item  prop="password">
        <label>密码</label>
        <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            placeholder="请输入密码"
            maxlength="25"
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="passwordAgain">
        <label >确认密码</label>
        <el-input
            v-model="ruleForm.passwordAgain"
            type="password"
            autocomplete="off"
            placeholder="请再次输入密码"
            maxlength="25"
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-link type="warning"  @click="" style="margin-left: 75%">
        忘记密码？
      </el-link>
      <el-button @click="loginButtonClick" class="button-login" >
        登录
      </el-button>
      <el-checkbox v-model="termsOfService" size="large">
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
      <el-link  @click="" style="font-size: 1.0rem;color:#d3debf;margin-top: 50px ">
        没有账号去注册
      </el-link>
    </div>
  </div>
</template>

<style scoped>
/*组件排布*/
.form-item-style{
  display: grid;
  justify-content: center;
  width: 100%;
  height: 35px;
}

.form-item-style label{
  font-size: 1.2rem;
  width: 120px;
  color: #0d172a;
}
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