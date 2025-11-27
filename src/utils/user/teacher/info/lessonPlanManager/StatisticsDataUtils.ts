// 组件内导入依赖（确保路径正确）
import {computed, onMounted} from "vue";
import { lessonPlans } from "@/data/user/lessonPlanManagerData/StatisticsData.ts";
import {currentPage, searchQuery, selectedDifficulty, selectedGrade, selectedStatus, selectedSubject, showMyCollection, sortBy, sortOrder} from "@/entity/auth/teacherInfo/LessonPlanManager.ts";
import {ElMessage} from "element-plus";
import type {LessonPlan} from "@/data/user/lessonPlanManagerData/interface/StatisticsInterface.ts";
import {
    deleteLesson,
    openDetailModal,
    openEditLessonModal
} from "@/forms/user/teacherInfo/lessonPlanManagerForms/DataStatisticsForms.ts";

// 修复后的筛选列表（独立computed，闭合括号，补全类型）
const filteredList = computed(() => {
    // 非空校验：避免lessonPlans.value为undefined
    if (!lessonPlans.value) return [];

    return lessonPlans.value.filter((lesson) => {
        // 1. 搜索关键词筛选（标题/简介/标签）
        const matchSearch = !searchQuery.value
            ? true
            : lesson.title.toLowerCase().includes(searchQuery.value.toLowerCase()) // 忽略大小写
            || lesson.description.toLowerCase().includes(searchQuery.value.toLowerCase())
            || lesson.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()));

        // 2. 学科筛选
        const matchSubject = !selectedSubject.value ? true : lesson.subject === selectedSubject.value;

        // 3. 年级筛选
        const matchGrade = !selectedGrade.value ? true : lesson.grade === selectedGrade.value;

        // 4. 状态筛选
        const matchStatus = !selectedStatus.value ? true : lesson.status === selectedStatus.value;

        // 5. 难度筛选
        const matchDifficulty = !selectedDifficulty.value ? true : lesson.difficulty === selectedDifficulty.value;

        // 6. 收藏筛选
        const matchCollection = showMyCollection.value ? lesson.isCollected : true;

        // 所有条件满足则保留
        return matchSearch && matchSubject && matchGrade && matchStatus && matchDifficulty && matchCollection;
    }).sort((a, b) => {
        // 排序逻辑（强类型校验）
        const valueA = a[sortBy.value];
        const valueB = b[sortBy.value];

        // 字符串类型（时间/版本/标题等）
        if (typeof valueA === "string" && typeof valueB === "string") {
            // 时间字符串特殊处理（按时间戳排序）
            if (sortBy.value === "lastUpdated" || sortBy.value === "createTime") {
                const timeA = new Date(valueA).getTime();
                const timeB = new Date(valueB).getTime();
                return sortOrder.value === "asc" ? timeA - timeB : timeB - timeA;
            }
            // 普通字符串：忽略大小写排序
            return sortOrder.value === "asc"
                ? valueA.localeCompare(valueB, "zh-CN")
                : valueB.localeCompare(valueA, "zh-CN");
        }

        // 数字类型（浏览量/收藏数/编辑次数等）
        if (typeof valueA === "number" && typeof valueB === "number") {
            return sortOrder.value === "asc" ? valueA - valueB : valueB - valueA;
        }

        // 其他类型默认不排序
        return 0;
    });
});

// 修复后的统计信息（独立computed，不再嵌套）
const stats = computed(() => {
    const total = lessonPlans.value?.length || 0;
    return {
        total,
        published: lessonPlans.value?.filter(lp => lp.status === "published").length || 0,
        draft: lessonPlans.value?.filter(lp => lp.status === "draft").length || 0,
        reviewing: lessonPlans.value?.filter(lp => lp.status === "reviewing").length || 0,
        rejected: lessonPlans.value?.filter(lp => lp.status === "rejected").length || 0,
        collected: lessonPlans.value?.filter(lp => lp.isCollected).length || 0,
        filteredTotal: filteredList.value.length // 关联筛选后的列表长度
    };
});

// 16. 重置筛选条件（保持原逻辑）
const resetFilters = () => {
    searchQuery.value = ""
    selectedSubject.value = ""
    selectedGrade.value = ""
    selectedStatus.value = ""
    selectedDifficulty.value = ""
    showMyCollection.value = false
    sortBy.value = "lastUpdated"
    sortOrder.value = "desc"
    currentPage.value = 1
}

// 17. 切换排序方式（修复参数类型）
const toggleSort = (key: keyof LessonPlan) => {
    if (sortBy.value === key) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc"
    } else {
        sortBy.value = key
        sortOrder.value = "desc"
    }
}

// 18. 下载教案（生成临时文件并触发浏览器下载）
const downloadLesson = (lesson: LessonPlan, e?: Event) => {
    e?.stopPropagation()
    const content = [
        `标题：${lesson.title}`,
        `版本：${lesson.version}`,
        `学科：${lesson.subject}`,
        `年级：${lesson.grade}`,
        `难度：${lesson.difficulty}`,
        `状态：${lesson.status}`,
        `创建时间：${lesson.createTime}`,
        `最后更新：${lesson.lastUpdated}`,
        `作者：${lesson.author}`,
        `标签：${lesson.tags.join(', ')}`,
        `文件大小（模拟）：${lesson.fileSize}`,
        '',
        '—— 以下为教案简介 ——',
        lesson.description
    ].join('\n')

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${lesson.title}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    ElMessage.success(`已开始下载：${lesson.title}.txt`)
}

// 19. 分享教案（使用 Web Share API，降级为复制到剪贴板）
const shareLesson = async (lesson: LessonPlan, e?: Event) => {
    e?.stopPropagation()
    const shareText = `【教案分享】\n标题：${lesson.title}\n版本：${lesson.version}\n简介：${lesson.description}\n标签：${lesson.tags.join(', ')}`
    const shareData = {
        title: lesson.title,
        text: shareText,
        url: location.href
    }

    try {
        if (navigator.share) {
            await navigator.share(shareData)
            ElMessage.success('已通过系统分享窗口分享')
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(shareText)
            ElMessage.success('已复制分享内容到剪贴板')
        } else {
            // 最后降级：创建隐藏文本框复制
            const textarea = document.createElement('textarea')
            textarea.value = shareText
            textarea.style.position = 'fixed'
            textarea.style.opacity = '0'
            document.body.appendChild(textarea)
            textarea.select()
            document.execCommand('copy')
            document.body.removeChild(textarea)
            ElMessage.success('已复制分享内容到剪贴板')
        }
    } catch (_) {
        ElMessage.error('分享失败，请重试')
    }
}

const handleAction = (action: string, lesson: LessonPlan) => {
    switch (action) {
        case 'edit':
            openEditLessonModal(lesson)
            break
        case 'detail':
            openDetailModal(lesson)
            break
        case 'download':
            downloadLesson(lesson)
            break
        case 'share':
            shareLesson(lesson).then()
            break
        case 'delete':
            deleteLesson(lesson)
            break
        default:
            break
    }
}

// 20. 初始化页面加载动画（保持原逻辑）
onMounted(() => {
    // 模拟加载效果
    setTimeout(() => {
        document.querySelector('.main-content')?.classList.add('loaded')
    }, 300)
})
export { filteredList, stats, resetFilters, toggleSort, downloadLesson, handleAction, shareLesson }