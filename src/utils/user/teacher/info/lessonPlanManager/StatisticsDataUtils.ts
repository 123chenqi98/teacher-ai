// 组件内导入依赖（确保路径正确）
import {computed, ref} from "vue";
import { lessonPlans } from "@/data/user/lessonPlanManagerData/StatisticsData.ts";
import type { SearchQuery, SelectedSubject, SelectedGrade, SelectedStatus, SelectedDifficulty, SortBy, SortOrder } from "@/data/user/lessonPlanManagerData/StatisticsData.ts";

// 声明筛选变量（需和组件内响应式变量关联）
// 注意：这些变量需在组件内定义为ref，此处为示例声明类型
const searchQuery = ref<SearchQuery>("");
const selectedSubject = ref<SelectedSubject>("");
const selectedGrade = ref<SelectedGrade>("");
const selectedStatus = ref<SelectedStatus>("");
const selectedDifficulty = ref<SelectedDifficulty>("");
const showMyCollection = ref<boolean>(false);
const sortBy = ref<SortBy>("lastUpdated");
const sortOrder = ref<SortOrder>("desc");

// 修复后的筛选列表（独立computed，闭合括号，补全类型）
export const filteredList = computed(() => {
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
export const stats = computed(() => {
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