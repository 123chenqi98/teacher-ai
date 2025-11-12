<script setup lang="ts">
import "@/assets/user/LeftNavigationCss.css"
import { Avatar, User, UserFilled, DataAnalysis, Aim, Notebook, Reading, Folder, Bell, Message } from '@element-plus/icons-vue';
import router from "@/router";
</script>

<template>
    <!-- 左侧导航栏：使用Element Plus的el-aside布局组件，承载Logo和功能菜单 -->
    <el-aside class="sidebar">
      <!-- Logo区域：品牌标识，包含图标和文字，点击通常跳转首页 -->
      <div class="logo">
        <el-icon><Avatar /></el-icon> <!-- Logo图标：Reading图标贴合教师/学习场景 -->
        <span>教师个人中心</span> <!-- Logo文字：明确导航栏所属模块 -->
      </div>

      <!-- 核心功能菜单：Element Plus菜单组件，支持路由跳转和状态高亮 -->
      <!-- 1.router: 启用路由模式：点击菜单项时，会根据index属性的路径跳转路由
           2.:default-active="$route.path": 绑定当前路由路径：实现"当前页面菜单项自动高亮"
           3.:unique-opened="true": 仅展开一个子菜单：当前都是一级菜单，作用是避免冗余展开逻辑，保持布局整洁 -->
      <el-menu router:default-active="$route.path" class="nav-menu" :unique-opened="true">

        <!-- 1. 个人概览：首页级菜单，展示教师核心数据总览（使用频率最高，放首位） -->
        <el-menu-item index="/user/dashboard"> <!-- index：路由跳转路径，与路由配置对应 -->
          <el-icon><User /></el-icon> <!-- 菜单图标：直观表示"个人"相关 -->
          <span>个人概览</span> <!-- 菜单文字：功能描述清晰 -->
        </el-menu-item>

        <!-- 2. 基本信息：教师个人身份、账号、资料管理（基础配置类，放第二位） -->
        <el-menu-item index="/user/profile">
          <el-icon><UserFilled /></el-icon> <!-- 填充图标：与"个人概览"图标区分，突出"详情"属性 -->
          <span>基本信息</span>
        </el-menu-item>

        <!-- 3. 数据统计：教学效果、学生成绩等数据可视化（基于个人信息和教学行为，放第三位） -->
        <el-menu-item index="/user/analytics">
          <el-icon><DataAnalysis /></el-icon> <!-- 数据分析图标：直观表示"统计"功能 -->
          <span>数据统计</span>
        </el-menu-item>

        <!-- 4. 目标管理：基于统计数据制定教学目标（承上启下，数据→规划，放第四位） -->
        <el-menu-item index="/user/goals">
          <el-icon><Aim /></el-icon> <!-- 目标图标：贴合"目标管理"场景 -->
          <span>目标管理</span>
        </el-menu-item>

        <!-- 5. 教案管理：核心教学工作模块，备课、教案编辑（教师日常高频操作，前置） -->
        <el-menu-item index="/user/lessonPlans">
          <el-icon><Notebook /></el-icon> <!-- 笔记本图标：直观表示"教案/文档" -->
          <span>教案管理</span>
        </el-menu-item>

        <!-- 6. 学习题库：教案配套资源，出题、选题（与教案强关联，紧跟教案管理） -->
        <el-menu-item index="/user/questionBank">
          <el-icon><Reading /></el-icon> <!-- 学习图标：明确题库功能 -->
          <span>学习题库</span>
        </el-menu-item>

        <!-- 7. 资源中心：综合教学资源库（课件、素材等，辅助教学，放题库之后） -->
        <el-menu-item index="/user/resources">
          <el-icon><Folder /></el-icon> <!-- 文件夹图标：表示"资源存储" -->
          <span>资源中心</span>
        </el-menu-item>

        <!-- 8. 通知中心：系统官方提醒（如公告、审核结果，被动接收类，放功能区之后） -->
        <el-menu-item index="/user/notifications">
          <el-icon><Bell /></el-icon> <!-- 铃铛图标：直观表示"通知" -->
          <span>通知中心</span>
        </el-menu-item>

        <!-- 9. 消息中心：人际沟通类（与学生、同事、管理员沟通，非核心紧急，放最后） -->
        <el-menu-item index="/user/messages">
          <el-icon><Message /></el-icon> <!-- 消息图标：明确"沟通"功能 -->
          <span>消息中心</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
</template>

<style>

</style>

