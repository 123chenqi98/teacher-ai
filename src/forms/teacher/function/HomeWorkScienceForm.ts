import { reactive, ref } from "vue"

// 表单引用
const scienceFormRef = ref()

// 表单数据
const scienceForm = reactive({
    grade: '', // 年级
    studentName: '', // 学生姓名
    file: null as File | null, // 资料文件
    topic: '', // 题目
    type: '', // 类型
    writingRequirements: '', // 要求
    gradingRequirements: '', // 评分要求
    other: '' // 其他
})



// 表单重置方法
const resetForm = () => {
    if (scienceFormRef.value) {
        scienceFormRef.value.resetFields()
    }
}

// 进行文件校验
const validateFile = (rule: any, value: File | null, callback: Function) => {
    if (!value) {
        callback(new Error('请上传答题文件'))
    } else if (value.size > 10 * 1024 * 1024) {
        callback(new Error('文件大小不能超过10MB'))
    } else {
        callback()
    }
}


// 表单校验规则
const scienceFormRules = {
    grade: [
        { required: true, message: '请选择年级', trigger: ["change", "blur"]}
    ],
    studentName: [
        { required: true, message: '请输入学生姓名', trigger: ["change", "blur"] },
        { min: 1, max: 20, message: '学生姓名长度在1到20个字符', trigger: ["change", "blur"] }
    ],
    topic: [
        { required: true, message: '请输入题目', trigger: ["change", "blur"] },
        { min: 1, max: 200, message: '题目长度在1到200个字符', trigger: ["change", "blur"] }
    ],
    type: [
        { required: true, message: '请输入作业类型', trigger: ["change", "blur"]}
    ],
    writingRequirements: [
        { required: true, message: '请输入答题要求', trigger: ["change", "blur"] },
        { min: 1, max: 500, message: '答题要求长度在1到500个字符', trigger: ["change", "blur"] }
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
    scienceFormRef,
    scienceForm,
    scienceFormRules,
    resetForm,
}
