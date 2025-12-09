import {
    submitSmartQuestionBankForm,
    submitVirtualTutorForm,
    submitDiagnoseForm
}from '@/utils/teacher/function/teachingPlan/AiCreativeTeachingFormFunctions';
import {submitGenerateTeachingPlanForm} from "@/utils/teacher/function/teachingPlan/HandleTeachingPlanFormFunctions.ts";

export const aiCreativeTeachingChildrenRouter = [
    {
        path:'aiplan',
        name:'aiplan',
        meta:{
            title: '教案生成器',
            handleSubmit:submitGenerateTeachingPlanForm
        },
        component:() =>import("@/components/teacher/function/children/teachingPlan/TeachingPlanCreateComponent.vue")
    },
    {
        path:'aismartquestion',
        name:'aismartquestion',
        meta:{
            title: '智能题库',
            handleSubmit:submitSmartQuestionBankForm
        },
        component:() =>import("@/components/teacher/function/children/aiCreativeTeaching/SmartQuestionBankComponent.vue")

    },
    {
        path: 'aivirtual',
        name: 'aivirtual',
        meta: {
            title: '虚拟助教',
            handleSubmit:submitVirtualTutorForm
        },
        component:() =>import("@/components/teacher/function/children/aiCreativeTeaching/VirtualTutorComponent.vue")

    },
    {
        path:'aidiagnose',
        name:'aidiagnose',
        meta:{
            title: '学习诊断',
            handleSubmit:submitDiagnoseForm
        },
        component:() =>import("@/components/teacher/function/children/aiCreativeTeaching/DiagnoseComponent.vue")

    }
]