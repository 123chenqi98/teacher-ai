export const userCenterRoute = [
    // 测试页面
    {
        path: '/test',
        name: 'test',
        component: () => import('@/views/user/oo.vue'),
    },
    // 个人中心页面路由
    {
        path: '/user',
        name: 'user',
        component: () => import('@/views/HomeView.vue'),
        children: [
            // 个人概览页
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/views/user/UserDashboardView.vue'),
                meta: { title: '个人概览' }
            },
            // 基本信息页
            {
                path: 'profile',
                name: 'profile',
                component: () => import('@/views/user/UserProfileView.vue'),
                meta: { title: '基本信息' }
            },
            // 数据统计页
            {
                path: 'analytics',
                name: 'analytics',
                component: () => import('@/views/user/AnalyticsDashboardView.vue'),
                meta: { title: '数据统计' }
            },
            // 目标管理页
            {
                path: 'goals',
                name: 'goals',
                component: () => import('@/views/user/GoalManagementView.vue'),
                meta: { title: '目标管理' }
            },
            // 通知中心页
            {
                path: 'notifications',
                name: 'notifications',
                component: () => import('@/views/user/NotificationCenterView.vue'),
                meta: {title: '通知中心'}
            },
            // 教案管理页
            {
                path: 'lessonPlans',
                name: 'lessonPlans',
                component: () => import('@/views/user/LessonPlanManagerView.vue'),
                meta: { title: '教案管理' }
            },
            // 消息中心页
            {
                path: 'messages',
                name: 'messages',
                component: () => import('@/views/user/MessageCenterView.vue'),
                meta: { title: '消息中心' }
            }
        ]
    }
]

