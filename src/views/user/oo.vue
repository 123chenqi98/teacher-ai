<template>
  <div class="overview-container">
    <!-- 页面布局：侧边栏 + 主内容区 -->
    <el-container style="height: 100vh;">
      <!-- 侧边栏 -->
      <el-aside width="200px" class="sidebar">
        <div class="sidebar-header">
          <el-avatar icon="el-icon-user" size="large"></el-avatar>
          <span class="user-name">张三</span>
        </div>
        <el-menu default-active="1" class="sidebar-menu">
          <el-menu-item index="1">
            <el-icon><House /></el-icon>
            <span slot="title">个人概览</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><Setting /></el-icon>
            <span slot="title">账号设置</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><Document /></el-icon>
            <span slot="title">数据报表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><Bell /></el-icon>
            <span slot="title">消息通知</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主内容区域 -->
      <el-container>
        <!-- 顶部导航 -->
        <el-header class="header">
          <div class="header-left">
            <h2>个人中心概览</h2>
          </div>
          <div class="header-right">
            <el-button type="text" icon="el-icon-s-tools">设置</el-button>
            <el-button type="text" icon="el-icon-switch-button">退出</el-button>
          </div>
        </el-header>

        <!-- 核心内容 -->
        <el-main class="main-content">
          <!-- 数据卡片区域 -->
          <div class="card-group">
            <el-card class="stat-card">
              <div class="card-header">
                <span class="card-title">今日访问量</span>
                <el-icon class="card-icon"><User /></el-icon>
              </div>
              <div class="card-value">1,258</div>
              <div class="card-trend">
                <span class="trend-up">+12.5%</span> 较昨日
              </div>
            </el-card>

            <el-card class="stat-card">
              <div class="card-header">
                <span class="card-title">已完成任务</span>
                <el-icon class="card-icon"><Check /></el-icon>
              </div>
              <div class="card-value">89</div>
              <div class="card-trend">
                <span class="trend-up">+8.2%</span> 较上周
              </div>
            </el-card>

            <el-card class="stat-card">
              <div class="card-header">
                <span class="card-title">待处理事项</span>
                <el-icon class="card-icon"><Clock /></el-icon>
              </div>
              <div class="card-value">12</div>
              <div class="card-trend">
                <span class="trend-down">-5.3%</span> 较上周
              </div>
            </el-card>

            <el-card class="stat-card">
              <div class="card-header">
                <span class="card-title">本月业绩</span>
                <el-icon class="card-icon"><Money /></el-icon>
              </div>
              <div class="card-value">¥28,560</div>
              <div class="card-trend">
                <span class="trend-up">+18.9%</span> 较上月
              </div>
            </el-card>
          </div>

          <!-- 图表 + 个人信息区域 -->
          <div class="content-row">
            <!-- 趋势图表 -->
            <el-card class="chart-card">
              <template #header>
                <span>近7日访问趋势</span>
              </template>
              <div id="trend-chart" style="width: 100%; height: 300px;"></div>
            </el-card>

            <!-- 个人信息面板 -->
            <el-card class="info-card">
              <template #header>
                <span>个人信息</span>
              </template>
              <div class="info-list">
                <div class="info-item">
                  <label>姓名：</label>
                  <span>张三</span>
                </div>
                <div class="info-item">
                  <label>部门：</label>
                  <span>产品研发部</span>
                </div>
                <div class="info-item">
                  <label>职位：</label>
                  <span>前端开发工程师</span>
                </div>
                <div class="info-item">
                  <label>入职时间：</label>
                  <span>2022-05-18</span>
                </div>
                <div class="info-item">
                  <label>邮箱：</label>
                  <span>zhangsan@example.com</span>
                </div>
                <div class="info-item">
                  <label>手机号：</label>
                  <span>138****6789</span>
                </div>
              </div>
              <el-button type="primary" class="edit-btn" style="width: 100%;">编辑个人信息</el-button>
            </el-card>
          </div>

          <!-- 最近动态区域 -->
          <el-card class="dynamic-card" style="margin-top: 20px;">
            <template #header>
              <span>最近动态</span>
              <el-button type="text">查看全部</el-button>
            </template>
            <el-table :data="dynamicList" border style="width: 100%;">
              <el-table-column prop="time" label="时间" width="180"></el-table-column>
              <el-table-column prop="content" label="动态内容"></el-table-column>
              <el-table-column prop="status" label="状态">
                <template #default="scope">
                  <el-tag :type="scope.row.statusType">{{ scope.row.status }}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  House, Setting, Document, Bell, User, Check, Clock, Money
} from '@element-plus/icons-vue'
import * as echarts from 'echarts'

// 最近动态列表数据
const dynamicList = ref([
  {
    time: '2025-11-28 14:30',
    content: '完成「用户中心改版」需求开发',
    status: '已完成',
    statusType: 'success'
  },
  {
    time: '2025-11-27 10:15',
    content: '参加产品需求评审会议',
    status: '已完成',
    statusType: 'success'
  },
  {
    time: '2025-11-26 16:40',
    content: '修复线上页面兼容性问题',
    status: '已解决',
    statusType: 'primary'
  },
  {
    time: '2025-11-25 09:20',
    content: '提交本周工作周报',
    status: '已提交',
    statusType: 'info'
  },
  {
    time: '2025-11-24 17:00',
    content: '跟进测试反馈的bug',
    status: '处理中',
    statusType: 'warning'
  }
])

// 初始化图表
onMounted(() => {
  const chartDom = document.getElementById('trend-chart')
  const myChart = echarts.init(chartDom)
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['11-23', '11-24', '11-25', '11-26', '11-27', '11-28', '11-29']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '访问量',
        type: 'line',
        data: [890, 950, 1020, 980, 1150, 1258, 1180],
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(64, 158, 255, 0.3)' },
            { offset: 1, color: 'rgba(64, 158, 255, 0.05)' }
          ])
        },
        itemStyle: {
          color: '#409EFF'
        }
      }
    ]
  }
  myChart.setOption(option)
  // 自适应窗口大小
  window.addEventListener('resize', () => {
    myChart.resize()
  })
})
</script>

<style scoped>
.overview-container {
  width: 100%;
  height: 100%;
  background-color: #f5f7fa;
}

/* 侧边栏样式 */
.sidebar {
  background-color: #2e3b4e;
  color: #fff;
}
.sidebar-header {
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #404e67;
}
.user-name {
  margin-left: 10px;
  font-size: 16px;
  font-weight: 600;
}
.sidebar-menu {
  border-right: none;
  background-color: #2e3b4e;
  color: #fff;
}

/* 头部样式 */
.header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #e6e6e6;
}
.header-left h2 {
  margin: 0;
  color: #333;
}

/* 主内容样式 */
.main-content {
  padding: 20px;
  background-color: #f5f7fa;
}

/* 数据卡片组 */
.card-group {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.stat-card {
  flex: 1;
  min-width: 200px;
  padding: 15px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.card-title {
  font-size: 14px;
  color: #666;
}
.card-icon {
  color: #409EFF;
  font-size: 18px;
}
.card-value {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
}
.card-trend {
  font-size: 12px;
}
.trend-up {
  color: #67c23a;
}
.trend-down {
  color: #f56c6c;
}

/* 内容行 */
.content-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.chart-card {
  flex: 2;
  min-width: 400px;
}
.info-card {
  flex: 1;
  min-width: 300px;
}
.info-list {
  padding: 10px 0;
}
.info-item {
  display: flex;
  margin-bottom: 15px;
  font-size: 14px;
}
.info-item label {
  width: 80px;
  color: #666;
}
.info-item span {
  color: #333;
}
.edit-btn {
  margin-top: 10px;
}

/* 动态卡片 */
.dynamic-card {
  margin-top: 20px;
}
</style>