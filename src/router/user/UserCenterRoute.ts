export const userCenterRoute = [
    // 测试页面
    {
        path: '/test',
        name: 'test',
        component: () => import('@/components/user/TopNavigationComponents.vue'),
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
                component: () => import('@/views/user/UserDashboardView.vue')
            },
            // 基本信息页
            {
                path: 'profile',
                name: 'profile',
                component: () => import('@/views/user/UserProfileView.vue')
            },
            // 数据统计页
            {
                path: 'analytics',
                name: 'analytics',
                component: () => import('@/views/user/AnalyticsDashboardView.vue')
            },
            // 目标管理页
            {
                path: 'goals',
                name: 'goals',
                component: () => import('@/views/user/GoalManagementView.vue')
            },
            // 通知中心页
            {
                path: 'notifications',
                name: 'notifications',
                component: () => import('@/views/user/NotificationCenterView.vue')
            },
            // 教案管理页
            {
                path: 'lessonPlans',
                name: 'lessonPlans',
                component: () => import('@/views/user/LessonPlanManagerView.vue')
            },
            // 学习题库页
            {
                path: 'questionBank',
                name: 'questionBank',
                component: () => import('@/views/user/QuestionBankView.vue')
            },
            // 消息中心页
            {
                path: 'messages',
                name: 'messages',
                component: () => import('@/views/user/MessageCenterView.vue')
            },
            // 资源中心页
            {
                path: 'resources',
                name: 'resources',
                component: () => import('@/views/user/ResourceCenterView.vue')
            }
        ]
    }
]

