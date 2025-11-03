import { reactive, ref} from "vue";
import {ElForm} from "element-plus";

const verifyFormRef = ref<InstanceType<typeof ElForm>>()
const verifyForm = reactive({
    email:'',
    code: ''
})

//校验码
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


const verifyRules = {
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
    ],
    code: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { validator: validateCode, trigger: ['blur', 'change'] }
    ]
}
// 清空表单
const clearVerifyForm = () => {
    verifyForm.email = ''
    verifyForm.code = ''
}

export {
    verifyForm,
    verifyRules,
    verifyFormRef,
    clearVerifyForm
}
