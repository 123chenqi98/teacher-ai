<script setup lang="ts">
import LeftNavigationComponents from "@/components/user/LeftNavigationComponents.vue";
import TopNavigationComponents from "@/components/user/TopNavigationComponents.vue";
import "@/assets/user/UserDashboardCss.css"
import { ref, reactive } from "vue";
import {
  ElRow, ElCol, ElCard, ElAvatar, ElIcon,
  ElForm, ElFormItem, ElSelect, ElOption, ElCheckbox, ElRadioGroup,
  ElRadio, ElButton
} from 'element-plus'
// 导入 Element Plus 图标（需确保已导入，或替换为你项目中的图标）
import { Files, Clock, Check, Medal, Message, Trophy, SuccessFilled, Document, Star, User, Collection, PieChart, Folder, Refresh,  CircleCheckFilled } from '@element-plus/icons-vue';

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

                <!-- 账号安全设置按钮 -->
                <el-form-item class="security-btn-item">
                  <el-button type="primary" class="security-btn" size="small" style="--el-button-primary-bg-color: #722ed1; --el-button-primary-border-color: #722ed1;">
                    账号安全设置
                  </el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>