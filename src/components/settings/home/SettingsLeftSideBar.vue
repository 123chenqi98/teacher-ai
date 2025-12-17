<script setup lang="ts">
import "@/assets/settings/homeCss/SettingsLeftSideBarCss.css"
import {Menu, User, Lock, BrushFilled, EditPen, Bottom} from "@element-plus/icons-vue";
import router from "@/router";

// 设置左侧导航栏信息
const SettingsLeftSideBar = [
      {
        name:"个人资料",
        path:"/contactUs",
        icon:User
      },
      {
        name:"安全与隐私",
        path:"/",
        icon:Lock
      },
      {
        name:"外观",
        path:"/teacher",
        icon:BrushFilled
      },      {
        name:"语言",
        path:"/login",
        icon:EditPen
      },      {
        name:"下载",
        path:"/register",
        icon:Bottom
      },      {
        name:"辅助功能",
        path:"/forgetPassword",
        icon:Menu
      },

]
</script>

<template>
  <div class="Settings-navigation-box">
    <el-menu class="Settings-navigation-item">
      <el-menu-item
          v-for=" (item) in SettingsLeftSideBar" :key="item.path"
          @click="router.push(item.path)"
          class="Settings-rounded-menu-item"
      >
        <!-- 使用动态组件渲染对应的图标 -->
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        {{item.name}}
      </el-menu-item>
    </el-menu>

  </div>

</template>

<style scoped>

</style>