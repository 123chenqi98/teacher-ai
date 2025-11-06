<template>
  <div class="data-stats-module">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <div class="logo">
        <i class="fa fa-graduation-cap"></i>
        <span>教师个人中心</span>
      </div>
      <nav class="nav-menu">
        <ul>
          <li class="nav-item">
            <i class="fa fa-user-circle"></i>
            <span>个人概览</span>
          </li>
          <li class="nav-item">
            <i class="fa fa-id-card"></i>
            <span>基本信息</span>
          </li>
          <li class="nav-item active">
            <i class="fa fa-bar-chart"></i>
            <span>数据统计</span>
          </li>
          <li class="nav-item">
            <i class="fa fa-bullseye"></i>
            <span>目标管理</span>
          </li>
          <li class="nav-item">
            <i class="fa fa-bell"></i>
            <span>通知中心</span>
          </li>
          <li class="nav-item">
            <i class="fa fa-book"></i>
            <span>教案管理</span>
          </li>
          <li class="nav-item">
            <i class="fa fa-question-circle"></i>
            <span>学习题库</span>
          </li>
          <li class="nav-item">
            <i class="fa fa-envelope"></i>
            <span>消息中心</span>
          </li>
          <li class="nav-item">
            <i class="fa fa-folder-open"></i>
            <span>资源中心</span>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- 右侧主内容区 -->
    <main class="main-content">
      <!-- 顶部导航栏 -->
      <header class="top-nav">
        <div class="search-box">
          <i class="fa fa-search"></i>
          <input type="text" placeholder="搜索...">
        </div>
        <div class="user-actions">
          <button class="action-btn">
            <i class="fa fa-bell"></i>
            <span class="badge">3</span>
          </button>
          <button class="action-btn">
            <i class="fa fa-envelope"></i>
            <span class="badge">5</span>
          </button>
          <button class="action-btn">
            <i class="fa fa-cog"></i>
          </button>
          <div class="user-profile">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="用户头像">
            <div class="user-info">
              <span class="user-name">张三老师</span>
              <span class="user-role">数学教师</span>
            </div>
          </div>
        </div>
      </header>

      <!-- 内容区域 -->
      <div class="content-area">
        <!-- 页面标题 -->
        <div class="page-title">
          <h1>数据统计</h1>
          <p>查看您的使用数据和统计信息，分析教学工作效率</p>
        </div>

        <!-- 筛选栏 -->
        <div class="filter-bar">
          <div class="filter-group">
            <label class="filter-label">时间范围</label>
            <select class="filter-select" v-model="timeRange">
              <option value="last-week">最近一周</option>
              <option value="last-month" selected>最近一个月</option>
              <option value="last-quarter">最近三个月</option>
              <option value="last-year">最近一年</option>
              <option value="custom">自定义</option>
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label">数据维度</label>
            <select class="filter-select" v-model="dataDimension">
              <option value="all" selected>全部数据</option>
              <option value="teaching">教学相关</option>
              <option value="resource">资源相关</option>
              <option value="task">任务相关</option>
            </select>
          </div>
          <div class="filter-actions">
            <button class="btn refresh-btn" @click="refreshData">
              <i class="fa fa-refresh"></i>
              <span>刷新数据</span>
            </button>
          </div>
        </div>

        <!-- 数据概览卡片区 -->
        <div class="section-title">数据概览</div>
        <div class="overview-cards">
          <div class="card stat-card">
            <div class="card-body">
              <div class="stat-icon">
                <i class="fa fa-clock-o"></i>
              </div>
              <div class="stat-info">
                <div class="stat-label">总使用时长</div>
                <div class="stat-value">
                  <span>{{ stats.totalUsageHours }}</span>
                  <span class="unit">小时</span>
                </div>
                <div class="stat-trend positive">
                  <i class="fa fa-arrow-up"></i>
                  <span>{{ stats.usageTrendPercent }}%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card stat-card">
            <div class="card-body">
              <div class="stat-icon">
                <i class="fa fa-check-square-o"></i>
              </div>
              <div class="stat-info">
                <div class="stat-label">完成任务数</div>
                <div class="stat-value">
                  <span>{{ stats.completedTasks }}</span>
                  <span class="unit">个</span>
                </div>
                <div class="stat-trend positive">
                  <i class="fa fa-arrow-up"></i>
                  <span>{{ stats.tasksTrendPercent }}%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card stat-card">
            <div class="card-body">
              <div class="stat-icon">
                <i class="fa fa-file-text-o"></i>
              </div>
              <div class="stat-info">
                <div class="stat-label">创建教案数</div>
                <div class="stat-value">
                  <span>{{ stats.createdLessonPlans }}</span>
                  <span class="unit">个</span>
                </div>
                <div class="stat-trend positive">
                  <i class="fa fa-arrow-up"></i>
                  <span>{{ stats.lessonPlansTrendPercent }}%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card stat-card">
            <div class="card-body">
              <div class="stat-icon">
                <i class="fa fa-pencil-square-o"></i>
              </div>
              <div class="stat-info">
                <div class="stat-label">习题练习数</div>
                <div class="stat-value">
                  <span>{{ stats.practiceExercises }}</span>
                  <span class="unit">道</span>
                </div>
                <div class="stat-trend positive">
                  <i class="fa fa-arrow-up"></i>
                  <span>{{ stats.exercisesTrendPercent }}%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card stat-card">
            <div class="card-body">
              <div class="stat-icon">
                <i class="fa fa-download"></i>
              </div>
              <div class="stat-info">
                <div class="stat-label">资源下载量</div>
                <div class="stat-value">
                  <span>{{ stats.resourceDownloads }}</span>
                  <span class="unit">次</span>
                </div>
                <div class="stat-trend positive">
                  <i class="fa fa-arrow-up"></i>
                  <span>{{ stats.downloadsTrendPercent }}%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card stat-card">
            <div class="card-body">
              <div class="stat-icon">
                <i class="fa fa-star-o"></i>
              </div>
              <div class="stat-info">
                <div class="stat-label">收藏资源数</div>
                <div class="stat-value">
                  <span>{{ stats.favoritedResources }}</span>
                  <span class="unit">个</span>
                </div>
                <div class="stat-trend positive">
                  <i class="fa fa-arrow-up"></i>
                  <span>{{ stats.favoritesTrendPercent }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 图表模块区 -->
        <div class="section-title">图表分析</div>
        <div class="charts-grid">
          <div class="card chart-card">
            <div class="card-header">
              <div class="card-title">使用时长趋势</div>
              <div class="chart-actions">
                <button class="chart-period-btn" :class="{ 'active': chartPeriod === 'day' }" @click="changeChartPeriod('day')">日</button>
                <button class="chart-period-btn" :class="{ 'active': chartPeriod === 'week' }" @click="changeChartPeriod('week')">周</button>
                <button class="chart-period-btn" :class="{ 'active': chartPeriod === 'month' }" @click="changeChartPeriod('month')">月</button>
              </div>
            </div>
            <div class="card-body">
              <div class="chart-container">
                <canvas id="usageTrendChart"></canvas>
                <div class="chart-placeholder" v-if="!chartsLoaded">
                  <div class="chart-skeleton"></div>
                  <div class="chart-info">按日 / 周 / 月展示平台使用时长变化</div>
                </div>
              </div>
            </div>
          </div>
          <div class="card chart-card">
            <div class="card-header">
              <div class="card-title">任务完成情况</div>
            </div>
            <div class="card-body">
              <div class="chart-container">
                <canvas id="taskCompletionChart"></canvas>
                <div class="chart-placeholder" v-if="!chartsLoaded">
                  <div class="chart-skeleton"></div>
                  <div class="chart-info">展示各类任务的完成比例</div>
                </div>
              </div>
            </div>
          </div>
          <div class="card chart-card">
            <div class="card-header">
              <div class="card-title">活跃度分析</div>
            </div>
            <div class="card-body">
              <div class="chart-container">
                <canvas id="activityHeatmapChart"></canvas>
                <div class="chart-placeholder" v-if="!chartsLoaded">
                  <div class="chart-skeleton"></div>
                  <div class="chart-info">按时间段展示平台使用活跃度</div>
                </div>
              </div>
            </div>
          </div>
          <div class="card chart-card">
            <div class="card-header">
              <div class="card-title">资源使用分布</div>
            </div>
            <div class="card-body">
              <div class="chart-container">
                <canvas id="resourceDistributionChart"></canvas>
                <div class="chart-placeholder" v-if="!chartsLoaded">
                  <div class="chart-skeleton"></div>
                  <div class="chart-info">展示各类资源的使用占比</div>
                </div>
              </div>
            </div>
          </div>
          <div class="card chart-card full-width">
            <div class="card-header">
              <div class="card-title">综合指标趋势对比</div>
            </div>
            <div class="card-body">
              <div class="chart-container">
                <canvas id="comprehensiveTrendChart"></canvas>
                <div class="chart-placeholder" v-if="!chartsLoaded">
                  <div class="chart-skeleton"></div>
                  <div class="chart-info">对比教案创建、任务完成、资源使用等核心指标</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 详细统计与比较分析区 -->
        <div class="section-title">详细统计与比较分析</div>
        <div class="details-grid">
          <div class="card details-card">
            <div class="card-header">
              <div class="card-title">教学相关指标</div>
            </div>
            <div class="card-body">
              <ul class="details-list">
                <li class="detail-item">
                  <span class="detail-label">教学平均完成时间</span>
                  <span class="detail-value">{{ teachingStats.averageCompletionTime }}</span>
                </li>
                <li class="detail-item">
                  <span class="detail-label">教案被查看次数</span>
                  <span class="detail-value">{{ teachingStats.lessonPlanViews }}</span>
                </li>
                <li class="detail-item">
                  <span class="detail-label">习题平均正确率</span>
                  <span class="detail-value">{{ teachingStats.averageAccuracy }}</span>
                </li>
                <li class="detail-item">
                  <span class="detail-label">学生反馈满意度</span>
                  <span class="detail-value">{{ teachingStats.studentSatisfaction }}</span>
                </li>
                <li class="detail-item">
                  <span class="detail-label">教学计划完成率</span>
                  <span class="detail-value">{{ teachingStats.teachingPlanCompletion }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="card details-card">
            <div class="card-header">
              <div class="card-title">资源相关指标</div>
            </div>
            <div class="card-body">
              <ul class="details-list">
                <li class="detail-item">
                  <span class="detail-label">日均资源访问量</span>
                  <span class="detail-value">{{ resourceStats.dailyResourceVisits }}</span>
                </li>
                <li class="detail-item">
                  <span class="detail-label">资源平均使用时长</span>
                  <span class="detail-value">{{ resourceStats.averageResourceUsageTime }}</span>
                </li>
                <li class="detail-item">
                  <span class="detail-label">资源上传数量</span>
                  <span class="detail-value">{{ resourceStats.resourcesUploaded }}</span>
                </li>
                <li class="detail-item">
                  <span class="detail-label">资源分享次数</span>
                  <span class="detail-value">{{ resourceStats.resourcesShared }}</span>
                </li>
                <li class="detail-item">
                  <span class="detail-label">收藏资源利用率</span>
                  <span class="detail-value">{{ resourceStats.favoriteResourceUsage }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="card details-card">
            <div class="card-header">
              <div class="card-title">任务相关指标</div>
            </div>
            <div class="card-body">
              <ul class="details-list">
                <li class="detail-item">
                  <span class="detail-label">周均完成任务数</span>
                  <span class="detail-value">{{ taskStats.weeklyCompletedTasks }}</span>
                </li>
                <li class="detail-item">
                  <span class="detail-label">任务平均完成时间</span>
                  <span class="detail-value">{{ taskStats.averageTaskCompletionTime }}</span>
                </li>
                <li class="detail-item">
                  <span class="detail-label">逾期任务数</span>
                  <span class="detail-value">{{ taskStats.overdueTasks }}</span>
                </li>
                <li class="detail-item">
                  <span class="detail-label">任务完成质量评分</span>
                  <span class="detail-value">{{ taskStats.taskQualityScore }}</span>
                </li>
                <li class="detail-item">
                  <span class="detail-label">目标达成率</span>
                  <span class="detail-value">{{ taskStats.goalAchievementRate }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 教学效率分析与排名区 -->
        <div class="section-title">教学效率分析与排名</div>
        <div class="efficiency-section">
          <div class="card efficiency-card">
            <div class="card-body">
              <div class="efficiency-ranking">
                <h3 class="ranking-title">部门效率排名（本月）</h3>
                <div class="ranking-list">
                  <div class="ranking-item" v-for="(item, index) in efficiencyRanking" :key="index">
                    <div class="rank">{{ index + 1 }}</div>
                    <div class="teacher-info">
                      <div class="teacher-name">{{ item.name }}</div>
                      <div class="teacher-department">{{ item.department }}</div>
                    </div>
                    <div class="teacher-score">{{ item.score }}</div>
                  </div>
                </div>
              </div>
              <div class="efficiency-chart">
                <h3 class="chart-title">个人效率趋势</h3>
                <div class="chart-container">
                  <canvas id="personalEfficiencyChart"></canvas>
                  <div class="chart-placeholder" v-if="!chartsLoaded">
                    <div class="chart-skeleton"></div>
                    <div class="chart-info">展示近 6 个月的效率评分变化</div>
                  </div>
                </div>
              </div>
              <div class="efficiency-progress">
                <h3 class="progress-title">本月目标完成度</h3>
                <div class="progress-list">
                  <div class="progress-item" v-for="(item, index) in goalProgress" :key="index">
                    <div class="progress-label">
                      <span>{{ item.label }}</span>
                      <span>{{ item.value }}</span>
                    </div>
                    <div class="progress-bar-container">
                      <div class="progress-bar" :style="{ width: item.value }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部数据导出区 -->
        <div class="export-section">
          <div class="export-info">
            <p>支持将当前统计数据导出为多种格式</p>
          </div>
          <div class="export-actions">
            <button class="btn export-btn" @click="exportData('pdf')">
              <i class="fa fa-file-pdf-o"></i>
              <span>导出 PDF</span>
            </button>
            <button class="btn export-btn" @click="exportData('excel')">
              <i class="fa fa-file-excel-o"></i>
              <span>导出为 Excel</span>
            </button>
            <button class="btn export-btn" @click="exportData('csv')">
              <i class="fa fa-file-text-o"></i>
              <span>导出为 CSV</span>
            </button>
            <button class="btn export-btn" @click="exportData('image')">
              <i class="fa fa-file-image-o"></i>
              <span>导出图表</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: 'DataStatsModule',
  data() {
    return {
      chartsLoaded: false,
      chartPeriod: 'day',
      timeRange: 'last-month',
      dataDimension: 'all',
      charts: {},
      
      // 统计数据
      stats: {
        totalUsageHours: 128,
        usageTrendPercent: 15,
        completedTasks: 156,
        tasksTrendPercent: 8,
        createdLessonPlans: 45,
        lessonPlansTrendPercent: 6,
        practiceExercises: 234,
        exercisesTrendPercent: 15,
        resourceDownloads: 89,
        downloadsTrendPercent: 5,
        favoritedResources: 56,
        favoritesTrendPercent: 3
      },
      
      // 教学相关指标
      teachingStats: {
        averageCompletionTime: '4.2 小时',
        lessonPlanViews: '128 次',
        averageAccuracy: '92.1%',
        studentSatisfaction: '4.8/5 分',
        teachingPlanCompletion: '89.5%'
      },
      
      // 资源相关指标
      resourceStats: {
        dailyResourceVisits: '12.3 次',
        averageResourceUsageTime: '28 分钟',
        resourcesUploaded: '36 个',
        resourcesShared: '24 次',
        favoriteResourceUsage: '76.3%'
      },
      
      // 任务相关指标
      taskStats: {
        weeklyCompletedTasks: '12.5 个',
        averageTaskCompletionTime: '3.2 小时',
        overdueTasks: '3 个',
        taskQualityScore: '4.7/5 分',
        goalAchievementRate: '87.5%'
      },
      
      // 效率排名
      efficiencyRanking: [
        { name: '李四老师', department: '初中部', score: 96.2 },
        { name: '张三老师', department: '初中部', score: 94.8 },
        { name: '王五老师', department: '高中部', score: 92.5 },
        { name: '赵六老师', department: '小学部', score: 91.7 },
        { name: '钱七老师', department: '高中部', score: 90.3 }
      ],
      
      // 目标完成度
      goalProgress: [
        { label: '教学质量评分', value: '92%' },
        { label: '资源利用率', value: '85%' },
        { label: '任务完成率', value: '89%' },
        { label: '学生满意度', value: '94%' }
      ],
      
      // 图表数据
      chartData: {
        usageTrend: {
          day: {
            labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            data: [5.2, 4.8, 6.1, 5.5, 7.2, 3.5, 4.2]
          },
          week: {
            labels: ['第1周', '第2周', '第3周', '第4周'],
            data: [32, 28, 35, 33]
          },
          month: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
            data: [120, 135, 125, 140, 130, 145, 150]
          }
        },
        taskCompletion: {
          labels: ['教学任务', '备课任务', '批改任务', '培训任务', '其他任务'],
          data: [40, 25, 20, 10, 5]
        },
        activityHeatmap: {
          labels: ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24'],
          data: [0.5, 0.2, 0.1, 0.8, 2.5, 1.8, 1.2, 2.0, 2.8, 1.5, 0.9, 0.4]
        },
        resourceDistribution: {
          labels: ['教案资源', '习题资源', '视频资源', '课件资源', '其他资源'],
          data: [35, 25, 20, 15, 5]
        },
        comprehensiveTrend: {
          labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
          datasets: [
            { label: '教案创建', data: [5, 7, 6, 8, 10, 9, 12] },
            { label: '任务完成', data: [18, 22, 20, 25, 28, 26, 30] },
            { label: '资源使用', data: [12, 15, 14, 18, 20, 19, 22] },
            { label: '学生互动', data: [8, 10, 9, 12, 15, 14, 16] }
          ]
        },
        personalEfficiency: {
          labels: ['2月', '3月', '4月', '5月', '6月', '7月'],
          data: [88.5, 90.2, 89.7, 92.3, 93.8, 94.8]
        }
      }
    };
  },
  mounted() {
    // 直接初始化图表（使用本地依赖，无需 CDN）
    this.chartsLoaded = true;
    this.initCharts();
  },
  methods: {
    // 初始化所有图表
    initCharts() {
      this.createUsageTrendChart();
      this.createTaskCompletionChart();
      this.createActivityHeatmapChart();
      this.createResourceDistributionChart();
      this.createComprehensiveTrendChart();
      this.createPersonalEfficiencyChart();
    },
    
    // 创建使用时长趋势图
    createUsageTrendChart() {
      const ctx = document.getElementById('usageTrendChart');
      if (!ctx) return;
      
      const data = this.chartData.usageTrend[this.chartPeriod];
      
      this.charts.usageTrend = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [{
            label: '使用时长（小时）',
            data: data.data,
            borderColor: '#6c63ff',
            backgroundColor: 'rgba(108, 99, 255, 0.1)',
            borderWidth: 2,
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    },
    
    // 创建任务完成情况图
    createTaskCompletionChart() {
      const ctx = document.getElementById('taskCompletionChart');
      if (!ctx) return;
      
      this.charts.taskCompletion = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.chartData.taskCompletion.labels,
          datasets: [{
            data: this.chartData.taskCompletion.data,
            backgroundColor: [
              '#6c63ff',
              '#8a7fff',
              '#a89bff',
              '#c6bfff',
              '#e4dfff'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                boxWidth: 12,
                padding: 15
              }
            }
          },
          cutout: '60%'
        }
      });
    },
    
    // 创建活跃度分析图
    createActivityHeatmapChart() {
      const ctx = document.getElementById('activityHeatmapChart');
      if (!ctx) return;
      
      this.charts.activityHeatmap = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.chartData.activityHeatmap.labels,
          datasets: [{
            label: '活跃度',
            data: this.chartData.activityHeatmap.data,
            backgroundColor: function(context) {
              const value = context.dataset.data[context.dataIndex];
              if (value < 1) return 'rgba(108, 99, 255, 0.3)';
              if (value < 2) return 'rgba(108, 99, 255, 0.6)';
              return 'rgba(108, 99, 255, 0.9)';
            },
            borderWidth: 0,
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              title: {
                display: true,
                text: '活跃时长（小时）'
              }
            },
            x: {
              grid: {
                display: false
              },
              title: {
                display: true,
                text: '时间段（小时）'
              }
            }
          }
        }
      });
    },
    
    // 创建资源使用分布图
    createResourceDistributionChart() {
      const ctx = document.getElementById('resourceDistributionChart');
      if (!ctx) return;
      
      this.charts.resourceDistribution = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.chartData.resourceDistribution.labels,
          datasets: [{
            data: this.chartData.resourceDistribution.data,
            backgroundColor: [
              '#6c63ff',
              '#8a7fff',
              '#a89bff',
              '#c6bfff',
              '#e4dfff'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                boxWidth: 12,
                padding: 15
              }
            }
          }
        }
      });
    },
    
    // 创建综合指标趋势对比图
    createComprehensiveTrendChart() {
      const ctx = document.getElementById('comprehensiveTrendChart');
      if (!ctx) return;
      
      const data = this.chartData.comprehensiveTrend;
      
      this.charts.comprehensiveTrend = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: '教案创建',
              data: data.datasets[0].data,
              borderColor: '#6c63ff',
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.3
            },
            {
              label: '任务完成',
              data: data.datasets[1].data,
              borderColor: '#8a7fff',
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.3
            },
            {
              label: '资源使用',
              data: data.datasets[2].data,
              borderColor: '#a89bff',
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.3
            },
            {
              label: '学生互动',
              data: data.datasets[3].data,
              borderColor: '#c6bfff',
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.3
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    },
    
    // 创建个人效率趋势图
    createPersonalEfficiencyChart() {
      const ctx = document.getElementById('personalEfficiencyChart');
      if (!ctx) return;
      
      const data = this.chartData.personalEfficiency;
      
      this.charts.personalEfficiency = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [{
            label: '效率评分',
            data: data.data,
            borderColor: '#6c63ff',
            backgroundColor: 'rgba(108, 99, 255, 0.1)',
            borderWidth: 2,
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              min: 85,
              max: 100,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    },
    
    // 切换图表周期
    changeChartPeriod(period) {
      this.chartPeriod = period;
      
      // 更新使用时长趋势图
      if (this.charts.usageTrend) {
        const data = this.chartData.usageTrend[period];
        this.charts.usageTrend.data.labels = data.labels;
        this.charts.usageTrend.data.datasets[0].data = data.data;
        this.charts.usageTrend.update();
      }
    },
    
    // 刷新数据
    refreshData() {
      this.chartsLoaded = false;
      
      // 模拟数据加载
      setTimeout(() => {
        // 随机更新一些数据
        this.stats.totalUsageHours += Math.floor(Math.random() * 10);
        this.stats.completedTasks += Math.floor(Math.random() * 5);
        
        // 更新图表
        this.chartsLoaded = true;
        
        // 如果图表已初始化，更新数据
        if (this.charts.usageTrend) {
          const periodData = this.chartData.usageTrend[this.chartPeriod];
          const newData = periodData.data.map(value => value * (0.9 + Math.random() * 0.2));
          
          this.charts.usageTrend.data.datasets[0].data = newData;
          this.charts.usageTrend.update();
        }
      }, 1000);
    },
    
    // 导出数据
    exportData(format) {
      alert(`数据已导出为${format.toUpperCase()}格式`);
      
      // 如果是导出图表，特殊处理
      if (format === 'image' && this.charts.usageTrend) {
        const url = this.charts.usageTrend.toBase64Image();
        const link = document.createElement('a');
        link.href = url;
        link.download = '使用时长趋势图.png';
        link.click();
      }
    }
  }
};
</script>

<style scoped>
/* 全局样式 */
.data-stats-module {
  display: flex;
  min-height: 100vh;
  font-family: 'Inter', system-ui, sans-serif;
}

/* 左侧导航栏 */
.sidebar {
  width: 240px;
  background-color: #5a4bcf;
  color: white;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  padding: 0 20px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
}

.logo i {
  font-size: 24px;
  margin-right: 10px;
}

.logo span {
  font-size: 18px;
  font-weight: bold;
}

.nav-menu ul {
  list-style: none;
  padding: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-item.active {
  background-color: rgba(255, 255, 255, 0.2);
  border-left: 4px solid white;
}

.nav-item i {
  font-size: 18px;
  margin-right: 10px;
  width: 24px;
  text-align: center;
}

/* 右侧主内容区 */
.main-content {
  flex: 1;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
}

/* 顶部导航栏 */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.search-box {
  display: flex;
  align-items: center;
  background-color: #f1f3f5;
  border-radius: 4px;
  padding: 8px 15px;
  width: 300px;
}

.search-box i {
  color: #6c757d;
  margin-right: 10px;
}

.search-box input {
  background: none;
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
}

.user-actions {
  display: flex;
  align-items: center;
}

.action-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: #6c757d;
  margin-left: 15px;
  cursor: pointer;
  position: relative;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #e63946;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-profile {
  display: flex;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
}

.user-profile img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.user-info {
  text-align: left;
}

.user-name {
  font-weight: bold;
  font-size: 14px;
}

.user-role {
  font-size: 12px;
  color: #6c757d;
}

/* 内容区域 */
.content-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

/* 页面标题 */
.page-title {
  margin-bottom: 20px;
}

.page-title h1 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.page-title p {
  font-size: 14px;
  color: #6c757d;
}

/* 筛选栏 */
.filter-bar {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.filter-group {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.filter-label {
  font-size: 14px;
  color: #6c757d;
  margin-right: 10px;
}

.filter-select {
  padding: 8px 15px;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  outline: none;
  transition: border-color 0.3s;
}

.filter-select:focus {
  border-color: #6c63ff;
}

.filter-actions {
  margin-left: auto;
}

.refresh-btn {
  background-color: #f8f9ff;
  color: #6c63ff;
  border: 1px solid #6c63ff;
  border-radius: 6px;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}

.refresh-btn i {
  margin-right: 5px;
}

.refresh-btn:hover {
  background-color: #e6e3ff;
}

/* 章节标题 */
.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  padding-left: 5px;
  border-left: 4px solid #6c63ff;
}

/* 数据概览卡片区 */
.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: #f8f9ff;
  border: 1px solid #e6e3ff;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.stat-card .card-body {
  padding: 15px;
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(108, 99, 255, 0.1);
  color: #6c63ff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.stat-icon i {
  font-size: 20px;
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 5px;
}

.stat-value {
  display: flex;
  align-items: baseline;
}

.stat-value span:first-child {
  font-size: 22px;
  font-weight: bold;
  color: #333;
}

.unit {
  font-size: 14px;
  color: #6c757d;
  margin-left: 5px;
}

.stat-trend {
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.stat-trend.positive {
  color: #4cae50;
}

.stat-trend.negative {
  color: #f5222d;
}

.stat-trend i {
  margin-right: 3px;
}

/* 图表模块区 */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.chart-card {
  background-color: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.chart-card.full-width {
  grid-column: span 2;
}

.chart-card .card-header {
  padding: 15px 20px;
  border-bottom: 1px solid #f1f3f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-card .card-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.chart-actions {
  display: flex;
}

.chart-period-btn {
  background: none;
  border: none;
  font-size: 14px;
  color: #6c757d;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 5px;
}

.chart-period-btn.active {
  background-color: #f8f9ff;
  color: #6c63ff;
  font-weight: bold;
}

.chart-card .card-body {
  padding: 20px;
}

.chart-container {
  position: relative;
  width: 100%;
  height: 300px;
}

.chart-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f9ff;
  border-radius: 8px;
}

.chart-skeleton {
  width: 80%;
  height: 60%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 8px;
  margin-bottom: 20px;
}

.chart-info {
  font-size: 14px;
  color: #6c757d;
  text-align: center;
  max-width: 80%;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* 详细统计与比较分析区 */
.details-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.details-card {
  background-color: #f8f9ff;
  border: 1px solid #e6e3ff;
  border-radius: 8px;
  overflow: hidden;
}

.details-card .card-header {
  padding: 15px 20px;
  border-bottom: 1px solid #e6e3ff;
}

.details-card .card-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.details-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #e6e3ff;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 14px;
  color: #6c757d;
}

.detail-value {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

/* 教学效率分析与排名区 */
.efficiency-section {
  margin-bottom: 30px;
}

.efficiency-card {
  background-color: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.efficiency-card .card-body {
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.efficiency-ranking {
  grid-column: 1;
}

.ranking-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.ranking-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ranking-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f1f3f5;
}

.ranking-item:last-child {
  border-bottom: none;
}

.rank {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #f8f9ff;
  color: #6c63ff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  margin-right: 15px;
}

.teacher-info {
  flex: 1;
}

.teacher-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.teacher-department {
  font-size: 12px;
  color: #6c757d;
}

.teacher-score {
  font-size: 14px;
  font-weight: bold;
  color: #6c63ff;
}

.efficiency-chart {
  grid-column: 2;
}

.chart-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.efficiency-progress {
  grid-column: 3;
}

.progress-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.progress-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.progress-item {
  margin-bottom: 15px;
}

.progress-item:last-child {
  margin-bottom: 0;
}

.progress-label {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
}

.progress-bar-container {
  height: 8px;
  background-color: #f1f3f5;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #6c63ff;
  border-radius: 4px;
}

.progress-value {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

/* 底部数据导出区 */
.export-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.export-info p {
  font-size: 14px;
  color: #6c757d;
}

.export-actions {
  display: flex;
  gap: 10px;
}

.export-btn {
  background-color: #f8f9ff;
  color: #6c63ff;
  border: 1px solid #6c63ff;
  border-radius: 6px;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}

.export-btn i {
  margin-right: 5px;
}

.export-btn:hover {
  background-color: #e6e3ff;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .efficiency-card .card-body {
    grid-template-columns: 1fr 1fr;
  }
  
  .efficiency-progress {
    grid-column: span 2;
  }
}

@media (max-width: 992px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-card.full-width {
    grid-column: span 1;
  }
  
  .details-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 80px;
  }
  
  .logo span,
  .nav-item span {
    display: none;
  }
  
  .nav-item {
    justify-content: center;
  }
  
  .nav-item.active {
    border-left: none;
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .filter-bar {
    flex-wrap: wrap;
  }
  
  .filter-group {
    margin-bottom: 10px;
  }
  
  .overview-cards {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .efficiency-card .card-body {
    grid-template-columns: 1fr;
  }
  
  .export-section {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .export-actions {
    margin-top: 10px;
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 576px) {
  .top-nav {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .search-box {
    width: 100%;
    margin-bottom: 10px;
  }
  
  .user-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .overview-cards {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
  
  .stat-value span:first-child {
    font-size: 18px;
  }
  
  .export-actions {
    flex-wrap: wrap;
  }
  
  .export-btn {
    margin-bottom: 10px;
    flex: 1;
    justify-content: center;
  }
}
</style>
