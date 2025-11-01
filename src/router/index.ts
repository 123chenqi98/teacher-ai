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
      component:()=>import('@/views/system/LoginView.vue'),
      children:[
        {
          // 密码登录默认登录方式
          path:'',
          name:'passwordLogin',
          component:()=>import('@/components/system/loginComponents/PasswordLoginComponent.vue'),
        },
        {
          // 邮箱验证码登录
          path:'emailLogin',
          name:'emailLogin',
          component:()=>import('@/components/system/loginComponents/EmailLoginComponent.vue'),
        },
        {
          // 微信登录
          path:'wechatLogin',
          name:'wechatLogin',
          component:()=>import('@/components/system/loginComponents/WechatLoginComponent.vue'),
        }
      ]
    },
  ],
})

export default router
