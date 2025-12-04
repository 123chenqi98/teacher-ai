import {reactive, ref, watch} from "vue";
import type {LessonPlan} from "@/data/user/lessonPlanManagerData/interface/StatisticsInterface.ts";
import {type FormInstance} from "element-plus";
import {isEditMode,} from "@/entity/user/LessonPlanManager/DialogEntity.ts";


// 7. 当前编辑/新增的教案（响应式）
const currentLesson = reactive<Partial<LessonPlan>>({
    tags: [],
    isCollected: false,
    difficulty: "medium",
    status: "draft" // 默认状态
})

//  表单引用
const newLessonFormRef = ref<FormInstance | null>(null)
const editLessonFormRef = ref<FormInstance | null>(null)
const lessonFormRef = ref<FormInstance | null>(null)

watch(isEditMode, () => {
    if (isEditMode.value) {
        editLessonFormRef.value = lessonFormRef.value
    } else {
        newLessonFormRef.value = lessonFormRef.value
    }
})

const formRules = reactive({
    title: [
        { required: true, message: "请输入教案标题", trigger: "blur" },
        { min: 5, max: 50, message: "标题长度在5-50个字符之间", trigger: "blur" }
    ],
    description: [
        { required: true, message: "请输入教案简介", trigger: "blur" },
        { min: 20, max: 300, message: "简介长度在20-300个字符之间", trigger: "blur" }
    ],
    subject: [{ required: true, message: "请选择学科", trigger: "change" }],
    grade: [{ required: true, message: "请选择年级", trigger: "change" }],
    difficulty: [{ required: true, message: "请选择难度", trigger: "change" }],
    status: [{ required: true, message: "请选择状态", trigger: "change" }]
})

export {
    currentLesson,
    newLessonFormRef,
    editLessonFormRef,
    lessonFormRef,
    formRules,
}