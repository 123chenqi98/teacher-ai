
// 一键生成教案表单提交方法
import {ElMessage} from "element-plus";

const submitGenerateTeachingPlanForm = (dataForm:any)=>{
    ElMessage.success("提交生成教案表单")
    console.log("提交生成教案表单")
    console.log(dataForm.discipline)
}

// 个性生教案表单提交方法
const submitPersonalizedTeachingPlanForm = (dataForm:any)=>{
    ElMessage.success("提交个性生教案表单")
    console.log("提交个性生教案表单")
    console.log(dataForm.discipline)
}
// 智能教案表单提交方法
const submitIntelligentTeachingPlanForm = (dataForm:any)=>{
    ElMessage.success("提交智能教案表单")
    console.log("提交智能教案表单")
    console.log(dataForm.discipline)
}
// PPT转教案表单提交方法
const submitPPTTeachingPlanForm = (dataForm:any)=>{
    ElMessage.success("提交PPT转教案表单")
    console.log("提交PPT转教案表单")
    console.log(dataForm.discipline)
}


export {
    submitGenerateTeachingPlanForm,
    submitPersonalizedTeachingPlanForm,
    submitIntelligentTeachingPlanForm,
    submitPPTTeachingPlanForm
}
