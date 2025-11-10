<script setup lang="ts">
import LeftNavigationComponents from "@/components/user/LeftNavigationComponents.vue";
import TopNavigationComponents from "@/components/user/TopNavigationComponents.vue";
import "@/assets/user/UserDashboardCss.css"
import { ref } from "vue";
// 导入 Element Plus 图标（需确保已导入，或替换为你项目中的图标）
import { Files, Clock, Check, Medal, Message, Trophy, SuccessFilled, Document, Star, User, Collection, PieChart, Download, Folder, HelpFilled } from '@element-plus/icons-vue';

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
              <el-card class="stat-card" :border="false" shadow="none">
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
          <div class="card-header">
            <h2 class="top-title">本周数据概览</h2>
          </div>
          <el-row :gutter="16" class="weekly-stats-row">
            <el-col :span="6" v-for="(item, index) in weeklyStats" :key="index">
              <el-card class="weekly-stat-card" :border="false" shadow="none">
                <el-icon class="stat-icon">
                  <component :is="item.icon"></component>
                </el-icon>
                <div class="stat-value">{{ item.value }}</div>
                <div class="stat-label">{{ item.label }}</div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>

        
      </div>
    </main>
  </div>
</template>

<style scoped>

</style>