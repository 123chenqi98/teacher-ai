// 教师端路由
export const teacherRouters = [
    {
        // 教师端路由
        path: '/teacher',
        name: 'teacher',
        component:() =>import("@/views/teacher/TeacherSideHomeView.vue")
    }
]