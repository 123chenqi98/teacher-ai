// 数据统计卡片数据
import {ref} from "vue";
import {Notebook} from "@element-plus/icons-vue";

/**
 * 统计卡片数据
 * 包含各类教学相关数据的统计信息
 */
const statsData = ref([
    { label: '总使用时长(小时)', value: 128, change: '+15%', icon: 'clock' },
    { label: '完成任务数', value: 156, change: '+8%', icon: 'check' },
    { label: '创建教案数', value: 45, change: '-3%', icon: 'document' },
    { label: '习题练习数', value: 234, change: '+19%', icon: Notebook },
    { label: '知识下载量', value: 89, change: '0%', icon: 'download' },
    { label: '收藏资源数', value: 56, change: '-2%', icon: 'star' }
])

/**
 * 使用时长趋势数据
 * 展示一周内每日使用时长的变化趋势
 */
const usageTrendData = ref([
    { name: '周一', value: 2.5 },
    { name: '周二', value: 3.8 },
    { name: '周三', value: 4.2 },
    { name: '周四', value: 3.1 },
    { name: '周五', value: 4.7 },
    { name: '周六', value: 5.3 },
    { name: '周日', value: 2.9 }
])

/**
 * 任务完成情况数据
 * 各类教学任务的完成情况百分比
 */
const taskCompletionData = ref([
    { name: '教学设计', value: 85 },
    { name: '课件制作', value: 78 },
    { name: '作业批改', value: 92 },
    { name: '学生辅导', value: 88 },
    { name: '教学反思', value: 75 }
])

/**
 * 活跃度分析数据
 * 不同时段的教学活动活跃度
 */
const activityData = ref([
    { name: '上午', value: 45 },
    { name: '下午', value: 58 },
    { name: '晚上', value: 32 }
])

/**
 * 资源使用分布数据
 * 各类教学资源的使用占比
 */
const resourceDistributionData = ref([
    { name: '视频资源', value: 35 },
    { name: '文档资料', value: 28 },
    { name: '习题库', value: 22 },
    { name: '教学案例', value: 15 }
])

/**
 * 综合指标趋势对比数据
 * 多个关键指标的历史趋势数据
 */
const comprehensiveTrendData = ref([
    { name: '教学效率', values: [85, 88, 92, 89, 95] },
    { name: '资源利用率', values: [78, 82, 85, 80, 88] },
    { name: '学生参与度', values: [75, 78, 82, 85, 88] }
])

/**
 * 教学效率排名数据
 * 教师之间的教学效率排名对比
 */
const efficiencyRankingData = ref([
    { rank: 1, name: '李四老师', department: '数学组 | 初中部', score: 96.29 },
    { rank: 2, name: '张三老师 (您)', department: '语文组 | 高中部', score: 94.82 },
    { rank: 3, name: '王五老师', department: '数学组 | 高中部', score: 92.59 },
    { rank: 4, name: '赵六老师', department: '语文组 | 初中部', score: 90.39 },
    { rank: 5, name: '孙七老师', department: '英语组 | 初中部', score: 88.79 }
])

/**
 * 个人效率趋势数据
 * 个人关键绩效指标的当前状态
 */
const personalEfficiencyData = ref([
    { name: '本月教学目标完成度', value: 78 },
    { name: '课堂质量评分', value: 92 },
    { name: '资源利用率', value: 85 },
    { name: '学生参与度', value: 88 },
    { name: '教学反思完成度', value: 85 },
    { name: '互动交流次数', value: 90 },
    { name: '学生反馈满意度', value: 88 },
    { name: '学生作业完成度', value: 90 }
])

export {
    statsData,
    usageTrendData,
    taskCompletionData,
    activityData,
    resourceDistributionData,
    comprehensiveTrendData,
    efficiencyRankingData,
    personalEfficiencyData
}
