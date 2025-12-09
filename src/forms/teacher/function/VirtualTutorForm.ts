import { reactive, ref } from "vue"

// 虚拟助教表单引用
const virtualTutorFormRef = ref()

// 表单数据
const virtualTutorForm = reactive({
    discipline: '', // 课程
    grade: '', // 年级
    studentName: '', // 学生姓名
    urgencyLevel: '', // 紧急程度
    question: '', // 疑问内容
    context: '' // 问题背景
})

// 表单重置方法
const resetForm = () => {
    if (virtualTutorFormRef.value) {
        virtualTutorFormRef.value.resetFields()
    }
}

// 表单校验规则
const virtualTutorFormRules = {
    discipline: [
        { required: true, message: '请选择课程', trigger: ["change", "blur"]}
    ],
    grade: [
        { required: true, message: '请选择年级', trigger: ["change", "blur"]}
    ],
    studentName: [
        { required: true, message: '请输入学生姓名', trigger: ["change", "blur"] },
        { min: 1, max: 50, message: '学生姓名长度在1到50个字符', trigger: ["change", "blur"] }
    ],
    urgencyLevel: [
        { required: true, message: '请选择紧急程度', trigger: ["change", "blur"]}
    ],
    question: [
        { required: true, message: '请输入疑问内容', trigger: ["change", "blur"] },
        { min: 1, max: 500, message: '疑问内容长度在1到500个字符', trigger: ["change", "blur"] }
    ],
    context: [
        { required: true, message: '请输入问题背景', trigger: ["change", "blur"] },
        { min: 1, max: 500, message: '问题背景长度在1到500个字符', trigger: ["change", "blur"] }
    ]
}

export {
    virtualTutorFormRef,
    virtualTutorForm,
    virtualTutorFormRules,
    resetForm,
}