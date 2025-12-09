<script setup lang="ts">
import "@/assets/teacher/functionCss/children/FunctionChildrenPageCss.css"
import {useRoute} from "vue-router";
import VirtualTutorFormComponent
  from "@/components/teacher/function/children/aiCreativeTeaching/VirtualTutorFormComponent.vue";
// 获取路由中的数据
const route = useRoute()
// 通过路由传入的数据
const data = route.meta as any
</script>

<template>
  <div class="teaching-plan-content-box">
    <div class="teaching-plan-form-box">
      <virtual-tutor-form-component
        :handle-submit="data.handleSubmit"
        :title="data.title"
        />
    </div>
  </div>
</template>

<style scoped>

</style>