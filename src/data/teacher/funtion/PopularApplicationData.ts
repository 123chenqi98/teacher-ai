import {ref} from "vue"
import logoImg from "@/static/logo.png";

export const applications = ref([
    {
        id: 1,
        title: '自动批改',
        description: 'AI自动批改作业，精准分析错误点',
        icon: logoImg,
        usage: '5.7k',
        rating: 4.9
    },
    {
        id: 2,
        title: '课堂互动',
        description: '实时互动课堂，提升学生参与度',
        icon: logoImg,
        usage: '3.2k',
        rating: 4.8
    },
    {
        id: 3,
        title: '智能出题',
        description: '一键生成个性化练习题，提高教学效率',
        icon: logoImg,
        usage: '2.1k',
        rating: 4.7
    },
    {
        id: 4,
        title: '学情分析',
        description: '深度分析学生学习数据，精准掌握学情',
        icon: logoImg,
        usage: '1.8k',
        rating: 4.6
    }
])
