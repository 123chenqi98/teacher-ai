import {keyResultDialogVisible, objectiveIdForKeyResult} from "@/entity/auth/teacherInfo/GoalManagement.ts";
import {currentKeyResult} from "@/forms/user/teacherInfo/goalManagementForms/KeyResultForms.ts";
import type {KeyResult} from "@/data/user/goalManagement/interface/TargetInterface.ts";
import {objectives} from "@/data/user/goalManagement/TargetData.ts";
import {updateStats} from "@/utils/user/teacher/info/goalManagement/DataUtlis.ts";

// 添加关键结果
const addKeyResult = (objectiveId: number) => {
    objectiveIdForKeyResult.value = objectiveId
    Object.assign(currentKeyResult, {
        id: 0,
        title: '',
        targetValue: 0,
        currentValue: 0
    })
    keyResultDialogVisible.value = true
}

// 编辑关键结果
const editKeyResult = (objectiveId: number, keyResult: KeyResult) => {
    objectiveIdForKeyResult.value = objectiveId
    Object.assign(currentKeyResult, keyResult)
    keyResultDialogVisible.value = true
}

// 保存关键结果
const saveKeyResult = () => {
    const objective = objectives.value.find(obj => obj.id === objectiveIdForKeyResult.value)
    if (objective) {
        if (currentKeyResult.id) {
            // 编辑模式
            const index = objective.keyResults.findIndex(kr => kr.id === currentKeyResult.id)
            if (index !== -1) {
                objective.keyResults[index] = { ...objective.keyResults[index], ...currentKeyResult }
            }
        } else {
            // 新增模式
            const newKeyResult: KeyResult = {
                ...currentKeyResult,
                progress: currentKeyResult.targetValue ? Math.round((currentKeyResult.currentValue / currentKeyResult.targetValue) * 100) : 0
            }
            objective.keyResults.push(newKeyResult)
        }

        // 更新目标进度
        objective.progress = objective.keyResults.length
            ? Math.round(objective.keyResults.reduce((sum, kr) => sum + kr.progress, 0) / objective.keyResults.length)
            : 0

        // 更新统计数据
        updateStats()
    }
    keyResultDialogVisible.value = false
}

// 删除关键结果
const deleteKeyResult = (objectiveId: number, keyResultId: number) => {
    const objective = objectives.value.find(obj => obj.id === objectiveId)
    if (objective) {
        objective.keyResults = objective.keyResults.filter(kr => kr.id !== keyResultId)
        // 更新目标进度
        objective.progress = objective.keyResults.length
            ? Math.round(objective.keyResults.reduce((sum, kr) => sum + kr.progress, 0) / objective.keyResults.length)
            : 0

        // 更新统计数据
        updateStats()
    }
}
export {
    addKeyResult,
    editKeyResult,
    saveKeyResult,
    deleteKeyResult
}