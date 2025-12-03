import {ref} from "vue";
import {objectives} from "@/data/user/goalManagement/TargetData.ts";
import {Aim, Calendar, Trophy, Document} from "@element-plus/icons-vue";

// 统计数据
const statsData = ref([
    { title: '总目标数',
        value: objectives.value.length, // 取数组长度 = 目标总数
        icon: Aim,
        color: '#409EFF'
    },
    { title: '已完成目标',
        value: objectives.value.filter(obj => obj.progress === 100).length,
        // filter：筛选出进度=100的目标 → length=已完成数量
        icon: Trophy,
        color: '#67C23A'
    },
    { title: '关键结果数',
        value: objectives.value.reduce((sum: any, obj: any) => sum + obj.keyResults.length, 0),
        // reduce：累加每个目标的 keyResults 数组长度 → 总关键结果数
        icon: Document,
        color: '#E6A23C'
    },
    { title: '平均进度',
        value: `${
        Math.round( // 四舍五入取整
            objectives.value.reduce( // 累加所有目标进度
                (sum: any, obj: any) => sum + obj.progress, 0) / objectives.value.length || 0)}%`,
        icon: Calendar,
        color: '#F56C6C' }
])

// 完成情况数据
// 已完成目标数：进度=100
const completedObjectives = ref(objectives.value.filter((obj: any) => obj.progress === 100).length)
// 进行中目标数：进度>0 且 <100
const inProgressObjectives = ref(objectives.value.filter((obj: any) => obj.progress > 0 && obj.progress < 100).length)
// 未开始目标数：进度=0
const notStartedObjectives = ref(objectives.value.filter((obj: any) => obj.progress === 0).length)
// 整体完成率（平均进度）：累加所有进度 / 目标数 → 四舍五入
const completionRate = ref(Math.round(objectives.value.reduce((sum: any, obj: any) => sum + obj.progress, 0) / objectives.value.length || 0))

export {
    statsData,
    completedObjectives,
    inProgressObjectives,
    notStartedObjectives,
    completionRate
}