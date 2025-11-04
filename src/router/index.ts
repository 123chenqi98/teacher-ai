import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 首页路由
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      // 登录页面路由
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
      // 管理页面路由
      path: '/admin',
      name: 'admin',
      redirect: '/admin/semester',
      children: [
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
    }
  ],
})

export default router
