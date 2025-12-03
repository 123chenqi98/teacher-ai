import { ref } from 'vue'
// 待办任务数据（含状态、优先级、截止时间）
export const todoList = ref([
    {
        id: 1,
        title: '完成八年级下册数学教案编写',
        priority: 'high', // 高优先级
        deadline: '今天 18:00',
        completed: false
    },
    {
        id: 2,
        title: '批改七班单元测试卷',
        priority: 'medium', // 中优先级
        deadline: '明天 12:00',
        completed: false
    },
    {
        id: 3,
        title: '参加初中数学教研会议',
        priority: 'medium', // 中优先级
        deadline: '明天 14:30',
        completed: false
    },
    {
        id: 4,
        title: '更新学生错题本资源',
        priority: 'low', // 低优先级
        deadline: '3天后',
        completed: false
    },
    {
        id: 5,
        title: '回复家长群关于期中复习的咨询',
        priority: 'high', // 高优先级
        deadline: '今天 20:00',
        completed: true // 已完成
    },
    {
        id: 6,
        title: '检查学生作业并批改',
        priority: 'medium',
        deadline: '今天 18:00',
        completed: false
    },{
        id: 7,
        title: '组织班级数学考试',
        priority: 'high',
        deadline: '明天 16:00',
        completed: true
    },
    {
        id: 8,
        title: '编写教材阅读笔记',
        priority: 'low',
        deadline: '3天后',
        completed: false
    },
]);
