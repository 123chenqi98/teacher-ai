// 模拟目标数据
import { ref } from "vue";
import type { Objective } from "@/data/user/goalManagement/interface/TargetInterface.ts";

const objectives = ref<Objective[]>([
    {
        id: 1,
        title: '提升教学质量',
        description: '通过改进教学方法和课程内容，提高学生的学习效果',
        progress: 75,
        deadline: '2025-12-31',
        keyResults: [
            {
                id: 101,
                title: '学生满意度达到90%以上',
                progress: 80,
                targetValue: 90,
                currentValue: 72
            },
            {
                id: 102,
                title: '课程完成率达到95%',
                progress: 70,
                targetValue: 95,
                currentValue: 67
            }
        ]
    },
    {
        id: 2,
        title: '个人专业发展',
        description: '通过学习和培训提升自己的专业能力',
        progress: 60,
        deadline: '2025-06-30',
        keyResults: [
            {
                id: 201,
                title: '完成3个专业认证课程',
                progress: 66,
                targetValue: 3,
                currentValue: 2
            },
            {
                id: 202,
                title: '发表至少2篇教学研究论文',
                progress: 50,
                targetValue: 2,
                currentValue: 1
            }
        ]
    },
    {
        id: 3,
        title: '提高学生参与度',
        description: '通过互动式教学方法提高学生课堂参与度',
        progress: 40,
        deadline: '2025-09-30',
        keyResults: [
            {
                id: 301,
                title: '课堂互动次数增加50%',
                progress: 45,
                targetValue: 50,
                currentValue: 22
            },
            {
                id: 302,
                title: '学生提问数量提升30%',
                progress: 35,
                targetValue: 30,
                currentValue: 10
            }
        ]
    },
    {
        id: 4,
        title: '提升学生能力',
        description: '通过提高学生能力，提高学生能力',
        progress: 100,
        deadline: '2025-12-31',
        keyResults: [
            {
                id: 401,
                title: '学生能力提升到80%以上',
                progress: 25,
                targetValue: 80,
                currentValue: 60
            },
            {
                id: 402,
                title: '学生能力提升到90%以上',
                progress: 15,
                targetValue: 90,
                currentValue: 75
            }
        ]
    }
])

export { objectives }