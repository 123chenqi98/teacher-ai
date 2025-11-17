<script setup lang="ts">
import { userInfo, editFormRef, isSubmitting, activeTab, isEditing, toggleEditMode } from "@/data/user/userProfileData/PersonalInformationData.ts"
import { formRules, handleAvatarUpload, handleSubmit, handleCancel } from "@/forms/user/userProfileForms/PersonalInformationForms.ts";
import "@/assets/user/userProfileCss/PersonalInformationCss.css"
// 导入 Element Plus 图标
import { User, Lock, Clock, Edit, UploadFilled, Close, Check } from "@element-plus/icons-vue";
</script>

<template>
  <!-- 页面标题 -->
  <div class="page-title">
    <h1 class="el-title el-title--large">基本信息</h1>
    <p class="el-text el-text--secondary">管理您的个人信息、账号安全及隐私设置</p>
  </div>

  <el-divider /> <!-- 小写短横线形式 -->

  <!-- 合并容器：将标签导航移入卡片顶部，内容按 activeTab 切换 -->
  <div class="profile-tab">
    <!-- 查看模式（头像右侧展示摘要信息，下方为简介与详细信息） -->
    <el-card shadow="hover" class="profile-card" v-if="!isEditing">
      <el-tabs v-model="activeTab" class="tabs-inside" type="card">
        <el-tab-pane label="个人资料" name="profile" :icon="User" />
        <el-tab-pane label="账号安全" name="security" :icon="Lock" />
        <el-tab-pane label="登录日志" name="login-log" :icon="Clock" />
      </el-tabs>

      <div v-if="activeTab === 'profile'">
        <!-- 头部：头像 + 摘要信息 + 编辑按钮 -->
        <el-row :gutter="20" class="profile-header">
          <el-col :span="3">
            <el-avatar :size="100" class="avatar">
              <img :src="userInfo.avatar" alt="教师头像" />
            </el-avatar>
          </el-col>
          <el-col :span="18">
            <div class="profile-title">
              <h2 class="profile-name">{{ userInfo.nickname }}</h2>
              <p class="basic-meta">{{ userInfo.subject }} | {{ userInfo.department }} | 教龄 {{ userInfo.teachingAge }}</p>
            </div>
            <div class="header-actions">
              <el-button type="primary" :icon="Edit" @click="toggleEditMode" class="edit-btn">编辑信息</el-button>
            </div><!-- 摘要信息：在头像右侧展示关键字段，避免留白 -->
            <el-descriptions :column="2" class="summary-descriptions">
              <el-descriptions-item label="姓名"><el-text class="detail-value">{{ userInfo.realName }}</el-text></el-descriptions-item>
              <el-descriptions-item label="昵称"><el-text class="detail-value">{{ userInfo.nickname }}</el-text></el-descriptions-item>
              <el-descriptions-item label="职称"><el-text class="detail-value">{{ userInfo.title }}</el-text></el-descriptions-item>
              <el-descriptions-item label="所属部门"><el-text class="detail-value">{{ userInfo.department }}</el-text></el-descriptions-item>
            </el-descriptions>
          </el-col>
        </el-row>

        <el-divider content-position="left">个人简介</el-divider>
        <el-text class="profile-intro">{{ userInfo.intro || '暂无简介' }}</el-text>

        <el-divider content-position="left">详细信息</el-divider>
        <!-- 详细信息：统一使用 Descriptions，整齐排版 -->
        <el-descriptions :column="4" border class="details-descriptions" :content-style="{ 'font-size': '14px' }">
          <el-descriptions-item label="性别"><el-text class="detail-value">{{ userInfo.gender }}</el-text></el-descriptions-item>
          <el-descriptions-item label="出生日期"><el-text class="detail-value">{{ userInfo.birthDate }}</el-text></el-descriptions-item>
          <el-descriptions-item label="教龄"><el-text class="detail-value">{{ userInfo.teachingAge }}</el-text></el-descriptions-item>
          <el-descriptions-item label="任教学科"><el-text class="detail-value">{{ userInfo.subject }}</el-text></el-descriptions-item>
          <el-descriptions-item label="手机"><el-text class="detail-value">{{ userInfo.phone }}</el-text></el-descriptions-item>
          <el-descriptions-item label="邮箱"><el-text class="detail-value">{{ userInfo.email }}</el-text></el-descriptions-item>
          <el-descriptions-item label="入职时间"><el-text class="detail-value">{{ userInfo.hireDate }}</el-text></el-descriptions-item>
          <el-descriptions-item label="学历"><el-text class="detail-value">{{ userInfo.educationBackground }}</el-text></el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>

    <!-- 编辑模式（el-form 组件） -->
    <el-card shadow="hover" class="profile-card" v-else>
      <el-tabs v-model="activeTab" class="tabs-inside" type="card">
        <el-tab-pane label="个人资料" name="profile" :icon="User" />
        <el-tab-pane label="账号安全" name="security" :icon="Lock" />
        <el-tab-pane label="登录日志" name="login-log" :icon="Clock" />
      </el-tabs>
      <div v-if="activeTab === 'profile'">
        <el-form :model="userInfo" :rules="formRules" ref="editFormRef" label-width="100px" :label-suffix="''">
          <!-- 头像上传区域 -->
          <el-form-item label="头像" class="avatar-form-item">
            <el-upload action="/api/upload/avatar" :on-success="handleAvatarUpload" :file-list="[]" list-type="picture-card" :limit="1" accept="image/*">
              <el-avatar :size="100" class="upload-avatar">
                <img :src="userInfo.avatar" alt="头像" />
                <div class="avatar-upload-mask">
                  <UploadFilled class="upload-icon" />
                </div>
              </el-avatar>
            </el-upload>
          </el-form-item>

          <!-- 个人简介 -->
          <el-form-item label="个人简介">
            <el-input v-model="userInfo.intro" type="textarea" :rows="3" placeholder="请输入个人简介" :resize="null"/>
          </el-form-item>

          <!-- 表单网格布局（使用 el-row + el-col 替代原生 div） -->
          <el-row :gutter="20" class="form-grid">
            <el-col :span="12">
              <el-form-item label="姓名" prop="realName">
                <el-input v-model="userInfo.realName" placeholder="请输入姓名" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="昵称" prop="nickname">
                <el-input v-model="userInfo.nickname" placeholder="请输入昵称" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" prop="gender">
                <el-select v-model="userInfo.gender" placeholder="请选择性别" clearable>
                  <el-option label="男" value="男" />
                  <el-option label="女" value="女" />
                  <el-option label="其他" value="其他" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出生日期" prop="birthDate">
                <el-date-picker v-model="userInfo.birthDate" type="date" placeholder="请选择出生日期" value-format="YYYY-MM-DD" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码" prop="phone">
                <el-input v-model="userInfo.phone" placeholder="请输入手机号码" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电子邮箱" prop="email">
                <el-input v-model="userInfo.email" placeholder="请输入电子邮箱" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属部门" prop="department">
                <el-input v-model="userInfo.department" placeholder="请输入所属部门" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="教龄">
                <el-input v-model="userInfo.teachingAge" placeholder="请输入教龄" clearable type="number" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任教学科">
                <el-input v-model="userInfo.subject" placeholder="请输入任教学科" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职称">
                <el-input v-model="userInfo.title" placeholder="请输入职称" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="入职时间" prop="hireDate">
                <el-date-picker v-model="userInfo.hireDate" type="date" placeholder="请选择入职时间" value-format="YYYY-MM-DD" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学历">
                <el-input v-model="userInfo.educationBackground" placeholder="请输入学历" clearable />
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 表单操作按钮（使用 el-space 优化按钮间距） -->
          <el-space class="form-actions" direction="horizontal" :size="16">
            <el-button type="primary" @click="handleSubmit(editFormRef)" :icon="Check" :loading="isSubmitting" :disabled="isSubmitting">提交保存</el-button>
            <el-button @click="handleCancel(editFormRef)" :icon="Close">取消编辑</el-button>
          </el-space>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<style scoped>

</style>