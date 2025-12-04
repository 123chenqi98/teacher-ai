// 辅助函数：获取状态标签样
import { Check, Clock, Files, WarningFilled} from "@element-plus/icons-vue";
import type {Difficulty, Grade, Status, Subject, TagType} from "@/data/user/lessonPlanManagerData/interface/StatisticsInterface.ts";
import {gradeName, subjectName} from "@/data/user/lessonPlanManagerData/StaticInfoData.ts";

const getStatusTagProps = (status: Status) => {
    switch (status) {
        case "published":
            return { type: "success" as TagType, icon: Check }
        case "draft":
            return { type: "info" as TagType, icon: Files }
        case "reviewing":
            return { type: "warning" as TagType, icon: Clock }
        case "rejected":
            return { type: "danger" as TagType, icon: WarningFilled }
        default:
            return { type: "default" as TagType, icon: Files }
    }
}

//  辅助函数：获取难度标签样式
const getDifficultyTagProps = (difficulty: Difficulty) => {
    switch (difficulty) {
        case "easy":
            return { type: "success" as TagType, label: "简单" }
        case "medium":
            return { type: "warning" as TagType, label: "中等" }
        case "hard":
            return { type: "danger" as TagType, label: "困难" }
        default:
            return { type: "default" as TagType, label: "未知" }
    }
}

//辅助函数：获取学科名称
const getSubjectName = (subject?: Subject) => {
    if (!subject) return "未知"
    const subjectMap: Record<Subject, string> = subjectName
    return subjectMap[subject] || "未知"
}

//  辅助函数：获取年级名称
const getGradeName = (grade?: Grade) => {
    if (!grade) return "未知"
    const gradeMap: Record<Grade, string> = gradeName
    return gradeMap[grade] || "未知"
}

export {
    getStatusTagProps,
    getDifficultyTagProps,
    getSubjectName,
    getGradeName
}