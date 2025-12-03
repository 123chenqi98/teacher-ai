import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

//校验
const ruleFormRef = ref<FormInstance>()

// 表单数据
const ruleForm = reactive({
    username: '',
    password: '',
    passwordAgain:'',
})

// 校验账号
const validateUsername = (rule: any, value: any, callback: any) => {
    // 正则表达式：只允许中文、数字和英文，不允许特殊字符
    const usernameRegex = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
    if (value === '') {
        callback(new Error('请输入账号'))
    } else if (!usernameRegex.test(value)) {
        callback(new Error('用户名只能包含中文、数字和英文'))
    }else if(value.length<2 ||value.length>25){
        callback(new Error('用户名长度必须在2-25个字符之间'))
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
    }else if(value !== ruleForm.password){
        callback(new Error('两次密码不一致'))
    }else if(value.length<6 || value.length>25){
        callback(new Error('密码长度必须在6-25个字符之间'))
    }
    else {
        callback()
    }
}

// 校验规则
const rules = reactive<FormRules<typeof ruleForm>>({
    username: [{ validator: validateUsername, trigger: ['blur', 'change'] }],
    password: [{ validator: validatePassword, trigger: ['blur', 'change'] }],
    passwordAgain: [{ validator: validatePasswordAgain, trigger: ['blur', 'change'] }],
})



// 暴露方法
export { ruleForm, rules, ruleFormRef }
