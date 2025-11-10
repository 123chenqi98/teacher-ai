// 轮播图数据
import {ref} from "vue";

export const carouselItems = ref([
    {
        id: 1,
        title: '激发无限潜能',
        subtitle: '发现每个孩子的独特天赋，让他们如花般绽放活力与激情',
        image: 'src/static/img.png', // 替换为实际图片地址
        button: '了解更多'
    },
    {
        id: 2,
        title: '个性化教学',
        subtitle: '根据每个学生的特点定制专属学习方案',
        image: 'src/static/img.png', // 替换为实际图片地址
        button: '查看详情'
    },
    {
        id: 3,
        title: '智能辅导',
        subtitle: 'AI辅助教学，精准识别学习难点',
        image: 'src/static/img.png', // 替换为实际图片地址
        button: '立即体验'
    }
])
