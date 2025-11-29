<script setup lang="ts">
import {
  diagnoseFormRef,
  diagnoseForm,
  diagnoseFormRules,
  resetForm,
} from "@/forms/teacher/function/DiagnoseForm.ts"
import "@/assets/teacher/functionCss/children/TeachingPlanFormCss.css"
import { ElMessage } from "element-plus"
import { disciplines, assessmentPeriods, diagnosticLevels }
  from "@/data/teacher/funtion/children/AICreativeTeachingFormData.ts"

const props = defineProps<{
  handleSubmit?: (formData: any) => void;
  title?: string;
}>();

// 处理提交表数据
const submitForm = async () => {
  try {
    // 表单校验
    await diagnoseFormRef.value.validate();
    if (props.handleSubmit) {
      props.handleSubmit(diagnoseForm);
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
          ref="diagnoseFormRef"
          :model="diagnoseForm"
          :rules="diagnoseFormRules"
          label-width="120px"
          class="tp-teaching-plan-form"
      >
        <!-- 学生学号和班级ID - 一行两列 -->
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="学生学号" prop="studentId">
              <el-input
                  v-model="diagnoseForm.studentId"
                  placeholder="请输入学生学号"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11">
            <el-form-item label="班级ID" prop="classId">
              <el-input
                  v-model="diagnoseForm.classId"
                  placeholder="请输入班级ID"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 诊断科目和诊断级别 - 一行两列 -->
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="诊断科目" prop="discipline">
              <el-select
                  v-model="diagnoseForm.discipline"
                  placeholder="请选择诊断科目"
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
            <el-form-item label="诊断级别" prop="diagnosticLevel">
              <el-select
                  v-model="diagnoseForm.diagnosticLevel"
                  placeholder="请选择诊断级别"
                  clearable
              >
                <el-option
                    v-for="level in diagnosticLevels"
                    :key="level.value"
                    :label="level.label"
                    :value="level.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 评估周期 -->
        <el-form-item label="评估周期" prop="assessmentPeriod">
          <el-select
              v-model="diagnoseForm.assessmentPeriod"
              placeholder="请选择评估周期"
              clearable
          >
            <el-option
                v-for="period in assessmentPeriods"
                :key="period.value"
                :label="period.label"
                :value="period.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 诊断重点 - 文本域 -->
        <el-form-item label="诊断重点" prop="diagnosticFocus">
          <el-input
              style="width: 91%"
              v-model="diagnoseForm.diagnosticFocus"
              placeholder="请输入诊断重点"
              type="textarea"
              :rows="3"
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
