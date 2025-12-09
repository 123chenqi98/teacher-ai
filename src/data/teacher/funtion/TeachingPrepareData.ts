import {ref} from "vue"
import logoImg from "@/static/logo.png";

export const teachingResources = ref([
    {
        id: 1,
        title: '一键生成教案',
        description: '上传课件、教学逐字稿、教材,一键生成教案',
        downloads: '2.4k',
        date: '2023-05-12',
        icon: logoImg,
        routerPath: '/teacher/plan/any',
    },
    {
        id: 2,
        title: '个性化教案',
        description: '根据您上传的模板框架进行个性化教案设计',
        downloads: '3.1k',
        date: '2023-04-28',
        icon: logoImg,
        routerPath: '/teacher/plan/personal',
    },
    {
        id: 3,
        title: '智能教案',
        description: '小学至高中根据教材生成教案',
        downloads: '1.8k',
        date: '2023-06-05',
        icon: logoImg,
        routerPath: '/teacher/plan/smart',
    },
    {
        id: 4,
        title: 'PPT转教案',
        description: '根据课件中的内容生成教案',
        downloads: '2.7k',
        date: '2023-05-20',
        icon: logoImg,
        routerPath: '/teacher/plan/ppt',
    }
])
