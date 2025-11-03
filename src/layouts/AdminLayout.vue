<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="brand">小知智能教师系统</div>
      <el-menu :default-active="activeMenu" router class="menu" :unique-opened="true">
        <el-menu-item index="/admin/user-management">用户管理</el-menu-item>
        <el-menu-item index="/admin/role-permission">角色权限</el-menu-item>
        <el-menu-item index="/admin/system-settings">系统设置</el-menu-item>
      </el-menu>
    </aside>
    <section class="main">
      <header class="header">
        <el-input v-model="keyword" placeholder="搜素你想查找的内容..." style="max-width: 380px"/>
        <div class="header-right">
          <div class="user-box" @click="triggerAvatarUpload">
            <div class="avatar-ring">
              <el-avatar :size="34" :src="avatarUrl" />
            </div>
            <span class="user-name">系统管理员</span>
          </div>
          <input ref="avatarInputRef" type="file" accept="image/*" class="hidden-input" @change="onAvatarChange" />
        </div>
      </header>
      <div class="content page-wrapper">
        <router-view />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const keyword = ref('')
const route = useRoute()
const activeMenu = computed(() => {
  if (route.path.startsWith('/admin')) return route.path
  return '/admin/user-management'
})

// 头像设置（本地预览并持久化到 localStorage）
const AVATAR_KEY = 'admin_avatar_url'
const avatarUrl = ref<string | undefined>(localStorage.getItem(AVATAR_KEY) || undefined)
const avatarInputRef = ref<HTMLInputElement | null>(null)
const triggerAvatarUpload = () => avatarInputRef.value?.click()
const onAvatarChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files || files.length === 0) return
  const file = files[0]
  const url = URL.createObjectURL(file)
  avatarUrl.value = url
  localStorage.setItem(AVATAR_KEY, url)
}
</script>

<style scoped>
.admin-layout { display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; }
/* 侧边栏使用渐变紫，文字为浅色 */
.sidebar {
  background: linear-gradient(180deg, #6b5ff5 0%, #a891ff 100%);
  color: #f7f7ff;
  display: flex;
  flex-direction: column;
}
.brand { padding: 16px 16px 8px 16px; font-weight: 700; color: #ffffff; }
.menu {
  border-right: none;
  background: transparent;
  --el-menu-bg-color: transparent;
  --el-menu-text-color: #111111; /* 侧边菜单文字改为黑色 */
  --el-menu-active-color: #000000;
}
/* 激活项添加浅白透明背景 */
:deep(.el-menu-item.is-active) {
  background: rgba(255, 255, 255, 0.16);
  border-radius: 8px;
}
.main { display: flex; flex-direction: column; }
.header { height: 56px; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; background: #efeafe; border-bottom: 1px solid var(--brand-border); }
.content { flex: 1; }

.user-box { display:flex; align-items:center; gap:10px; cursor:pointer; }
.avatar-ring { border: 2px solid var(--brand-primary); border-radius: 50%; padding: 2px; display: inline-flex; }
.user-name { color: #2b2b2b; font-weight: 600; }
.hidden-input { display:none; }
</style>


