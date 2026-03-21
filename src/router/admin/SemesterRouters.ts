// 学期管理路由
export const semesterRouters = [
    {
        // 学期管理页面路由
        path:'/semester',
        name:"semester",
        component:()=>import('@/views/admin/SemesterManagementView.vue'),
    }
]
