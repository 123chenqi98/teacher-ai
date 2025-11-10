// 系统模块路由
export const systemRouters = [
    {
        // 首页路由
        path: '/',
        name: 'home',
        component: () => import('@/views/system/HomeView.vue'),
    },
]