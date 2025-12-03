// 特色课程数据
import {ref} from "vue";

export const courses = ref([
    {
        id: 1,
        title: '自然探索课程',
        description: '让孩子们亲近自然，了解动植物世界的奥秘，培养观察力和探索精神。',
        image: 'src/static/img.png'
    },
    {
        id: 2,
        title: '艺术创想课程',
        description: '通过绘画、手工等多种形式，激发孩子的创造力和审美能力，释放艺术天赋。',
        image: 'src/static/img.png'
    },
    {
        id: 3,
        title: '语言启蒙课程',
        description: '通过故事、儿歌等有趣形式，培养孩子的语言表达能力和沟通技巧。',
        image: 'src/static/img.png'
    },
    {
        id: 4,
        title: '科学发现课程',
        description: '通过简单有趣的科学实验，培养孩子的科学思维和探索精神。',
        image: 'src/static/img.png'
    }
])
