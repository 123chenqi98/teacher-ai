import { reactive, ref } from 'vue'

import type { FormInstance, FormRules } from 'element-plus'

//校验
const ruleFormRef = ref<FormInstance>()

// 表单数据
const ruleForm = reactive({
    email: '',
    code: '',
})

// 校验账号
const validateEmail = (rule: any, value: any, callback: any) => {
    // 正则表达式：只允许中文、数字和英文，不允许特殊字符
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (value === '') {
        callback(new Error('请输入邮箱'))
    } else if (!emailRegex.test(value)) {
        callback(new Error('邮箱格式错误'))
    }else if(value.length<2 ||value.length>25){
        callback(new Error('邮箱长度必须在2-25个字符之间'))
    }
    else {
        callback()
    }
}
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


// 校验规则
const rules = reactive<FormRules<typeof ruleForm>>({
    email: [{ validator: validateEmail, trigger: ['blur', 'change'] }],
    code: [{ validator: validateCode, trigger: ['blur', 'change'] }],
})



// 暴露方法
export { ruleForm, rules, ruleFormRef }
