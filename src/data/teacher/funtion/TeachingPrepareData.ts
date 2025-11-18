import {ref} from "vue"
import logoImg from "@/static/logo.png";

export const teachingResources = ref([
    {
        id: 1,
        title: '高中数学函数教学方案',
        description: '包含教学目标、教学过程、课堂练习及课后作业设计',
        downloads: '2.4k',
        date: '2023-05-12',
        icon: logoImg
    },
    {
        id: 2,
        title: '现代文阅读技巧课件',
        description: '包含阅读方法指导、答题技巧及实例分析',
        downloads: '3.1k',
        date: '2023-04-28',
        icon: logoImg
    },
    {
        id: 3,
        title: '英语口语教学活动设计',
        description: '包含20种课堂互动游戏及口语练习方法',
        downloads: '1.8k',
        date: '2023-06-05',
        icon: logoImg
    },
    {
        id: 4,
        title: '物理实验演示视频集',
        description: '包含力学、电学、光学等30个实验演示视频',
        downloads: '2.7k',
        date: '2023-05-20',
        icon: logoImg
    }
])
