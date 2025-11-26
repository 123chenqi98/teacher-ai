import { ref } from "vue";
import type { LessonPlan } from "@/data/user/lessonPlanManagerData/interface/StatisticsInterface.ts"; // 提前定义LessonPlan类型

// 模拟教案数据（响应式）
export const lessonPlans = ref<LessonPlan[]>([
    {
        id: 1,
        title: "一元二次方程的解法",
        description: "讲解配方法、公式法解一元二次方程",
        subject: "math",
        grade: "grade9",
        status: "published",
        difficulty: "medium",
        views: 1258,
        favorites: 326,
        edits: 5,
        lastUpdated: "2025-11-25",
        createTime: "2025-11-20",
        author: "我",
        tags: ["初中数学", "方程"],
        isCollected: true,
        fileSize: "3.2MB",
        version: "v1.1.0"
    }
]);

// 导出筛选相关变量类型（可选，统一管理）
export type SearchQuery = string;
export type SelectedSubject = "math" | "chinese" | "english" | "";
export type SelectedGrade = "grade7" | "grade8" | "grade9" | "";
export type SelectedStatus = "published" | "draft" | "reviewing" | "rejected" | "";
export type SelectedDifficulty = "easy" | "medium" | "hard" | "";
export type SortBy = keyof LessonPlan;
export type SortOrder = "asc" | "desc";