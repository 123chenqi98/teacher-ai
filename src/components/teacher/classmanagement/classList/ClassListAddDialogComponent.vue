<script setup lang="ts">
import { ElMessage } from 'element-plus'
import {
  classForm, classFormRules, classFormRef, resetForm
} from '@/forms/teacher/classmanagement/ClassForm'
import { submitAddClassForm } from '@/utils/teacher/classmanagement/ClassManagementFormFunctions'
import { classFormOptions } from '@/data/teacher/classmanagement/ClassroomOptionsData'

interface Props {
  visible: boolean
  title?: string
}

interface Emits {
  (e: 'update:visible', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  title: '新增班级',
  visible: false
})

const emit = defineEmits<Emits>()

const handleSubmit = async () => {
  if (!classFormRef.value) return

  try {
    await classFormRef.value.validate()
    submitAddClassForm(classForm)
    ElMessage.success('班级创建成功')
    handleClose()
  } catch (error) {
    ElMessage.error('表单验证失败')
  }
}

const handleClose = () => {
  emit('update:visible', false)
  resetForm()
}
</script>

<template>
  <el-dialog
    :model-value="props.visible"
    :title="props.title"
    width="500px"
    @update:model-value="emit('update:visible', $event)"
    @close="handleClose"
  >
    <el-form
      ref="classFormRef"
      :model="classForm"
      :rules="classFormRules"
      label-width="100px"
    >
      <el-form-item label="班级名称" prop="className">
        <el-input v-model="classForm.className" placeholder="如：高三(1)班" />
      </el-form-item>

      <el-form-item label="年级" prop="grade">
        <el-select v-model="classForm.grade" placeholder="请选择年级">
          <el-option
            v-for="item in classFormOptions.grade"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="学科" prop="subject">
        <el-select
          v-model="classForm.subject"
          multiple
          placeholder="请选择学科"
        >
          <el-option
            v-for="item in classFormOptions.subject"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="班主任" prop="headTeacher">
        <el-input v-model="classForm.headTeacher" placeholder="请输入班主任姓名" />
      </el-form-item>

      <el-form-item label="班级简介" prop="classIntro">
        <el-input
          v-model="classForm.classIntro"
          type="textarea"
          placeholder="请输入班级简介（最多200字）"
          show-word-limit
          maxlength="200"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>
