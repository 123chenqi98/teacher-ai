import {reactive, ref} from "vue";

const buyVipFormRef = ref()

// 购买vip表单
const buyVipForm = reactive({
    name: '',
    phone: '',
    email: '',
    type: '2', // 默认选中年度VIP
})


// 表单验证规则
const buyVipFormRules = ref({
    name: [{ required: true, message: '请输入姓名', trigger:  ['change', 'blur'] }],
    phone: [
        { required: true, message: '请输入手机号', trigger:  ['change', 'blur'] },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: ['change', 'blur'] }

    ],
    email: [
        { required: true, message: '请输入邮箱', trigger:  ['change', 'blur'] },
        { type: 'email', message: '请输入正确的邮箱地址', trigger:  ['change', 'blur'] }
    ],
    type: [{ required: true, message: '请选择会员类型', trigger: ['change', 'blur']}]
})

export {
    buyVipForm,
    buyVipFormRules,
    buyVipFormRef
}