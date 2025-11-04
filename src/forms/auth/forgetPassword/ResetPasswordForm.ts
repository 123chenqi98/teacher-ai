import {reactive, ref} from "vue";
import {ElForm} from "element-plus";


const passwordFormRef = ref<InstanceType<typeof ElForm>>()
const passwordForm = reactive({
    email:'',
    password: '',
    confirmPassword: ''
})


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
    }else if(value !== passwordForm.password){
        callback(new Error('两次密码不一致'))
    }else if(value.length<6 || value.length>25){
        callback(new Error('密码长度必须在6-25个字符之间'))
    }
    else {
        callback()
    }
}

const passwordRules = {
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],
    password: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { validator: validatePassword, trigger: ['blur', 'change'] }
    ],
    confirmPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { validator: validatePasswordAgain, trigger:['blur', 'change'] }

    ]
}
//清空表单
const clearResetPasswordForm = () => {
    passwordForm.email = ''
    passwordForm.password = ''
    passwordForm.confirmPassword = ''
}

export {
    passwordForm,
    passwordRules,
    passwordFormRef,
    clearResetPasswordForm
}