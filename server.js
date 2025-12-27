import express from 'express';
import fs from 'fs';
import path from 'path';
import ollama from 'ollama';

const app = express();
// 使用express内置的json解析器并设置请求大小限制
app.use(express.json({ limit: '10mb' }));
// 设置URL编码解析
app.use(express.urlencoded({ extended: true }));

// 日志中间件
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('请求参数:', req.body);
  next();
});

// 教育问答API接口
app.post('/api/edu/chat', async (req, res) => {
  try {
    // 检查请求体
    if (!req.body) {
      console.error('请求体为空');
      return res.status(400).json({
        code: 400,
        message: '请求体不能为空'
      });
    }
    
    const { question, modelPath } = req.body;
    
    console.log('收到问答请求:', { question, modelPath });
    
    // 默认模型路径
    const defaultModelPath = 'E:/EduChat/models/educhat-r1-001-8b-qwen3.0';
    const actualModelPath = modelPath || defaultModelPath;
    
    // 验证模型路径是否存在
    let modelExists = false;
    try {
      if (fs.existsSync(actualModelPath)) {
        modelExists = true;
        console.log('模型文件路径存在');
      } else {
        console.log('模型文件路径不存在');
      }
    } catch (err) {
      console.error('检查模型路径时出错:', err);
    }
    
    // 调用Ollama模型进行推理
    const response = await ollama.generate({
      model: 'educhat', // 这里使用您创建的模型名称
      prompt: question,
      stream: false,
      options: {
        temperature: 0.1,
        top_k: 40,
        top_p: 0.9,
        num_predict: 512
      }
    });
    
    console.log('Ollama模型响应:', response);
    
    // 构建响应
    const result = {
      code: 200,
      answer: response.response,
      modelInfo: {
        path: actualModelPath,
        exists: modelExists,
        timestamp: new Date().toISOString(),
        model: 'educhat'
      }
    };
    
    console.log('返回响应:', result);
    res.json(result);
    
  } catch (error) {
    console.error('模型调用出错:', error);
    res.status(500).json({
      code: 500,
      message: '模型调用失败',
      error: error.message
    });
  }
});

// 健康检查接口
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: '后端服务运行正常'
  });
});

// 静态文件服务（如果需要）
app.use(express.static('public'));

// 启动服务
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`后端服务已启动`);
  console.log(`服务地址: http://localhost:${PORT}`);
  console.log(`健康检查: http://localhost:${PORT}/api/health`);
  console.log(`问答接口: http://localhost:${PORT}/api/edu/chat`);
  console.log(`========================================\n`);
  console.log('等待API请求...');
});