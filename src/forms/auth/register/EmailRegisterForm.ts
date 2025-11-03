// 邮箱注册表单数据
import {reactive, ref} from "vue";
import type {FormInstance} from "element-plus";

//校验
const emailFormRef = ref<FormInstance>()
const emailForm = reactive({
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
    identity:''
})

//校验密码
const validateCode = (rule: any, value: any, callback: any) => {
    const integerRegex = /^[0-9]+$/;
    if (value === '') {
        callback(new Error('请输入校验码'))
    }else if(!integerRegex.test(value)){
        callback(new Error('校验码格式错误'))
    }
    else {
        callback()
    }
}

//校验密码
const validatePassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    }else if(value.length<6 || value.length>25){
        callback(new Error('密码长度必须在6-25个字符之间'))
    }
    else {
        callback()
    }
}
//密码二次校验
const validatePasswordAgain = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    }else if(value !== emailForm.password){
        callback(new Error('两次密码不一致'))
    }else if(value.length<6 || value.length>25){
        callback(new Error('密码长度必须在6-25个字符之间'))
    }
    else {
        callback()
    }
}

// 表单验证规则
const emailRules = {
    email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],
    code: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        {validator:validateCode,trigger:['blur', 'change']}
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {validator:validatePassword,trigger:['blur', 'change']}
    ],
    confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        {validator:validatePasswordAgain,trigger:['blur', 'change']}

    ],
    identity: [
        { required: true, message: '请选择身份', trigger: 'blur' }
    ]
}

export { emailForm, emailRules,emailFormRef }