// 年级管理路由
export const gradeRouters = [
    {
        // 年级管理页面路由
        path:'/grade',
        name:"grade",
        component:()=>import('@/views/admin/GradeManagementView.vue'),
    }
]
// 路由统一封装，不是每个页面一个路由文件