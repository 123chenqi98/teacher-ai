// 页面路由
export const StoryRoutes = [
    {
        path: '/story',
        name: 'Story',
        component: () => import('@/views/story/StoryView.vue'),
    }
]