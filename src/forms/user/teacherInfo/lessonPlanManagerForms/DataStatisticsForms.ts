import {computed, reactive, ref, watch} from "vue";
import { currentPage, pageSize} from "@/entity/auth/teacherInfo/LessonPlanManager.ts";
import {filteredList} from "@/utils/user/teacher/info/lessonPlanManager/StatisticsDataUtils.ts";
import type {LessonPlan} from "@/data/user/lessonPlanManagerData/interface/StatisticsInterface.ts";
import {ElMessage, ElMessageBox, type FormInstance} from "element-plus";
import {lessonPlans} from "@/data/user/lessonPlanManagerData/StatisticsData.ts";

// 6. 模态框控制（保持原逻辑，补充类型注解）
const newLessonModalOpen = ref(false)
const editLessonModalOpen = ref(false)
const detailModalOpen = ref(false)

// 7. 当前编辑/新增的教案（响应式）
const currentLesson = reactive<Partial<LessonPlan>>({
    tags: [],
    isCollected: false,
    difficulty: "medium",
    status: "draft" // 默认状态
})

// 8. 表单引用（保持原逻辑）
const newLessonFormRef = ref<FormInstance | null>(null)
const editLessonFormRef = ref<FormInstance | null>(null)
// 额外封装：弹窗开关、编辑模式、统一表单引用
const lessonModalOpen = computed({
    get: () => newLessonModalOpen.value || editLessonModalOpen.value,
    set: (val: boolean) => {
        newLessonModalOpen.value = val
        editLessonModalOpen.value = val
    }
})

const isEditMode = computed(() => !!currentLesson.id)
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
// 9. 分页后的列表（保持原逻辑）
const paginatedList = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    return filteredList.value.slice(start, start + pageSize.value)
})

// 10. 打开新增模态框（保持原逻辑）
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

// 11. 打开编辑模态框（修复类型断言）
const openEditLessonModal = (lesson: LessonPlan) => {
    Object.assign(currentLesson, { ...lesson })
    if (detailModalOpen.value) detailModalOpen.value = false
    editLessonModalOpen.value = true
}

// 12. 打开详情模态框（修复类型断言）
const openDetailModal = (lesson: LessonPlan) => {
    Object.assign(currentLesson, { ...lesson })
    detailModalOpen.value = true
}

// 13. 保存教案（修复类型断言，补充文件大小处理）
const saveLesson = async () => {
    // 表单验证（优先使用统一的 lessonFormRef，兼容旧引用）
    const form = lessonFormRef.value || (currentLesson.id ? editLessonFormRef.value : newLessonFormRef.value)
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

// 14. 删除教案（保持原逻辑）
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

// 15. 切换收藏状态（保持原逻辑）
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
export { newLessonModalOpen, editLessonModalOpen, detailModalOpen, currentLesson, newLessonFormRef, editLessonFormRef, lessonFormRef, lessonModalOpen, isEditMode, formRules, paginatedList, openNewLessonModal, openEditLessonModal, openDetailModal, saveLesson, deleteLesson, toggleCollection }