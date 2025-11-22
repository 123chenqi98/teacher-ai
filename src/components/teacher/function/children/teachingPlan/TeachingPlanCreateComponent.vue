<script setup lang="ts">
import "@/assets/teacher/functionCss/children/TeachingPlanCss.css"
import {useRoute} from "vue-router";
import TeachingPlanFormComponent
  from "@/components/teacher/function/children/teachingPlan/TeachingPlanFormComponent.vue";
// 获取路由中的数据
const route = useRoute()
// 通过路由传入的数据
const data = route.meta as any

// 提交表单处理方法
const handleSubmit = (formData: any) => {
  console.log('提交表单')
  console.log(formData.file)

}

</script>

<template>
    <div class="teaching-plan-content-box">
<!--      表单组件-->
      <div class="teaching-plan-form-box">
        <TeachingPlanFormComponent :handle-submit="data.handleSubmit" :title="data.title"/>
      </div>
    </div>

</template>

<style scoped>



</style>