import { Clock, Message, SuccessFilled, Document, Star, User, Collection, PieChart } from '@element-plus/icons-vue';

// 本周数据概览：8项指标，适配 2行4列布局（el-col :span="6" → 24/6=4列，8项=2行）
export const weeklyStats = [
    { icon: Clock, value: '31.1', label: '本周授课时长(小时)' },
    { icon: Message, value: '250', label: '本周答疑数' },
    { icon: Document, value: '8', label: '本周新增教案' },
    { icon: Star, value: '12', label: '本周新增收藏' },
    { icon: User, value: '156', label: '本周授课学生' },
    { icon: SuccessFilled, value: '96%', label: '本周满意度' },
    { icon: Collection, value: '5', label: '本周优质教案' },
    { icon: PieChart, value: '12%', label: '数据环比增长' }
];