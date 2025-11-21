// 定义目标数据结构
export interface KeyResult {
    id: number
    title: string
    progress: number
    targetValue: number
    currentValue: number
}
export interface Objective {
    id: number
    title: string
    description: string
    progress: number
    deadline: string
    keyResults: KeyResult[]
}


