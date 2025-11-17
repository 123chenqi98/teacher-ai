<script setup lang="ts">
import { isSubmitting, activeTab, userInfo } from "@/data/user/userProfileData/PersonalInformationData.ts"
import { securityForm, securityRules, securityFormRef, twoFactorInput, twoFactorCode, twoFactorDialogVisible, sendingTwoFactor, maskPhone, maskEmail, sendTwoFactorCode, handleTwoFactorChange, confirmEnableTwoFactor, cancelEnableTwoFactor, handleSecuritySubmit, handleSecurityReset } from "@/forms/user/userProfileForms/AccountSecurityForms.ts";
import { Check, RefreshRight } from "@element-plus/icons-vue";
import "@/assets/user/userProfileCss/AccountSecurityCss.css"
</script>

<template>
  <!-- 账号安全标签页 -->
  <div v-if="activeTab === 'security'" class="security-tab">
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

      <el-divider content-position="left">绑定信息</el-divider>
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
        <el-col :span="8">
          <el-form-item label="两步验证">
            <el-switch
                v-model="securityForm.twoFactorEnabled"
                active-text="已启用"
                inactive-text="未启用"
                @change="handleTwoFactorChange"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-space class="security-actions" direction="horizontal" :size="16">
        <el-button type="primary" :icon="Check" :loading="isSubmitting" :disabled="isSubmitting" @click="handleSecuritySubmit(securityFormRef)">保存安全设置</el-button>
        <el-button :icon="RefreshRight" @click="handleSecurityReset(securityFormRef)">重置</el-button>
      </el-space>
    </el-form>
    <!-- 两步验证开启对话框 -->
    <el-dialog v-model="twoFactorDialogVisible" title="开启两步验证" width="460px" :close-on-click-modal="false">
      <el-text class="el-text">为了提升账号安全，开启后登录需额外输入一次性验证码。</el-text>
      <el-divider />
      <el-descriptions :column="2" class="cofactor-dst">
        <el-descriptions-item label="手机号">
          <el-text>{{ maskPhone(securityForm.phone) }}</el-text>
        </el-descriptions-item>
        <el-descriptions-item label="邮箱">
          <el-text>{{ maskEmail(securityForm.email) }}</el-text>
        </el-descriptions-item>
      </el-descriptions>
      <el-space direction="horizontal" :size="12" style="margin-bottom: 8px;">
        <el-button type="primary" :loading="sendingTwoFactor" @click="sendTwoFactorCode">重新发送验证码</el-button>
        <el-text class="el-text el-text--secondary">当前验证码：{{ twoFactorCode }}</el-text>
      </el-space>
      <el-form label-width="100px">
        <el-form-item label="验证码">
          <el-input v-model="twoFactorInput" placeholder="请输入6位验证码" maxlength="6" style="max-width: 240px;" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-space :size="12">
          <el-button @click="cancelEnableTwoFactor">取消</el-button>
          <el-button type="primary" @click="confirmEnableTwoFactor">验证并开启</el-button>
        </el-space>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>