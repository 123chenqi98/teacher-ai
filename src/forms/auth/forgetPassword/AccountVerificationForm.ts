import {reactive, ref} from "vue";
import type {ElForm} from "element-plus";
// 表单引用
const accountFormRef = ref<InstanceType<typeof ElForm>>()

const accountForm = reactive({
    email: ''
})

const accountRules = {
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]
}

// 清空表单
const resetAccountForm=()=> {
   accountForm.email = ''
}

export {
    accountForm,
    accountRules,
    accountFormRef,
    resetAccountForm
}