// 手机号注册表单数据
import {reactive, ref} from "vue";
import type {FormInstance} from "element-plus";

const integerRegex = /^[0-9]+$/;


//校验
const phoneFormRef = ref<FormInstance>()
const phoneForm = reactive({
    phone: '',
    code: '',
    password: '',
    confirmPassword: '',
    identity:''
})


//校验密码
const validatePhoneCode = (rule: any, value: any, callback: any) => {
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
    }else if(value !== phoneForm.password){
        callback(new Error('两次密码不一致'))
    }else if(value.length<6 || value.length>25){
        callback(new Error('密码长度必须在6-25个字符之间'))
    }
    else {
        callback()
    }
}

const phoneRules = {
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
    ],
    code: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
        , {validator:validatePhoneCode,trigger:['blur', 'change']}
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

export {
    phoneForm,
    phoneRules,
    phoneFormRef
}