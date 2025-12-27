<!-- 对话框主组件 -->
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

// 导入样式
import '@/assets/AiDialog/DialogCss.css';
import {DocumentAdd, EditPen, Picture, Top} from "@element-plus/icons-vue";

// 导入API请求工具
import { requestPost } from '@/net';

// 路由实例
const router = useRouter();

// 定义消息类型
interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

// 用户输入
const userInput = ref('');

// 对话历史记录
const messages = ref<Message[]>([]);

// 加载状态
const isLoading = ref(false);

// 发送消息
const sendMessage = () => {
  if (!userInput.value.trim()) return;
  
  // 创建用户消息
  const userMessage: Message = {
    id: Date.now(),
    content: userInput.value.trim(),
    sender: 'user',
    timestamp: new Date()
  };
  
  // 添加到对话历史
  messages.value.push(userMessage);
  
  // 清空输入框
  userInput.value = '';
  
  // 显示加载状态
  isLoading.value = true;
  
  // 调用AI对话API
  callAIDialogAPI(userMessage.content);
};

// 调用AI对话API
const callAIDialogAPI = (userContent: string) => {
  // 添加调试信息
  console.log('正在调用AI对话API...');
  console.log('请求参数:', { 
    question: userContent,
    modelPath: 'E:\\EduChat\\models\\educhat-r1-001-8b-qwen3.0'
  });
  
  try {
    // 调用后端API
    requestPost(
      '/api/edu/chat',  // 教育问答接口路径
      { 
        question: userContent,
        modelPath: 'E:/EduChat/models/educhat-r1-001-8b-qwen3.0'  // 修正路径分隔符
      },
      (response) => {
        // 隐藏加载状态
        isLoading.value = false;
        
        console.log('API响应成功:', response);
        
        // 创建AI消息
        const aiMessage: Message = {
          id: Date.now() + 1,
          content: response.answer || '抱歉，我暂时无法回答这个问题。',
          sender: 'ai',
          timestamp: new Date()
        };
        
        // 添加到对话历史
        messages.value.push(aiMessage);
      },
      (errorData) => {
        // 隐藏加载状态
        isLoading.value = false;
        
        console.log('API响应失败:', errorData);
        
        // 显示错误提示
        ElMessage.error('AI回答失败: ' + (errorData.message || '未知错误'));
        
        // 添加错误消息到对话历史
        const errorMessage: Message = {
          id: Date.now() + 1,
          content: '抱歉，我暂时无法回答这个问题，请稍后重试。',
          sender: 'ai',
          timestamp: new Date()
        };
        messages.value.push(errorMessage);
        
        // 备选方案：使用模拟回复
        // simulateAIResponse(userContent);
      },
      (error) => {
        // 隐藏加载状态
        isLoading.value = false;
        
        console.log('网络请求错误:', error);
        console.log('错误详情:', error.response);
        
        // 显示更详细的错误信息
        let errorMsg = '网络错误';
        if (error.code === 'ECONNABORTED') {
          errorMsg = '请求超时，请稍后重试';
        } else if (error.message.includes('Network Error')) {
          errorMsg = '网络连接失败，请检查网络设置';
        } else if (error.response && error.response.status === 500) {
          errorMsg = `服务器内部错误(500)，详细信息: ${error.response.data?.message || error.message}`;
        } else {
          errorMsg = '请求异常: ' + error.message;
        }
        
        ElMessage.error(errorMsg);
        
        // 添加错误消息到对话历史
        const errorMessage: Message = {
          id: Date.now() + 1,
          content: errorMsg,
          sender: 'ai',
          timestamp: new Date()
        };
        messages.value.push(errorMessage);
        
        // 用户希望使用真实API，不自动切换到模拟回复
        // 如果需要模拟回复，可以将下面这行取消注释
        // simulateAIResponse(userContent);
      }
    );
  } catch (err) {
    isLoading.value = false;
    console.error('API调用异常:', err);
    ElMessage.error('系统错误，请稍后重试');
    
    // 备选方案：使用模拟回复
    // simulateAIResponse(userContent);
  }
};

// 模拟AI回复（备选方案）
const simulateAIResponse = (userContent: string) => {
  console.log('使用模拟AI回复');
  
  // 模拟AI思考时间
  setTimeout(() => {
    // 创建AI消息
    const aiMessage: Message = {
      id: Date.now() + 1,
      content: `这是针对您的问题"${userContent}"的AI回复。\n\n（当前使用模拟回复，真实API连接失败）`,
      sender: 'ai',
      timestamp: new Date()
    };
    
    // 添加到对话历史
    messages.value.push(aiMessage);
  }, 1000);
};

</script>
<template>
  <div class="main-component">
    <div class="main-content">
      <!-- 对话记录列表 -->
      <div class="message-list">
        <!-- 欢迎界面 -->
        <div v-if="messages.length === 0" class="welcome-container">
          <img 
            src="/src/static/logo.png"
            alt="AI对话助手" 
            class="welcome-image"
          />
          <h3>欢迎使用AI对话助手</h3>
          <p>输入您的问题，获得智能回答</p>
        </div>
        
        <!-- 对话消息 -->
        <div 
          v-for="message in messages" 
          :key="message.id"
          class="message-item"
          :class="message.sender"
        >
          <!-- 头像 -->
          <div class="message-avatar">
            <img 
              v-if="message.sender === 'user'"
              src="/src/static/logo.png"
              alt="用户头像"
            />
            <img 
              v-else
              src="/src/static/logo.png"
              alt="AI头像"
            />
          </div>
          
          <!-- 消息内容 -->
          <div class="message-content">
            <div class="message-text">{{ message.content }}</div>
            <div class="message-time">{{ message.timestamp.toLocaleTimeString() }}</div>
          </div>
        </div>
        
        <!-- 加载状态 -->
        <div v-if="isLoading" class="message-item ai">
          <div class="message-avatar">
            <img src="/src/static/logo.png" alt="AI头像" />
          </div>
          <div class="message-content">
            <div class="loading-animation">
              <div class="loading-dot"></div>
              <div class="loading-dot"></div>
              <div class="loading-dot"></div>
            </div>
          </div>
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
            type="text"
            class="dialog-input"
            placeholder="请输入对话消息..."
            v-model="userInput"
            @keyup.enter="sendMessage"
            :disabled="isLoading"
          />
        </div>
        <button class="send-btn" @click="sendMessage" :disabled="isLoading">
          <i class="send-btn-icon">
              <el-icon><Top /></el-icon>
          </i>
        </button>        
      </div>
    </div>
  </div>
</template>
