<script setup lang="ts">
import "@/assets/teacher/homeCss/HomePageCss.css"
import {
  Platform, Menu, HomeFilled, Grid, Avatar,List,DocumentChecked ,User,Calendar ,Notification
} from "@element-plus/icons-vue"
import router from "@/router"
import { computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const teacherNavigation = [
  {
    name: '首页',
    path: '/teacher',
    icon: HomeFilled
  },
  {
    name: '功能',
    path: '/teacher/function',
    icon: Menu
  },
  {
    name: '小知',
    path: '/ai-dialog',
    icon: Platform
  },
  {
    name: '班级',
    path: '/teacher/class',
    icon: Grid,
    children: [
      { name: '班级列表', path: '/teacher/class/list' ,icon:List },
      { name: '班级详情', path: '/teacher/class/detail',icon: DocumentChecked},
      { name: '学生管理', path: '/teacher/class/student' ,icon: User},
      { name: '课程表', path: '/teacher/class/schedule' ,icon: Calendar},
      { name: '班级事务', path: '/teacher/class/affairs',icon: Notification }
    ]
  },
  {
    name: '我的',
    path: '/user/dashboard',
    icon: Avatar
  },
]

// 计算当前活跃菜单项
const activeMenu = computed(() => route.path)
</script>

<template>
  <div class="teacher-home-navigation">
    <el-menu class="teacher-navigation-items" :default-active="activeMenu">
      <template v-for="item in teacherNavigation" :key="item.path">
        <!-- 有子菜单的项 -->
        <el-sub-menu
            v-if="item.children"
            :index="item.path"
        >
          <template #title>
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
              v-for="child in item.children"
              :key="child.path"
              :index="child.path"
              @click="router.push(child.path)"
          >
            <el-icon>
              <component :is="child.icon" />
            </el-icon>
            {{ child.name }}
          </el-menu-item>
        </el-sub-menu>

        <!-- 没有子菜单的项 -->
        <el-menu-item
            v-else
            :index="item.path"
            @click="router.push(item.path)"
            class="rounded-menu-item"
        >
          <!-- 使用动态组件渲染对应的图标 -->
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          {{ item.name }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>


<style scoped>

</style>