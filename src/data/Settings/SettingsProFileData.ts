// 用户信息数据
import {reactive} from "vue";
import type {FormItemRule} from "element-plus";

const userInfo = reactive({
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec6434a56f33f4d9f473bjpg.png',
    username: '张老师',
    email: 'teacher@example.com',
    phone: '13800138000',
    gender: 1,
    birthday: '1990-01-01',
    introduction: '我是一名人民教师，热爱教育事业，致力于培养优秀的学生。'
})

// 显式指定类型为 Record<string, FormItemRule[]>，规范验证规则
const formRules = reactive<Record<string, FormItemRule[]>>({
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        }
    ],
    email: [
        {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
        },
        {
            type: 'email', // 明确指定type为email（FormItemRule支持的合法值）
            message: '请输入正确的邮箱格式',
            trigger: 'blur',
            required: false // 显式声明非必填（避免TS推断歧义）
        }
    ],
    phone: [
        {
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur',
            required: false // 非必填则显式声明
        }
    ]
})

export  {
    userInfo,
    formRules
}