import {objectives} from "@/data/user/goalManagement/TargetData.ts";
import {dialogVisible, editMode} from "@/entity/auth/teacherInfo/GoalManagement.ts";
import {currentObjective} from "@/forms/user/teacherInfo/goalManagementForms/TargetEditForms.ts";
import type {Objective} from "@/data/user/goalManagement/interface/TargetInterface.ts";
import {completedObjectives, completionRate, inProgressObjectives, notStartedObjectives, statsData} from "@/utils/user/teacher/info/goalManagement/TargetDatautils.ts";

// 添加新目标
const addObjective = () => {
    editMode.value = false
    Object.assign(currentObjective, {
        id: 0,
        title: '',
        description: '',
        deadline: ''
    })
    dialogVisible.value = true
}

// 获取目标状态类型
const getObjectiveStatusType = (progress: number): 'primary' | 'success' | 'warning' | 'info' | 'danger' => {
    if (progress >= 100) return 'success';
    if (progress >= 50) return 'warning';
    return 'danger';
}

// 获取目标状态文本
const getObjectiveStatusText = (progress: number) => {
    if (progress === 0) return '未开始'
    if (progress === 100) return '已完成'
    return '进行中'
}

// 获取进度颜色
const getProgressColor = (percentage: number) => {
    if (percentage < 30) return '#F56C6C'
    if (percentage < 70) return '#E6A23C'
    return '#67C23A'
}

// 格式化日期
const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}-${date.getDate()}`
}

// 对目标进行排序
const sortObjectives = () => {
    objectives.value.sort((a, b) => b.progress - a.progress)
}

// 编辑目标
const editObjective = (objective: Objective) => {
    editMode.value = true
    Object.assign(currentObjective, objective)
    dialogVisible.value = true
}

// 保存目标
const saveObjective = () => {
    if (editMode.value) {
        // 编辑模式
        const index = objectives.value.findIndex(obj => obj.id === currentObjective.id)
        if (index !== -1) {
            objectives.value[index] = { ...objectives.value[index], ...currentObjective }
        }
    } else {
        // 新增模式
        const newObjective: Objective = {
            ...currentObjective,
            progress: 0,
            keyResults: []
        }
        objectives.value.push(newObjective)
    }

    // 更新统计数据
    updateStats()
    dialogVisible.value = false
}

// 删除目标
const deleteObjective = (id: number) => {
    objectives.value = objectives.value.filter(obj => obj.id !== id)

    // 更新统计数据
    updateStats()
}

// 更新统计数据
const updateStats = () => {
    statsData.value[0].value = objectives.value.length
    statsData.value[1].value = objectives.value.filter(obj => obj.progress === 100).length
    statsData.value[2].value = objectives.value.reduce((sum: any, obj: any) => sum + obj.keyResults.length, 0)
    statsData.value[3].value = `${Math.round(objectives.value.reduce((sum: any, obj: any) => sum + obj.progress, 0) / objectives.value.length || 0)}%`

    completedObjectives.value = objectives.value.filter((obj: any) => obj.progress === 100).length
    inProgressObjectives.value = objectives.value.filter((obj: any) => obj.progress > 0 && obj.progress < 100).length
    notStartedObjectives.value = objectives.value.filter((obj: any) => obj.progress === 0).length
    completionRate.value = Math.round(objectives.value.reduce((sum: any, obj: any) => sum + obj.progress, 0) / objectives.value.length || 0)
}

export {
    addObjective,
    getObjectiveStatusType,
    getObjectiveStatusText,
    getProgressColor,
    formatDate,
    sortObjectives,
    editObjective,
    saveObjective,
    deleteObjective,
    updateStats
}