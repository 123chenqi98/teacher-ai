<script setup lang="ts">
import LeftNavigationComponents from "@/components/user/LeftNavigationComponents.vue";
import TopNavigationComponents from "@/components/user/TopNavigationComponents.vue";
import "@/assets/user/UserDashboardCss.css"
import {ref, reactive, onMounted, nextTick} from "vue";
import {
  ElRow, ElCol, ElCard, ElAvatar, ElIcon, ElText, ElButton,
  ElForm, ElFormItem, ElSelect, ElOption, ElCheckbox, ElRadioGroup, ElRadio, ElMessage,
} from 'element-plus'

// 导入 Element Plus 图标（需确保已导入，或替换为你项目中的图标）
import { Files, Clock, Check, Medal, Message, Trophy, SuccessFilled, Document, Star, User, Collection, PieChart, Folder, Refresh,  CircleCheckFilled, ArrowUp, ArrowDown, Download } from '@element-plus/icons-vue';

// 关键：导入 echarts 原生 API（无需 Element Plus 图表组件）
import * as echarts from 'echarts';

// 定义当前标题（默认“个人概览”）
const currentTitle = ref("个人概览");

// 接收左侧导航的切换事件，更新标题
const handleNavChange = (title: string) => {
  currentTitle.value = title;
};

// 带图标的 stats 数组（图标与统计项语义强关联）
const stats = [
  { value: '24', label: '教案数', icon: Files }, // 文档图标 → 教案/文件
  { value: '36', label: '收藏数', icon: Star }, // 星星图标 → 收藏/关注
  { value: '92%', label: '任务完成率', icon: Check }, // 勾选图标 → 完成/达标
  { value: '4.8', label: '教学评分', icon: Medal }, // 评分板图标 → 分数/评级
  { value: '120+', label: '授课时长(小时)', icon: Clock }, // 时钟图标 → 时长/时间
  { value: '500+', label: '学生答疑数', icon: Message }, // 对话图标 → 答疑/沟通
  { value: '18', label: '优质教案数', icon: Trophy }, // 奖杯图标 → 优质/荣誉
  { value: '98%', label: '学生满意度', icon: SuccessFilled } // 点赞图标 → 满意/认可
];

// 本周数据概览：8项指标，适配 2行4列布局（el-col :span="6" → 24/6=4列，8项=2行）
const weeklyStats = [
  { icon: Clock, value: '31.1', label: '本周授课时长(小时)' },
  { icon: Message, value: '250', label: '本周答疑数' },
  { icon: Document, value: '8', label: '本周新增教案' },
  { icon: Star, value: '12', label: '本周新增收藏' },
  { icon: User, value: '156', label: '本周授课学生' },
  { icon: SuccessFilled, value: '96%', label: '本周满意度' },
  { icon: Collection, value: '5', label: '本周优质教案' },
  { icon: PieChart, value: '12%', label: '数据环比增长' }
];

// 近期操作历史数据
const activityList = ref([
  {
    icon: Document,
    content: '创建了新教案《二次函数的应用》',
    time: '2小时前',
    iconComponent: Document
  },
  {
    icon: Collection,
    content: '收藏了习题《勾股定理专项训练》',
    time: '3小时前',
    iconComponent: Collection
  },
  {
    icon: Folder,
    content: '上传了资源《数学课作PPT模板》',
    time: '1天前',
    iconComponent: Folder
  },
  {
    icon: User,
    content: '修改了个人手机号为138****1234',
    time: '1天前',
    iconComponent: User
  },
  {
    icon: Message,
    content: '给学生小明回复了4条疑问',
    time: '2天前',
    iconComponent: Message
  }
])

// 个性化设置表单数据
const settingsForm = reactive({
  theme: 'purple',
  language: 'zh-CN',
  notifications: {
    system: true,
    message: false,
    marketing: false
  },
  layout: 'card',
  fontSize: 'medium', // 新增字体大小
  defaultTemplate: 'basic', // 新增默认教案模板
  autoSaveTime: '3' // 新增自动保存时间
})

// 控制弹窗显示/隐藏
const syncDialogVisible = ref(false);

// 数据同步处理函数
const handleSync = () => {
  // 模拟同步接口请求
  setTimeout(() => {
    syncDialogVisible.value = true; // 显示弹窗
  }, 800);
};

// 关闭弹窗
const closeDialog = () => {
  syncDialogVisible.value = false;
};

// 收藏概览数据（分类展示收藏资源）
const collectionStats = [
  { category: '教案', count: 18, icon: Document, color: '#6366f1' }, // 对应教案收藏
  { category: '习题', count: 12, icon: Files, color: '#10b981' }, // 对应习题收藏
  { category: '课件', count: 8, icon: Folder, color: '#f59e0b' }, // 对应课件收藏
  { category: '教学工具', count: 6, icon: Collection, color: '#ec4899' }, // 对应工具收藏
];

// 收藏列表数据（展示最近收藏的具体资源）
const collectionList = ref([
  {
    title: '勾股定理专项训练',
    type: '习题',
    source: '初中数学资源库',
    time: '3小时前',
    icon: Files
  },
  {
    title: '一次函数课件PPT',
    type: '课件',
    source: '教研组长分享',
    time: '1天前',
    icon: Folder
  },
  {
    title: '中考数学压轴题解题思路',
    type: '教案',
    source: '全国优秀教案库',
    time: '2天前',
    icon: Document
  },
  {
    title: '几何画板教学实操指南',
    type: '教学工具',
    source: '教师技能平台',
    time: '3天前',
    icon: Collection
  }
]);

// 待办任务数据（含状态、优先级、截止时间）
const todoList = ref([
  {
    id: 1,
    title: '完成八年级下册数学教案编写',
    priority: 'high', // 高优先级
    deadline: '今天 18:00',
    completed: false
  },
  {
    id: 2,
    title: '批改七班单元测试卷',
    priority: 'medium', // 中优先级
    deadline: '明天 12:00',
    completed: false
  },
  {
    id: 3,
    title: '参加初中数学教研会议',
    priority: 'medium', // 中优先级
    deadline: '明天 14:30',
    completed: false
  },
  {
    id: 4,
    title: '更新学生错题本资源',
    priority: 'low', // 低优先级
    deadline: '3天后',
    completed: false
  },
  {
    id: 5,
    title: '回复家长群关于期中复习的咨询',
    priority: 'high', // 高优先级
    deadline: '今天 20:00',
    completed: true // 已完成
  },
  {
    id: 6,
    title: '检查学生作业并批改',
    priority: 'medium',
    deadline: '今天 18:00',
    completed: false
  },{
    id: 7,
    title: '组织班级数学考试',
    priority: 'high',
    deadline: '明天 16:00',
    completed: true
  }
]);

// 切换任务完成状态
const toggleTodoStatus = (id: number) => {
  const todo = todoList.value.find(item => item.id === id);
  if (todo) todo.completed = !todo.completed;
};

// 本月平台使用趋势数据
const trendData = ref({
  dates: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日'],
  series: [
    { name: '教案操作', data: [3, 5, 2, 6, 4, 8, 3, 5, 7, 6, 9, 7, 4, 6, 8, 5, 7, 9, 8, 10], color: '#6366f1' },
    { name: '答疑次数', data: [12, 18, 15, 22, 16, 25, 14, 19, 23, 21, 28, 24, 17, 22, 26, 19, 24, 29, 27, 32], color: '#10b981' },
    { name: '资源收藏', data: [2, 3, 1, 4, 2, 3, 1, 2, 4, 3, 5, 3, 2, 4, 3, 2, 5, 4, 3, 6], color: '#f59e0b' },
    { name: '学生互动', data: [8, 12, 10, 15, 11, 16, 9, 13, 14, 12, 18, 15, 10, 14, 17, 12, 15, 19, 16, 20], color: '#ec4899' }
  ],
  growth: [
    { label: '教案操作', value: '12.5%', trend: 'up' },
    { label: '答疑次数', value: '8.3%', trend: 'up' },
    { label: '资源收藏', value: '3.7%', trend: 'up' },
    { label: '学生互动', value: '2.1%', trend: 'down' }
  ]
});

// 下载趋势报表
const downloadReport = () => {
  ElMessage.success('报表下载成功！');
};

// 关键修复：用 ref 绑定图表容器（Vue 推荐方式，避免 DOM 查找失败）
const chartRef = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;

// 初始化图表函数（抽离为独立函数，便于复用和容错）
const initChart = () => {
  // 容错：如果容器不存在，直接返回
  if (!chartRef.value) {
    console.warn('图表容器未找到');
    return;
  }

  // 销毁已有实例（避免重复初始化）
  if (myChart) {
    myChart.dispose();
  }

  // 初始化图表实例
  myChart = echarts.init(chartRef.value);

  // 图表配置项（简化配置，确保基础渲染）
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      textStyle: { fontSize: 12 },
      padding: 8
    },
    legend: {
      top: 0,
      textStyle: { fontSize: 12 },
      itemWidth: 10,
      itemHeight: 10
    },
    grid: {
      top: 30,
      left: '5%',
      right: '5%',
      bottom: 30,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: trendData.value.dates,
      axisLabel: { fontSize: 11, color: '#6b7280' },
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { fontSize: 11, color: '#6b7280' },
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      splitLine: { lineStyle: { color: '#f3f4f6' } }
    },
    series: trendData.value.series.map((series) => ({
      name: series.name,
      type: 'line',
      data: series.data,
      lineStyle: { color: series.color, width: 2 },
      itemStyle: { color: series.color },
      symbol: 'circle', // 统一图标，避免复杂配置
      symbolSize: 4,
      smooth: true,
      areaStyle: { color: series.color, opacity: 0.1 }
    }))
  };

  // 应用配置项（容错处理）
  try {
    myChart.setOption(option);
    // 验证：打印图表实例，确认初始化成功
    console.log('图表初始化成功', myChart);
  } catch (error) {
    console.error('图表配置错误', error);
  }
};

// 关键修复：用 nextTick 确保 DOM 渲染完成后再初始化图表
onMounted(() => {
  // nextTick：等待 Vue 模板渲染完成后执行
  nextTick(() => {
    initChart();
  });

  // 监听窗口 resize，确保图表自适应
  window.addEventListener('resize', () => {
    if (myChart) {
      myChart.resize();
    }
  });
});
</script>

<template>
  <div class="teacher-dashboard">
    <LeftNavigationComponents  @change-nav="handleNavChange" />
    <main class="main-content">
      <!-- 顶部导航栏 -->
      <TopNavigationComponents :nav-title="currentTitle" />

      <!-- 内容区域 -->
      <div class="content-area">
        <!-- 个人概览卡片 - Element Plus 实现 -->
        <el-card shadow="hover" class="teacher-profile-card" :border="false">
          <!-- 教师基本信息区域 -->
          <!-- :gutter="20":表示子元素之间的间距为 20px。-->
          <el-row :gutter="20" align="middle" class="teacher-info">
            <!-- 头像 -->
            <el-col :span="3">
              <el-avatar shape="circle" size="large" class="avatar-container">
                <img src="https://randomuser.me/api/portraits/men/80.jpg" alt="教师头像" class="avatar-img">
              </el-avatar>
            </el-col>

            <!-- 基本信息 -->
            <el-col :span="12">
              <el-row class="name-row">
                <el-text type="primary" class="teacher-name">内格老师</el-text>
              </el-row>
              <el-row class="desc-row">
                <el-text class="teacher-desc">数学教师 | 初中部 | 教龄 8 年</el-text>
              </el-row>
            </el-col>

            <!-- 操作按钮 -->
            <el-col :span="8" class="actions-col">
              <el-button type="primary" size="small" class="edit-btn">
                <i class="el-icon-edit mr-1"></i>编辑资料
              </el-button>
              <el-button type="success" size="small" class="message-btn">
                <i class="el-icon-message mr-1"></i>查看消息
              </el-button>
            </el-col>
          </el-row>

          <!-- 统计数据区域 -->
          <el-row :gutter="20" class="stats-row">
            <el-col :span="5" v-for="(stat, index) in stats" :key="index">
              <el-card class="stat-card" :border="false">
                <!-- 新增图标显示区域 -->
                <div class="stat-icon">
                  <el-icon :size="24">
                    <component :is="stat.icon"></component>
                  </el-icon>
                </div>
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>

        <!-- 本周数据概览卡片 -->
        <el-card shadow="hover" class="weekly-stats-card" :border="false">
          <!-- 标题 + 查看详情按钮 行 -->
          <el-row :gutter="20" class="card-header-row">
            <el-col :span="20">
              <h2 class="top-title">本周数据概览</h2>
            </el-col>
            <el-col :span="4" class="text-right">
              <el-button type="primary" size="small" class="view-detail-btn" icon="ArrowRight">
                查看详情
              </el-button>
            </el-col>
          </el-row>
          <el-row :gutter="16" class="weekly-stats-row">
            <el-col :span="6" v-for="(item, index) in weeklyStats" :key="index">
              <el-card class="weekly-stat-card" :border="false">
                <el-icon class="stat-icon">
                  <component :is="item.icon"></component>
                </el-icon>
                <div class="stat-value">{{ item.value }}</div>
                <div class="stat-label">{{ item.label }}</div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>

        <el-row :gutter="20" class="card-row">
          <!-- 近期操作历史卡片 -->
          <el-col :span="12">
            <el-card shadow="hover" :border="false" class="recent-activities-card">
              <div class="card-header">
                <h2 class="top-title">近期操作历史</h2>
              </div>
              <!-- 手动渲染列表，避免自动导入路径问题 -->
              <div class="activity-list">
                <div v-for="(item, index) in activityList" :key="index" class="activity-item">
                  <el-avatar class="activity-avatar" size="small">
                    <el-icon :size="16"><component :is="item.icon" /></el-icon>
                  </el-avatar>
                  <div class="activity-content">
                    <p class="activity-desc">{{ item.content }}</p>
                    <span class="activity-time">{{ item.time }}</span>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card shadow="hover" :border="false" class="settings-card">
              <div class="card-header">
                <h2 class="top-title">个性化设置</h2>
              </div>
              <el-form :model="settingsForm" label-width="100px" class="settings-form" size="small">
                <!-- 主题切换 -->
                <el-form-item label="主题切换">
                  <el-select v-model="settingsForm.theme" class="theme-select">
                    <el-option label="默认淡紫主题" value="purple"></el-option>
                    <el-option label="蓝色主题" value="blue"></el-option>
                    <el-option label="绿色主题" value="green"></el-option>
                    <el-option label="深色主题" value="dark"></el-option>
                  </el-select>
                </el-form-item>

                <!-- 语言选择 -->
                <el-form-item label="语言选择">
                  <el-select v-model="settingsForm.language" class="language-select">
                    <el-option label="简体中文" value="zh-CN"></el-option>
                    <el-option label="English" value="en-US"></el-option>
                  </el-select>
                </el-form-item>

                <!-- 通知权限 -->
                <el-form-item label="通知权限">
                  <div class="permission-group">
                    <el-checkbox v-model="settingsForm.notifications.system" label="系统通知"></el-checkbox>
                    <el-checkbox v-model="settingsForm.notifications.message" label="消息提醒"></el-checkbox>
                    <el-checkbox v-model="settingsForm.notifications.marketing" label="营销推送"></el-checkbox>
                  </div>
                </el-form-item>

                <!-- 界面布局 -->
                <el-form-item label="界面布局">
                  <el-radio-group v-model="settingsForm.layout" class="layout-group">
                    <el-radio label="card">卡片式</el-radio>
                    <el-radio label="list">列表式</el-radio>
                  </el-radio-group>
                </el-form-item>

                <!-- 新增：字体大小设置 -->
                <el-form-item label="字体大小">
                  <el-select v-model="settingsForm.fontSize" class="font-select">
                    <el-option label="小" value="small"></el-option>
                    <el-option label="中" value="medium"></el-option>
                    <el-option label="大" value="large"></el-option>
                  </el-select>
                </el-form-item>

                <!-- 新增：默认教案模板 -->
                <el-form-item label="默认教案模板">
                  <el-select v-model="settingsForm.defaultTemplate" class="template-select">
                    <el-option label="基础模板" value="basic"></el-option>
                    <el-option label="详案模板" value="detailed"></el-option>
                    <el-option label="分层教学模板" value="layered"></el-option>
                  </el-select>
                </el-form-item>

                <!-- 新增：自动保存时间 -->
                <el-form-item label="自动保存时间">
                  <el-select v-model="settingsForm.autoSaveTime" class="time-select">
                    <el-option label="1分钟" value="1"></el-option>
                    <el-option label="3分钟" value="3"></el-option>
                    <el-option label="5分钟" value="5"></el-option>
                  </el-select>
                </el-form-item>

                <!-- 数据同步 -->
                <el-form-item label="数据同步">
                  <el-button type="primary" @click="handleSync" class="sync-btn" size="small">
                    <el-icon><Refresh /></el-icon>
                    <span class="ml-1">立即同步</span>
                  </el-button>
                </el-form-item>

                <!-- 同步成功弹窗 -->
                <el-dialog
                    v-model="syncDialogVisible"
                    title="同步结果"
                    width="300px"
                    :close-on-click-modal="false"
                    :show-close="false"
                >
                  <div class="sync-success-content">
                    <el-icon class="success-icon"><CircleCheckFilled /></el-icon>
                    <p class="success-text">同步成功！</p>
                  </div>
                  <template #footer>
                    <el-button type="primary" @click="closeDialog">确定</el-button>
                  </template>
                </el-dialog>
              </el-form>
            </el-card>
          </el-col>

          <!-- 收藏概览 + 待办任务 行 -->
          <el-row :gutter="20" class="card-row mt-4">
            <!-- 收藏概览卡片 -->
            <el-col :span="12">
              <el-card shadow="hover" :border="false" class="collection-card">
                <div class="card-header">
                  <h2 class="top-title">收藏概览</h2>
                  <el-button type="text" size="small" class="view-all-btn">查看全部</el-button>
                </div>

                <!-- 收藏分类统计 -->
                <el-row :gutter="16" class="collection-stats-row mb-4">
                  <el-col :span="6" v-for="(item, index) in collectionStats" :key="index">
                    <div class="collection-stat-item" :style="{ '--color': item.color }">
                      <el-icon class="stat-icon" :style="{ color: item.color }">
                        <component :is="item.icon"></component>
                      </el-icon>
                      <div class="stat-value">{{ item.count }}</div>
                      <div class="stat-label">{{ item.category }}</div>
                    </div>
                  </el-col>
                </el-row>

                <!-- 最近收藏列表 -->
                <div class="collection-list">
                  <div v-for="(item, index) in collectionList" :key="index" class="collection-item">
                    <el-avatar class="collection-avatar" :style="{ backgroundColor: '#f0f2f5' }">
                      <el-icon :size="16"><component :is="item.icon" /></el-icon>
                    </el-avatar>
                    <div class="collection-content">
                      <p class="collection-title">{{ item.title }}</p>
                      <div class="collection-meta">
                        <span class="collection-type">{{ item.type }}</span>
                        <span class="collection-source">· {{ item.source }}</span>
                      </div>
                    </div>
                    <div class="collection-time">{{ item.time }}</div>
                  </div>
                </div>
              </el-card>
            </el-col>

            <!-- 待办任务卡片 -->
            <el-col :span="12">
              <el-card shadow="hover" :border="false" class="todo-card">
                <div class="card-header">
                  <h2 class="top-title">待办任务</h2>
                  <el-button type="primary" size="small" class="add-todo-btn">
                    <i class="el-icon-plus mr-1"></i>新增任务
                  </el-button>
                </div>

                <!-- 待办任务列表 -->
                <div class="todo-list">
                  <div v-for="(item) in todoList" :key="item.id" class="todo-item">
                    <el-checkbox
                        v-model="item.completed"
                        @change="toggleTodoStatus(item.id)"
                        class="todo-checkbox"
                    >
                      <div class="todo-content">
                        <div class="todo-title" :class="{ 'todo-completed': item.completed }">
                          {{ item.title }}
                          <span class="todo-priority" :class="`priority-${item.priority}`">
                            {{ item.priority === 'high' ? '紧急' : item.priority === 'medium' ? '普通' : '次要' }}
                          </span>
                        </div>
                        <div class="todo-deadline">
                          <i class="el-icon-clock mr-1"></i>截止：{{ item.deadline }}
                        </div>
                      </div>
                    </el-checkbox>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>

          <!-- 本月平台使用趋势（echarts 原生实现折线图） -->
          <el-row :gutter="20" class="card-row mt-4">
            <el-col :span="24">
              <el-card shadow="hover" :border="false" class="trend-card">
                <!-- 卡片头部：标题 + 环比增长 + 下载按钮 -->
                <div class="card-header flex flex-wrap items-center justify-between mb-4 gap-2">
                  <h2 class="top-title">本月平台使用趋势</h2>

                  <!-- 环比增长统计 -->
                  <div class="growth-stats flex items-center gap-3 sm:gap-6 flex-wrap">
                    <div v-for="(item, index) in trendData.growth" :key="index" class="growth-item flex items-center gap-1">
                      <span class="growth-label text-sm text-gray-600">{{ item.label }}：</span>
                      <span class="growth-value text-sm" :class="item.trend === 'up' ? 'text-green-600' : 'text-red-600'">
                        <el-icon :size="14" v-if="item.trend === 'up'"><ArrowUp /></el-icon>
                        <el-icon :size="14" v-else><ArrowDown /></el-icon>
                        {{ item.value }}
                      </span>
                    </div>
                  </div>

                  <!-- 下载按钮 -->
                  <el-button type="primary" size="small" class="download-btn" @click="downloadReport">
                    <el-icon :size="14"><Download /></el-icon>
                    <span class="ml-1">下载报表</span>
                  </el-button>
                </div>

                <!-- 关键修复：用 ref 绑定容器，增加 !important 确保宽高生效 -->
                <div
                    ref="chartRef"
                    class="chart-container"
                    style="width: 100% !important; height: 300px !important; border: 1px solid #f0f2f5; border-radius: 8px; background: white;"
                ></div>
              </el-card>
            </el-col>
          </el-row>
        </el-row>
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>