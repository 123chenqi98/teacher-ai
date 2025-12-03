// 产品特性数据
import {ref} from "vue";

const productFeatures = ref([
    {
        id: 1,
        title: "智能AI辅助",
        description: "内置先进AI算法，提供个性化学习建议和智能答疑服务"
    },
    {
        id: 2,
        title: "海量教育资源",
        description: "涵盖小学到高中的全部学科资源，同步最新教材版本"
    },
    {
        id: 3,
        title: "家长监控功能",
        description: "实时了解孩子学习进度，设置学习时间和内容限制"
    },
    {
        id: 4,
        title: "护眼屏幕设计",
        description: "采用专业护眼技术，减少蓝光辐射，保护孩子视力"
    }
]);

// 规格参数数据
const specifications = ref([
    { key: "型号", value: "LM-2024" },
    { key: "屏幕尺寸", value: "10.1英寸" },
    { key: "分辨率", value: "1920×1200" },
    { key: "处理器", value: "八核 2.0GHz" },
    { key: "内存", value: "6GB RAM + 128GB ROM" },
    { key: "电池容量", value: "7000mAh" },
    { key: "操作系统", value: "Android 12定制系统" },
    { key: "重量", value: "约500g" }
]);

// 用户评价数据
const reviews = ref([
    {
        id: 1,
        userName: "张妈妈",
        rating: 5,
        date: "2024-10-15",
        content: "孩子使用后成绩提升明显，特别是数学，推荐给各位家长！"
    },
    {
        id: 2,
        userName: "李爸爸",
        rating: 4,
        date: "2024-09-22",
        content: "内容很丰富，孩子喜欢用，就是电池续航可以再优化一下。"
    },
    {
        id: 3,
        userName: "王老师",
        rating: 5,
        date: "2024-11-01",
        content: "作为教学辅助工具非常棒，能很好地帮助学生巩固课堂知识。"
    }
]);

export { productFeatures, specifications, reviews };