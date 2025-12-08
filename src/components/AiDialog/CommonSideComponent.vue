<!-- 统一侧边栏组件 -->
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter} from 'vue-router';
import "../../assets/AiDialog/SideCss.css"
import {
  ChatDotRound,
  ChatDotSquare,
  Document,
  HomeFilled,
  Monitor,
  MoreFilled,
  Picture,
  Star
} from "@element-plus/icons-vue";

// 路由实例
const router = useRouter();

// 当前激活的菜单项
const activeMenuItem = ref('ai-dialog');

// 处理AI对话菜单点击
const handleAIDialogClick = () => {
  activeMenuItem.value = 'ai-dialog';
  router.push('/ai-dialog');
};

// 处理AI文档生成菜单点击
const handleDocumentClick = () => {
  activeMenuItem.value = 'document';
  router.push('/document');
};

// 处理AI生成图片菜单点击
const handleImageGenerationClick = () => {
  activeMenuItem.value = 'picture';
  router.push('/picture');
};

// 处理AI生成代码菜单点击
const handleCodeGenerationClick = () => {
  activeMenuItem.value = 'code';
  router.push('/code');
};


// 处理历史对话点击
const handleHistoryClick = (index: number) => {
  // 可以根据需要添加历史对话点击逻辑
  console.log('点击了历史对话:', index);
};
</script>

<template>
  <div class="side-component">
    <!-- 头部区域 -->
    <div class="side-header">
      <div class="side-logo">
        <img src="/src/static/logo.png" alt="小知老师">
        <div class="side-title">小知老师</div>
      </div>
    </div>

    <!-- 功能区域 -->
    <div class="side-section">
      <!-- 通用功能 -->
      <div class="side-section-title">通用功能</div>
      <!-- 返回首页 -->
      <div class="side-menu-item" :class="{ active: activeMenuItem === 'document' }" @click="()=>{
        router.push('/teacher')
      }">
        <div class="side-menu-item-content">
          <div class="side-menu-icon">
            <el-icon><HomeFilled /></el-icon>
          </div>
          <div class="side-menu-text">返回首页</div>
        </div>
      </div>
      
      <!-- AI对话 -->
      <div class="side-menu-item" :class="{ active: activeMenuItem === 'ai-dialog' }" @click="handleAIDialogClick">
        <div class="side-menu-item-content">
          <div class="side-menu-icon">
            <el-icon><ChatDotRound /></el-icon>
          </div>
          <div class="side-menu-text">AI对话</div>
        </div>
      </div>

      <!-- AI文档生成 -->
      <div class="side-menu-item" :class="{ active: activeMenuItem === 'document' }" @click="handleDocumentClick">
        <div class="side-menu-item-content">
          <div class="side-menu-icon">
            <el-icon><Document /></el-icon>
          </div>
          <div class="side-menu-text">AI文档生成</div>
        </div>
      </div>


      <!-- AI生成图片 -->
      <div class="side-menu-item" :class="{ active: activeMenuItem === 'picture' }" @click="handleImageGenerationClick">
        <div class="side-menu-item-content">
          <div class="side-menu-icon">
            <el-icon><Picture /></el-icon>
          </div>
          <div class="side-menu-text">AI生成图片</div>
        </div>
      </div>

      <!-- AI生成代码 -->
      <div class="side-menu-item" :class="{ active: activeMenuItem === 'code' }" @click="handleCodeGenerationClick">
        <div class="side-menu-item-content">
          <div class="side-menu-icon">
            <el-icon><Monitor /></el-icon>
          </div>
          <div class="side-menu-text">AI生成代码</div>
        </div>
      </div>

      <!-- 历史对话 -->
      <div class="side-section-title">历史对话</div>
      
      <!-- 对话记录1 -->
      <div class="side-history-item" @click="handleHistoryClick(1)">
        <div class="side-history-content">
          <div class="side-history-icon">
            <el-icon><ChatDotSquare /></el-icon>
          </div>
          <div class="side-history-text">对话内容1</div>
        </div>
      </div>

      <!-- 对话记录2 -->
      <div class="side-history-item" @click="handleHistoryClick(2)">
        <div class="side-history-content">
          <div class="side-history-icon">
            <el-icon><ChatDotSquare /></el-icon>          
          </div>
          <div class="side-history-text">对话内容2</div>
        </div>
      </div>

      <!-- 对话记录3 -->
      <div class="side-history-item" @click="handleHistoryClick(3)">
        <div class="side-history-content">
          <div class="side-history-icon">
            <el-icon><ChatDotSquare /></el-icon>
          </div>
          <div class="side-history-text">对话内容3</div>
        </div>
      </div>
    </div>

    <!-- 会员升级区域 -->
    <div class="side-vip-section">
      <div class="side-vip-header">
        <div class="side-vip-icon">
          <el-icon><Star /></el-icon>
        </div>
        <div class="side-vip-title">升级会员</div>
      </div>
      <div class="side-vip-desc">会员可解锁更多高阶功能与趣味玩法</div>
      <button class="side-vip-button">立即升级</button>
    </div>

    <!-- 用户信息区域 -->
    <div class="side-user-section">
      <div class="side-user-info">
        <div class="side-user-avatar">
          <img src="/src/static/logo.png" alt="用户头像">
        </div>
        <div class="side-user-details">
          <div class="side-user-name">MOMO</div>
          <div class="side-user-email">momo@MODAO.com</div>
        </div>
      </div>
      <div class="side-user-more">
        <el-icon><MoreFilled /></el-icon>
      </div>
    </div>
  </div>
</template>