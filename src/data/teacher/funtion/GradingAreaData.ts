import {ref} from "vue"
import {Guide, Memo, Notebook, PieChart} from "@element-plus/icons-vue";

export const gradingAssignments = ref([
    {
        id: 1,
        title: '语文作文批改',
        description: '智能批改作文，提高作文质量',
        icon:Notebook,
        function:null
    },
    {
        id: 2,
        title: '英语作文批改',
        description: '智能批改作文，提高作文质量',
        icon:Memo,
        function:null
    },
    {
        id: 3,
        title: '数学综合题批改',
        description: '智能批改综合题，提高题型质量',
        icon:PieChart,
        function:null
    },
    {
        id: 4,
        title: "物理综合题批改",
        description: '智能批改综合题，提高题型质量',
        icon:Guide,
        function:null
    }
])
