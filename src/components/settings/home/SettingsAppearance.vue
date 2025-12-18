<script setup lang="ts">
import '@/assets/settings/homeCss/SettingsAppearanceCss.css'
import {
  handleThemeChange,
  handleColorChange,
  handleBgSwitch,
  handleBgUpload,
  handleFontSizeChange,
  handleZoomChange,
  handleFontFamilyChange,
  handleSidebarWidthChange,
  handleNavShadowChange,
  handleRadiusChange,
  handleReset,
} from "@/utils/Settings/SettingsAppearanceUtils.ts"
import {
  themeMode,
  themeColor,
  customBg,
  fontSize,
  zoomRatio,
  fontFamily,
  sidebarWidth,
  showNavShadow,
  cardRadius
} from "@/data/Settings/SettingsAppearanceData.ts"
</script>


<template>
  <div class="appearance-page">
    <!-- 页面标题（和其他设置页风格统一） -->
    <div class="page-title">外观设置</div>

    <!-- 主题设置模块 -->
    <el-card class="setting-card" shadow="hover">
      <template #header>
        <div class="card-header">主题设置</div>
      </template>
      <el-form label-width="100px" class="setting-form">
        <el-form-item label="主题模式">
          <el-radio-group v-model="themeMode" @change="handleThemeChange">
            <el-radio label="light">亮色模式</el-radio>
            <el-radio label="dark">暗色模式</el-radio>
            <el-radio label="auto">跟随系统</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="主题色">
          <el-color-picker
              v-model="themeColor"
              @change="handleColorChange"
              predefine-colors="#1989fa,#409eff,#67c23a,#e6a23c,#f56c6c"
          />
        </el-form-item>
        <el-form-item label="自定义背景">
          <el-switch v-model="customBg" @change="handleBgSwitch" />
          <el-upload
              v-if="customBg"
              class="bg-upload"
              action="#"
              :show-file-list="false"
              :before-upload="handleBgUpload"
          >
            <el-button type="text" size="small">选择图片</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 字体与缩放设置 -->
    <el-card class="setting-card" shadow="hover">
      <template #header>
        <div class="card-header">字体与缩放</div>
      </template>
      <el-form label-width="100px" class="setting-form">
        <el-form-item label="字体大小">
          <el-slider
              v-model="fontSize"
              :min="12"
              :max="20"
              :step="1"
              @change="handleFontSizeChange"
              show-input
          />
          <div class="font-preview">
            预览：这是设置后的字体大小效果
          </div>
        </el-form-item>
        <el-form-item label="页面缩放">
          <el-select v-model="zoomRatio" @change="handleZoomChange" style="width: 150px">
            <el-option label="80%" value="0.8" />
            <el-option label="90%" value="0.9" />
            <el-option label="100%" value="1.0" />
            <el-option label="110%" value="1.1" />
            <el-option label="120%" value="1.2" />
          </el-select>
        </el-form-item>
        <el-form-item label="字体类型">
          <el-select v-model="fontFamily" @change="handleFontFamilyChange" style="width: 200px">
            <el-option label="系统默认" value="system" />
            <el-option label="微软雅黑" value="Microsoft YaHei" />
            <el-option label="宋体" value="SimSun" />
            <el-option label="Arial" value="Arial" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 界面布局设置 -->
    <el-card class="setting-card" shadow="hover">
      <template #header>
        <div class="card-header">界面布局</div>
      </template>
      <el-form label-width="100px" class="setting-form">
        <el-form-item label="侧边栏宽度">
          <el-slider
              v-model="sidebarWidth"
              :min="200"
              :max="300"
              :step="10"
              @change="handleSidebarWidthChange"
              show-input
          />
        </el-form-item>
        <el-form-item label="显示导航栏阴影">
          <el-switch v-model="showNavShadow" @change="handleNavShadowChange" />
        </el-form-item>
        <el-form-item label="卡片圆角">
          <el-radio-group v-model="cardRadius" @change="handleRadiusChange">
            <el-radio label="small">小（4px）</el-radio>
            <el-radio label="medium">中（8px）</el-radio>
            <el-radio label="large">大（12px）</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 重置按钮 -->
    <div class="reset-btn-wrap">
      <el-button type="warning" @click="handleReset">重置所有外观设置</el-button>
    </div>
  </div>
</template>

