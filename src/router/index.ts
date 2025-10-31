import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    // 系统相关路由 - 嵌套子路由方式
    {
      path: '/system',
      name: 'system',
      component: () => import('@/views/system/system.vue'),
      children: [
        {
          path: 'personal-overview',
          name: '个人概览',
          component: () => import('@/views/system/user/personal-overview.vue')
        },
        {
          path: 'basic-info',
          name: '基本信息',
          component: () => import('@/views/system/user/basic-info.vue')
        },
        {
          path: 'data-stats',
          name: '数据统计',
          component: () => import('@/views/system/user/data-stats.vue')
        },
        {
          path: 'goalManagement',
          name: '目标管理',
          component: () => import('@/views/system/user/goal-management.vue')
        },
        {
          path: 'notification-center',
          name: '通知中心',
          component: () => import('@/views/system/user/notification-center.vue')
        },
        {
          path: 'lesson-plan',
          name: '教案管理',
          component: () => import('@/views/system/user/lesson-plan.vue')
        },
        {
          path: 'question-bank',
          name: '学习题库',
          component: () => import('@/views/system/user/question-bank.vue')
        },
        {
          path: 'message-center',
          name: '消息中心',
          component: () => import('@/views/system/user/message-center.vue')
        },
        {
          path: 'resource-center',
          name: '资源中心',
          component: () => import('@/views/system/user/resource-center.vue')
        }
      ]
    }
  ],
})

export default router
