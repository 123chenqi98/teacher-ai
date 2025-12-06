import { reactive, ref } from "vue"

// 表单引用
const classFormRef = ref()

// 表单数据
const classForm = reactive({
    className: '',      // 班级名称
    grade: '',          // 年级
    subject: [],        // 学科（数组）
    headTeacher: '',    // 班主任
    classIntro: ''      // 班级简介
})

// 学科验证器
const validateSubject = (rule: any, value: string[], callback: Function) => {
    if (!value || value.length === 0) {
        callback(new Error('必须选择一个学科'))
    } else {
        callback()
    }
}

// 表单重置方法
const resetForm = () => {
    if (classFormRef.value) {
        classFormRef.value.resetFields()
    }
}

// 表单校验规则
const classFormRules = {
    className: [
        { required: true, message: '请输入班级名称（如：高三(1)班）', trigger: ["change", "blur"] }
    ],

    grade: [
        { required: true, message: '请选择年级', trigger: ["change", "blur"] }
    ],

    subject: [
        { validator: validateSubject, trigger: ["change", "blur"] }
    ],

    headTeacher: [
        { required: true, message: '请输入班主任姓名', trigger: ["change", "blur"] }
    ],

    classIntro: [
        { max: 200, message: '班级简介不超过200个字符', trigger: ["change", "blur"] }
    ]
}

export {
    classFormRef,
    classForm,
    classFormRules,
    resetForm
}

