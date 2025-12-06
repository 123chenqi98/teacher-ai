export const classManagementChildrenRouters = [
    {
        // 班级列表路由
        path: 'list',
        name: 'classList',
        component: () => import("@/views/teacher/classmanagement/ClassListView.vue")
    },
    {
        // 班级详情路由
        path: 'detail',
        name: 'classDetail',
        component: () => import("@/components/teacher/classmanagement/ClassDetailComponent.vue")
    },
    {
        // 学生管理路由
        path: 'student',
        name: 'studentManagement',
        component: () => import("@/components/teacher/classmanagement/StudentManagementComponent.vue")
    },
    {
        // 课程表路由
        path: 'schedule',
        name: 'courseSchedule',
        component: () => import("@/components/teacher/classmanagement/CourseScheduleComponent.vue")
    },
    {
        // 班级事务路由
        path: 'affairs',
        name: 'classAffairs',
        component: () => import("@/components/teacher/classmanagement/ClassAffairsComponent.vue")
    }
]