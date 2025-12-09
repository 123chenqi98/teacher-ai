<script setup lang="ts">
import { ref } from 'vue'
import "@/assets/teacher/functionCss/children/TeachingPlanFormCss.css"
import {grades} from "@/data/teacher/funtion/children/TeachingPlanData.ts";
import {ElMessage} from "element-plus";
import {
  resetForm,
  writingForm,
  writingFormRef,
  writingFormRules
} from "@/forms/teacher/function/HomeWorkWritingForm.ts";
import {UploadFilled} from "@element-plus/icons-vue";


const props = defineProps<{
  handleSubmit?: (formData: any) => void;
  title?: string;
}>();

// 文件显示列表
const fileList = ref([]);

// 处理文件上传
const handleFileChange = (file: any, fileList: any) => {
  writingForm.file = file.raw;
  fileList.value = fileList;
};

// 处理提交表数据
const submitForm = async () => {
  try {
    // 表单校验
    await writingFormRef.value.validate();
    if (props.handleSubmit) {
      props.handleSubmit(writingForm);
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
          ref="writingFormRef"
          :model="writingForm"
          :rules="writingFormRules"
          label-width="120px"
          class="tp-teaching-plan-form"
      >
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="学生姓名" prop="studentName">
              <el-input
                  v-model="writingForm.studentName"
                  placeholder="请输入学生姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="年级" prop="grade">
              <el-select
                  v-model="writingForm.grade"
                  placeholder="请选择年级"
                  clearable
              >
                <el-option
                    v-for="grade in grades"
                    :key="grade.value"
                    :label="grade.label"
                    :value="grade.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="作文题目" prop="topic">
              <el-input
                  v-model="writingForm.topic"
                  placeholder="请输入作文题目"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="作文类型" prop="type">
              <el-input
                  v-model="writingForm.type"
                  placeholder="请输入作文类型"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="作文要求" prop="writingRequirements">
          <el-input
              style="width: 91%"
              v-model="writingForm.writingRequirements"
              placeholder="请输入作文要求"
              type="textarea"
              :rows="3"
          ></el-input>
        </el-form-item>

        <el-form-item label="评分要求" prop="gradingRequirements">
          <el-input
              style="width: 91%"
              v-model="writingForm.gradingRequirements"
              placeholder="请输入评分要求"
              type="textarea"
              :rows="3"
          ></el-input>
        </el-form-item>

        <el-form-item  label="其他" prop="other">
          <el-input
              style="width: 91%"
              v-model="writingForm.other"
              placeholder="请输入其他信息"
              type="textarea"
              :rows="2"
          ></el-input>
        </el-form-item>

        <el-form-item label="作业文件" prop="file">
          <el-upload
              class="tp-upload-demo"
              :auto-upload="false"
              :on-change="handleFileChange"
              :file-list="fileList"
              drag
          >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              <span>点击或拖拽上传</span>
            </div>

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
