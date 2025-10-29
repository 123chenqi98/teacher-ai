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
          name: 'personalOverview',
          component: () => import('@/views/system/user/personal-overview.vue')
        },
        {
          path: 'basic-info',
          name: 'basicInfo',
          component: () => import('@/views/system/user/basic-info.vue')
        },
        {
          path: 'data-stats',
          name: 'dataStats',
          component: () => import('@/views/system/user/data-stats.vue')
        },
        {
          path: 'goal-management',
          name: 'goalManagement',
          component: () => import('@/views/system/user/goal-management.vue')
        },
        {
          path: 'notification-center',
          name: 'notificationCenter',
          component: () => import('@/views/system/user/notification-center.vue')
        },
        {
          path: 'lesson-plan',
          name: 'lessonPlan',
          component: () => import('@/views/system/user/lesson-plan.vue')
        },
        {
          path: 'question-bank',
          name: 'questionBank',
          component: () => import('@/views/system/user/question-bank.vue')
        },
        {
          path: 'message-center',
          name: 'messageCenter',
          component: () => import('@/views/system/user/message-center.vue')
        },
        {
          path: 'resource-center',
          name: 'resourceCenter',
          component: () => import('@/views/system/user/resource-center.vue')
        }
      ]
    }
  ],
})

export default router
