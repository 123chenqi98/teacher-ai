
// 语文作文表单提交方法
import {ElMessage} from "element-plus";

const submitChineseWritingForm = (dataForm:any)=>{
    ElMessage.success("提交语文作文表单")
    console.log("提交语文作文表单")
    console.log(dataForm.studentName)
}

// 英语作文表单提交方法
const submitEnglishWritingForm = (dataForm:any)=>{
    ElMessage.success("提交英语作文表单")
    console.log("提交英语作文表单")
    console.log(dataForm.studentName)
}

// 数学综合题表单提交方法
const submitMathComprehensiveForm = (dataForm:any)=>{
    ElMessage.success("提交数学综合题表单")
    console.log("提交数学综合题表单")
    console.log(dataForm.studentName)
}
// 物理综合题表单提交方法
const submitPhysicsComprehensiveForm = (dataForm:any)=>{
    ElMessage.success("提交物理综合题表单")
    console.log("提交物理综合题表单")
    console.log(dataForm.studentName)
}

export {
    submitChineseWritingForm,
    submitEnglishWritingForm,
    submitMathComprehensiveForm,
    submitPhysicsComprehensiveForm
}