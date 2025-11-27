// 21. 辅助函数：获取状态标签样式（修复 TagType 类型）
import { Check, Clock, Files, WarningFilled} from "@element-plus/icons-vue";
import type {Difficulty, Grade, Status, Subject, TagType} from "@/data/user/lessonPlanManagerData/interface/StatisticsInterface.ts";

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

// 22. 辅助函数：获取难度标签样式（修复 TagType 类型）
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

// 23. 辅助函数：获取学科名称（修复类型断言）
const getSubjectName = (subject?: Subject) => {
    if (!subject) return "未知"
    const subjectMap: Record<Subject, string> = {
        math: "数学",
        chinese: "语文",
        english: "英语",
        physics: "物理",
        chemistry: "化学",
        biology: "生物",
        history: "历史",
        geography: "地理",
        politics: "政治"
    }
    return subjectMap[subject] || "未知"
}

// 24. 辅助函数：获取年级名称（修复类型断言）
const getGradeName = (grade?: Grade) => {
    if (!grade) return "未知"
    const gradeMap: Record<Grade, string> = {
        grade1: "一年级",
        grade2: "二年级",
        grade3: "三年级",
        grade4: "四年级",
        grade5: "五年级",
        grade6: "六年级",
        grade7: "七年级",
        grade8: "八年级",
        grade9: "九年级",
        grade10: "高一",
        grade11: "高二",
        grade12: "高三"
    }
    return gradeMap[grade] || "未知"
}

export { getStatusTagProps, getDifficultyTagProps, getSubjectName, getGradeName }