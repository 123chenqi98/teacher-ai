import { reactive, ref } from "vue"

// 学习诊断表单引用
const diagnoseFormRef = ref()

// 表单数据
const diagnoseForm = reactive({
    studentId: '',               // 学生学号
    discipline: '',              // 诊断科目
    classId: '',                 // 班级ID
    assessmentPeriod: '',        // 评估周期
    diagnosticFocus: '',         // 诊断重点
    diagnosticLevel: ''          // 诊断级别
})

// 表单重置方法
const resetForm = () => {
    if(diagnoseFormRef.value) {
        diagnoseFormRef.value.resetFields()
    }
}

// 学生学号校验
const validateStudentId = (rule: any, value: string, callback: Function) => {
    if (!value) {
        callback(new Error('请输入学生学号'))
    } else if (value.length < 1 || value.length > 20) {
        callback(new Error('学生学号长度在1到20个字符'))
    } else {
        callback()
    }
}

// 班级ID校验
const validateClassId = (rule: any, value: string, callback: Function) => {
    if (!value) {
        callback(new Error('请输入班级ID'))
    } else if (value.length < 1 || value.length > 20) {
        callback(new Error('班级ID长度在1到20个字符'))
    } else {
        callback()
    }
}

// 诊断重点校验
const validateDiagnosticFocus = (rule: any, value: string, callback: Function) => {
    if (!value) {
        callback(new Error('请输入诊断重点'))
    } else if (value.length < 1 || value.length > 500) {
        callback(new Error('诊断重点长度在1到500个字符'))
    } else {
        callback()
    }
}

// 表单校验规则
const diagnoseFormRules = {
    studentId: [
        { required: true, message: '请输入学生学号', trigger: ["change", "blur"] },
        { validator: validateStudentId, trigger: ["change", "blur"] }
    ],
    discipline: [
        { required: true, message: '请选择诊断科目', trigger: ["change", "blur"] }
    ],
    classId: [
        { required: true, message: '请输入班级ID', trigger: ["change", "blur"] },
        { validator: validateClassId, trigger: ["change", "blur"] }
    ],
    assessmentPeriod: [
        { required: true, message: '请选择评估周期', trigger: ["change", "blur"] }
    ],
    diagnosticFocus: [
        { required: true, message: '请输入诊断重点', trigger: ["change", "blur"] },
        { validator: validateDiagnosticFocus, trigger: ["change", "blur"] }
    ],
    diagnosticLevel: [
        { required: true, message: '请选择诊断级别', trigger: ["change", "blur"] }
    ]
}

export {
    diagnoseFormRef,
    diagnoseForm,
    diagnoseFormRules,
    resetForm,
}
