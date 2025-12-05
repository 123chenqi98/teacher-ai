<!-- AI 生成图片视图 -->
<script setup lang="ts">
import SideComponent from "../../components/AiDialog/CommonSideComponent.vue"; // 使用统一侧边栏
import MainComponent from "../../components/AiDialog/PictureComponent/MainComponent.vue";
</script>

<template>
  <div>
    <el-container>
      <el-aside>
        <SideComponent />
      </el-aside>
      <el-main>
        <MainComponent />
      </el-main>
    </el-container>
  </div>
</template>
