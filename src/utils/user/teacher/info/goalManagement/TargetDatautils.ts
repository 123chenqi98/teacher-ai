import {ref} from "vue";
import {objectives} from "@/data/user/goalManagement/TargetData.ts";
import {Aim, Calendar, Trophy, Document} from "@element-plus/icons-vue";
// 统计数据
const statsData = ref([
    { title: '总目标数',
        value: objectives.value.length,
        icon: Aim,
        color: '#409EFF'
    },
    { title: '已完成目标',
        value: objectives.value.filter(obj => obj.progress === 100).length,
        icon: Trophy,
        color: '#67C23A'
    },
    { title: '关键结果数',
        value: objectives.value.reduce((sum: any, obj: any) => sum + obj.keyResults.length, 0),
        icon: Document,
        color: '#E6A23C'
    },
    { title: '平均进度',
        value: `${
        Math.round(
            objectives.value.reduce(
                (sum: any, obj: any) => sum + obj.progress, 0) / objectives.value.length || 0)}%`,
        icon: Calendar,
        color: '#F56C6C' }
])

// 完成情况数据
const completedObjectives = ref(objectives.value.filter((obj: any) => obj.progress === 100).length)
const inProgressObjectives = ref(objectives.value.filter((obj: any) => obj.progress > 0 && obj.progress < 100).length)
const notStartedObjectives = ref(objectives.value.filter((obj: any) => obj.progress === 0).length)
const completionRate = ref(Math.round(objectives.value.reduce((sum: any, obj: any) => sum + obj.progress, 0) / objectives.value.length || 0))


export {statsData, completedObjectives, inProgressObjectives, notStartedObjectives, completionRate}