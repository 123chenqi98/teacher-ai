<script setup lang="ts">
import { classListStatic } from '@/data/teacher/classmanagement/ClassListData.ts'
import { ref } from 'vue'

interface Props {
  modelValue?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

defineProps<Props>()
defineEmits<Emits>()

const selectedClass = ref(classListStatic[0]?.classId)
</script>

<template>
  <el-select
    :model-value="modelValue || selectedClass"
    @update:model-value="$emit('update:modelValue', $event)"
    placeholder="选择班级"
    style="width: 150px"
    size="small"
  >
    <el-option
      v-for="cls in classListStatic"
      :key="cls.classId"
      :label="cls.className"
      :value="cls.classId"
    />
  </el-select>
</template>
