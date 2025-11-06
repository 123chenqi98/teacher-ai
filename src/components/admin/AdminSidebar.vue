<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
function onNavClick(path: string) { if (route.path !== path) router.push(path) }
const items = [
  { key: 'dashboard', label: '数据仪表盘', route: '/admin/dashboard' },
  { key: 'accounts', label: '用户账号', route: '/admin/accounts' },
  { key: 'roles', label: '角色权限', route: '/admin/roles' },
  { key: 'audit', label: '操作审计', route: '/admin/audit' },
]
</script>

<template>
  <aside class="admin-sidebar">
    <div class="brand">小知教育平台</div>
    <nav>
      <RouterLink
        v-for="i in items"
        :key="i.key"
        :to="i.route"
        class="nav-item"
        :class="{ active: route.path === i.route }"
        @click.prevent="onNavClick(i.route)"
      >
        <span class="icon">⚡</span>
        <span class="text">{{ i.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
.admin-sidebar {
  width: 200px;
  background: linear-gradient(180deg, #3a2d5b, #2b2246);
  color: #fff;
  padding: 12px 8px;
  position: fixed; /* 固定定位，彻底避免被内容覆盖 */
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 999999; /* 进一步提升层级，确保任何遮罩之上 */
  transform: translateZ(0); /* 独立合成层，避免点击穿透问题 */
  will-change: transform;
  pointer-events: auto;
}
.brand { font-weight: 600; margin-bottom: 12px; }
.brand { font-weight: 600; margin-bottom: 12px; font-size: 22px; }
.nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; cursor: pointer; color: #fff; text-decoration: none; pointer-events: auto; }
.nav-item:hover { background: rgba(255,255,255,0.08); }
.nav-item.active { background: rgba(255,255,255,0.15); }
.icon { background: #7c4dff; border-radius: 6px; padding: 3px 8px; font-size: 14px; }
.text { font-size: 17px; }
</style>