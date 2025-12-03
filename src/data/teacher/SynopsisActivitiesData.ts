// 教学活动数据
import {ref} from "vue";

export const activities = ref([
    {
        id: 1,
        title: '秋季亲子运动会',
        time: '10月28日 09:00',
        teacher: '王老师',
        participants: 25,
        isHot: true,
        image: 'src/static/img.png'
    },
    {
        id: 2,
        title: '万圣节主题派对',
        time: '10月31日 15:00',
        teacher: '李老师',
        participants: 18,
        isHot: false,
        image: 'src/static/img.png'
    },
    {
        id: 3,
        title: '小小厨师体验日',
        time: '11月5日 10:00',
        teacher: '张老师',
        participants: 12,
        isHot: false,
        image: 'src/static/img.png'
    },
    {
        id: 4,
        title: '户外写生活动',
        time: '11月12日 09:30',
        teacher: '刘老师',
        participants: 9,
        isHot: false,
        image: 'src/static/img.png'
    }
])
