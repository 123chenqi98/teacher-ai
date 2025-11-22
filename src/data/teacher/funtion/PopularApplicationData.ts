import {ref} from "vue"
import logoImg from "@/static/logo.png";

export const applications = ref([
    {
        id: 1,
        title: '一键生成教案',
        description: '上传课件、教学逐字稿、教材,一键生成教案',
        icon: logoImg,
        routerPath: '/teacher/plan/any'
    },
    {
        id: 2,
        title: '个性化教案',
        description: '根据您上传的模板框架进行个性化教案设计',
        icon: logoImg,
        routerPath: '/teacher/plan/personal'
    },
    {
        id: 3,
        title: '智能教案',
        description: '小学至高中根据教材生成教案',
        downloads: '1.8k',
        icon: logoImg,
        routerPath: '/teacher/plan/smart'
    },
    {
        id: 4,
        title: '英语作文批改',
        description: '智能批改作文，提高作文质量',
        icon: logoImg,
        routerPath: '/teacher/plan/english-composition'
    }
])
