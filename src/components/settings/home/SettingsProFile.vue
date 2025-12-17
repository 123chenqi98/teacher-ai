<script setup lang="ts" >
import "@/assets/settings/homeCss/SettingsProFileCss.css"
import { ref, reactive } from 'vue'
import { ElMessage, ElForm, type FormItemRule } from 'element-plus' // 导入FormItemRule类型
import {DocumentChecked, Upload,} from '@element-plus/icons-vue'

// 表单引用
const profileFormRef = ref<InstanceType<typeof ElForm>>()

// 用户信息数据
const userInfo = reactive({
  avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec6434a56f33f4d9f473bjpg.png',
  username: '张老师',
  email: 'teacher@example.com',
  phone: '13800138000',
  gender: 1,
  birthday: '1990-01-01',
  introduction: '我是一名人民教师，热爱教育事业，致力于培养优秀的学生。'
})

// 显式指定类型为 Record<string, FormItemRule[]>，规范验证规则
const formRules = reactive<Record<string, FormItemRule[]>>({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur'
    },
    {
      type: 'email', // 明确指定type为email（FormItemRule支持的合法值）
      message: '请输入正确的邮箱格式',
      trigger: 'blur',
      required: false // 显式声明非必填（避免TS推断歧义）
    }
  ],
  phone: [
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号',
      trigger: 'blur',
      required: false // 非必填则显式声明
    }
  ]
})

// 其余方法（handleAvatarSuccess、beforeAvatarUpload等）不变
const handleAvatarSuccess = (response: any) => {
  userInfo.avatar = response.data.url
  ElMessage.success('头像上传成功')
}

const beforeAvatarUpload = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJpgOrPng) {
    ElMessage.error('只能上传 JPG/PNG 格式的图片')
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB')
  }
  return isJpgOrPng && isLt2M
}

const handleSave = async () => {
  if (!profileFormRef.value) return
  try {
    await profileFormRef.value.validate()
    console.log('保存用户信息:', userInfo)
    ElMessage.success('个人资料修改成功')
  } catch (error) {
    console.log('表单验证失败:', error)
  }
}

const handleReset = () => {
  profileFormRef.value?.resetFields()
}
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

