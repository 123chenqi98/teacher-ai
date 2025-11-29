<script setup lang="ts">
import { ref } from 'vue'
import {
  virtualTutorFormRef,
  virtualTutorForm,
  virtualTutorFormRules,
  resetForm,
} from "@/forms/teacher/function/VirtualTutorForm.ts"
import "@/assets/teacher/functionCss/children/TeachingPlanFormCss.css"
import { ElMessage } from "element-plus"
import { disciplines, grades, urgencyLevels }
  from "@/data/teacher/funtion/children/AICreativeTeachingFormData.ts"

const props = defineProps<{
  handleSubmit?: (formData: any) => void;
  title?: string;
}>();

// 处理提交表数据
const submitForm = async () => {
  try {
    // 表单校验
    await virtualTutorFormRef.value.validate();
    if (props.handleSubmit) {
      props.handleSubmit(virtualTutorForm);
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
          <span>{{ props.title }}</span>
        </div>
      </template>

      <el-form
          ref="virtualTutorFormRef"
          :model="virtualTutorForm"
          :rules="virtualTutorFormRules"
          label-width="120px"
          class="tp-teaching-plan-form"
      >
        <!-- 课程和年级 - 一行两列 -->
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="课程" prop="discipline">
              <el-select
                  v-model="virtualTutorForm.discipline"
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
                  v-model="virtualTutorForm.grade"
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

        <!-- 学生姓名和紧急程度 - 一行两列 -->
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="学生姓名" prop="studentName">
              <el-input
                  v-model="virtualTutorForm.studentName"
                  placeholder="请输入学生姓名"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="紧急程度" prop="urgencyLevel">
              <el-select
                  v-model="virtualTutorForm.urgencyLevel"
                  placeholder="请选择紧急程度"
                  clearable
              >
                <el-option
                    v-for="level in urgencyLevels"
                    :key="level.value"
                    :label="level.label"
                    :value="level.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 疑问内容 - 文本域 -->
        <el-form-item label="疑问内容" prop="question">
          <el-input
              style="width: 91%"
              v-model="virtualTutorForm.question"
              placeholder="请输入疑问内容"
              type="textarea"
              :rows="3"
          ></el-input>
        </el-form-item>

        <!-- 问题背景 - 文本域 -->
        <el-form-item label="问题背景" prop="context">
          <el-input
              style="width: 91%"
              v-model="virtualTutorForm.context"
              placeholder="请输入问题背景"
              type="textarea"
              :rows="2"
          ></el-input>
        </el-form-item>

        <!-- 提交和重置按钮 -->
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
