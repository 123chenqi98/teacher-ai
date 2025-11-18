import {ref} from "vue"

export const gradingAssignments = ref([
    {
        id: 1,
        title: '数学周测试卷',
        className: '高一(3)班',
        status: 'grading',
        statusLabel: '批改中',
        statusColor: '#ffd700',
        progressColor: '#7209b7',
        completed: 68,
        total: 120,
        deadline: '今天 18:00',
        deadlineLink: '继续批改',
        actionText: '继续批改'
    },
    {
        id: 2,
        title: '语文作文',
        className: '高二(1)班',
        status: 'completed',
        statusLabel: '已完成',
        statusColor: '#52c41a',
        progressColor: '#52c41a',
        completed: 52,
        total: 52,
        deadline: '昨天 15:30',
        deadlineLink: '查看报告',
        actionText: '查看报告'
    },
    {
        id: 3,
        title: '英语单词听写',
        className: '初一(2)班',
        status: 'pending',
        statusLabel: '待批改',
        statusColor: '#d9d9d9',
        progressColor: '#d9d9d9',
        completed: 0,
        total: 45,
        deadline: '明天 12:00',
        deadlineLink: '开始批改',
        actionText: '开始批改'
    },
    {
        id: 4,
        title: '物理实验报告',
        className: '高三(4)班',
        status: 'grading',
        statusLabel: '批改中',
        statusColor: '#ffd700',
        progressColor: '#7209b7',
        completed: 23,
        total: 36,
        deadline: '后天 20:00',
        deadlineLink: '继续批改',
        actionText: '继续批改'
    }
])
