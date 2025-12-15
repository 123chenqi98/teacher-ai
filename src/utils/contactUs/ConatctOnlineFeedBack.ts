import { ref, reactive } from "vue";
import { ElForm, ElMessage } from "element-plus"

// 1. 表单引用（用于验证/重置）
const feedbackFormRef = ref<InstanceType<typeof ElForm>>();   // InstanceType构造函数类型T” 中提取出实例类型     typeof ElForm拿到的是 “ElForm 组件的构造类型”（而非实例类型）。

// 2. 响应式状态管理
const isSubmitting = ref(false)    // 提交加载状态
const submitSuccess = ref(false); // 提交成功标识
const fileList= ref<any[]>([])      // 附件列表

// 4. 表单验证规则
const FormRules = reactive({
    name:[
        {required:true, message:"请输入名字",trigger:"blur"},    //blur：输入框 / 文本域失去焦点时触发（适合输入类字段）；
        {max:20,message:"姓名最大长度不能超过20字",trigger:"blur"}      //required是否为必填项
    ],
    phone:[
        {required:true,message:"请输入你的手机号码",trigger:"blur"},
        {pattern:/^1[3-9]\d{9}$/,message:"请输入正确的11位手机号码"}
    ],
    type:[
        {required: true, message: "请选择反馈类型", trigger: "change"}   // change：下拉框 / 单选框值变化时触发（适合选择类字段）；
    ],
    content:[
        {required:true,message:"请输入你的反馈意见",trigger:"blur"},
        {min:10,massage:"反馈意见不少于10个字",trigger:"blur"},
        {max:300,massage:"反馈意见不能超过300字",trigger:"change"}
    ],
});

// 5. 附件上传/移除事件
const handleFileChange= (file:any)=>{
    console.log("文件上传状态变更:",file)
};
const handleFileRemove= (file:any)=>{
    console.log("移除文件",file)
}
// 6. 表单提交核心逻辑
const submitForm = async () => {
    // 校验表单引用是否存在
    if (!feedbackFormRef.value) return;

    // 第一步：前端表单验证
    try {
        await feedbackFormRef.value.validate(); //触发表单验证
    } catch (error) {
        ElMessage.error("请完善必填项后提交");
        return;
    }

// 开启加载状态（防止重复提交 + 按钮loading）
    isSubmitting.value=true;
    try{
        // 构造提交数据（可根据后端要求调整）
        // const submitData = {
        //   ...feedbackForm,
        //   files: fileList.value.map((file) => file.url), // 附件地址列表
        // };
// 构造提交数据 → 模拟/真实接口请求 → 成功处理（提示+重置）
        await new Promise((resolve) => setTimeout(resolve, 2000))
        // 提交成功处理
        ElMessage.success("反馈提交成功！");
        submitSuccess.value = true;
        // 重置表单和附件
        feedbackFormRef.value.resetFields();
        fileList.value = [];
    } catch (error) {
        // 接口请求失败：提示错误
        ElMessage.error("提交失败，请稍后重试");
    } finally {
        // 无论成功/失败，必恢复加载状态（按钮loading关闭）
        isSubmitting.value = false;
    }
};

// 声明 ref 变量，匹配模板中的 ref="section2"
const section2 = ref<HTMLElement | null>(null);

export{
    feedbackFormRef,
    isSubmitting,
    submitSuccess,
    fileList,
    FormRules,
    handleFileChange,
    handleFileRemove,
    submitForm,
    section2,

}