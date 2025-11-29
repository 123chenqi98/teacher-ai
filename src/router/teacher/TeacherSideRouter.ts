// 教师端路由
import {teachingPlanChildrenRouters} from "@/router/teacher/function/TeachingPlanChildrenRouter.ts";
import {homeWorkingChildrenRouter} from "@/router/teacher/function/HomeWorkingChildrenRouter.ts";
import {aiCreativeTeachingChildrenRouter} from "@/router/teacher/function/AICreativeTeachingChildrenRouter.ts";

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
        component:() =>import("@/views/teacher/function/FunctionSelectionView.vue")
    },
    {
        //教案具体功能页面路由
        path: '/teacher/plan',
        name: 'plan',
        component:() =>import("@/views/teacher/function/FunctionChildrenView.vue"),
        children:[
            ...teachingPlanChildrenRouters,
            ...homeWorkingChildrenRouter,
            ...aiCreativeTeachingChildrenRouter,
        ]
    },
]