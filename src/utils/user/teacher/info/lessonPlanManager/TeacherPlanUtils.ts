//  保存教案
import {
    currentLesson,
    editLessonFormRef,
    lessonFormRef, newLessonFormRef
} from "@/forms/user/teacherInfo/lessonPlanManagerForms/DataStatisticsForms.ts";
import {lessonPlans} from "@/data/user/lessonPlanManagerData/StatisticsData.ts";
import type {LessonPlan} from "@/data/user/lessonPlanManagerData/interface/StatisticsInterface.ts";
import {editLessonModalOpen, newLessonModalOpen} from "@/entity/user/LessonPlanManager/DialogEntity.ts";
import {ElMessage, ElMessageBox} from "element-plus";

const saveLesson = async () => {
    // 表单验证（优先使用统一的 lessonFormRef，兼容旧引用）
    const form =
        lessonFormRef.value ||
        (currentLesson.id ? editLessonFormRef.value : newLessonFormRef.value)
    if (!form) return
    try {
        await form.validate()
    } catch (_) {
        return
    }

    // 统一处理 tags 字段为 string[]
    const normalizedTags = Array.isArray(currentLesson.tags)
        ? currentLesson.tags
        : (currentLesson.tags ? String(currentLesson.tags).split(',').map(s => s.trim()).filter(Boolean) : [])

    if (currentLesson.id) {
        // 编辑现有教案
        const idx = lessonPlans.value.findIndex(l => l.id === currentLesson.id)
        if (idx !== -1) {
            const prev = lessonPlans.value[idx]
            lessonPlans.value[idx] = {
                ...prev,
                ...(currentLesson as LessonPlan),
                tags: normalizedTags,
                lastUpdated: new Date().toISOString().split("T")[0],
                edits: (prev.edits || 0) + 1,
                version: `v${(parseFloat((prev.version || "v1.0").replace("v", "")) + 0.1).toFixed(1)}`
            }
        }
        editLessonModalOpen.value = false
        ElMessage.success("教案已成功更新")
    } else {
        // 创建新教案
        const newItem: LessonPlan = {
            ...(currentLesson as LessonPlan),
            id: Date.now(),
            views: 0,
            favorites: 0,
            edits: 1,
            createTime: new Date().toISOString().split("T")[0],
            lastUpdated: new Date().toISOString().split("T")[0],
            author: "我",
            isCollected: false,
            fileSize: "0.5MB",
            version: "v1.0",
            tags: normalizedTags
        }
        lessonPlans.value.unshift(newItem)
        newLessonModalOpen.value = false
        ElMessage.success("教案已成功创建")
    }
}

//  删除教案
const deleteLesson = (lesson: LessonPlan) => {
    ElMessageBox.confirm(
        "确定要删除这个教案吗？删除后将无法恢复。",
        "删除确认",
        {
            confirmButtonText: "确认删除",
            cancelButtonText: "取消",
            type: "warning"
        }
    ).then(() => {
        lessonPlans.value = lessonPlans.value.filter(l => l.id !== lesson.id)
        ElMessage.success("教案已成功删除")
    }).catch(() => {
        ElMessage.info("已取消删除")
    })
}


//  切换收藏状态
const toggleCollection = (lesson: LessonPlan, e: Event) => {
    e.stopPropagation()
    const idx = lessonPlans.value.findIndex(l => l.id === lesson.id)
    if (idx !== -1) {
        lessonPlans.value[idx].isCollected = !lessonPlans.value[idx].isCollected
        ElMessage.success(
            lessonPlans.value[idx].isCollected
                ? "已添加到收藏"
                : "已取消收藏"
        )
    }
}

export {
    saveLesson,
    deleteLesson,
    toggleCollection
}