import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 主页直接进入后台布局（用户管理）
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
    },
    // 用户主页受登录保护，将重定向至登录页
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/auth/LoginView.vue'),
      children: [
          // 个人概览页
          {
              path: 'dashboard',
              name: 'dashboard',
              component: () => import('@/views/user/UserDashboard.vue')
          },
          // 基本信息页
          {
              path: 'profile',
              name: 'profile',
              component: () => import('@/views/user/UserProfile.vue')
          },
          // 数据统计页
          {
              path: 'analytics',
              name: 'analytics',
              component: () => import('@/views/user/AnalyticsDashboard.vue')
          },
          // 目标管理页
          {
              path: 'goals',
              name: 'goals',
              component: () => import('@/views/user/GoalManagement.vue')
          },
          // 通知中心页
          {
              path: 'notifications',
              name: 'notifications',
              component: () => import('@/views/user/NotificationCenter.vue')
          },
          // 教案管理页
          {
              path: 'lessonPlans',
              name: 'lessonPlans',
              component: () => import('@/views/user/LessonPlanManager.vue')
          },
          // 学习题库页
          {
              path: 'questionBank',
              name: 'questionBank',
              component: () => import('@/views/user/QuestionBank.vue')
          },
          // 消息中心页
          {
              path: 'messages',
              name: 'messages',
              component: () => import('@/views/user/MessageCenter.vue')
          },
          // 资源中心页
          {
              path: 'resources',
              name: 'resources',
              component: () => import('@/views/user/ResourceCenter.vue')
          }
      ]
    },
    // 登录页面路由
    {
      path:'/login',
      name:"login",
      component:()=>import('@/views/auth/LoginView.vue'),
      children:[
        {
          // 密码登录默认登录方式
          path:'',
          name:'passwordLogin',
          component:()=>import('@/components/auth/loginComponents/PasswordLoginComponent.vue'),
        },
        {
          // 邮箱验证码登录
          path:'emailLogin',
          name:'emailLogin',
          component:()=>import('@/components/auth/loginComponents/EmailLoginComponent.vue'),
        },
        {
          // 微信登录
          path:'wechatLogin',
          name:'wechatLogin',
          component:()=>import('@/components/auth/loginComponents/WechatLoginComponent.vue'),
        }
      ]
    },
    {
      // 注册页面路由
      path:'/register',
      name:"register",
      component:()=>import('@/views/auth/RegisterView.vue'),
    },
    {
      // 忘记密码页面路由
      path:'/forgetPassword',
      name:"forgetPassword",
      component:()=>import('@/views/auth/ForgetPasswordView.vue'),
    }
  ]
})

export default router