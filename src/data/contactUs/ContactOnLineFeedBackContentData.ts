import {reactive } from "vue";

// 3. 表单数据模型
const feedbackForm = reactive({
    name:"",    //名字
    phone:"",     //电话号码
    type:"",      //反馈类型
    content:"",     //反馈内容
});

export {
    feedbackForm
}