// 教师端路由
export const teacherRouters = [
    {
        // 教师端路由
        path: '/teacher',
        name: 'teacher',
        component:() =>import("@/views/teacher/TeacherSideHomeView.vue")
    },
    {
        //教师功能路由
        path: '/teacher/function',
        name: 'function',
        component:() =>import("@/views/teacher/FunctionSelectionView.vue")
    },
]