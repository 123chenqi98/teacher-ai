<script setup lang="ts">
import {reactive, ref} from 'vue';
import {
  smartQuestionBankFormRef,
  smartQuestionBankForm,
  smartQuestionBankFormRules,
  resetForm,
} from "@/forms/teacher/function/SmartQuestionBankForm.ts"
import "@/assets/teacher/functionCss/children/TeachingPlanFormCss.css"
import {ElMessage} from "element-plus"
import {useRoute} from "vue-router";
import {disciplines,knowledgePoints,difficultys,questionTypes}
  from "@/data/teacher/funtion/children/AICreativeTeachingFormData.ts"

const router = useRoute();

// 路由名称
const routerName =router.name;

const props = defineProps<{
  handleSubmit?: (formData: any) => void;
  title?: string;
}>();

// 文件显示列表
const fileList = ref([]);

// 处理文件上传
const handleFileChange = (file: any, fileList: any) => {
  smartQuestionBankForm.file = file.raw;
  fileList.value = fileList;
};

// 处理提交表数据
const submitForm = async () => {
  try {
    // 表单校验
    await smartQuestionBankFormRef.value.validate();
    if (props.handleSubmit) {
      props.handleSubmit(smartQuestionBankForm);
    }
  } catch (error) {
    ElMessage.warning("表单验证失败");
  }
};
</script>

<template>
<div class="tp-form-container">
  <el-card class="tp-form-card">
    <template #header>
    <div class="tp-card-header">
      <span>{{props.title}}</span>
    </div>
      </template>
    <el-form
    ref="smartQuestionBankFormRef"
    :model="smartQuestionBankForm"
    :rules="smartQuestionBankFormRules"
    label-width="120px"
    class="tp-teaching-plan-form"
    >
     <el-row :gutter="20">
       <el-col :span="11">
         <el-form-item label="课程" prop="discipline">
           <el-select
               v-model="smartQuestionBankForm.discipline"
               placeholder="请选择课程"
               clearable
               filterable
           >
             <el-option
               v-for="discipline in disciplines"
               :key="discipline.value"
               :label="discipline.label"
               :value="discipline.value"
             ></el-option>
           </el-select>
         </el-form-item>
       </el-col>
       <el-col :span="11">
         <el-form-item label="知识点" prop="knowledgePoints">
           <el-select
               v-model="smartQuestionBankForm.knowledgePoints"
               placeholder="请选择知识点"
               clearable
               filterable
           >
             <el-option
               v-for="knowledgePoint in knowledgePoints"
               :key="knowledgePoint.value"
               :label="knowledgePoint.label"
               :value="knowledgePoint.value"
             ></el-option>
           </el-select>
         </el-form-item>
       </el-col>
     </el-row>

      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="难度" prop="difficulty">
            <el-select
                v-model="smartQuestionBankForm.difficulty"
                placeholder="请选择题目难度"
                clearable
                >
              <el-option
              v-for="difficulty in difficultys"
              :key="difficulty.value"
              :label="difficulty.label"
              :value="difficulty.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="题目数量" prop="questionCount">
            <el-input-number
                v-model="smartQuestionBankForm.questionCount"
                placeholder="请输入题目数量"
                type="number"
                ></el-input-number>
          </el-form-item>
          </el-col>
      </el-row>

      <el-form-item label="题型" prop="questionType">
        <div>
          <el-checkbox
            v-for="type in questionTypes"
            :key="type.value"
            :label="type.value"
            v-model="smartQuestionBankForm.questionType"
            >
            {{ type.label }}
          </el-checkbox>
        </div>
      </el-form-item>

      <el-form-item label="描述" prop="description">
        <el-input
          style="width: 91%"
          v-model="smartQuestionBankForm.description"
          placeholder="请输入描述"
          type="textarea"
          :rows="3"
          ></el-input>
      </el-form-item>

      <el-form-item label="其他" prop="other">
        <el-input
            style="width: 91%"
            v-model="smartQuestionBankForm.other"
            placeholder="请输入其他信息"
            type="textarea"
            :rows="2"
        ></el-input>
      </el-form-item>

      <el-form-item label="资料文件" prop="file">
        <el-upload
            class="tp-upload-demo"
            action="#"
            :auto-upload="false"
            :on-change="handleFileChange"
            :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <template #tip>
            <div class="tp-upload-tip">上传文件不超过10MB</div>
          </template>
        </el-upload>
      </el-form-item>

      <el-form-item class="tp-form-actions">
        <el-button type="success" @click="submitForm">提交</el-button>
        <el-button type="warning" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</div>
</template>

<style scoped>

</style>