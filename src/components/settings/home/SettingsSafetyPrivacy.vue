<script setup lang="ts">
import "@/assets/settings/homeCss/SettingsSafetyPrivacyCss.css"
import {handleMenuSelect, handleSwitchChange, handleLogoutDevice,switchStates, deviceDialogVisible,} from "@/utils/Settings/SettingsSafetyPrivacyUtils.ts"
import { ArrowRight, } from '@element-plus/icons-vue'
import {ElCard, ElMenu, ElMenuItem,  ElSwitch, ElIcon, ElDialog, ElTag, ElButton} from 'element-plus'
</script>

<template>
  <div class="security-page">
    <!-- Element 页头 -->
    <div class="page-title">安全与隐私</div>

    <!-- 主内容区 -->
    <div class="content-wrapper">
      <!-- 账号安全模块：Element Card 组件 -->
      <el-card class="setting-card" shadow="hover">
        <template #header>
          <div class="card-header">账号安全</div>
        </template>

        <!-- 替换 ElList 为 ElMenu（适配设置项列表） -->
        <el-menu class="setting-menu" default-active="" @select="handleMenuSelect">
          <el-menu-item index="modifyPwd" class="menu-item">
            <span class="item-label">登录密码</span>
            <el-icon class="item-arrow"><ArrowRight /></el-icon>
          </el-menu-item>
          <el-menu-item index="modifyPhone" class="menu-item">
            <span class="item-label">绑定手机号</span>
            <el-icon class="item-arrow"><ArrowRight /></el-icon>
          </el-menu-item>
          <el-menu-item index="deviceManage" class="menu-item">
            <span class="item-label">登录设备管理</span>
            <el-icon class="item-arrow"><ArrowRight /></el-icon>
          </el-menu-item>
          <!-- 开关项：单独布局 -->
          <el-menu-item index="wechatLogin" class="menu-item switch-item">
            <span class="item-label">微信快捷登录</span>
            <el-switch
                v-model="switchStates.wechatLogin"
                @change="handleSwitchChange('wechatLogin')"
                active-color="#1989fa"
                inactive-color="#e5e5e5"
            />
          </el-menu-item>
        </el-menu>
      </el-card>

      <!-- 隐私设置模块 -->
      <el-card class="setting-card" shadow="hover">
        <template #header>
          <div class="card-header">隐私设置</div>
        </template>
        <el-menu class="setting-menu" @select="handleMenuSelect">
          <el-menu-item index="profileVisible" class="menu-item">
            <div class="item-label">
              个人资料可见范围
              <div class="item-desc">谁可以查看我的基本信息</div>
            </div>
            <el-icon class="item-arrow"><ArrowRight /></el-icon>
          </el-menu-item>
          <el-menu-item index="authManage" class="menu-item">
            <span class="item-label">第三方授权管理</span>
            <el-icon class="item-arrow"><ArrowRight /></el-icon>
          </el-menu-item>
          <el-menu-item index="adSetting" class="menu-item switch-item">
            <span class="item-label">个性化广告设置</span>
            <el-switch
                v-model="switchStates.adSetting"
                @change="handleSwitchChange('adSetting')"
                active-color="#1989fa"
                inactive-color="#e5e5e5"
            />
          </el-menu-item>
        </el-menu>
      </el-card>

      <!-- 安全提醒模块 -->
      <el-card class="setting-card" shadow="hover">
        <template #header>
          <div class="card-header">安全提醒</div>
        </template>
        <el-menu class="setting-menu">
          <el-menu-item index="loginRemind" class="menu-item switch-item">
            <span class="item-label">异地登录提醒</span>
            <el-switch
                v-model="switchStates.loginRemind"
                @change="handleSwitchChange('loginRemind')"
                active-color="#1989fa"
                inactive-color="#e5e5e5"
            />
          </el-menu-item>
          <el-menu-item index="operateRemind" class="menu-item switch-item">
            <span class="item-label">敏感操作提醒</span>
            <el-switch
                v-model="switchStates.operateRemind"
                @change="handleSwitchChange('operateRemind')"
                active-color="#1989fa"
                inactive-color="#e5e5e5"
            />
          </el-menu-item>
        </el-menu>
      </el-card>
    </div>

    <!-- 设备管理弹窗 -->
    <el-dialog
        v-model="deviceDialogVisible"
        title="当前登录设备"
        width="80%"
        max-width="500px"
        @close="deviceDialogVisible = false"
    >
      <!-- 弹窗内列表：用 div 布局替代 ElList -->
      <div class="device-list">
        <div class="device-item">
          <div class="device-name">iPhone 15 (当前设备)</div>
          <div class="device-desc">登录时间：2025-12-17 10:23 | IP：192.168.1.100</div>
          <el-tag type="success" class="device-tag">已验证</el-tag>
        </div>
        <div class="device-item">
          <div class="device-name">MacBook Pro</div>
          <div class="device-desc">登录时间：2025-12-16 18:45 | IP：10.0.0.5</div>
          <el-button
              type="text"
              text-color="#ff4d4f"
              @click="handleLogoutDevice"
              class="logout-btn"
          >
            退出登录
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

