<script setup lang="ts">

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:value'])
const handleChange = (value: string) => {
  emit('update:value', value)
}

const options = [
  {
    value: 'teacher',
    label: '教师',
  },
  {
    value: 'student',
    label: '学生',
  },
  {
    value: 'parents',
    label: '家长',
  },
]

</script>

<template>
  <el-select v-bind:value="value" placeholder="请选择身份" style="width: 240px" @update:v-model="handleChange">
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
</template>

<style scoped>

</style>