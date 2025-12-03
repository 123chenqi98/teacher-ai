<script setup lang="ts">
import {ElStep, ElSteps} from "element-plus";

const props = defineProps<{
  activeStep: number
}>()

const emit = defineEmits(['update:activeStep'])

const handChange = (value: any) => {
  emit('update:activeStep', value)
}
</script>

<template>
  <el-steps v-bind:active="activeStep" @update:v-modle="handChange" finish-status="success" simple style="margin-top: 20px; width: 80%">
    <el-step title="验证账户" />
    <el-step title="身份验证" />
    <el-step title="重置密码" />
  </el-steps>
</template>

<style scoped>

</style>