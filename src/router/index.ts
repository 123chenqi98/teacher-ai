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
      children: [
          // 用户主页受登录保护，将重定向至登录页
          {
              path: '/user',
              name: 'user',
              component: () => import('@/views/auth/LoginView.vue'),
              children: [
                  {
                      path: 'dashboard',
                      name: 'dashboard',
                      component: () => import('@/views/system/user/UserDashboard.vue')
                  },
                  {
                      path: 'profile',
                      name: 'profile',
                      component: () => import('@/views/system/user/UserProfile.vue')
                  },
                  {
                      path: 'analytics',
                      name: 'analytics',
                      component: () => import('@/views/system/user/AnalyticsDashboard.vue')
                  },
                  {
                      path: 'goals',
                      name: 'goals',
                      component: () => import('@/views/system/user/GoalManagement.vue')
                  },
                  {
                      path: 'notifications',
                      name: 'notifications',
                      component: () => import('@/views/system/user/NotificationCenter.vue')
                  },
                  {
                      path: 'lessonPlans',
                      name: 'lessonPlans',
                      component: () => import('@/views/system/user/LessonPlanManager.vue')
                  },
                  {
                      path: 'questionBank',
                      name: 'questionBank',
                      component: () => import('@/views/system/user/QuestionBank.vue')
                  },
                  {
                      path: 'messages',
                      name: 'messages',
                      component: () => import('@/views/system/user/MessageCenter.vue')
                  },
                  {
                      path: 'resources',
                      name: 'resources',
                      component: () => import('@/views/system/user/ResourceCenter.vue')
                  }
              ]
          },
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
    },
    {
      // 管理页面路由 - 后台布局
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      redirect: '/admin/semester',
      children: [
        {
          path: 'user-management',
          name: 'admin-user-management',
          component: () => import('@/views/UserManagement.vue'),
        },
        {
          // 学期管理页面
          path: 'semester',
          name: 'semesterManagement',
          component: () => import('@/views/admin/SemesterManagement.vue'),
        },
        {
          // 学科管理页面
          path: 'subject',
          name: 'subjectManagement',
          component: () => import('@/views/admin/SubjectManagement.vue'),
        },
        {
          // 学生信息页面
          path: 'student',
          name: 'studentInfo',
          component: () => import('@/views/admin/StudentInfo.vue'),
        },
        {
          // 年级管理页面
          path: 'grade',
          name: 'gradeManagement',
          component: () => import('@/views/admin/GradeManagement.vue'),
        },
        {
          // 教学大纲管理页面
          path: 'syllabus',
          name: 'syllabusManagement',
          component: () => import('@/views/admin/SyllabusManagement.vue'),
        }
      ]
    },
        {
          path: '/role-permission',
          name: 'admin-role-permission',
          component: () => import('@/views/RolePermission.vue'),
        },
        {
          path: '/system-settings',
          name: 'admin-system-settings',
          component: () => import('@/views/SystemSettings.vue'),
        },
        {
          path: '/role-list',
          name: 'role-list',
          component: () => import('@/components/system/common/RoleComponents.vue'),
        }
      ]
})

export default router