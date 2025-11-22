<script setup lang="ts">
import "@/assets/teacher/functionCss/children/FunctionChildrenPageCss.css"
import WritingGradingFormComponent
  from "@/components/teacher/function/children/homeWork/WritingGradingFormComponent.vue";
import {useRoute} from "vue-router";
// 获取路由中的数据
const route = useRoute()
// 通过路由传入的数据
const data = route.meta as any
</script>

<template>
  <div class="teaching-plan-content-box">
    <!--      表单组件-->
    <div class="teaching-plan-form-box">
      <WritingGradingFormComponent :handle-submit="data.handleSubmit" :title="data.title"/>
    </div>
  </div>

</template>

<style scoped>

</style>