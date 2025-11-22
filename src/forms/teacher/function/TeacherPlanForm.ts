import { reactive, ref } from "vue"

// 教案表单引用
const teacherPlanFormRef = ref()

// 表单数据
const teacherPlanForm = reactive({
    discipline: '', // 课程
    grade: '', // 年级
    textbook: '', // 教材
    knowledge: '', // 知识点
    time: '', // 课时
    file: null as File | null, // 资料文件
    other: '' // 其他
})



// 表单重置方法
const resetForm = () => {
    if (teacherPlanFormRef.value) {
        teacherPlanFormRef.value.resetFields()
    }
}

// 进行文件校验
const validateFile = (rule: any, value: File | null, callback: Function) => {
    if (!value) {
        callback(new Error('请上传资料文件'))
    } else if (value.size > 10 * 1024 * 1024) { // 10MB限制
        callback(new Error('文件大小不能超过10MB'))
    } else {
        callback()
    }
}
// 课时校验
const validateTime = (rule: any, value: string, callback: Function) => {
    if (!value) {
        callback(new Error('请输入课时'))
    } else if (!/^\d+$/.test(value)) {
        callback(new Error('课时只能是数字'))
    } else if (parseInt(value) < 1 || parseInt(value) > 100) {
        callback(new Error('课时范围在1到100'))
    } else {
        callback()
    }
}

// 表单校验规则
const teachingPlanRules = {
    discipline: [
        { required: true, message: '请选择课程', trigger: ["change", "blur"]}
    ],
    grade: [
        { required: true, message: '请选择年级', trigger: ["change", "blur"]}
    ],
    textbook: [
        { required: true, message: '请输入教材信息', trigger: ["change", "blur"] },
        { min: 1, max: 200, message: '教材信息长度在1到200个字符', trigger: ["change", "blur"] }
    ],
    knowledge: [
        { required: true, message: '请输入知识点', trigger: ["change", "blur"] },
        { min: 1, max: 500, message: '知识点长度在1到500个字符', trigger: ["change", "blur"] }
    ],
    time: [
        { required: true, message: '请输入课时', trigger: ["change", "blur"] },
        { validator: validateTime, trigger:  ["change", "blur"] }
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
    teacherPlanFormRef,
    teacherPlanForm,
    teachingPlanRules,
    resetForm,
}
