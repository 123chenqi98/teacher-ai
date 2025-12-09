import {ElMessage} from "element-plus";

// 智能题库表单提交方法
const submitSmartQuestionBankForm = (dataForm: any) => {
    ElMessage.success("提交智能题库表单")
    console.log("提交智能题库表单")
    console.log(dataForm)
}

// 虚拟助教表单提交方法
const submitVirtualTutorForm = (dataForm: any) => {
    ElMessage.success("提交虚拟助教表单")
    console.log("提交虚拟助教表单")
    console.log(dataForm)
}

// 学习诊断表单提交方法
const submitDiagnoseForm = (dataForm: any) => {
    ElMessage.success("提交学习诊断表单")
    console.log("提交学习诊断表单")
    console.log(dataForm)
}

export {
    submitSmartQuestionBankForm,
    submitVirtualTutorForm,
    submitDiagnoseForm
}