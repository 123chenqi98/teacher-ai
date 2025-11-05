<template>
  <div class="teacher-dashboard">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <div class="logo">
        <i class="fa fa-graduation-cap"></i>
        <span>教师个人中心</span>
      </div>
      <nav class="nav-menu">
        <ul>
          <li class="nav-item active">
            <i class="fa fa-user-circle"></i>
            <span>个人概览</span>
          </li>
          <li class="nav-item">
            <i class="fa fa-id-card"></i>
            <span>基本信息</span>
          </li>
          <li class="nav-item">
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
        <!-- 个人概览卡片 -->
        <div class="card personal-overview">
          <div class="card-header">
            <h2>个人概览</h2>
          </div>
          <div class="card-body">
            <div class="teacher-info">
              <div class="avatar">
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="教师头像">
              </div>
              <div class="info">
                <h3>张三老师</h3>
                <p>数学教师 | 初中部 | 教龄 8 年</p>
              </div>
              <div class="actions">
                <button class="btn edit-btn">编辑资料</button>
                <button class="btn message-btn">查看消息</button>
              </div>
            </div>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-value">24</div>
                <div class="stat-label">教案数</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">36</div>
                <div class="stat-label">收藏数</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">92%</div>
                <div class="stat-label">任务完成率</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">4.8</div>
                <div class="stat-label">教学评分</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 本周数据概览卡片 -->
        <div class="card weekly-stats">
          <div class="card-header">
            <h2>本周数据概览</h2>
          </div>
          <div class="card-body">
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-icon">
                  <i class="fa fa-clock-o"></i>
                </div>
                <div class="stat-value">12.5h</div>
                <div class="stat-label">平台使用时长</div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">
                  <i class="fa fa-check-circle"></i>
                </div>
                <div class="stat-value">15</div>
                <div class="stat-label">完成任务数</div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">
                  <i class="fa fa-file-text"></i>
                </div>
                <div class="stat-value">3</div>
                <div class="stat-label">新建教案数</div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">
                  <i class="fa fa-star"></i>
                </div>
                <div class="stat-value">8</div>
                <div class="stat-label">新增收藏数</div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">
                  <i class="fa fa-download"></i>
                </div>
                <div class="stat-value">22</div>
                <div class="stat-label">下载资源数</div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">
                  <i class="fa fa-reply"></i>
                </div>
                <div class="stat-value">18</div>
                <div class="stat-label">消息回复数</div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">
                  <i class="fa fa-trophy"></i>
                </div>
                <div class="stat-value">5</div>
                <div class="stat-label">目标达成数</div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">
                  <i class="fa fa-pie-chart"></i>
                </div>
                <div class="stat-value">78%</div>
                <div class="stat-label">资源利用率</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 近期操作历史和个性化设置卡片 -->
        <div class="card-row">
          <!-- 近期操作历史卡片 -->
          <div class="card recent-activities">
            <div class="card-header">
              <h2>近期操作历史</h2>
            </div>
            <div class="card-body">
              <ul class="activity-list">
                <li class="activity-item">
                  <div class="activity-icon">
                    <i class="fa fa-file-text-o"></i>
                  </div>
                  <div class="activity-content">
                    <p>创建了新教案《二次函数的应用》</p>
                    <span class="activity-time">2023-07-15 14:30</span>
                  </div>
                </li>
                <li class="activity-item">
                  <div class="activity-icon">
                    <i class="fa fa-star-o"></i>
                  </div>
                  <div class="activity-content">
                    <p>收藏了资源《初中数学公式大全》</p>
                    <span class="activity-time">2023-07-14 09:15</span>
                  </div>
                </li>
                <li class="activity-item">
                  <div class="activity-icon">
                    <i class="fa fa-question-circle-o"></i>
                  </div>
                  <div class="activity-content">
                    <p>添加了新习题《一元二次方程练习题》</p>
                    <span class="activity-time">2023-07-13 16:45</span>
                  </div>
                </li>
                <li class="activity-item">
                  <div class="activity-icon">
                    <i class="fa fa-share"></i>
                  </div>
                  <div class="activity-content">
                    <p>分享了教案《一次函数复习课》</p>
                    <span class="activity-time">2023-07-12 11:20</span>
                  </div>
                </li>
                <li class="activity-item">
                  <div class="activity-icon">
                    <i class="fa fa-download"></i>
                  </div>
                  <div class="activity-content">
                    <p>下载了资源《数学教学PPT模板》</p>
                    <span class="activity-time">2023-07-11 15:50</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- 个性化设置卡片 -->
          <div class="card settings">
            <div class="card-header">
              <h2>个性化设置</h2>
            </div>
            <div class="card-body">
              <div class="setting-item">
                <label class="setting-label">主题切换</label>
                <div class="setting-value">
                  <select class="theme-select">
                    <option value="purple">紫色主题</option>
                    <option value="blue">蓝色主题</option>
                    <option value="green">绿色主题</option>
                    <option value="dark">深色主题</option>
                  </select>
                </div>
              </div>
              <div class="setting-item">
                <label class="setting-label">语言选择</label>
                <div class="setting-value">
                  <select class="language-select">
                    <option value="zh-CN">简体中文</option>
                    <option value="en-US">English</option>
                  </select>
                </div>
              </div>
              <div class="setting-item">
                <label class="setting-label">通知权限</label>
                <div class="setting-value">
                  <div class="permission-group">
                    <label class="permission-item">
                      <input type="checkbox" checked>
                      <span>系统通知</span>
                    </label>
                    <label class="permission-item">
                      <input type="checkbox" checked>
                      <span>消息提醒</span>
                    </label>
                    <label class="permission-item">
                      <input type="checkbox">
                      <span>营销推送</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="setting-item">
                <label class="setting-label">界面布局</label>
                <div class="setting-value">
                  <label class="layout-option">
                    <input type="radio" name="layout" checked>
                    <span>卡片式</span>
                  </label>
                  <label class="layout-option">
                    <input type="radio" name="layout">
                    <span>列表式</span>
                  </label>
                </div>
              </div>
              <div class="setting-item">
                <label class="setting-label">数据同步</label>
                <div class="setting-value">
                  <button class="sync-btn">
                    <i class="fa fa-refresh"></i>
                    <span>立即同步</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 我的收藏概览和本月平台使用趋势卡片 -->
        <div class="card-row">
          <!-- 我的收藏概览卡片 -->
          <div class="card favorites">
            <div class="card-header">
              <h2>我的收藏概览</h2>
            </div>
            <div class="card-body">
              <div class="favorites-summary">
                <div class="favorite-item">
                  <div class="favorite-icon">
                    <i class="fa fa-file-text-o"></i>
                  </div>
                  <div class="favorite-count">
                    <div class="count">12</div>
                    <div class="label">收藏教案</div>
                  </div>
                </div>
                <div class="favorite-item">
                  <div class="favorite-icon">
                    <i class="fa fa-folder-open-o"></i>
                  </div>
                  <div class="favorite-count">
                    <div class="count">18</div>
                    <div class="label">收藏资源</div>
                  </div>
                </div>
                <div class="favorite-item">
                  <div class="favorite-icon">
                    <i class="fa fa-question-circle-o"></i>
                  </div>
                  <div class="favorite-count">
                    <div class="count">6</div>
                    <div class="label">收藏习题</div>
                  </div>
                </div>
              </div>
              <div class="recent-favorites">
                <h3>最近收藏</h3>
                <ul class="favorites-list">
                  <li class="favorite-entry">
                    <i class="fa fa-file-text-o"></i>
                    <span>《一次函数复习教案》</span>
                  </li>
                  <li class="favorite-entry">
                    <i class="fa fa-folder-open-o"></i>
                    <span>《初中数学公式大全》</span>
                  </li>
                  <li class="favorite-entry">
                    <i class="fa fa-question-circle-o"></i>
                    <span>《几何证明题精选》</span>
                  </li>
                </ul>
                <button class="view-all-btn">查看全部</button>
              </div>
            </div>
          </div>

          <!-- 本月平台使用趋势卡片 -->
          <div class="card usage-trend">
            <div class="card-header">
              <h2>本月平台使用趋势</h2>
            </div>
            <div class="card-body">
              <div class="chart-container">
                <canvas id="usageChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- 待办任务卡片 -->
        <div class="card tasks">
          <div class="card-header">
            <h2>待办任务</h2>
            <button class="add-task-btn">
              <i class="fa fa-plus"></i>
              <span>添加任务</span>
            </button>
          </div>
          <div class="card-body">
            <ul class="task-list">
              <li class="task-item">
                <div class="task-priority urgent">
                  <span>紧急</span>
                </div>
                <div class="task-content">
                  <h4>完成期中考试命题工作</h4>
                  <p>准备初二(3)班数学期中考试试卷</p>
                  <div class="task-meta">
                    <span class="task-date">截止日期: 2023-07-20</span>
                    <span class="task-status">待办</span>
                  </div>
                </div>
                <div class="task-actions">
                  <button class="action-btn edit-task">
                    <i class="fa fa-pencil"></i>
                  </button>
                  <button class="action-btn complete-task">
                    <i class="fa fa-check"></i>
                  </button>
                </div>
              </li>
              <li class="task-item">
                <div class="task-priority normal">
                  <span>待办</span>
                </div>
                <div class="task-content">
                  <h4>批改上周作业</h4>
                  <p>批改初二(1)班和(2)班的数学作业</p>
                  <div class="task-meta">
                    <span class="task-date">截止日期: 2023-07-18</span>
                    <span class="task-status">待办</span>
                  </div>
                </div>
                <div class="task-actions">
                  <button class="action-btn edit-task">
                    <i class="fa fa-pencil"></i>
                  </button>
                  <button class="action-btn complete-task">
                    <i class="fa fa-check"></i>
                  </button>
                </div>
              </li>
              <li class="task-item">
                <div class="task-priority normal">
                  <span>待办</span>
                </div>
                <div class="task-content">
                  <h4>准备公开课教案</h4>
                  <p>准备《勾股定理》公开课的教案和PPT</p>
                  <div class="task-meta">
                    <span class="task-date">截止日期: 2023-07-25</span>
                    <span class="task-status">待办</span>
                  </div>
                </div>
                <div class="task-actions">
                  <button class="action-btn edit-task">
                    <i class="fa fa-pencil"></i>
                  </button>
                  <button class="action-btn complete-task">
                    <i class="fa fa-check"></i>
                  </button>
                </div>
              </li>
              <li class="task-item completed">
                <div class="task-priority low">
                  <span>已完成</span>
                </div>
                <div class="task-content">
                  <h4>参加教学研讨会</h4>
                  <p>参加学校组织的数学教学方法研讨会</p>
                  <div class="task-meta">
                    <span class="task-date">完成日期: 2023-07-15</span>
                    <span class="task-status">已完成</span>
                  </div>
                </div>
                <div class="task-actions">
                  <button class="action-btn view-task">
                    <i class="fa fa-eye"></i>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { Chart } from 'chart.js';

export default {
  name: 'TeacherDashboard',
  mounted() {
    // 初始化使用趋势图表
    this.initUsageChart();
  },
  methods: {
    initUsageChart() {
      const ctx = document.getElementById('usageChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日'],
          datasets: [{
            label: '使用时长(小时)',
            data: [2.5, 1.8, 3.2, 2.0, 2.8, 3.5, 1.5, 2.2, 2.8, 3.0, 2.5, 1.8, 2.2, 2.8],
            backgroundColor: 'rgba(108, 99, 255, 0.6)',
            borderColor: 'rgba(108, 99, 255, 1)',
            borderWidth: 1,
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 4,
              ticks: {
                stepSize: 1
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
/* 全局样式 */
.teacher-dashboard {
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

/* 卡片样式 */
.card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  overflow: hidden;
}

.card-header {
  padding: 15px 20px;
  border-bottom: 1px solid #f1f3f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.card-body {
  padding: 20px;
}

/* 卡片行布局 */
.card-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.card-row .card {
  flex: 1;
  margin-bottom: 0;
}

/* 个人概览卡片 */
.teacher-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}

.info p {
  color: #6c757d;
}

.actions {
  margin-left: auto;
}

.btn {
  padding: 8px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.edit-btn {
  background-color: #6c63ff;
  color: white;
  border: none;
  margin-right: 10px;
}

.edit-btn:hover {
  background-color: #5a4bcf;
}

.message-btn {
  background-color: white;
  color: #6c63ff;
  border: 1px solid #6c63ff;
}

.message-btn:hover {
  background-color: #f1f3f5;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
}

.stat-item {
  text-align: center;
  padding: 15px;
  background-color: #f8f9ff;
  border-radius: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #6c63ff;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #6c757d;
}

/* 本周数据概览卡片 */
.weekly-stats .stats-grid {
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
}

.weekly-stats .stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e6e3ff;
  color: #6c63ff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.stat-icon i {
  font-size: 18px;
}

/* 近期操作历史卡片 */
.activity-list {
  list-style: none;
  padding: 0;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  border-bottom: 1px solid #f1f3f5;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e6e3ff;
  color: #6c63ff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
}

.activity-content p {
  margin: 0 0 5px;
  font-size: 14px;
}

.activity-time {
  font-size: 12px;
  color: #6c757d;
}

/* 个性化设置卡片 */
.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f3f5;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-label {
  font-size: 14px;
  color: #333;
}

.setting-value {
  display: flex;
  align-items: center;
}

.theme-select, .language-select {
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  font-size: 14px;
}

.permission-group {
  display: flex;
  gap: 15px;
}

.permission-item {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.permission-item input {
  margin-right: 5px;
}

.layout-option {
  display: flex;
  align-items: center;
  margin-left: 15px;
  font-size: 14px;
}

.layout-option:first-child {
  margin-left: 0;
}

.layout-option input {
  margin-right: 5px;
}

.sync-btn {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  background-color: #6c63ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.sync-btn i {
  margin-right: 5px;
}

/* 我的收藏概览卡片 */
.favorites-summary {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f1f3f5;
}

.favorite-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.favorite-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e6e3ff;
  color: #6c63ff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.favorite-count .count {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.favorite-count .label {
  font-size: 14px;
  color: #6c757d;
}

.recent-favorites h3 {
  font-size: 16px;
  margin-bottom: 15px;
}

.favorites-list {
  list-style: none;
  padding: 0;
  margin-bottom: 15px;
}

.favorite-entry {
  display: flex;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;
}

.favorite-entry i {
  color: #6c63ff;
  margin-right: 10px;
}

.view-all-btn {
  display: block;
  width: 100%;
  padding: 8px;
  background-color: #f8f9ff;
  color: #6c63ff;
  border: 1px solid #e6e3ff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
}

/* 本月平台使用趋势卡片 */
.chart-container {
  width: 100%;
  height: 250px;
}

/* 待办任务卡片 */
.add-task-btn {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  background-color: #6c63ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.add-task-btn i {
  margin-right: 5px;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  border-radius: 8px;
  background-color: #f8f9ff;
  margin-bottom: 10px;
}

.task-item.completed {
  background-color: #f8f9fa;
  opacity: 0.8;
}

.task-priority {
  padding: 3px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  margin-right: 15px;
  flex-shrink: 0;
}

.task-priority.urgent {
  background-color: #fff1f0;
  color: #f5222d;
}

.task-priority.normal {
  background-color: #fff7e6;
  color: #faad14;
}

.task-priority.low {
  background-color: #f0f9ff;
  color: #1890ff;
}

.task-content {
  flex: 1;
}

.task-content h4 {
  margin: 0 0 5px;
  font-size: 16px;
}

.task-content p {
  margin: 0 0 10px;
  font-size: 14px;
  color: #6c757d;
}

.task-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6c757d;
}

.task-status {
  font-weight: bold;
}

.task-actions {
  display: flex;
  gap: 10px;
  margin-left: 15px;
}

.task-actions .action-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: white;
  color: #6c757d;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  border: 1px solid #e9ecef;
}

.task-actions .action-btn:hover {
  background-color: #f1f3f5;
}

.task-actions .complete-task {
  color: #4caf50;
}

.task-actions .view-task {
  color: #6c63ff;
}
</style>
