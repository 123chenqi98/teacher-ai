import {ref} from "vue";
import type {Difficulty, Grade, LessonPlan, Status, Subject} from "@/data/user/lessonPlanManagerData/interface/StatisticsInterface.ts";

// 4. 筛选条件（保持原逻辑，补充类型注解）
const searchQuery = ref("")
const selectedSubject = ref<Subject | "">("")
const selectedGrade = ref<Grade | "">("")
const selectedStatus = ref<Status | "">("")
const selectedDifficulty = ref<Difficulty | "">("")
const sortBy = ref<keyof LessonPlan>("lastUpdated")
const sortOrder = ref<"asc" | "desc">("desc")
const showMyCollection = ref(false)

// 5. 分页控制（保持原逻辑）
const currentPage = ref(1)
const pageSize = ref(6)

export { 
    searchQuery,
    selectedSubject,
    selectedGrade,
    selectedStatus,
    selectedDifficulty,
    sortBy,
    sortOrder,
    showMyCollection,
    currentPage,
    pageSize
}