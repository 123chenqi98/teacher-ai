const disciplines = [
    { label: '语文', value: '语文' },
    { label: '数学', value: '数学' },
    { label: '英语', value: '英语' },
    { label: '物理', value: '物理' },
    { label: '化学', value: '化学' },
    { label: '生物', value: '生物' },
    { label: '历史', value: '历史' },
    { label: '地理', value: '地理' },
    { label: '政治', value: '政治' },
    { label: '信息技术', value: '信息技术' }
]

// 定义年级数据（虚拟助教用）
const grades = [
    { label: '一年级', value: '1' },
    { label: '二年级', value: '2' },
    { label: '三年级', value: '3' },
    { label: '四年级', value: '4' },
    { label: '五年级', value: '5' },
    { label: '六年级', value: '6' },
    { label: '初一', value: '7' },
    { label: '初二', value: '8' },
    { label: '初三', value: '9' },
    { label: '高一', value: '10' },
    { label: '高二', value: '11' },
    { label: '高三', value: '12' }
]

// ===== 智能题库特有数据 =====

// 定义知识点数据（智能题库用）
const knowledgePoints = [
    { label: '基础概念', value: '基础概念' },
    { label: '应用题', value: '应用题' },
    { label: '分析问题', value: '分析问题' },
    { label: '综合应用', value: '综合应用' },
    { label: '创新思维', value: '创新思维' }
]

// 定义难度数据（智能题库用）
const difficultys = [
    { label: '简单', value: '简单' },
    { label: '中等', value: '中等' },
    { label: '困难', value: '困难' },
    { label: '高难度', value: '高难度' }
]

// 定义题型数据（智能题库用）
const questionTypes = [
    { label: '选择题', value: '选择题' },
    { label: '填空题', value: '填空题' },
    { label: '简答题', value: '简答题' },
    { label: '计算题', value: '计算题' },
    { label: '名词解释', value: '名词解释' },
    { label: '论述题', value: '论述题' }
]

// ===== 虚拟助教特有数据 =====

// 定义紧急程度数据（虚拟助教用）
const urgencyLevels = [
    { label: '一般', value: '一般' },
    { label: '中等', value: '中等' },
    { label: '紧急', value: '紧急' }
]

// ===== 学习诊断特有数据 =====

// 定义评估周期数据（学习诊断用）
const assessmentPeriods = [
    { label: '周', value: '周' },
    { label: '月', value: '月' },
    { label: '学期', value: '学期' },
    { label: '学年', value: '学年' }
]

// 定义诊断级别数据（学习诊断用）
const diagnosticLevels = [
    { label: '基础级', value: '基础级' },
    { label: '中级', value: '中级' },
    { label: '高级', value: '高级' },
    { label: '专家级', value: '专家级' }
]

// 导出所有数据
export {
    disciplines,
    grades,               // 虚拟助教用
    knowledgePoints,  // 智能题库用
    difficultys,         // 智能题库用
    questionTypes,        // 智能题库用
    urgencyLevels,        // 虚拟助教用
    assessmentPeriods,    // 学习诊断用
    diagnosticLevels      // 学习诊断用
}