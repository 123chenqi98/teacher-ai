<script setup lang="ts" >
import "@/assets/settings/homeCss/SettingsProFileCss.css"
import {DocumentChecked, Upload,} from '@element-plus/icons-vue'
import {userInfo, formRules} from '@/data/Settings/SettingsProFileData.ts'
import {handleAvatarSuccess, beforeAvatarUpload, handleSave, handleReset,} from '@/utils/Settings/SettingsProFileUtils.ts'
</script>

<template>
  <div class="profile-setting-container">
    <!-- 页面标题 -->
    <div class="profile-title">
      <h2>个人资料</h2>
      <p>更新您的个人信息和偏好设置</p>
    </div>

    <!-- 主要内容区 -->
    <div class="profile-content">
      <!-- 左侧：头像区域 -->
      <div class="profile-avatar-section">
        <el-avatar class="profile-avatar" :size="160">
          <img :src="userInfo.avatar" alt="用户头像" />
        </el-avatar>

        <!-- 头像上传 -->
        <el-upload
            class="avatar-uploader"
            action="/api/upload/avatar"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        >
        <el-button size="small" type="primary" class="upload-btn">
          <el-icon><Upload /></el-icon> 更换头像
        </el-button>
        </el-upload>
        <p class="avatar-tip">支持 JPG、PNG 格式，大小不超过 2MB</p>
      </div>

      <!-- 右侧：表单区域 -->
      <el-form
          class="profile-form"
          :model="userInfo"
          :rules="formRules"
          ref="profileFormRef"
          label-width="120px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userInfo.username" placeholder="请输入用户名" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userInfo.email" type="email" placeholder="请输入邮箱" />
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userInfo.phone" placeholder="请输入手机号" />
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="userInfo.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
            <el-radio :label="0">保密</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="生日">
          <el-date-picker
              v-model="userInfo.birthday"
              type="date"
              placeholder="选择生日"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item label="个人简介">
          <el-mention
              type="textarea"
              v-model="userInfo.introduction"
              placeholder="请输入个人简介（不超过200字）"
              :rows="4"
              maxlength="200"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleSave">
            <el-icon><DocumentChecked /></el-icon> 保存修改
          </el-button>
          <el-button @click="handleReset" style="margin-left: 10px;">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

