// 1. 定义所有依赖类型
type Status = "published" | "draft" | "reviewing" | "rejected"
type Subject = "math" | "chinese" | "english" | "physics" | "chemistry" | "biology" | "history" | "geography" | "politics"
type Grade = "grade1" | "grade2" | "grade3" |"grade4" |"grade5" |"grade6" |"grade7" | "grade8" | "grade9" | "grade10" | "grade11" | "grade12"
type Difficulty = "easy" | "medium" | "hard"
type TagType = 'success' | 'info' | 'warning' | 'danger' | 'default'

// 定义核心教案接口
export interface LessonPlan {
    id: number
    title: string
    description: string
    subject: Subject
    grade: Grade
    status: Status
    difficulty: Difficulty
    views: number
    favorites: number
    edits: number
    lastUpdated: string
    createTime: string
    author: string
    tags: string[]
    isCollected: boolean
    fileSize: string
    version: string
}

export type { Status, Subject, Grade, Difficulty, TagType }