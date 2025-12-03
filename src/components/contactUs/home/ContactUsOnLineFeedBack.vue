<script lang="ts" setup>
import "@/assets/contactUs/homeCss/ContactUsOnLineFeedBackCss.css"
import { ref, reactive } from "vue";
import { ElForm, ElMessage } from "element-plus"

// 1. 表单引用（用于验证/重置）
const feedbackFormRef = ref<InstanceType<typeof ElForm>>();   // InstanceType构造函数类型T” 中提取出实例类型     typeof ElForm拿到的是 “ElForm 组件的构造类型”（而非实例类型）。

// 2. 响应式状态管理
const isSubmitting = ref(false)    // 提交加载状态
const submitSuccess = ref(false); // 提交成功标识
const fileList= ref<any[]>([])      // 附件列表

// 3. 表单数据模型
const feedbackForm = reactive({
  name:"",    //名字
  phone:"",     //电话号码
  type:"",      //反馈类型
  content:"",     //反馈内容
});
// 4. 表单验证规则
const FormRules = reactive({
  name:[
    {required:true, message:"请输入名字，行吗！！",trigger:"blur"},    //blur：输入框 / 文本域失去焦点时触发（适合输入类字段）；
    {max:20,message:"姓名最大长度不能超过20字，懂吗！！！",trigger:"blur"}      //required是否为必填项
  ],
  phone:[
    {required:true,message:"请输入你的手机号码懂吗",trigger:"blur"},
    {pattern:/^1[3-9]\d{9}$/,message:"请输入正确的手机号码，别随便那些数字来蒙我"}
  ],
  type:[
    {required: true, message: "请选择反馈类型，选一个吧求你了", trigger: "change"}   // change：下拉框 / 单选框值变化时触发（适合选择类字段）；
  ],
  content:[
    {required:true,message:"靓仔给我们点意见好吗谢谢你",trigger:"blur"},
    {min:10,massage:"多说点话吧，多给一点意见，不少于10个字哦",trigger:"blur"},
    {max:300,massage:"你的话太多了666，超过300字了，我服了",trigger:"change"}
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
</script>

<template>
  <div class="contact-us-online-feedback-box">
    <div class="FeedBack-container">
      <!-- Element Plus卡片容器 -->
      <el-card shadow="hover" class="feed-card">
<!--        表单头部-->
        <template #header>
          <div class="card-header">
            <h2 class="title">在线反馈表单</h2>
           </div>
        </template>

<!--        表单主体-->
        <el-form
            ref="feedbackFormRef"
            :model="feedbackForm"
            :rules="FormRules"
            label-width="100px"
            class="feedback-form"
        >
<!--         1. 名字输入框-->
                <el-form-item label="姓名" prop="name">
                  <el-input
                      v-model="feedbackForm.name"
                      placeholder="请输入您的名字"
                      maxlength="21"
                      show-word-limit
                  />
                </el-form-item>
<!--          2.电话号码输入框-->
                <el-form-item label="电话号码" prop="phone">
                  <el-input
                  v-model="feedbackForm.phone"
                  placeholder="请输入您的电话号码"
                  type="text"
                  maxlength="11"
                  show-word-limit
                  />
                </el-form-item>
<!--                 3. 反馈式下拉框-->
                <el-form-item label="反馈类型" prop="type">
                 <el-select
                     v-model="feedbackForm.type"
                     placeholder="请选择反馈的类型"
                 >
                   <el-option label="功能问题" value="problem"/>
                   <el-option label="优化建议" value="suggestion"/>
                   <el-option label="投诉举报" value="complaint"/>
                   <el-option label="其他问题"  value="other"/>
                 </el-select>
                </el-form-item>
<!--               4. 反馈内容-->
                <el-form-item  label="反馈内容" prop="content">
                  <el-input
                      v-model="feedbackForm.content"
                      type="textarea"
                      :rows="6"
                      placeholder="请详细描述您的问题/意见(不少于10个字)"
                      maxlength="500"
                      show-word-limit
                  />
                </el-form-item>

            <!--          5.附件上传-->
                <el-form-item label="附件上传">
                  <el-upload
                      class="upload-demo"
                      action="/api/upload"
                  :file-list="fileList"
                  :accept="['image/jpg','image/png','video/mp4']"
                  :on-change="handleFileChange"
                  :on-remove="handleFileRemove"
                  multiple>
                  <el-button type="primary" icon="el-icon-upload">点击上传</el-button>
                    <div class="el-upload__tip" slot="tip">支持jpg/png/mp4格式，单文件不超过10MB</div>
                  </el-upload>
                </el-form-item>

<!--          提交按钮-->
                <el-form-item class="submit-item">
                  <el-button
                      type="primary"
                      @click="submitForm"
                      :loading="isSubmitting"
                      class="submit-btn"
                  >
                    {{ isSubmitting ? '提交中':'提交反馈'}}
                  </el-button>
                </el-form-item>
              </el-form>

<!--          提交成功反馈-->
              <el-alert
                  v-if="submitSuccess"
                  title="反馈提交成功!我们会尽快与您联系"
                  type="success"
                  closable
                  @close="submitSuccess = false"
                  class="success-alert"
              />
      </el-card>
    </div>
  </div>
</template>

<style></style>