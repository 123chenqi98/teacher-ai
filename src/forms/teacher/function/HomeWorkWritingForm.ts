import { reactive, ref } from "vue"

// 教案表单引用
const writingFormRef = ref()

// 表单数据
const writingForm = reactive({
    grade: '', // 年级
    studentName: '', // 学生姓名
    file: null as File | null, // 资料文件
    topic: '', // 题目
    type: '', // 作文类型
    writingRequirements: '', // 作文要求
    gradingRequirements: '', // 评分要求
    other: '' // 其他
})



// 表单重置方法
const resetForm = () => {
    if (writingFormRef.value) {
        writingFormRef.value.resetFields()
    }
}

// 进行文件校验
const validateFile = (rule: any, value: File | null, callback: Function) => {
    if (!value) {
        callback(new Error('请上传作业文件'))
    } else if (value.size > 10 * 1024 * 1024) {
        callback(new Error('文件大小不能超过10MB'))
    } else {
        callback()
    }
}


// 表单校验规则
const writingFormRules = {
    grade: [
        { required: true, message: '请选择年级', trigger: ["change", "blur"]}
    ],
    studentName: [
        { required: true, message: '请输入学生姓名', trigger: ["change", "blur"] },
        { min: 1, max: 20, message: '学生姓名长度在1到20个字符', trigger: ["change", "blur"] }
    ],
    topic: [
        { required: true, message: '请输入作文题目', trigger: ["change", "blur"] },
        { min: 1, max: 200, message: '作文题目长度在1到200个字符', trigger: ["change", "blur"] }
    ],
    type: [
        { required: true, message: '请选择作文类型', trigger: ["change", "blur"]}
    ],
    writingRequirements: [
        { required: true, message: '请输入作文要求', trigger: ["change", "blur"] },
        { min: 1, max: 500, message: '作文要求长度在1到500个字符', trigger: ["change", "blur"] }
    ],
    gradingRequirements: [
        { required: true, message: '请输入评分要求', trigger: ["change", "blur"] },
        { min: 1, max: 500, message: '评分要求长度在1到500个字符', trigger: ["change", "blur"] }
    ],
    file: [
        {
            required: false,
            validator:validateFile ,
            trigger: 'change'
        }
    ],
    other: [
        { required: false },
        { min: 0, max: 500, message: '其他长度在0到500个字符', trigger: ["change", "blur"] }
    ]
}


export {
    writingFormRef,
    writingForm,
    writingFormRules,
    resetForm,
}
