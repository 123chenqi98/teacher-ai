// 作业批改路由
import {
    submitChineseWritingForm,
    submitEnglishWritingForm, submitMathComprehensiveForm, submitPhysicsComprehensiveForm
} from "@/utils/teacher/function/teachingPlan/HandleHomeWorkingFormFunctions.ts";

export const homeWorkingChildrenRouter = [
    {
        // 作业批改路由
        path: 'chinese-composition',
        name: 'chinese-composition',
        meta:{
            title: '语文作文批改',
            handleSubmit:submitChineseWritingForm
        },
        component:() =>import("@/components/teacher/function/children/homeWork/WritingGradingComponent.vue")
    },
    {
        // 作业批改路由
        path: 'english-composition',
        name: 'english-composition',
        meta:{
            title: '英语作文批改',
            handleSubmit:submitEnglishWritingForm
        },
        component:() =>import("@/components/teacher/function/children/homeWork/WritingGradingComponent.vue")
    },
    {
        // 作业批改路由
        path: 'math-comprehensive',
        name: 'math-comprehensive',
        meta:{
            title: '数学综合题批改',
            handleSubmit:submitMathComprehensiveForm
        },
        component:() =>import("@/components/teacher/function/children/homeWork/ScienceComprehensiveGradingComponent.vue")
    },
    {
        // 作业批改路由
        path: 'physics-comprehensive',
        name: 'physics-comprehensive',
        meta:{
            title: '物理综合题批改',
            handleSubmit:submitPhysicsComprehensiveForm
        },
        component:() =>import("@/components/teacher/function/children/homeWork/ScienceComprehensiveGradingComponent.vue")
    }
]