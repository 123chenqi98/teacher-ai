<!-- 对话框主组件 -->
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 导入样式
import '@/assets/AiDialog/DialogCss.css';
import {DocumentAdd, EditPen, Picture, Top} from "@element-plus/icons-vue";

// 路由实例
const router = useRouter();

// 用户输入
const userInput = ref('');

// 输入框引用
const inputRef = ref<HTMLInputElement | null>(null);

// 发送消息
const sendMessage = () => {
  if (!userInput.value.trim()) return;
  
  console.log('用户输入:', userInput.value.trim());
  
  // 清空输入框
  userInput.value = '';
};

// 处理AI对话跳转
const handleAIDialogClick = () => {
  router.push('/ai-dialog');
};

// 处理图片生成跳转
const handleImageGenerationClick = () => {
  router.push('/picture');
};

// 处理代码生成跳转
const handleCodeGenerationClick = () => {
  router.push('/code');
};

</script>
<template>
  <div class="main-component">
    <div class="main-content">
      <!-- 对话记录列表 -->
      <div class="message-list">
        <!-- 中间图片展示 -->
        <div >
          <img 
            src="/src/static/logo.png"
            alt="AI文档生成器" 
            class="welcome-image"
          />
          <h3>欢迎使用AI文档生成器</h3>
          <p>输入您的需求，生成专业文档</p>
        </div>
      </div>
    </div>
    
    <!-- 消息输入区域 -->
    <div class="message-input-section">
      <div class="input-icons-container">
        <div class="input-icon">
          <el-icon><Picture /></el-icon>
        </div>
        <div class="input-icon">
          <el-icon><DocumentAdd /></el-icon>
        </div>
      </div>
      <!-- 输入框和发送按钮的容器 -->
      <div class="input-send-container">
        <div class="input-container">
          <i class="input-prefix-icon">
              <el-icon><EditPen /></el-icon>
          </i>
          <input
            ref="inputRef"
            type="text"
            class="dialog-input"
            placeholder="请输入生成文档消息..."
            v-model="userInput"
            @keyup.enter="sendMessage"
          />
        </div>
        <button class="send-btn" @click="sendMessage">
          <i class="send-btn-icon">
              <el-icon><Top /></el-icon>
          </i>
        </button>        
      </div>
    </div>
  </div>
</template>
