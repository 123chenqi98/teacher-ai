<!-- 导航栏 -->
<script setup lang="ts">
import '@/assets/story/NavigationCSS.css'

// 平滑滚动到指定元素
function smoothScrollTo(elementId: string) {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth', // 平滑滚动
      block: 'start' // 滚动到元素顶部
    })
  }
}

// 处理导航链接点击事件
function handleNavClick(_event: Event, targetId: string) {
  smoothScrollTo(targetId)
}

</script>

<template>
    <div class="header">
        <div class="nav-container">
            <!-- 左侧logo -->
            <div class="logo-area">
                <img src="/src/static/logo.png" class="logo-img">
                <span class="logo-text">小知智能教师</span>
            </div>
            <!-- 右侧导航链接 -->
            <div class="nav-links">
                <div  class="nav-link" @click="handleNavClick($event, 'hero')">首页</div>
                <div  class="nav-link" @click="handleNavClick($event, 'origin')">我们的初衷</div>
                <div  class="nav-link" @click="handleNavClick($event, 'about')">关于我们</div>
                <div  class="nav-link" @click="handleNavClick($event, 'introduction')">团队介绍</div>
                <div  class="nav-link" @click="handleNavClick($event, 'course')">发展历程</div>
                <div  class="nav-link" @click="handleNavClick($event, 'contact')">联系我们</div>
            </div>
        </div>
    </div>
</template>

