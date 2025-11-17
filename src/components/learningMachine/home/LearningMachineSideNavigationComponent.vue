<script setup lang="ts">
import "@/assets/learningMachine/homeCss/LearningMachineHomePageCss.css"
import { HomeFilled,Shop,User,View,Position} from "@element-plus/icons-vue";
import router from "@/router";
//导航信息
const learningMachineNavigation = [
  {
    name: '首页',
    path: '/',//首页路由
    icon: HomeFilled
  },
  {
    name: '产品中心',
    path: '/learningMachine/product', // 产品路由
    icon: Shop//产品图标
  },
  {
    name: '学习机会员',
    path: '/learningMachine/member', // 会员路由
    icon: User // 会员图标
  },
  {
    name: '新闻中心',
    path: '/learningMachine/news', // 新闻路由
    icon: View // 新闻图标
  },
  {
    name: '关于我们',
    path: '/learningMachine/about', // 关于路由
    icon: Position // 关于我们图标
  }
];
</script>
<template>
  <div class="learning-machine-home-navigation">
    <el-menu class="learning-machine-navigation-items">
      <el-menu-item
          v-for="(item, index) in learningMachineNavigation" :key="index"
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