import {
    submitGenerateTeachingPlanForm, submitIntelligentTeachingPlanForm,
    submitPersonalizedTeachingPlanForm, submitPPTTeachingPlanForm
} from "@/utils/teacher/function/teachingPlan/HandleTeachingPlanFormFunctions.ts";

export const teachingPlanChildrenRouters = [
    {
        // 一键生成教案路由
        path: 'any',
        name: 'any',
        meta:{
            title: '一键生成教案',
            handleSubmit:submitGenerateTeachingPlanForm
        },
        component:() =>import("@/components/teacher/function/children/teachingPlan/TeachingPlanCreateComponent.vue")
    },
    {
        // 个性化教案路由
        path: 'personal',
        name: 'personal',
        meta:{
            title: '个性化教案',
            handleSubmit:submitPersonalizedTeachingPlanForm
        },
        component:() =>import("@/components/teacher/function/children/teachingPlan/TeachingPlanCreateComponent.vue")
    },
    {
        // 智能教案路由
        path: 'smart',
        name: 'smart',
        meta:{
            title: '智能教案',
            handleSubmit:submitIntelligentTeachingPlanForm
        },
        component:() =>import("@/components/teacher/function/children/teachingPlan/TeachingPlanCreateComponent.vue")
    },
    {
        // PPT转教案路由
        path: 'ppt',
        name: 'ppt',
        meta:{
            title: 'PPT转教案',
            handleSubmit:submitPPTTeachingPlanForm
        },
        component:() =>import("@/components/teacher/function/children/teachingPlan/TeachingPlanCreateComponent.vue")
    }
]