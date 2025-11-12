<script setup lang="ts">
import "@/assets/teacher/homeCss/HomePageCss.css"
import {Platform, Menu, HomeFilled,Grid,Avatar} from "@element-plus/icons-vue";
import router from "@/router";


// 导航信息
const teacherNavigation = [
  {
    name: '首页',
    path: '/teacher',
    icon: HomeFilled
  },
  {
    name: '功能',
    path: '/teacher/function',
    icon:Menu
  },
  {
    name: '小知',
    path: '/teacher/ai',
    icon: Platform
  },
  {
    name: '班级',
    path: '/teacher/class',
    icon: Grid
  },
    {
    name: '我的',
    path: '/teacher/me',
    icon: Avatar
  },
]

</script>

<template>
  <div class="teacher-home-navigation">
    <el-menu class="teacher-navigation-items">
      <el-menu-item
          v-for="(item, index) in teacherNavigation" :key="index"
          @click="router.push(item.path)"
          class="rounded-menu-item"
      >
        <!-- 使用动态组件渲染对应的图标 -->
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        {{ item.name }}
      </el-menu-item>
    </el-menu>
  </div>
</template>


<style scoped>

</style>