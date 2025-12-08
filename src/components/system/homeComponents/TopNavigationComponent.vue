<script setup lang="ts">
import router from "@/router";
</script>

<template>
  <!--顶部导航-->
  <div class="navigation-button-box">
    <el-button type="text" size="large" class="nav-button" @click="router.push('/')">
        <el-text class="navigation-font">首页</el-text>
    </el-button>
    <el-button text size="large" class="nav-button" @click="router.push('/teacher')">
        <el-text class="navigation-font">小知智能教师</el-text>
    </el-button>
    <el-button text size="large" class="nav-button" @click="router.push('/learningMachine')">
        <el-text class="navigation-font">学习机</el-text>
    </el-button>
    <el-button text size="large" class="nav-button" @click="router.push('/contactUs')">
        <el-text class="navigation-font">联系我们</el-text>
    </el-button>
    <el-button text size="large" class="nav-button" @click="router.push('/story')">
        <el-text class="navigation-font">我们的故事</el-text>
    </el-button>
  </div>
</template>

<style scoped>

.navigation-font {
  font-size: 1.8rem;
  font-family: 楷体, serif;
  font-weight: 700;
  color: rgb(13, 23, 42);
  margin-left: 0.5rem;
}


/* 使用 !important 确保样式生效 */
.nav-button:hover {
  background-color: rgba(128, 0, 128, 0.1) !important;
}
</style>