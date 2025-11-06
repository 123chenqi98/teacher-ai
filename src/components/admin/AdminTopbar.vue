<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { openModal } from '@/utils/modal'
import FeatureHelpModal from '@/components/modals/FeatureHelpModal.vue'

const route = useRoute()
const router = useRouter()

const items = [
  { key: 'dashboard', label: '数据仪表盘', route: '/admin/dashboard' },
  { key: 'accounts', label: '用户账号', route: '/admin/accounts' },
  { key: 'roles', label: '角色权限', route: '/admin/roles' },
  { key: 'audit', label: '操作审计', route: '/admin/audit' },
]

function isActive(path: string) {
  return route.path === path
}

function go(path: string) {
  if (route.path !== path) router.push(path)
}

function handleLogin() {
  openModal(FeatureHelpModal, { featureName: '登录', description: '登录用于验证用户身份，当前为演示弹窗。' })
}

function handleProfile() {
  openModal(FeatureHelpModal, { featureName: '个人信息', description: '在此查看与编辑个人资料，当前为演示弹窗。' })
}
</script>

<template>
  <div class="admin-topbar">
    <!-- 左侧：平台名称 -->
    <div class="platform-name">
      <span class="platform-title">小知教育平台</span>
    </div>
    
    <!-- 中间：导航链接 -->
    <div class="nav-links">
      <RouterLink
        v-for="i in items"
        :key="i.key"
        :to="i.route"
        class="nav-link"
        :class="{ active: isActive(i.route) }"
        @click.prevent="go(i.route)"
      >
        {{ i.label }}
      </RouterLink>
    </div>
    
    <!-- 右侧：用户操作 -->
    <div class="user-actions">
      <button class="action-btn" @click="handleLogin">登录</button>
      <button class="action-btn" @click="handleProfile">个人信息</button>
    </div>
  </div>
  <div class="soft-divider" />
</template>

<style scoped>
.admin-topbar { 
  height: 60px; 
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  background: var(--color-surface); 
  border: 2px solid #8b5cf6; /* 紫色边框 */
  border-radius: 8px; 
  padding: 0 24px; 
  margin-bottom: 10px; 
  z-index: 5; 
  position: relative;
}

/* 左侧平台名称 */
.platform-name {
  flex-shrink: 0;
}

.platform-title {
  font-size: 20px;
  font-weight: 700;
  color: #8b5cf6; /* 紫色文字 */
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 中间导航链接 */
.nav-links { 
  display: flex; 
  gap: 8px; 
  flex: 1;
  justify-content: center;
}

.nav-link { 
  padding: 10px 18px; 
  border-radius: 20px; 
  cursor: pointer; 
  color: var(--color-text); 
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav-link:hover { 
  background: #f3f0ff; 
  color: #8b5cf6;
}

.nav-link.active { 
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  color: white; 
  font-weight: 600; 
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
}

/* 右侧用户操作 */
.user-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.action-btn {
  padding: 6px 12px;
  border: 1px solid #8b5cf6;
  border-radius: 16px;
  background: transparent;
  color: #8b5cf6;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #8b5cf6;
  color: white;
  box-shadow: 0 2px 6px rgba(139, 92, 246, 0.2);
}

.action-btn:active {
  transform: translateY(1px);
}
</style>