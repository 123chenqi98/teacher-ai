<script setup lang="ts">
// 导入 Element Plus 图标
import { Edit, UploadFilled, Close, Check } from "@element-plus/icons-vue";
import { onMounted } from "vue";
import { ElMessage } from "element-plus";
import AccountSecurityComponents from "@/components/user/userProfileComponents/AccountSecurityComponents.vue";
import LoginLogComponents from "@/components/user/userProfileComponents/LoginLogComponents.vue";
import "@/assets/user/userProfileCss/PersonalInformationCss.css"
import { headerTitle, headerSubtitle, userInfo } from "@/data/user/userProfileData/PersonalInformationData.ts"
import { teacherFormRules, handleAvatarUpload, handleSubmit, handleCancel, teacherInfoForm, teacherInfoRef } from "@/forms/user/teacherInfo/userProfileForms/PersonalInformationForms.ts";
import { activeTab, isEditing, isSubmitting, toggleEditMode } from "@/utils/user/teacher/info/userProfile/PersonalInformationUtils.ts";

// 组件挂载完成后初始化表单数据
onMounted(() => {
  // 确保 userInfo 已加载完成
  if (userInfo && Object.keys(userInfo.value).length > 0) {
    // 使用 Object.assign 保证响应性，避免手动赋值
    Object.assign(teacherInfoForm, userInfo.value);
    ElMessage.success("数据同步成功");
  } else {
    ElMessage.warning("未获取到用户数据");
  }
});
</script>

<template>
  <div>
    <div class="page-title">
      <h1 class="el-title el-title--large">{{ headerTitle }}</h1>
      <p class="el-text el-text--secondary">{{ headerSubtitle }}</p>
    </div>
    <el-divider />
    <el-card shadow="hover" class="profile-card-container">
      <template #header>
        <el-tabs v-model="activeTab" type="card" class="tabs-inside">
          <el-tab-pane label="个人资料" name="profile" />
          <el-tab-pane label="账号安全" name="security" />
          <el-tab-pane label="登录日志" name="login-log" />
        </el-tabs>
      </template>

      <div class="profile-tab">
        <div v-if="activeTab === 'profile' && !isEditing" class="profile-card">
          <div>
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
                  <el-button type="primary" :icon="Edit" @click="toggleEditMode" class="profile-edit-btn">编辑信息</el-button>
                </div>
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
        </div>

        <div v-else-if="activeTab === 'profile' && isEditing" class="profile-card">
          <div>
            <el-form :model="teacherInfoForm" :rules="teacherFormRules" ref="teacherInfoRef" label-width="100px" :label-suffix="''">
              <el-form-item label="头像" class="avatar-form-item">
                <el-upload action="/api/upload/avatar" :on-success="handleAvatarUpload" :file-list="[]" list-type="picture-card" :limit="1" accept="image/*">
                  <el-avatar :size="100" class="upload-avatar">
                    <img :src="teacherInfoForm.avatar" alt="头像" />
                    <div class="avatar-upload-mask">
                      <UploadFilled class="upload-icon" />
                    </div>
                  </el-avatar>
                </el-upload>
              </el-form-item>

              <el-form-item label="个人简介">
                <el-input v-model="teacherInfoForm.intro" type="textarea" :rows="3" placeholder="请输入个人简介" :resize="null"/>
              </el-form-item>

              <el-row :gutter="20" class="form-grid">
                <el-col :span="12">
                  <el-form-item label="姓名" prop="realName">
                    <el-input v-model="teacherInfoForm.realName" placeholder="请输入姓名" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="teacherInfoForm.nickname" placeholder="请输入昵称" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别" prop="gender">
                    <el-select v-model="teacherInfoForm.gender" placeholder="请选择性别" clearable>
                      <el-option label="男" value="男" />
                      <el-option label="女" value="女" />
                      <el-option label="其他" value="其他" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="出生日期" prop="birthDate">
                    <el-date-picker v-model="teacherInfoForm.birthDate" type="date" placeholder="请选择出生日期" value-format="YYYY-MM-DD" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="teacherInfoForm.phone" placeholder="请输入手机号码" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="电子邮箱" prop="email">
                    <el-input v-model="teacherInfoForm.email" placeholder="请输入电子邮箱" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所属部门" prop="department">
                    <el-input v-model="teacherInfoForm.department" placeholder="请输入所属部门" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="教龄">
                    <el-input v-model="teacherInfoForm.teachingAge" placeholder="请输入教龄" clearable type="number" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="任教学科">
                    <el-input v-model="teacherInfoForm.subject" placeholder="请输入任教学科" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="职称">
                    <el-input v-model="teacherInfoForm.title" placeholder="请输入职称" clearable />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="入职时间" prop="hireDate">
                    <el-date-picker v-model="teacherInfoForm.hireDate" type="date" placeholder="请选择入职时间" value-format="YYYY-MM-DD" clearable/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="学历">
                    <el-input v-model="teacherInfoForm.educationBackground" placeholder="请输入学历" clearable />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-space class="form-actions" direction="horizontal" :size="16">
                <el-button type="primary" @click="handleSubmit(teacherInfoRef)" :icon="Check" :loading="isSubmitting" :disabled="isSubmitting">提交保存</el-button>
                <el-button @click="handleCancel(teacherInfoRef)" :icon="Close">取消编辑</el-button>
              </el-space>
            </el-form>
          </div>
        </div>
        <AccountSecurityComponents v-else-if="activeTab === 'security'" />
        <LoginLogComponents v-else-if="activeTab === 'login-log'" />
      </div>
    </el-card>
  </div>
</template>

<style scoped>

</style>
