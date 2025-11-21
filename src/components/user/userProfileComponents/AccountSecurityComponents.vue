<script setup lang="ts">
import { isSubmitting, activeTab } from "@/data/user/userProfileData/PersonalInformationData.ts"
import { securityForm, securityRules, securityFormRef, handleSecuritySubmit } from "@/forms/user/userProfileForms/AccountSecurityForms.ts";
import { Check } from "@element-plus/icons-vue";
import "@/assets/user/userProfileCss/AccountSecurityCss.css"
</script>

<template>
  <!-- 账号安全标签页内容（交由父级卡片承载容器） -->
  <div class="profile-tab" v-if="activeTab === 'security'">
      <el-form :model="securityForm" :rules="securityRules" ref="securityFormRef" label-width="120px">
        <el-divider content-position="left">修改密码</el-divider>
        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="当前密码" prop="currentPassword">
              <el-input v-model="securityForm.currentPassword" type="password" show-password placeholder="请输入当前密码" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="securityForm.newPassword" type="password" show-password placeholder="至少 8 位，建议含数字与字母" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="确认新密码" prop="confirmPassword">
              <el-input v-model="securityForm.confirmPassword" type="password" show-password placeholder="再次输入新密码" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider content-position="left">更改绑定信息</el-divider>
        <el-row :gutter="16">
          <el-col :span="8">
            <el-form-item label="绑定手机" prop="phone">
              <el-input v-model="securityForm.phone" placeholder="请输入绑定手机号" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="绑定邮箱" prop="email">
              <el-input v-model="securityForm.email" placeholder="请输入绑定邮箱" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <el-space class="security-actions" direction="horizontal" :size="16">
          <el-button type="primary" :icon="Check" :loading="isSubmitting" :disabled="isSubmitting" @click="handleSecuritySubmit(securityFormRef)">保存安全设置</el-button>
        </el-space>
      </el-form>
  </div>
</template>

<style scoped>

</style>