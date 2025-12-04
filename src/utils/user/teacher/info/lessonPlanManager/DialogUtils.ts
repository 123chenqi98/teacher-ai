// 额外封装：弹窗开关、编辑模式、统一表单引用
import {computed} from "vue";
import {
    currentLesson,
} from "@/forms/user/teacherInfo/lessonPlanManagerForms/DataStatisticsForms.ts";
import {
    detailModalOpen,
    editLessonModalOpen,
    newLessonModalOpen
} from "@/entity/user/LessonPlanManager/DialogEntity.ts";
import type {LessonPlan} from "@/data/user/lessonPlanManagerData/interface/StatisticsInterface.ts";

const lessonModalOpen = computed({
    get: () => newLessonModalOpen.value || editLessonModalOpen.value,
    set: (val: boolean) => {
        newLessonModalOpen.value = val
        editLessonModalOpen.value = val
    }
})

//  打开新增模态框（保持原逻辑）
const openNewLessonModal = () => {
    Object.assign(currentLesson, {
        id: undefined,
        title: "",
        description: "",
        subject: "",
        grade: "",
        status: "draft",
        difficulty: "medium",
        views: 0,
        favorites: 0,
        edits: 1,
        createTime: new Date().toISOString().split("T")[0],
        lastUpdated: new Date().toISOString().split("T")[0],
        author: "我",
        tags: [],
        isCollected: false,
        fileSize: "0MB",
        version: "v1.0"
    })
    newLessonModalOpen.value = true
}


// 打开编辑模态框
const openEditLessonModal = (lesson: LessonPlan) => {
    Object.assign(currentLesson, { ...lesson })
    if (detailModalOpen.value) detailModalOpen.value = false
    editLessonModalOpen.value = true
}

// 打开详情模态框
const openDetailModal = (lesson: LessonPlan) => {
    Object.assign(currentLesson, { ...lesson })
    detailModalOpen.value = true
}


export {
    lessonModalOpen,
    openNewLessonModal,
    openEditLessonModal,
    openDetailModal
}
