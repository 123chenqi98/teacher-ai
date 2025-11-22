<script setup lang="ts">
import { ref } from 'vue'
import {
  teacherPlanForm,
  teachingPlanRules,
  teacherPlanFormRef,
  resetForm
} from "@/forms/teacher/function/TeacherPlanForm.ts";
import "@/assets/teacher/functionCss/children/TeachingPlanFormCss.css"
import {disciplines, grades} from "@/data/teacher/funtion/children/TeachingPlanData.ts";
import {ElMessage} from "element-plus";


const props = defineProps<{
  handleSubmit?: (formData: any) => void;
  title?: string;
}>();

// 文件显示列表
const fileList = ref([]);

// 处理文件上传
const handleFileChange = (file: any, fileList: any) => {
  teacherPlanForm.file = file.raw;
  fileList.value = fileList;
};

// 处理提交表数据
const submitForm = async () => {
  try {
    // 表单校验
    await teacherPlanFormRef.value.validate();
    if (props.handleSubmit) {
      props.handleSubmit(teacherPlanForm);
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
          ref="teacherPlanFormRef"
          :model="teacherPlanForm"
          :rules="teachingPlanRules"
          label-width="120px"
          class="tp-teaching-plan-form"
      >
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="课程" prop="discipline">
              <el-select
                  v-model="teacherPlanForm.discipline"
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
            <el-form-item label="年级" prop="grade">
              <el-select
                  v-model="teacherPlanForm.grade"
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
            <el-form-item label="教材" prop="textbook">
              <el-input
                  v-model="teacherPlanForm.textbook"
                  placeholder="请输入教材信息"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="课时" prop="time">
              <el-input
                  v-model="teacherPlanForm.time"
                  placeholder="请输入课时"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="知识点" prop="knowledge">
          <el-input
              style="width: 91%"
              v-model="teacherPlanForm.knowledge"
              placeholder="请输入知识点"
              type="textarea"
              :rows="3"
          ></el-input>
        </el-form-item>

        <el-form-item  label="其他" prop="other">
          <el-input
              style="width: 91%"
              v-model="teacherPlanForm.other"
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
