// 教学大纲管理路由
export const syllabasRouters = [
    {
        // 教学大纲管理页面路由
        path:'/syllabas',
        name:"syllabas",
        component:()=>import('@/views/admin/SyllabasManagementView.vue'),
    }
]
