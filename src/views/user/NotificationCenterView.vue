<template>
  <div class="notification-center-v2">
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
          <li class="nav-item">
            <i class="fa fa-bar-chart"></i>
            <span>数据统计</span>
          </li>
          <li class="nav-item">
            <i class="fa fa-bullseye"></i>
            <span>目标管理</span>
          </li>
          <li class="nav-item active">
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
        <!-- 标题与标签页 -->
        <div class="page-header">
          <div class="page-title">
            <h1>通知中心</h1>
            <p>查看和管理您的系统通知</p>
          </div>
          <div class="tab-navigation">
            <ul class="tabs">
              <li class="tab-item active" :class="{ 'active': currentTab === 'all' }" @click="switchTab('all')">
                <span>全部</span>
                <div class="tab-indicator"></div>
              </li>
              <li class="tab-item" :class="{ 'active': currentTab === 'unread' }" @click="switchTab('unread')">
                <span>未读</span>
                <div class="tab-indicator"></div>
              </li>
              <li class="tab-item" :class="{ 'active': currentTab === 'system' }" @click="switchTab('system')">
                <span>系统通知</span>
                <div class="tab-indicator"></div>
              </li>
              <li class="tab-item" :class="{ 'active': currentTab === 'important' }" @click="switchTab('important')">
                <span>重要提醒</span>
                <div class="tab-indicator"></div>
              </li>
              <li class="tab-item" :class="{ 'active': currentTab === 'success' }" @click="switchTab('success')">
                <span>成功通知</span>
                <div class="tab-indicator"></div>
              </li>
              <li class="tab-item" :class="{ 'active': currentTab === 'error' }" @click="switchTab('error')">
                <span>错误提醒</span>
                <div class="tab-indicator"></div>
              </li>
            </ul>
          </div>
        </div>

        <!-- 操作栏 -->
        <div class="action-bar">
          <div class="batch-actions">
            <label class="select-all">
              <input type="checkbox" v-model="selectAll" @change="toggleSelectAll">
              <span>全选</span>
            </label>
            <button class="btn secondary-btn mark-read-btn" @click="markSelectedAsRead">
              <i class="fa fa-check"></i>
              <span>标记为已读</span>
            </button>
            <button class="btn secondary-btn delete-selected-btn" @click="deleteSelectedNotifications">
              <i class="fa fa-trash"></i>
              <span>删除选中</span>
            </button>
            <button class="btn secondary-btn clear-all-btn" @click="clearAllNotifications">
              <i class="fa fa-trash-o"></i>
              <span>清空全部</span>
            </button>
          </div>
          <div class="export-actions">
            <button class="btn primary-btn export-btn">
              <i class="fa fa-download"></i>
              <span>导出通知记录</span>
            </button>
          </div>
        </div>

        <!-- 通知列表区域 -->
        <div class="notifications-list">
          <!-- 通知项 1 - 系统通知 -->
          <div class="notification-item" :class="{ 'unread': !notifications[0].read }">
            <div class="notification-icon system">
              <i class="fa fa-info-circle"></i>
            </div>
            <div class="notification-content">
              <div class="notification-header">
                <div class="notification-title">系统维护通知</div>
                <div class="notification-meta">
                  <span class="notification-sender">系统管理员</span>
                  <span class="notification-time">2 小时前</span>
                </div>
              </div>
              <div class="notification-text">
                系统将于今晚22:00-次日02:00进行例行维护，期间平台部分功能可能无法正常使用，请提前做好工作安排。维护期间如有紧急问题，请联系技术支持。
              </div>
            </div>
            <div class="notification-checkbox">
              <input type="checkbox" v-model="notifications[0].selected">
            </div>
          </div>

          <!-- 通知项 2 - 重要提醒 -->
          <div class="notification-item" :class="{ 'unread': !notifications[1].read }">
            <div class="notification-icon important">
              <i class="fa fa-exclamation-triangle"></i>
            </div>
            <div class="notification-content">
              <div class="notification-header">
                <div class="notification-title">教案审核即将截止</div>
                <div class="notification-meta">
                  <span class="notification-sender">教学管理部</span>
                  <span class="notification-time">5 小时前</span>
                </div>
              </div>
              <div class="notification-text">
                您提交的教案《一元二次方程的解法与应用》审核将于3天后截止，请及时完善教案内容并提交最终版本。如有疑问，请联系审核老师。
              </div>
            </div>
            <div class="notification-checkbox">
              <input type="checkbox" v-model="notifications[1].selected">
            </div>
          </div>

          <!-- 通知项 3 - 成功通知 -->
          <div class="notification-item" :class="{ 'unread': !notifications[2].read }">
            <div class="notification-icon success">
              <i class="fa fa-check-circle"></i>
            </div>
            <div class="notification-content">
              <div class="notification-header">
                <div class="notification-title">教案发布成功</div>
                <div class="notification-meta">
                  <span class="notification-sender">系统管理员</span>
                  <span class="notification-time">昨天</span>
                </div>
              </div>
              <div class="notification-text">
                您的教案《平行四边形的性质与判定》已成功通过审核并发布，其他教师可以查看和使用您的教案。感谢您的分享！
              </div>
            </div>
            <div class="notification-checkbox">
              <input type="checkbox" v-model="notifications[2].selected">
            </div>
          </div>

          <!-- 通知项 4 - 系统通知 -->
          <div class="notification-item" :class="{ 'unread': !notifications[3].read }">
            <div class="notification-icon system">
              <i class="fa fa-info-circle"></i>
            </div>
            <div class="notification-content">
              <div class="notification-header">
                <div class="notification-title">平台功能更新</div>
                <div class="notification-meta">
                  <span class="notification-sender">系统管理员</span>
                  <span class="notification-time">昨天</span>
                </div>
              </div>
              <div class="notification-text">
                平台已更新新版本，新增了教案协作编辑、学生作业自动批改等功能。请查看更新日志了解详细信息，如有任何问题，请联系技术支持。
              </div>
            </div>
            <div class="notification-checkbox">
              <input type="checkbox" v-model="notifications[3].selected">
            </div>
          </div>

          <!-- 通知项 5 - 错误提醒 -->
          <div class="notification-item" :class="{ 'unread': !notifications[4].read }">
            <div class="notification-icon error">
              <i class="fa fa-exclamation-circle"></i>
            </div>
            <div class="notification-content">
              <div class="notification-header">
                <div class="notification-title">教案提交失败</div>
                <div class="notification-meta">
                  <span class="notification-sender">系统管理员</span>
                  <span class="notification-time">2 天前</span>
                </div>
              </div>
              <div class="notification-text">
                您的教案《三角函数的基本概念》提交失败，请检查以下问题：1. 文件格式不符合要求；2. 教案内容超过最大限制。请修改后重新提交。
              </div>
            </div>
            <div class="notification-checkbox">
              <input type="checkbox" v-model="notifications[4].selected">
            </div>
          </div>

          <!-- 通知项 6 - 重要提醒 -->
          <div class="notification-item" :class="{ 'unread': !notifications[5].read }">
            <div class="notification-icon important">
              <i class="fa fa-exclamation-triangle"></i>
            </div>
            <div class="notification-content">
              <div class="notification-header">
                <div class="notification-title">教学研讨会提醒</div>
                <div class="notification-meta">
                  <span class="notification-sender">教学管理部</span>
                  <span class="notification-time">3 天前</span>
                </div>
              </div>
              <div class="notification-text">
                提醒您参加本周五下午2:00在教师会议室举行的教学研讨会，主题为"如何提高数学课堂互动性"。请提前准备相关案例和建议。
              </div>
            </div>
            <div class="notification-checkbox">
              <input type="checkbox" v-model="notifications[5].selected">
            </div>
          </div>
        </div>

        <!-- 通知设置区域 -->
        <div class="notification-settings">
          <h2 class="settings-title">通知设置</h2>
          <div class="settings-list">
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-name">系统通知</div>
                <div class="setting-description">接收平台系统更新、维护等重要通知</div>
              </div>
              <div class="setting-toggle">
                <label class="toggle-switch">
                  <input type="checkbox" v-model="settings.systemNotification">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-name">重要提醒</div>
                <div class="setting-description">接收教案审核、会议等重要事项提醒</div>
              </div>
              <div class="setting-toggle">
                <label class="toggle-switch">
                  <input type="checkbox" v-model="settings.importantNotification">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-name">成功通知</div>
                <div class="setting-description">接收操作成功的反馈通知</div>
              </div>
              <div class="setting-toggle">
                <label class="toggle-switch">
                  <input type="checkbox" v-model="settings.successNotification">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-name">错误提醒</div>
                <div class="setting-description">接收操作失败或异常的提醒</div>
              </div>
              <div class="setting-toggle">
                <label class="toggle-switch">
                  <input type="checkbox" v-model="settings.errorNotification">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-name">邮件通知</div>
                <div class="setting-description">同时通过邮件接收重要通知</div>
              </div>
              <div class="setting-toggle">
                <label class="toggle-switch">
                  <input type="checkbox" v-model="settings.emailNotification">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
            <div class="setting-item">
              <div class="setting-info">
                <div class="setting-name">通知自动删除</div>
                <div class="setting-description">30天后自动删除已读通知</div>
              </div>
              <div class="setting-toggle">
                <label class="toggle-switch">
                  <input type="checkbox" v-model="settings.autoDelete">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'NotificationCenterV2',
  data() {
    return {
      currentTab: 'all',
      selectAll: false,
      notifications: [
        {
          id: 1,
          type: 'system',
          title: '系统维护通知',
          content: '系统将于今晚22:00-次日02:00进行例行维护，期间平台部分功能可能无法正常使用，请提前做好工作安排。维护期间如有紧急问题，请联系技术支持。',
          sender: '系统管理员',
          time: '2 小时前',
          read: false,
          selected: false
        },
        {
          id: 2,
          type: 'important',
          title: '教案审核即将截止',
          content: '您提交的教案《一元二次方程的解法与应用》审核将于3天后截止，请及时完善教案内容并提交最终版本。如有疑问，请联系审核老师。',
          sender: '教学管理部',
          time: '5 小时前',
          read: false,
          selected: false
        },
        {
          id: 3,
          type: 'success',
          title: '教案发布成功',
          content: '您的教案《平行四边形的性质与判定》已成功通过审核并发布，其他教师可以查看和使用您的教案。感谢您的分享！',
          sender: '系统管理员',
          time: '昨天',
          read: true,
          selected: false
        },
        {
          id: 4,
          type: 'system',
          title: '平台功能更新',
          content: '平台已更新新版本，新增了教案协作编辑、学生作业自动批改等功能。请查看更新日志了解详细信息，如有任何问题，请联系技术支持。',
          sender: '系统管理员',
          time: '昨天',
          read: true,
          selected: false
        },
        {
          id: 5,
          type: 'error',
          title: '教案提交失败',
          content: '您的教案《三角函数的基本概念》提交失败，请检查以下问题：1. 文件格式不符合要求；2. 教案内容超过最大限制。请修改后重新提交。',
          sender: '系统管理员',
          time: '2 天前',
          read: true,
          selected: false
        },
        {
          id: 6,
          type: 'important',
          title: '教学研讨会提醒',
          content: '提醒您参加本周五下午2:00在教师会议室举行的教学研讨会，主题为"如何提高数学课堂互动性"。请提前准备相关案例和建议。',
          sender: '教学管理部',
          time: '3 天前',
          read: true,
          selected: false
        }
      ],
      settings: {
        systemNotification: true,
        importantNotification: true,
        successNotification: true,
        errorNotification: true,
        emailNotification: true,
        autoDelete: true
      }
    };
  },
  methods: {
    switchTab(tab) {
      this.currentTab = tab;
    },
    toggleSelectAll() {
      this.notifications.forEach(notification => {
        notification.selected = this.selectAll;
      });
    },
    markSelectedAsRead() {
      this.notifications.forEach(notification => {
        if (notification.selected) {
          notification.read = true;
        }
      });
      this.selectAll = false;
    },
    deleteSelectedNotifications() {
      this.notifications = this.notifications.filter(notification => !notification.selected);
      this.selectAll = false;
    },
    clearAllNotifications() {
      if (confirm('确定要清空所有通知吗？')) {
        this.notifications = [];
        this.selectAll = false;
      }
    }
  },
  computed: {
    filteredNotifications() {
      if (this.currentTab === 'all') {
        return this.notifications;
      } else if (this.currentTab === 'unread') {
        return this.notifications.filter(notification => !notification.read);
      } else {
        return this.notifications.filter(notification => notification.type === this.currentTab);
      }
    }
  },
  watch: {
    notifications: {
      deep: true,
      handler() {
        // 检查是否所有通知都被选中
        this.selectAll = this.notifications.length > 0 && this.notifications.every(notification => notification.selected);
      }
    }
  }
};
</script>

<!--<style scoped>-->
<!--/* 基础样式 */-->
<!--.notification-center-v2 {-->
<!--  display: flex;-->
<!--  min-height: 100vh;-->
<!--}-->

<!--/* 左侧导航栏样式 */-->
<!--.sidebar {-->
<!--  width: 240px;-->
<!--  background-color: #5a2ca0;-->
<!--  color: white;-->
<!--  padding: 20px 0;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--}-->

<!--.logo {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  padding: 0 20px 20px;-->
<!--  border-bottom: 1px solid rgba(255, 255, 255, 0.1);-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.logo i {-->
<!--  font-size: 24px;-->
<!--  margin-right: 10px;-->
<!--}-->

<!--.logo span {-->
<!--  font-size: 18px;-->
<!--  font-weight: bold;-->
<!--}-->

<!--.nav-menu ul {-->
<!--  list-style: none;-->
<!--  padding: 0;-->
<!--  margin: 0;-->
<!--}-->

<!--.nav-item {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  padding: 12px 20px;-->
<!--  cursor: pointer;-->
<!--  transition: background-color 0.3s;-->
<!--}-->

<!--.nav-item:hover {-->
<!--  background-color: rgba(255, 255, 255, 0.1);-->
<!--}-->

<!--.nav-item.active {-->
<!--  background-color: rgba(255, 255, 255, 0.2);-->
<!--  border-left: 4px solid white;-->
<!--}-->

<!--.nav-item i {-->
<!--  font-size: 18px;-->
<!--  margin-right: 10px;-->
<!--  width: 20px;-->
<!--  text-align: center;-->
<!--}-->

<!--.nav-item span {-->
<!--  font-size: 14px;-->
<!--}-->

<!--/* 右侧主内容区样式 */-->
<!--.main-content {-->
<!--  flex: 1;-->
<!--  background-color: #f5f7fa;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--}-->



<!--.search-box {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  background-color: #f5f7fa;-->
<!--  border-radius: 20px;-->
<!--  padding: 0 15px;-->
<!--  width: 300px;-->
<!--}-->

<!--.search-box i {-->
<!--  color: #999;-->
<!--  margin-right: 10px;-->
<!--}-->

<!--.search-box input {-->
<!--  border: none;-->
<!--  background: transparent;-->
<!--  outline: none;-->
<!--  flex: 1;-->
<!--  height: 36px;-->
<!--}-->

<!--.user-actions {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--}-->

<!--.action-btn {-->
<!--  background: none;-->
<!--  border: none;-->
<!--  color: #666;-->
<!--  font-size: 18px;-->
<!--  margin-left: 15px;-->
<!--  cursor: pointer;-->
<!--  position: relative;-->
<!--}-->

<!--.badge {-->
<!--  position: absolute;-->
<!--  top: -5px;-->
<!--  right: -5px;-->
<!--  background-color: #f5222d;-->
<!--  color: white;-->
<!--  border-radius: 50%;-->
<!--  width: 18px;-->
<!--  height: 18px;-->
<!--  font-size: 12px;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--}-->

<!--.user-profile {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  margin-left: 20px;-->
<!--}-->

<!--.user-profile img {-->
<!--  width: 36px;-->
<!--  height: 36px;-->
<!--  border-radius: 50%;-->
<!--  object-fit: cover;-->
<!--  margin-right: 10px;-->
<!--}-->

<!--.user-info {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--}-->

<!--.user-name {-->
<!--  font-size: 14px;-->
<!--  font-weight: bold;-->
<!--  color: #333;-->
<!--}-->

<!--.user-role {-->
<!--  font-size: 12px;-->
<!--  color: #999;-->
<!--}-->

<!--/* 内容区域样式 */-->
<!--.content-area {-->
<!--  flex: 1;-->
<!--  padding: 20px;-->
<!--  overflow-y: auto;-->
<!--}-->

<!--/* 页面标题与标签页样式 */-->
<!--.page-header {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: flex-end;-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.page-title h1 {-->
<!--  font-size: 24px;-->
<!--  font-weight: bold;-->
<!--  color: #333;-->
<!--  margin-bottom: 5px;-->
<!--}-->

<!--.page-title p {-->
<!--  font-size: 14px;-->
<!--  color: #666;-->
<!--}-->

<!--.tab-navigation {-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.tabs {-->
<!--  display: flex;-->
<!--  list-style: none;-->
<!--  padding: 0;-->
<!--  margin: 0;-->
<!--}-->

<!--.tab-item {-->
<!--  margin-left: 20px;-->
<!--  position: relative;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.tab-item:first-child {-->
<!--  margin-left: 0;-->
<!--}-->

<!--.tab-item span {-->
<!--  font-size: 14px;-->
<!--  color: #666;-->
<!--  padding: 10px 0;-->
<!--  display: inline-block;-->
<!--}-->

<!--.tab-item.active span {-->
<!--  color: #5a2ca0;-->
<!--  font-weight: bold;-->
<!--}-->

<!--.tab-indicator {-->
<!--  position: absolute;-->
<!--  bottom: 0;-->
<!--  left: 0;-->
<!--  width: 100%;-->
<!--  height: 2px;-->
<!--  background-color: #5a2ca0;-->
<!--  transform: scaleX(0);-->
<!--  transition: transform 0.3s;-->
<!--}-->

<!--.tab-item.active .tab-indicator {-->
<!--  transform: scaleX(1);-->
<!--}-->

<!--/* 操作栏样式 */-->
<!--.action-bar {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  margin-bottom: 20px;-->
<!--  background-color: white;-->
<!--  padding: 15px;-->
<!--  border-radius: 8px;-->
<!--  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);-->
<!--}-->

<!--.batch-actions {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--}-->

<!--.select-all {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  margin-right: 15px;-->
<!--  font-size: 14px;-->
<!--  color: #666;-->
<!--}-->

<!--.select-all input {-->
<!--  margin-right: 5px;-->
<!--}-->

<!--.export-actions {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--}-->

<!--/* 按钮样式 */-->
<!--.btn {-->
<!--  padding: 8px 15px;-->
<!--  border-radius: 4px;-->
<!--  font-size: 14px;-->
<!--  font-weight: 500;-->
<!--  cursor: pointer;-->
<!--  transition: all 0.3s;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--}-->

<!--.btn i {-->
<!--  margin-right: 5px;-->
<!--}-->

<!--.primary-btn {-->
<!--  background-color: #5a2ca0;-->
<!--  color: white;-->
<!--  border: none;-->
<!--}-->

<!--.primary-btn:hover {-->
<!--  background-color: #4a2486;-->
<!--}-->

<!--.secondary-btn {-->
<!--  background-color: #f5f7fa;-->
<!--  color: #666;-->
<!--  border: 1px solid #ddd;-->
<!--  margin-right: 10px;-->
<!--}-->

<!--.secondary-btn:hover {-->
<!--  background-color: #eee;-->
<!--}-->

<!--.mark-read-btn {-->
<!--  margin-right: 10px;-->
<!--}-->

<!--.delete-selected-btn {-->
<!--  margin-right: 10px;-->
<!--}-->

<!--/* 通知列表区域样式 */-->
<!--.notifications-list {-->
<!--  background-color: white;-->
<!--  border-radius: 8px;-->
<!--  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);-->
<!--  overflow: hidden;-->
<!--  margin-bottom: 30px;-->
<!--}-->

<!--.notification-item {-->
<!--  display: flex;-->
<!--  align-items: flex-start;-->
<!--  padding: 15px;-->
<!--  border-bottom: 1px solid #f5f7fa;-->
<!--  transition: background-color 0.3s;-->
<!--}-->

<!--.notification-item:hover {-->
<!--  background-color: #f9f9f9;-->
<!--}-->

<!--.notification-item.unread {-->
<!--  background-color: #f9f0ff;-->
<!--  border-left: 3px solid #5a2ca0;-->
<!--}-->

<!--.notification-icon {-->
<!--  width: 40px;-->
<!--  height: 40px;-->
<!--  border-radius: 50%;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  margin-right: 15px;-->
<!--  flex-shrink: 0;-->
<!--}-->

<!--.notification-icon.system {-->
<!--  background-color: #1890ff;-->
<!--  color: white;-->
<!--}-->

<!--.notification-icon.important {-->
<!--  background-color: #fa8c16;-->
<!--  color: white;-->
<!--}-->

<!--.notification-icon.success {-->
<!--  background-color: #52c41a;-->
<!--  color: white;-->
<!--}-->

<!--.notification-icon.error {-->
<!--  background-color: #f5222d;-->
<!--  color: white;-->
<!--}-->

<!--.notification-content {-->
<!--  flex: 1;-->
<!--  min-width: 0;-->
<!--}-->

<!--.notification-header {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: flex-start;-->
<!--  margin-bottom: 5px;-->
<!--}-->

<!--.notification-title {-->
<!--  font-size: 16px;-->
<!--  font-weight: bold;-->
<!--  color: #333;-->
<!--  margin-right: 10px;-->
<!--}-->

<!--.notification-meta {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  align-items: flex-end;-->
<!--}-->

<!--.notification-sender {-->
<!--  font-size: 12px;-->
<!--  color: #999;-->
<!--  margin-bottom: 2px;-->
<!--}-->

<!--.notification-time {-->
<!--  font-size: 12px;-->
<!--  color: #999;-->
<!--}-->

<!--.notification-text {-->
<!--  font-size: 14px;-->
<!--  color: #666;-->
<!--  line-height: 1.5;-->
<!--}-->

<!--.notification-checkbox {-->
<!--  display: flex;-->
<!--  align-items: flex-start;-->
<!--  margin-left: 15px;-->
<!--  padding-top: 3px;-->
<!--}-->

<!--.notification-checkbox input {-->
<!--  width: 16px;-->
<!--  height: 16px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--/* 通知设置区域样式 */-->
<!--.notification-settings {-->
<!--  background-color: white;-->
<!--  border-radius: 8px;-->
<!--  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);-->
<!--  padding: 20px;-->
<!--}-->

<!--.settings-title {-->
<!--  font-size: 18px;-->
<!--  font-weight: bold;-->
<!--  color: #333;-->
<!--  margin-bottom: 15px;-->
<!--}-->

<!--.settings-list {-->
<!--  display: grid;-->
<!--  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));-->
<!--  gap: 15px;-->
<!--}-->

<!--.setting-item {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  padding: 15px;-->
<!--  border-bottom: 1px solid #f5f7fa;-->
<!--}-->

<!--.setting-item:last-child {-->
<!--  border-bottom: none;-->
<!--}-->

<!--.setting-info {-->
<!--  flex: 1;-->
<!--}-->

<!--.setting-name {-->
<!--  font-size: 14px;-->
<!--  font-weight: 500;-->
<!--  color: #333;-->
<!--  margin-bottom: 5px;-->
<!--}-->

<!--.setting-description {-->
<!--  font-size: 12px;-->
<!--  color: #666;-->
<!--}-->

<!--.setting-toggle {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--}-->

<!--/* 开关样式 */-->
<!--.toggle-switch {-->
<!--  position: relative;-->
<!--  display: inline-block;-->
<!--  width: 48px;-->
<!--  height: 24px;-->
<!--}-->

<!--.toggle-switch input {-->
<!--  opacity: 0;-->
<!--  width: 0;-->
<!--  height: 0;-->
<!--}-->

<!--.toggle-slider {-->
<!--  position: absolute;-->
<!--  cursor: pointer;-->
<!--  top: 0;-->
<!--  left: 0;-->
<!--  right: 0;-->
<!--  bottom: 0;-->
<!--  background-color: #ccc;-->
<!--  transition: .4s;-->
<!--  border-radius: 24px;-->
<!--}-->

<!--.toggle-slider:before {-->
<!--  position: absolute;-->
<!--  content: "";-->
<!--  height: 18px;-->
<!--  width: 18px;-->
<!--  left: 3px;-->
<!--  bottom: 3px;-->
<!--  background-color: white;-->
<!--  transition: .4s;-->
<!--  border-radius: 50%;-->
<!--}-->

<!--input:checked + .toggle-slider {-->
<!--  background-color: #5a2ca0;-->
<!--}-->

<!--input:checked + .toggle-slider:before {-->
<!--  transform: translateX(24px);-->
<!--}-->
<!--</style>-->
