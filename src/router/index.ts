import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 主页直接进入后台布局（用户管理）
    { path: '/', redirect: '/admin/user-management' },
    // 原首页入口保留在 /portal
    {
      path: '/portal',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    // 后台布局路由
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      children: [
        {
          path: 'user-management',
          name: 'admin-user-management',
          component: () => import('@/views/UserManagement.vue'),
        },
        {
          path: 'role-permission',
          name: 'admin-role-permission',
          component: () => import('@/views/RolePermission.vue'),
        },
        {
          path: 'system-settings',
          name: 'admin-system-settings',
          component: () => import('@/views/SystemSettings.vue'),
        },
      ]
    },
    // 兼容旧路由：角色列表页面路由
    {
      path: '/role-list',
      name: 'role-list',
      component: () => import('@/components/common/RoleComponents.vue'),
    },
  ],
})

export default router