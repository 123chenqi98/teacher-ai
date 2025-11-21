<template>
  <div class="message-center-v2">
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
          <li class="nav-item active">
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
          <h1>消息中心</h1>
        </div>

        <!-- 顶部数据概览卡片区 -->
        <div class="stats-cards-grid">
          <div class="stat-card">
            <div class="stat-value">28</div>
            <div class="stat-label">私信对话</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">15</div>
            <div class="stat-label">未读消息</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">42</div>
            <div class="stat-label">评论回复</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">8</div>
            <div class="stat-label">@我的消息</div>
          </div>
        </div>

        <!-- 标签页与搜索区 -->
        <div class="tabs-search-bar">
          <div class="tab-navigation">
            <ul class="tabs">
              <li class="tab-item active" :class="{ 'active': currentTab === 'all' }" @click="switchTab('all')">
                <span>全部消息</span>
                <div class="tab-indicator"></div>
              </li>
              <li class="tab-item" :class="{ 'active': currentTab === 'private' }" @click="switchTab('private')">
                <span>私信对话</span>
                <div class="tab-indicator"></div>
              </li>
              <li class="tab-item" :class="{ 'active': currentTab === 'comment' }" @click="switchTab('comment')">
                <span>评论回复</span>
                <div class="tab-indicator"></div>
              </li>
              <li class="tab-item" :class="{ 'active': currentTab === 'mention' }" @click="switchTab('mention')">
                <span>@我的消息</span>
                <div class="tab-indicator"></div>
              </li>
            </ul>
          </div>
          <div class="search-actions">
            <div class="search-container">
              <i class="fa fa-search search-icon"></i>
              <input type="text" placeholder="搜索消息内容或联系人..." class="search-input">
            </div>
            <div class="action-controls">
              <select class="filter-select">
                <option value="all">全部状态</option>
                <option value="unread">未读</option>
                <option value="read">已读</option>
              </select>
              <button class="btn secondary-btn delete-selected-btn">
                <i class="fa fa-trash"></i>
                <span>删除选中</span>
              </button>
              <button class="btn primary-btn new-message-btn" @click="showNewMessageModal = true">
                <i class="fa fa-plus"></i>
                <span>新消息</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 消息列表和聊天窗口区域 -->
        <div class="messages-container" :class="{ 'chat-open': selectedMessage }">
          <!-- 消息列表区域 -->
          <div class="messages-list-container">
            <div class="messages-list">
              <!-- 消息项 1 - 未读 -->
              <div class="message-item unread" @click="selectMessage('张教授', 'private', 'unread')">
                <div class="message-avatar">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="张教授">
                </div>
                <div class="message-content">
                  <div class="message-header">
                    <div class="message-sender">张教授</div>
                    <div class="message-time">10:30</div>
                  </div>
                  <div class="message-text">关于下周的教学研讨会，我们需要准备一份关于数学教学方法的报告，你有什么想法吗？</div>
                  <div class="message-tags">
                    <span class="tag private">私信</span>
                  </div>
                </div>
                <div class="message-status">
                  <span class="unread-dot"></span>
                </div>
              </div>

              <!-- 消息项 2 - 未读 -->
              <div class="message-item unread" @click="selectMessage('李同学', 'comment', 'unread')">
                <div class="message-avatar">
                  <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="李同学">
                </div>
                <div class="message-content">
                  <div class="message-header">
                    <div class="message-sender">李同学</div>
                    <div class="message-time">昨天</div>
                  </div>
                  <div class="message-text">老师，我对您发布的教案《一元二次方程的解法与应用》有一些疑问，想请教一下关于配方法的具体步骤。</div>
                  <div class="message-tags">
                    <span class="tag comment">评论回复</span>
                  </div>
                </div>
                <div class="message-status">
                  <span class="unread-dot"></span>
                </div>
              </div>

              <!-- 消息项 3 - 已读 -->
              <div class="message-item" @click="selectMessage('王老师', 'private', 'read')">
                <div class="message-avatar">
                  <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="王老师">
                </div>
                <div class="message-content">
                  <div class="message-header">
                    <div class="message-sender">王老师</div>
                    <div class="message-time">昨天</div>
                  </div>
                  <div class="message-text">您好，我是初二(3)班的数学老师王芳，想和您交流一下关于学生作业批改的经验。</div>
                  <div class="message-tags">
                    <span class="tag private">私信</span>
                  </div>
                </div>
                <div class="message-status"></div>
              </div>

              <!-- 消息项 4 - 未读 -->
              <div class="message-item unread" @click="selectMessage('赵同学', 'mention', 'unread')">
                <div class="message-avatar">
                  <img src="https://randomuser.me/api/portraits/men/19.jpg" alt="赵同学">
                </div>
                <div class="message-content">
                  <div class="message-header">
                    <div class="message-sender">赵同学</div>
                    <div class="message-time">7月20日</div>
                  </div>
                  <div class="message-text">@张三老师 请问这道题的解题思路是什么？我不太理解为什么要这样做。</div>
                  <div class="message-tags">
                    <span class="tag mention">@我的消息</span>
                  </div>
                </div>
                <div class="message-status">
                  <span class="unread-dot"></span>
                </div>
              </div>

              <!-- 消息项 5 - 已读 -->
              <div class="message-item" @click="selectMessage('刘老师', 'comment', 'read')">
                <div class="message-avatar">
                  <img src="https://randomuser.me/api/portraits/men/56.jpg" alt="刘老师">
                </div>
                <div class="message-content">
                  <div class="message-header">
                    <div class="message-sender">刘老师</div>
                    <div class="message-time">7月19日</div>
                  </div>
                  <div class="message-text">您分享的教案《平行四边形的性质与判定》非常实用，我在课堂上试用了一下，学生反响很好，谢谢您的分享！</div>
                  <div class="message-tags">
                    <span class="tag comment">评论回复</span>
                  </div>
                </div>
                <div class="message-status"></div>
              </div>

              <!-- 消息项 6 - 已读 -->
              <div class="message-item" @click="selectMessage('陈同学', 'private', 'read')">
                <div class="message-avatar">
                  <img src="https://randomuser.me/api/portraits/women/67.jpg" alt="陈同学">
                </div>
                <div class="message-content">
                  <div class="message-header">
                    <div class="message-sender">陈同学</div>
                    <div class="message-time">7月18日</div>
                  </div>
                  <div class="message-text">老师，我是初二(2)班的陈小明，想向您请教一下关于三角函数的问题，我在课后练习中遇到了一些困难。</div>
                  <div class="message-tags">
                    <span class="tag private">私信</span>
                  </div>
                </div>
                <div class="message-status"></div>
              </div>
            </div>

            <!-- 分页组件 -->
            <div class="pagination-container">
              <ul class="pagination">
                <li class="pagination-item disabled">
                  <i class="fa fa-angle-left"></i>
                </li>
                <li class="pagination-item active">1</li>
                <li class="pagination-item">2</li>
                <li class="pagination-item">3</li>
                <li class="pagination-item">
                  <i class="fa fa-angle-right"></i>
                </li>
              </ul>
            </div>
          </div>

          <!-- 聊天窗口区域 -->
          <div class="chat-window" v-if="selectedMessage">
            <div class="chat-header">
              <button class="back-btn" @click="closeChat">
                <i class="fa fa-arrow-left"></i>
                <span>返回消息列表</span>
              </button>
              <div class="chat-contact">
                <div class="contact-avatar">
                  <img :src="selectedMessage.avatar" :alt="selectedMessage.sender">
                </div>
                <div class="contact-info">
                  <div class="contact-name">{{ selectedMessage.sender }}</div>
                  <div class="contact-status">在线</div>
                </div>
              </div>
              <div class="chat-actions">
                <button class="action-btn">
                  <i class="fa fa-phone"></i>
                </button>
                <button class="action-btn">
                  <i class="fa fa-video-camera"></i>
                </button>
                <button class="action-btn">
                  <i class="fa fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
            <div class="chat-messages">
              <!-- 对方消息 -->
              <div class="message received">
                <div class="message-content">
                  <p>您好，张三老师！</p>
                </div>
                <div class="message-time">10:00</div>
              </div>
              <!-- 对方消息 -->
              <div class="message received">
                <div class="message-content">
                  <p>关于下周的教学研讨会，我们需要准备一份关于数学教学方法的报告，你有什么想法吗？</p>
                </div>
                <div class="message-time">10:01</div>
              </div>
              <!-- 己方消息 -->
              <div class="message sent">
                <div class="message-content">
                  <p>您好，张教授！</p>
                </div>
                <div class="message-time">10:15</div>
              </div>
              <!-- 己方消息 -->
              <div class="message sent">
                <div class="message-content">
                  <p>关于教学方法的报告，我认为可以从以下几个方面展开：</p>
                  <ol>
                    <li>传统教学方法与现代教学方法的对比</li>
                    <li>互动式教学在数学课堂中的应用</li>
                    <li>如何利用多媒体资源提升教学效果</li>
                    <li>差异化教学策略</li>
                  </ol>
                  <p>您觉得这些方向如何？</p>
                </div>
                <div class="message-time">10:18</div>
              </div>
              <!-- 对方消息 -->
              <div class="message received">
                <div class="message-content">
                  <p>这些方向很好！我特别赞同差异化教学策略这一点，现在的学生水平参差不齐，确实需要因材施教。</p>
                  <p>我们可以再加入一个案例分析部分，分享一些成功的教学案例。</p>
                </div>
                <div class="message-time">10:30</div>
              </div>
            </div>
            <div class="chat-input">
              <div class="input-container">
                <button class="emoji-btn">
                  <i class="fa fa-smile-o"></i>
                </button>
                <input type="text" placeholder="输入消息内容..." class="message-input">
                <button class="attach-btn">
                  <i class="fa fa-paperclip"></i>
                </button>
              </div>
              <button class="send-btn">
                <i class="fa fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 新消息弹窗 -->
    <div class="modal-overlay" v-if="showNewMessageModal" @click="showNewMessageModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">新消息</h2>
          <button class="close-btn" @click="showNewMessageModal = false">
            <i class="fa fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form class="message-form">
            <div class="form-group">
              <label class="form-label">收件人</label>
              <div class="recipient-search">
                <i class="fa fa-search"></i>
                <input type="text" class="form-input" placeholder="搜索联系人...">
              </div>
              <div class="recipient-list">
                <div class="recipient-item">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="张教授">
                  <span>张教授</span>
                </div>
                <div class="recipient-item">
                  <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="王老师">
                  <span>王老师</span>
                </div>
                <div class="recipient-item">
                  <img src="https://randomuser.me/api/portraits/men/56.jpg" alt="刘老师">
                  <span>刘老师</span>
                </div>
                <div class="recipient-item">
                  <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="李同学">
                  <span>李同学</span>
                </div>
                <div class="recipient-item">
                  <img src="https://randomuser.me/api/portraits/men/19.jpg" alt="赵同学">
                  <span>赵同学</span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">消息内容</label>
              <textarea class="form-textarea" placeholder="请输入消息内容..."></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn secondary-btn cancel-btn" @click="showNewMessageModal = false">取消</button>
          <button class="btn primary-btn send-message-btn">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageCenterV2',
  data() {
    return {
      currentTab: 'all',
      selectedMessage: null,
      showNewMessageModal: false
    };
  },
  methods: {
    switchTab(tab) {
      this.currentTab = tab;
      this.selectedMessage = null; // 切换标签时关闭聊天窗口
    },
    selectMessage(sender, type, status) {
      // 根据发送者获取对应的头像
      let avatar = '';
      switch(sender) {
        case '张教授':
          avatar = 'https://randomuser.me/api/portraits/men/32.jpg';
          break;
        case '李同学':
          avatar = 'https://randomuser.me/api/portraits/women/28.jpg';
          break;
        case '王老师':
          avatar = 'https://randomuser.me/api/portraits/women/45.jpg';
          break;
        case '赵同学':
          avatar = 'https://randomuser.me/api/portraits/men/19.jpg';
          break;
        case '刘老师':
          avatar = 'https://randomuser.me/api/portraits/men/56.jpg';
          break;
        case '陈同学':
          avatar = 'https://randomuser.me/api/portraits/women/67.jpg';
          break;
        default:
          avatar = 'https://randomuser.me/api/portraits/men/1.jpg';
      }
      
      this.selectedMessage = {
        sender,
        type,
        status,
        avatar
      };
    },
    closeChat() {
      this.selectedMessage = null;
    }
  }
};
</script>

<!--<style scoped>-->
<!--/* 基础样式 */-->
<!--.message-center-v2 {-->
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

<!--/* 页面标题样式 */-->
<!--.page-title {-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.page-title h1 {-->
<!--  font-size: 24px;-->
<!--  font-weight: bold;-->
<!--  color: #333;-->
<!--}-->

<!--/* 顶部数据概览卡片区样式 */-->
<!--.stats-cards-grid {-->
<!--  display: grid;-->
<!--  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));-->
<!--  gap: 15px;-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.stat-card {-->
<!--  background-color: #f0e6ff;-->
<!--  border-radius: 8px;-->
<!--  padding: 15px;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  text-align: center;-->
<!--}-->

<!--.stat-value {-->
<!--  font-size: 24px;-->
<!--  font-weight: bold;-->
<!--  color: #5a2ca0;-->
<!--  margin-bottom: 5px;-->
<!--}-->

<!--.stat-label {-->
<!--  font-size: 14px;-->
<!--  color: #666;-->
<!--}-->

<!--/* 标签页与搜索区样式 */-->
<!--.tabs-search-bar {-->
<!--  background-color: white;-->
<!--  border-radius: 8px;-->
<!--  padding: 15px;-->
<!--  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.tab-navigation {-->
<!--  margin-bottom: 15px;-->
<!--}-->

<!--.tabs {-->
<!--  display: flex;-->
<!--  list-style: none;-->
<!--  padding: 0;-->
<!--  margin: 0;-->
<!--  border-bottom: 1px solid #eee;-->
<!--}-->

<!--.tab-item {-->
<!--  margin-right: 20px;-->
<!--  position: relative;-->
<!--  cursor: pointer;-->
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
<!--  bottom: -1px;-->
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

<!--.search-actions {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--}-->

<!--.search-container {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  background-color: #f5f7fa;-->
<!--  border-radius: 20px;-->
<!--  padding: 0 15px;-->
<!--  width: 350px;-->
<!--}-->

<!--.search-icon {-->
<!--  color: #999;-->
<!--  margin-right: 10px;-->
<!--}-->

<!--.search-input {-->
<!--  border: none;-->
<!--  background: transparent;-->
<!--  outline: none;-->
<!--  flex: 1;-->
<!--  height: 36px;-->
<!--  font-size: 14px;-->
<!--}-->

<!--.action-controls {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--}-->

<!--.filter-select {-->
<!--  padding: 8px 15px;-->
<!--  border: 1px solid #ddd;-->
<!--  border-radius: 4px;-->
<!--  margin-right: 10px;-->
<!--  font-size: 14px;-->
<!--  color: #666;-->
<!--  outline: none;-->
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
<!--}-->

<!--.secondary-btn:hover {-->
<!--  background-color: #eee;-->
<!--}-->

<!--.delete-selected-btn {-->
<!--  margin-right: 10px;-->
<!--}-->

<!--/* 消息列表和聊天窗口区域样式 */-->
<!--.messages-container {-->
<!--  display: flex;-->
<!--  height: calc(100vh - 240px);-->
<!--  background-color: white;-->
<!--  border-radius: 8px;-->
<!--  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);-->
<!--  overflow: hidden;-->
<!--}-->

<!--.messages-container.chat-open .messages-list-container {-->
<!--  width: 40%;-->
<!--}-->

<!--.messages-container.chat-open .chat-window {-->
<!--  width: 60%;-->
<!--  display: flex;-->
<!--}-->

<!--.messages-list-container {-->
<!--  width: 100%;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  transition: width 0.3s;-->
<!--}-->

<!--.messages-list {-->
<!--  flex: 1;-->
<!--  overflow-y: auto;-->
<!--  padding: 10px;-->
<!--}-->

<!--.message-item {-->
<!--  display: flex;-->
<!--  align-items: flex-start;-->
<!--  padding: 10px;-->
<!--  border-radius: 8px;-->
<!--  cursor: pointer;-->
<!--  transition: background-color 0.3s;-->
<!--  margin-bottom: 5px;-->
<!--}-->

<!--.message-item:hover {-->
<!--  background-color: #f5f7fa;-->
<!--}-->

<!--.message-item.unread {-->
<!--  background-color: #f9f0ff;-->
<!--  border-left: 3px solid #5a2ca0;-->
<!--}-->

<!--.message-avatar {-->
<!--  width: 40px;-->
<!--  height: 40px;-->
<!--  border-radius: 50%;-->
<!--  overflow: hidden;-->
<!--  margin-right: 10px;-->
<!--  flex-shrink: 0;-->
<!--}-->

<!--.message-avatar img {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  object-fit: cover;-->
<!--}-->

<!--.message-content {-->
<!--  flex: 1;-->
<!--  min-width: 0;-->
<!--}-->

<!--.message-header {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  margin-bottom: 5px;-->
<!--}-->

<!--.message-sender {-->
<!--  font-size: 14px;-->
<!--  font-weight: bold;-->
<!--  color: #333;-->
<!--}-->

<!--.message-time {-->
<!--  font-size: 12px;-->
<!--  color: #999;-->
<!--  white-space: nowrap;-->
<!--}-->

<!--.message-text {-->
<!--  font-size: 14px;-->
<!--  color: #666;-->
<!--  white-space: nowrap;-->
<!--  overflow: hidden;-->
<!--  text-overflow: ellipsis;-->
<!--  margin-bottom: 5px;-->
<!--}-->

<!--.message-tags {-->
<!--  display: flex;-->
<!--  flex-wrap: wrap;-->
<!--  gap: 5px;-->
<!--}-->

<!--.tag {-->
<!--  padding: 2px 6px;-->
<!--  border-radius: 4px;-->
<!--  font-size: 12px;-->
<!--}-->

<!--.tag.private {-->
<!--  background-color: #e6f7ff;-->
<!--  color: #1890ff;-->
<!--}-->

<!--.tag.comment {-->
<!--  background-color: #fff7e6;-->
<!--  color: #faad14;-->
<!--}-->

<!--.tag.mention {-->
<!--  background-color: #f6ffed;-->
<!--  color: #52c41a;-->
<!--}-->

<!--.message-status {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  margin-left: 10px;-->
<!--}-->

<!--.unread-dot {-->
<!--  width: 8px;-->
<!--  height: 8px;-->
<!--  border-radius: 50%;-->
<!--  background-color: #5a2ca0;-->
<!--}-->

<!--/* 聊天窗口区域样式 */-->
<!--.chat-window {-->
<!--  display: none;-->
<!--  flex-direction: column;-->
<!--  border-left: 1px solid #eee;-->
<!--  transition: width 0.3s;-->
<!--}-->

<!--.chat-header {-->
<!--  padding: 15px;-->
<!--  border-bottom: 1px solid #eee;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--}-->

<!--.back-btn {-->
<!--  background: none;-->
<!--  border: none;-->
<!--  color: #5a2ca0;-->
<!--  font-size: 14px;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  margin-right: 15px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.back-btn i {-->
<!--  margin-right: 5px;-->
<!--}-->

<!--.chat-contact {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  flex: 1;-->
<!--}-->

<!--.contact-avatar {-->
<!--  width: 40px;-->
<!--  height: 40px;-->
<!--  border-radius: 50%;-->
<!--  overflow: hidden;-->
<!--  margin-right: 10px;-->
<!--}-->

<!--.contact-avatar img {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  object-fit: cover;-->
<!--}-->

<!--.contact-info {-->
<!--  min-width: 0;-->
<!--}-->

<!--.contact-name {-->
<!--  font-size: 16px;-->
<!--  font-weight: bold;-->
<!--  color: #333;-->
<!--  white-space: nowrap;-->
<!--  overflow: hidden;-->
<!--  text-overflow: ellipsis;-->
<!--}-->

<!--.contact-status {-->
<!--  font-size: 12px;-->
<!--  color: #52c41a;-->
<!--}-->

<!--.chat-actions {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--}-->

<!--.chat-actions .action-btn {-->
<!--  margin-left: 10px;-->
<!--  color: #666;-->
<!--}-->

<!--.chat-messages {-->
<!--  flex: 1;-->
<!--  padding: 20px;-->
<!--  overflow-y: auto;-->
<!--  background-color: #f9f9f9;-->
<!--}-->

<!--.message {-->
<!--  margin-bottom: 15px;-->
<!--  display: flex;-->
<!--  max-width: 80%;-->
<!--}-->

<!--.message.received {-->
<!--  align-self: flex-start;-->
<!--}-->

<!--.message.sent {-->
<!--  align-self: flex-end;-->
<!--}-->

<!--.message-content {-->
<!--  padding: 10px 15px;-->
<!--  border-radius: 18px;-->
<!--  font-size: 14px;-->
<!--  line-height: 1.5;-->
<!--}-->

<!--.message.received .message-content {-->
<!--  background-color: #e5e5ea;-->
<!--  color: #000;-->
<!--  border-bottom-left-radius: 5px;-->
<!--}-->

<!--.message.sent .message-content {-->
<!--  background-color: #5a2ca0;-->
<!--  color: white;-->
<!--  border-bottom-right-radius: 5px;-->
<!--}-->

<!--.message-time {-->
<!--  font-size: 12px;-->
<!--  color: #999;-->
<!--  margin-top: 5px;-->
<!--}-->

<!--.message.received .message-time {-->
<!--  margin-left: 15px;-->
<!--}-->

<!--.message.sent .message-time {-->
<!--  margin-right: 15px;-->
<!--  text-align: right;-->
<!--}-->

<!--.chat-input {-->
<!--  padding: 15px;-->
<!--  border-top: 1px solid #eee;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  background-color: white;-->
<!--}-->

<!--.input-container {-->
<!--  flex: 1;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  background-color: #f5f7fa;-->
<!--  border-radius: 20px;-->
<!--  padding: 0 15px;-->
<!--  height: 40px;-->
<!--}-->

<!--.emoji-btn, .attach-btn {-->
<!--  background: none;-->
<!--  border: none;-->
<!--  color: #666;-->
<!--  font-size: 18px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.message-input {-->
<!--  flex: 1;-->
<!--  border: none;-->
<!--  background: transparent;-->
<!--  outline: none;-->
<!--  height: 100%;-->
<!--  font-size: 14px;-->
<!--  margin: 0 10px;-->
<!--}-->

<!--.send-btn {-->
<!--  width: 40px;-->
<!--  height: 40px;-->
<!--  border-radius: 50%;-->
<!--  background-color: #5a2ca0;-->
<!--  color: white;-->
<!--  border: none;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  margin-left: 15px;-->
<!--  cursor: pointer;-->
<!--  transition: background-color 0.3s;-->
<!--}-->

<!--.send-btn:hover {-->
<!--  background-color: #4a2486;-->
<!--}-->

<!--/* 分页组件样式 */-->
<!--.pagination-container {-->
<!--  padding: 15px;-->
<!--  border-top: 1px solid #eee;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--}-->

<!--.pagination {-->
<!--  display: flex;-->
<!--  list-style: none;-->
<!--  padding: 0;-->
<!--  margin: 0;-->
<!--}-->

<!--.pagination-item {-->
<!--  margin: 0 5px;-->
<!--  width: 36px;-->
<!--  height: 36px;-->
<!--  border-radius: 4px;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  font-size: 14px;-->
<!--  cursor: pointer;-->
<!--  transition: all 0.3s;-->
<!--}-->

<!--.pagination-item:hover:not(.disabled) {-->
<!--  background-color: #f5f7fa;-->
<!--  color: #5a2ca0;-->
<!--}-->

<!--.pagination-item.active {-->
<!--  background-color: #5a2ca0;-->
<!--  color: white;-->
<!--}-->

<!--.pagination-item.disabled {-->
<!--  color: #ccc;-->
<!--  cursor: not-allowed;-->
<!--}-->

<!--.pagination-item i {-->
<!--  font-size: 16px;-->
<!--}-->

<!--/* 新消息弹窗样式 */-->
<!--.modal-overlay {-->
<!--  position: fixed;-->
<!--  top: 0;-->
<!--  left: 0;-->
<!--  right: 0;-->
<!--  bottom: 0;-->
<!--  background-color: rgba(0, 0, 0, 0.5);-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  z-index: 1000;-->
<!--}-->

<!--.modal-content {-->
<!--  background-color: white;-->
<!--  border-radius: 8px;-->
<!--  width: 500px;-->
<!--  max-width: 90%;-->
<!--  max-height: 90vh;-->
<!--  overflow-y: auto;-->
<!--  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);-->
<!--}-->

<!--.modal-header {-->
<!--  padding: 15px 20px;-->
<!--  border-bottom: 1px solid #f5f7fa;-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--}-->

<!--.modal-title {-->
<!--  font-size: 18px;-->
<!--  font-weight: bold;-->
<!--  color: #333;-->
<!--}-->

<!--.close-btn {-->
<!--  background: none;-->
<!--  border: none;-->
<!--  color: #666;-->
<!--  font-size: 18px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.modal-body {-->
<!--  padding: 20px;-->
<!--}-->

<!--.message-form {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--}-->

<!--.form-group {-->
<!--  margin-bottom: 15px;-->
<!--}-->

<!--.form-label {-->
<!--  display: block;-->
<!--  margin-bottom: 5px;-->
<!--  font-size: 14px;-->
<!--  font-weight: 500;-->
<!--  color: #333;-->
<!--}-->

<!--.recipient-search {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  background-color: #f5f7fa;-->
<!--  border-radius: 20px;-->
<!--  padding: 0 15px;-->
<!--  height: 36px;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.recipient-search i {-->
<!--  color: #999;-->
<!--  margin-right: 10px;-->
<!--}-->

<!--.form-input,-->
<!--.form-textarea {-->
<!--  width: 100%;-->
<!--  padding: 10px;-->
<!--  border: 1px solid #ddd;-->
<!--  border-radius: 4px;-->
<!--  font-size: 14px;-->
<!--  color: #333;-->
<!--  outline: none;-->
<!--}-->

<!--.form-input:focus,-->
<!--.form-textarea:focus {-->
<!--  border-color: #5a2ca0;-->
<!--}-->

<!--.recipient-list {-->
<!--  max-height: 150px;-->
<!--  overflow-y: auto;-->
<!--  border: 1px solid #ddd;-->
<!--  border-radius: 4px;-->
<!--  padding: 5px;-->
<!--}-->

<!--.recipient-item {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  padding: 8px;-->
<!--  border-radius: 4px;-->
<!--  cursor: pointer;-->
<!--  transition: background-color 0.3s;-->
<!--}-->

<!--.recipient-item:hover {-->
<!--  background-color: #f5f7fa;-->
<!--}-->

<!--.recipient-item img {-->
<!--  width: 30px;-->
<!--  height: 30px;-->
<!--  border-radius: 50%;-->
<!--  object-fit: cover;-->
<!--  margin-right: 10px;-->
<!--}-->

<!--.form-textarea {-->
<!--  min-height: 150px;-->
<!--  resize: vertical;-->
<!--}-->

<!--.modal-footer {-->
<!--  padding: 15px 20px;-->
<!--  border-top: 1px solid #f5f7fa;-->
<!--  display: flex;-->
<!--  justify-content: flex-end;-->
<!--  gap: 10px;-->
<!--}-->

<!--.cancel-btn {-->
<!--  margin-right: 10px;-->
<!--}-->

<!--.send-message-btn {-->
<!--  background-color: #5a2ca0;-->
<!--  color: white;-->
<!--}-->

<!--.send-message-btn:hover {-->
<!--  background-color: #4a2486;-->
<!--}-->
<!--</style>-->
