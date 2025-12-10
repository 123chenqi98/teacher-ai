<template>


  <!-- 设置页面主体 -->
  <section class="settings-container">
    <div class="container">
      <el-row :gutter="24" class="settings-content">
        <!-- 侧边设置菜单 -->
        <el-col :xs="24" :md="6" class="settings-sidebar">
          <div class="sidebar-card">
            <h3 class="sidebar-title">设置中心</h3>
            <ul class="setting-menu">
              <li
                  v-for="(item, index) in settingMenus"
                  :key="index"
                  @click="activeMenu = index"
                  :class="{ active: activeMenu === index }"
              >
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </div>
        </el-col>

        <!-- 右侧设置内容 -->
        <el-col :xs="24" :md="18" class="settings-main">
          <!-- 账号设置 -->
          <div v-if="activeMenu === 0" class="setting-card">
            <h2 class="card-title">账号设置</h2>
            <div class="form-group">
              <label class="form-label">账号名称</label>
              <div class="form-value">小知用户_12345</div>
              <button class="btn secondary-btn">修改</button>
            </div>
            <div class="form-group">
              <label class="form-label">绑定手机号</label>
              <div class="form-value">138****1234</div>
              <button class="btn secondary-btn">更换绑定</button>
            </div>
            <div class="form-group">
              <label class="form-label">登录密码</label>
              <div class="form-value">******</div>
              <button class="btn secondary-btn">修改密码</button>
            </div>
          </div>

          <!-- 个人信息 -->
          <div v-if="activeMenu === 1" class="setting-card">
            <h2 class="card-title">个人信息</h2>
            <div class="form-group">
              <label class="form-label">昵称</label>
              <input type="text" class="form-input" placeholder="请输入昵称" value="智慧小助手">
            </div>
            <div class="form-group">
              <label class="form-label">头像</label>
              <div class="avatar-upload">
                <img src="https://p3-flow-imagex-download-sign.byteimg.com/tos-cn-i-a9rns2rl98/c0808e7a0d0c40f6a53d39b0f6ff39d6.png" alt="当前头像" class="avatar-img">
                <button class="btn secondary-btn">更换头像</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">个人简介</label>
              <textarea class="form-textarea" placeholder="请输入个人简介">使用小知智能家教平台，提升学习效率</textarea>
            </div>
            <button class="btn primary-btn save-btn">保存修改</button>
          </div>

          <!-- 通知设置 -->
          <div v-if="activeMenu === 2" class="setting-card">
            <h2 class="card-title">通知设置</h2>
            <div class="switch-group">
              <label class="switch-label">学习计划提醒</label>
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider round"></span>
              </label>
            </div>
            <div class="switch-group">
              <label class="switch-label">成绩更新通知</label>
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider round"></span>
              </label>
            </div>
            <div class="switch-group">
              <label class="switch-label">系统消息推送</label>
              <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
              </label>
            </div>
          </div>

          <!-- 系统设置 -->
          <div v-if="activeMenu === 3" class="setting-card">
            <h2 class="card-title">系统设置</h2>
            <div class="form-group">
              <label class="form-label">主题风格</label>
              <div class="theme-options">
                <button class="theme-btn active" style="background: #d1b8ff;">紫色主题（当前）</button>
                <button class="theme-btn" style="background: #e6f7ff;">蓝色主题</button>
                <button class="theme-btn" style="background: #f5f5f5;">浅色主题</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">清除缓存</label>
              <button class="btn secondary-btn">清除本地缓存（2.3MB）</button>
            </div>
            <div class="form-group">
              <label class="form-label">版本信息</label>
              <div class="form-value">V1.2.0 （已是最新版本）</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script setup lang="ts">
import "@/assets/settings/homeCss/SettingCss.css"
import { ref } from 'vue'

// 激活的菜单索引
const activeMenu = ref(0)

// 设置菜单列表
const settingMenus = ref([
  { name: '账号设置' },
  { name: '课程管理' },
  { name: '个人信息' },
  { name: '通知设置' },
  { name: '隐私权限' },
  { name: '系统设置' }
])
</script>

<style scoped ></style>