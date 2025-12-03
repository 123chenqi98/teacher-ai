// 学科管理路由
export const subjectRouters = [
    {
        // 学科管理页面路由
        path:'/subject',
        name:"subject",
        component:()=>import('@/views/admin/SubjectManagementView.vue'),
    }
]   