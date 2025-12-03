// 热门产品数据
import { ref } from "vue";
import learningMachine4 from "@/static/learningMachine/learningMachine4.png";
import learningMachine5 from "@/static/learningMachine/learningMachine5.png";
import learningMachine6 from "@/static/learningMachine/learningMachine6.png";

export interface HotProduct {
    id: number;
    title: string;
    desc: string;
    image: string;
    button: string;
}

export const hotProducts = ref<HotProduct[]>([
    {
        id: 1,
        title: '小知学习机 P4 焕新款',
        desc: '极致性价比 孩子的第一台学习机',
        image: learningMachine4,
        button: '了解更多'
    },
    {
        id: 2,
        title: '小知学习机 X8 旗舰款',
        desc: 'AI智能辅导 覆盖全学科学习',
        image: learningMachine5,
        button: '查看详情'
    },
    {
        id: 3,
        title: '小知学习机 X8 旗舰款',
        desc: 'AI智能辅导 覆盖全学科学习',
        image: learningMachine6,
        button: '立即体验'
    }
])