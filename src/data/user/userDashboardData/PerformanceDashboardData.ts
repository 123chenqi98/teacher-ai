// 导入 Element Plus 图标（需确保已导入，或替换为你项目中的图标）
import {ref} from "vue";
import { Files, Clock, Check, Medal, Message, Trophy, SuccessFilled, Star } from '@element-plus/icons-vue';

// 教师效能仪表盘数据：带图标的 stats 数组（图标与统计项语义强关联）
export const stats = ref([
    { value: '24', label: '教案数', icon: Files }, // 文档图标 → 教案/文件
    { value: '36', label: '收藏数', icon: Star }, // 星星图标 → 收藏/关注
    { value: '92%', label: '任务完成率', icon: Check }, // 勾选图标 → 完成/达标
    { value: '4.8', label: '教学评分', icon: Medal }, // 评分板图标 → 分数/评级
    { value: '120+', label: '授课时长(小时)', icon: Clock }, // 时钟图标 → 时长/时间
    { value: '500+', label: '学生答疑数', icon: Message }, // 对话图标 → 答疑/沟通
    { value: '18', label: '优质教案数', icon: Trophy }, // 奖杯图标 → 优质/荣誉
    { value: '98%', label: '学生满意度', icon: SuccessFilled } // 点赞图标 → 满意/认可
])