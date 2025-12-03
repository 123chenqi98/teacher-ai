<script setup lang="ts">
import "@/assets/user/userDashboardCss/PersonalizedSettingCss.css"
import { settingsForm } from "@/data/user/userDashboardData/PersonalizedSettingsData.ts"
import { CircleCheckFilled, Refresh } from "@element-plus/icons-vue";
import { syncDialogVisible, handleSync, closeDialog } from "@/forms/user/teacherInfo/userDashboardForms/PersonalizedSettingsForms.ts"
</script>

<template>
  <el-col :span="24">
    <el-card shadow="hover" :border="false" class="settings-card">
      <div class="card-header">
        <h2 class="top-title">个性化设置</h2>
      </div>
      <el-form :model="settingsForm" label-width="100px" class="settings-form" size="small">
        <!-- 主题切换 -->
        <el-form-item label="主题切换">
          <el-select v-model="settingsForm.theme" class="theme-select">
            <el-option label="默认淡紫主题" value="purple"></el-option>
            <el-option label="蓝色主题" value="blue"></el-option>
            <el-option label="绿色主题" value="green"></el-option>
            <el-option label="深色主题" value="dark"></el-option>
          </el-select>
        </el-form-item>

        <!-- 语言选择 -->
        <el-form-item label="语言选择">
          <el-select v-model="settingsForm.language" class="language-select">
            <el-option label="简体中文" value="zh-CN"></el-option>
            <el-option label="English" value="en-US"></el-option>
          </el-select>
        </el-form-item>

        <!-- 通知权限 -->
        <el-form-item label="通知权限">
          <div class="permission-group">
            <el-checkbox v-model="settingsForm.notifications.system" label="系统通知"></el-checkbox>
            <el-checkbox v-model="settingsForm.notifications.message" label="消息提醒"></el-checkbox>
            <el-checkbox v-model="settingsForm.notifications.marketing" label="营销推送"></el-checkbox>
          </div>
        </el-form-item>

        <!-- 界面布局 -->
        <el-form-item label="界面布局">
          <el-radio-group v-model="settingsForm.layout" class="layout-group">
            <el-radio label="card">卡片式</el-radio>
            <el-radio label="list">列表式</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 新增：字体大小设置 -->
        <el-form-item label="字体大小">
          <el-select v-model="settingsForm.fontSize" class="font-select">
            <el-option label="小" value="small"></el-option>
            <el-option label="中" value="medium"></el-option>
            <el-option label="大" value="large"></el-option>
          </el-select>
        </el-form-item>

        <!-- 新增：默认教案模板 -->
        <el-form-item label="默认教案模板">
          <el-select v-model="settingsForm.defaultTemplate" class="template-select">
            <el-option label="基础模板" value="basic"></el-option>
            <el-option label="详案模板" value="detailed"></el-option>
            <el-option label="分层教学模板" value="layered"></el-option>
          </el-select>
        </el-form-item>

        <!-- 新增：自动保存时间 -->
        <el-form-item label="自动保存时间">
          <el-select v-model="settingsForm.autoSaveTime" class="time-select">
            <el-option label="1分钟" value="1"></el-option>
            <el-option label="3分钟" value="3"></el-option>
            <el-option label="5分钟" value="5"></el-option>
          </el-select>
        </el-form-item>

        <!-- 数据同步 -->
        <el-form-item label="数据同步">
          <el-button type="primary" @click="handleSync" class="sync-btn" size="small">
            <el-icon><Refresh /></el-icon>
            <span class="ml-1">立即同步</span>
          </el-button>
        </el-form-item>

        <!-- 同步成功弹窗 -->
        <el-dialog v-model="syncDialogVisible" title="同步结果" width="300px" :show-close="false">
          <div class="sync-success-content">
            <el-icon class="success-icon"><CircleCheckFilled /></el-icon>
            <p class="success-text">同步成功！</p>
          </div>
          <template #footer>
            <el-button type="primary" @click="closeDialog">确定</el-button>
          </template>
        </el-dialog>
      </el-form>
    </el-card>
  </el-col>
</template>

<style scoped>
.success-icon {
  font-size: 20px;
  color: #67c23a;
}
</style>