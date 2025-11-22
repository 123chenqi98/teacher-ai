<script setup lang="ts">
import { ref } from 'vue'
import "@/assets/teacher/functionCss/children/TeachingPlanFormCss.css"
import {grades, middleGrades} from "@/data/teacher/funtion/children/TeachingPlanData.ts";
import {ElMessage} from "element-plus";
import {UploadFilled} from "@element-plus/icons-vue";
import {
  resetForm,
  scienceForm,
  scienceFormRef,
  scienceFormRules
} from "@/forms/teacher/function/HomeWorkScienceForm.ts";
import {useRoute} from "vue-router";


const router = useRoute();

// 路由名称
const routerName = router.name;

const props = defineProps<{
  handleSubmit?: (formData: any) => void;
  title?: string;
}>();

// 文件显示列表
const fileList = ref([]);

// 处理文件上传
const handleFileChange = (file: any, fileList: any) => {
  scienceForm.file = file.raw;
  fileList.value = fileList;
};

// 处理提交表数据
const submitForm = async () => {
  try {
    // 表单校验
    await scienceFormRef.value.validate();
    if (props.handleSubmit) {
      props.handleSubmit(scienceForm);
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
          ref="scienceFormRef"
          :model="scienceForm"
          :rules="scienceFormRules"
          label-width="120px"
          class="tp-teaching-plan-form"
      >
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="学生姓名" prop="studentName">
              <el-input
                  v-model="scienceForm.studentName"
                  placeholder="请输入学生姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="年级" prop="grade">
              <el-select
                  v-model="scienceForm.grade"
                  placeholder="请选择年级"
                  clearable
              >
                <el-option
                    v-if="(routerName === 'physics-comprehensive')"
                    v-for="grade in middleGrades "
                    :key="grade.value"
                    :label="grade.label"
                    :value="grade.value"
                ></el-option>
                <el-option
                    v-else
                    v-for="grade in grades"
                    :key="grade.value"
                    :label="grade.label"
                    :value="grade.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="题目" prop="topic">
          <el-input
              style="width: 91%"
              v-model="scienceForm.topic"
              placeholder="请输入题目"
              type="textarea"
              :rows="3"
          ></el-input>
        </el-form-item>

        <el-form-item label="题目类型" prop="type">
          <el-input
              style="width: 91%"
              v-model="scienceForm.type"
              placeholder="请输入题目类型"
          ></el-input>
        </el-form-item>

        <el-form-item label="答题要求" prop="writingRequirements">
          <el-input
              style="width: 91%"
              v-model="scienceForm.writingRequirements"
              placeholder="请输入答题要求"
              type="textarea"
              :rows="3"
          ></el-input>
        </el-form-item>

        <el-form-item label="评分要求" prop="gradingRequirements">
          <el-input
              style="width: 91%"
              v-model="scienceForm.gradingRequirements"
              placeholder="请输入评分要求"
              type="textarea"
              :rows="3"
          ></el-input>
        </el-form-item>

        <el-form-item  label="其他" prop="other">
          <el-input
              style="width: 91%"
              v-model="scienceForm.other"
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
