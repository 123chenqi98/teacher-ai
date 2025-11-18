import {ref} from "vue"
import logoImg from "@/static/logo.png";

export const aiCreativeTools = ref([
    {
        id: 1,
        title: '教案生成器',
        description: '输入教学目标，AI自动生成完整教案',
        icon: logoImg,
        backgroundColor: '#f3e5f5',
        iconBackgroundColor: '#e1bee7',
        actionText: '立即使用'
    },
    {
        id: 2,
        title: '智能题库',
        description: '根据知识点智能生成练习题及答案',
        icon: logoImg,
        backgroundColor: '#e3f2fd',
        iconBackgroundColor: '#bbdefb',
        actionText: '立即使用'
    },
    {
        id: 3,
        title: '虚拟助教',
        description: 'AI助教实时解答学生疑问；辅助教学',
        icon: logoImg,
        backgroundColor: '#e8f5e9',
        iconBackgroundColor: '#c8e6c9',
        actionText: '立即使用'
    },
    {
        id: 4,
        title: '学习诊断',
        description: '分析学习数据，诊断薄弱环节并给出建议',
        icon: logoImg,
        backgroundColor: '#fff3e0',
        iconBackgroundColor: '#ffe0b2',
        actionText: '立即使用'
    }
])
