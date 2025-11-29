
<script>
import { ElMessage } from 'element-plus'

export default {
  name: 'MessageCenterV2',
  data() {
    return {
      // 标签页状态
      currentTab: 'all',
      filterStatus: 'all',
      // 消息列表数据
      messageList: [
        {
          sender: '张教授',
          time: '10:30',
          content: '关于下周的教学研讨会，我们需要准备一份关于数学教学方法的报告，你有什么想法吗？',
          type: 'private',
          status: 'unread',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
          sender: '李同学',
          time: '昨天',
          content: '老师，我对您发布的教案《一元二次方程的解法与应用》有一些疑问，想请教一下关于配方法的具体步骤。',
          type: 'comment',
          status: 'unread',
          avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
        },
        {
          sender: '王老师',
          time: '昨天',
          content: '您好，我是初二(3)班的数学老师王芳，想和您交流一下关于学生作业批改的经验。',
          type: 'private',
          status: 'read',
          avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
        },
        {
          sender: '赵同学',
          time: '7月20日',
          content: '@张三老师 请问这道题的解题思路是什么？我不太理解为什么要这样做。',
          type: 'mention',
          status: 'unread',
          avatar: 'https://randomuser.me/api/portraits/men/19.jpg'
        },
        {
          sender: '刘老师',
          time: '7月19日',
          content: '您分享的教案《平行四边形的性质与判定》非常实用，我在课堂上试用了一下，学生反响很好，谢谢您的分享！',
          type: 'comment',
          status: 'read',
          avatar: 'https://randomuser.me/api/portraits/men/56.jpg'
        },
        {
          sender: '陈同学',
          time: '7月18日',
          content: '老师，我是初二(2)班的陈小明，想向您请教一下关于三角函数的问题，我在课后练习中遇到了一些困难。',
          type: 'private',
          status: 'read',
          avatar: 'https://randomuser.me/api/portraits/women/67.jpg'
        }
      ],
      // 分页数据
      currentPage: 1,
      pageSize: 10,
      // 选中的消息
      selectedMessage: null,
      // 聊天消息
      chatMessages: [
        { content: '您好，张三老师！', time: '10:00', isSelf: false },
        { content: '关于下周的教学研讨会，我们需要准备一份关于数学教学方法的报告，你有什么想法吗？', time: '10:01', isSelf: false },
        { content: '您好，张教授！', time: '10:15', isSelf: true },
        {
          content: [
            '关于教学方法的报告，我认为可以从以下几个方面展开：',
            [
              '传统教学方法与现代教学方法的对比',
              '互动式教学在数学课堂中的应用',
              '如何利用多媒体资源提升教学效果',
              '差异化教学策略'
            ],
            '您觉得这些方向如何？'
          ],
          time: '10:18',
          isSelf: true
        },
        {
          content: '这些方向很好！我特别赞同差异化教学策略这一点，现在的学生水平参差不齐，确实需要因材施教。<br>我们可以再加入一个案例分析部分，分享一些成功的教学案例。',
          time: '10:30',
          isSelf: false
        }
      ],
      // 新消息输入内容
      newMessageContent: '',
      // 新消息弹窗
      showNewMessageModal: false,
      newMessageForm: {
        recipient: '',
        content: ''
      },
      // 收件人列表
      recipientList: [
        { name: '张教授', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { name: '王老师', avatar: 'https://randomuser.me/api/portraits/women/45.jpg' },
        { name: '刘老师', avatar: 'https://randomuser.me/api/portraits/men/56.jpg' },
        { name: '李同学', avatar: 'https://randomuser.me/api/portraits/women/28.jpg' },
        { name: '赵同学', avatar: 'https://randomuser.me/api/portraits/men/19.jpg' }
      ]
    }
  },
  computed: {
    // 过滤后的消息列表
    filteredMessageList() {
      return this.messageList.filter(item => {
        // 标签页过滤
        const tabFilter = this.currentTab === 'all' || item.type === this.currentTab
        // 状态过滤
        const statusFilter = this.filterStatus === 'all' || item.status === this.filterStatus
        return tabFilter && statusFilter
      })
    }
  },
  methods: {
    // 切换标签页
    handleTabClick() {
      this.selectedMessage = null // 切换标签时关闭聊天窗口
    },
    // 选择消息
    selectMessage(item) {
      this.selectedMessage = item
      // 标记为已读
      if (item.status === 'unread') {
        const idx = this.messageList.findIndex(msg => msg.sender === item.sender && msg.time === item.time)
        if (idx !== -1) {
          this.$set(this.messageList[idx], 'status', 'read')
        }
      }
    },
    // 关闭聊天窗口
    closeChat() {
      this.selectedMessage = null
    },
    // 发送消息
    sendMessage() {
      if (!this.newMessageContent.trim()) return
      this.chatMessages.push({
        content: this.newMessageContent,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: true
      })
      this.newMessageContent = ''
      // 滚动到底部
      this.$nextTick(() => {
        const chatContainer = document.querySelector('.chat-messages')
        chatContainer.scrollTop = chatContainer.scrollHeight
      })
    },
    // 选择收件人
    selectRecipient(item) {
      this.newMessageForm.recipient = item.name
    },
    // 发送新消息
    sendNewMessage() {
      if (!this.newMessageForm.recipient || !this.newMessageForm.content.trim()) {
        ElMessage.warning('请填写收件人和消息内容')
        return
      }
      // 模拟发送成功
      ElMessage.success('消息发送成功')
      this.showNewMessageModal = false
      this.newMessageForm = { recipient: '', content: '' }
      // 添加到消息列表
      this.messageList.unshift({
        sender: this.newMessageForm.recipient,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: this.newMessageForm.content,
        type: 'private',
        status: 'read',
        avatar: this.recipientList.find(item => item.name === this.newMessageForm.recipient)?.avatar
      })
    },
    // 获取标签类型
    getTagType(type) {
      switch (type) {
        case 'private': return 'info'
        case 'comment': return 'warning'
        case 'mention': return 'success'
        default: return 'default'
      }
    },
    // 获取标签文本
    getTagText(type) {
      switch (type) {
        case 'private': return '私信'
        case 'comment': return '评论回复'
        case 'mention': return '@我的消息'
        default: return '未知'
      }
    },
    // 分页相关
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  }
};
</script>

<template>
  <div class="message-center-v2">
    <!-- 左侧导航栏：使用 ElMenu + ElMenuItem -->
    <aside class="sidebar">
      <div class="logo">
        <i class="fa fa-graduation-cap"></i>
        <span>教师个人中心</span>
      </div>
      <el-menu
          default-active="message"
          class="nav-menu"
          background-color="#5a2ca0"
          text-color="#fff"
          active-text-color="#fff"
          :unique-opened="true"
      >
        <el-menu-item index="overview">
          <i class="fa fa-user-circle"></i>
          <span slot="title">个人概览</span>
        </el-menu-item>
        <el-menu-item index="info">
          <i class="fa fa-id-card"></i>
          <span slot="title">基本信息</span>
        </el-menu-item>
        <el-menu-item index="stats">
          <i class="fa fa-bar-chart"></i>
          <span slot="title">数据统计</span>
        </el-menu-item>
        <el-menu-item index="target">
          <i class="fa fa-bullseye"></i>
          <span slot="title">目标管理</span>
        </el-menu-item>
        <el-menu-item index="notice">
          <i class="fa fa-bell"></i>
          <span slot="title">通知中心</span>
        </el-menu-item>
        <el-menu-item index="lesson">
          <i class="fa fa-book"></i>
          <span slot="title">教案管理</span>
        </el-menu-item>
        <el-menu-item index="question">
          <i class="fa fa-question-circle"></i>
          <span slot="title">学习题库</span>
        </el-menu-item>
        <el-menu-item index="message">
          <i class="fa fa-envelope"></i>
          <span slot="title">消息中心</span>
        </el-menu-item>
        <el-menu-item index="resource">
          <i class="fa fa-folder-open"></i>
          <span slot="title">资源中心</span>
        </el-menu-item>
      </el-menu>
    </aside>

    <!-- 右侧主内容区 -->
    <main class="main-content">
      <!-- 顶部导航栏：使用 ElInput + ElButton + ElDropdown -->
      <header class="top-nav">
        <el-input
            placeholder="搜索..."
            prefix-icon="fa fa-search"
            class="search-box"
            size="small"
        ></el-input>
        <div class="user-actions">
          <el-button icon="fa fa-bell" circle size="small" class="action-btn">
            <el-badge :value="3" class="badge" />
          </el-button>
          <el-button icon="fa fa-envelope" circle size="small" class="action-btn">
            <el-badge :value="5" class="badge" />
          </el-button>
          <el-button icon="fa fa-cog" circle size="small" class="action-btn"></el-button>

          <el-dropdown placement="bottom">
            <div class="user-profile" slot="trigger">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="用户头像">
              <div class="user-info">
                <span class="user-name">张三老师</span>
                <span class="user-role">数学教师</span>
              </div>
            </div>
            <el-dropdown-menu>
              <el-dropdown-item>个人设置</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </header>

      <!-- 内容区域 -->
      <div class="content-area">
        <!-- 页面标题 -->
        <el-page-header content="消息中心" class="page-title"></el-page-header>

        <!-- 顶部数据概览卡片区：使用 ElCard -->
        <el-row :gutter="15" class="stats-cards-grid">
          <el-col :span="6">
            <el-card class="stat-card">
              <div class="stat-value">28</div>
              <div class="stat-label">私信对话</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="stat-card">
              <div class="stat-value">15</div>
              <div class="stat-label">未读消息</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="stat-card">
              <div class="stat-value">42</div>
              <div class="stat-label">评论回复</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="stat-card">
              <div class="stat-value">8</div>
              <div class="stat-label">@我的消息</div>
            </el-card>
          </el-col>
        </el-row>

        <!-- 标签页与搜索区：使用 ElTabs + ElInput + ElSelect + ElButton -->
        <el-card class="tabs-search-bar" shadow="hover">
          <el-tabs
              v-model="currentTab"
              class="tab-navigation"
              @tab-click="handleTabClick"
          >
            <el-tab-pane label="全部消息" name="all"></el-tab-pane>
            <el-tab-pane label="私信对话" name="private"></el-tab-pane>
            <el-tab-pane label="评论回复" name="comment"></el-tab-pane>
            <el-tab-pane label="@我的消息" name="mention"></el-tab-pane>
          </el-tabs>

          <div class="search-actions">
            <el-input
                placeholder="搜索消息内容或联系人..."
                prefix-icon="fa fa-search"
                class="search-input"
                size="small"
            ></el-input>
            <div class="action-controls">
              <el-select v-model="filterStatus" placeholder="全部状态" size="small" class="filter-select">
                <el-option label="全部状态" value="all"></el-option>
                <el-option label="未读" value="unread"></el-option>
                <el-option label="已读" value="read"></el-option>
              </el-select>
              <el-button type="text" class="delete-selected-btn" size="small">
                <i class="fa fa-trash"></i>
                <span>删除选中</span>
              </el-button>
              <el-button type="primary" class="new-message-btn" size="small" @click="showNewMessageModal = true">
                <i class="fa fa-plus"></i>
                <span>新消息</span>
              </el-button>
            </div>
          </div>
        </el-card>

        <!-- 消息列表和聊天窗口区域 -->
        <div class="messages-container" :class="{ 'chat-open': selectedMessage }">
          <!-- 消息列表区域：使用 ElList + ElListItem -->
          <div class="messages-list-container">
            <el-list class="messages-list" border :data="messageList">
              <el-list-item
                  v-for="(item, index) in filteredMessageList"
                  :key="index"
                  :class="{ 'unread': item.status === 'unread' }"
                  @click="selectMessage(item)"
              >
                <el-list-item-meta>
                  <img
                      slot="avatar"
                      :src="item.avatar"
                      :alt="item.sender"
                      class="message-avatar"
                  >
                  <el-list-item-title class="message-sender">{{ item.sender }}</el-list-item-title>
                  <el-list-item-desc class="message-time">{{ item.time }}</el-list-item-desc>
                </el-list-item-meta>
                <div class="message-content-inner">
                  <div class="message-text">{{ item.content }}</div>
                  <el-tag :type="getTagType(item.type)" size="mini" class="message-tag">
                    {{ getTagText(item.type) }}
                  </el-tag>
                </div>
                <el-badge v-if="item.status === 'unread'" class="unread-dot" :value="1" type="primary" />
              </el-list-item>
            </el-list>

            <!-- 分页组件：使用 ElPagination -->
            <div class="pagination-container">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="pageSize"
                  layout="prev, pager, next"
                  :total="messageList.length"
              ></el-pagination>
            </div>
          </div>

          <!-- 聊天窗口区域：使用 ElCard + ElMessage 样式 -->
          <div class="chat-window" v-if="selectedMessage">
            <el-card class="chat-card" shadow="none">
              <!-- 聊天头部 -->
              <div class="chat-header">
                <el-button type="text" class="back-btn" @click="closeChat">
                  <i class="fa fa-arrow-left"></i>
                  <span>返回消息列表</span>
                </el-button>
                <div class="chat-contact">
                  <img :src="selectedMessage.avatar" :alt="selectedMessage.sender" class="contact-avatar">
                  <div class="contact-info">
                    <div class="contact-name">{{ selectedMessage.sender }}</div>
                    <div class="contact-status">在线</div>
                  </div>
                </div>
                <div class="chat-actions">
                  <el-button icon="fa fa-phone" circle size="small" class="action-btn"></el-button>
                  <el-button icon="fa fa-video-camera" circle size="small" class="action-btn"></el-button>
                  <el-button icon="fa fa-ellipsis-v" circle size="small" class="action-btn"></el-button>
                </div>
              </div>

              <!-- 聊天内容 -->
              <div class="chat-messages">
                <div class="message received" v-for="(msg, idx) in chatMessages" :key="idx">
                  <div class="message-content" :class="{ 'sent': msg.isSelf }">
                    <p v-if="typeof msg.content === 'string'" v-html="msg.content"></p>
                    <div v-else-if="Array.isArray(msg.content)">
                      <p>{{ msg.content[0] }}</p>
                      <el-card shadow="none" class="message-list-card">
                        <el-list :data="msg.content[1]">
                          <el-list-item v-for="(item, i) in msg.content[1]" :key="i">
                            {{ i + 1 }}. {{ item }}
                          </el-list-item>
                        </el-list>
                      </el-card>
                      <p>{{ msg.content[2] }}</p>
                    </div>
                  </div>
                  <div class="message-time">{{ msg.time }}</div>
                </div>
              </div>

              <!-- 聊天输入框 -->
              <div class="chat-input">
                <el-input
                    v-model="newMessageContent"
                    placeholder="输入消息内容..."
                    class="message-input"
                    size="small"
                >
                  <template #prepend>
                    <el-button icon="fa fa-smile-o" circle size="mini" class="emoji-btn"></el-button>
                  </template>
                  <template #append>
                    <el-button icon="fa fa-paperclip" circle size="mini" class="attach-btn"></el-button>
                  </template>
                </el-input>
                <el-button
                    icon="fa fa-paper-plane"
                    circle
                    size="small"
                    class="send-btn"
                    type="primary"
                    @click="sendMessage"
                ></el-button>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </main>

    <!-- 新消息弹窗：使用 ElDialog -->
    <el-dialog
        title="新消息"
        :visible.sync="showNewMessageModal"
        width="500px"
        :append-to-body="true"
    >
      <el-form :model="newMessageForm" class="message-form">
        <el-form-item label="收件人" label-width="60px">
          <el-input
              v-model="newMessageForm.recipient"
              placeholder="搜索联系人..."
              prefix-icon="fa fa-search"
              size="small"
              class="recipient-search"
          ></el-input>
          <el-scrollbar class="recipient-list" height="150px">
            <div
                class="recipient-item"
                v-for="(item, idx) in recipientList"
                :key="idx"
                @click="selectRecipient(item)"
            >
              <img :src="item.avatar" :alt="item.name">
              <span>{{ item.name }}</span>
            </div>
          </el-scrollbar>
        </el-form-item>
        <el-form-item label="内容" label-width="60px">
          <el-input
              v-model="newMessageForm.content"
              type="textarea"
              placeholder="请输入消息内容..."
              :rows="5"
              size="small"
              class="form-textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="showNewMessageModal = false">取消</el-button>
        <el-button type="primary" size="small" @click="sendNewMessage">发送</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
/* 基础布局样式 */
.message-center-v2 {
  display: flex;
  min-height: 100vh;
}

/* 左侧导航栏样式 */
.sidebar {
  width: 240px;
  background-color: #5a2ca0;
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

.el-menu.nav-menu {
  border-right: none;
}

.el-menu-item {
  height: 44px;
  line-height: 44px;
}

.el-menu-item.is-active {
  background-color: rgba(255, 255, 255, 0.2) !important;
  border-left: 4px solid white;
}

/* 右侧主内容区样式 */
.main-content {
  flex: 1;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
}

/* 顶部导航样式 */
.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.search-box {
  width: 300px;
}

.user-actions {
  display: flex;
  align-items: center;
}

.action-btn {
  color: #666;
  margin-left: 15px;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #f5222d !important;
}

.user-profile {
  display: flex;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
}

.user-profile img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.user-role {
  font-size: 12px;
  color: #999;
}

/* 内容区域样式 */
.content-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.page-title {
  margin-bottom: 20px;
}

/* 数据卡片样式 */
.stats-cards-grid {
  margin-bottom: 20px;
}

.stat-card {
  background-color: #f0e6ff;
  border-radius: 8px;
  text-align: center;
  padding: 15px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #5a2ca0;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

/* 标签页与搜索区样式 */
.tabs-search-bar {
  margin-bottom: 20px;
  padding: 15px;
}

.tab-navigation {
  margin-bottom: 15px;
}

.el-tabs__item.is-active {
  color: #5a2ca0 !important;
  font-weight: bold;
}

.el-tabs__active-bar {
  background-color: #5a2ca0 !important;
}

.search-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-input {
  width: 350px;
}

.filter-select {
  margin-right: 10px;
}

/* 消息列表和聊天窗口样式 */
.messages-container {
  display: flex;
  height: calc(100vh - 240px);
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.messages-container.chat-open .messages-list-container {
  width: 40%;
}

.messages-container.chat-open .chat-window {
  width: 60%;
  display: flex;
}

.messages-list-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
}

.messages-list {
  flex: 1;
  overflow-y: auto;
}

.el-list-item {
  cursor: pointer;
  transition: background-color 0.3s;
}

.el-list-item.unread {
  background-color: #f9f0ff;
  border-left: 3px solid #5a2ca0;
}

.el-list-item:hover {
  background-color: #f5f7fa;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.message-content-inner {
  flex: 1;
  min-width: 0;
}

.message-text {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;
}

.message-tag {
  margin-right: 5px;
}

.unread-dot {
  width: 8px !important;
  height: 8px !important;
  border-radius: 50%;
  background-color: #5a2ca0 !important;
  padding: 0 !important;
  min-width: auto !important;
}

/* 聊天窗口样式 */
.chat-window {
  display: none;
  flex-direction: column;
  border-left: 1px solid #eee;
  transition: width 0.3s;
}

.chat-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: none;
}

.chat-header {
  padding: 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
}

.back-btn {
  color: #5a2ca0 !important;
  margin-right: 15px;
}

.chat-contact {
  display: flex;
  align-items: center;
  flex: 1;
}

.contact-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.contact-info {
  min-width: 0;
}

.contact-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contact-status {
  font-size: 12px;
  color: #52c41a;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f9f9f9;
}

.message {
  margin-bottom: 15px;
  max-width: 80%;
}

.message.received {
  float: left;
}

.message.sent {
  float: right;
}

.message-content {
  padding: 10px 15px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.5;
}

.message.received .message-content {
  background-color: #e5e5ea;
  color: #000;
  border-bottom-left-radius: 5px;
}

.message.sent .message-content {
  background-color: #5a2ca0;
  color: white;
  border-bottom-right-radius: 5px;
}

.message-time {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
  clear: both;
}

.message.received .message-time {
  text-align: left;
  margin-left: 15px;
}

.message.sent .message-time {
  text-align: right;
  margin-right: 15px;
}

.message-list-card {
  background-color: transparent !important;
  padding: 0 10px;
  margin: 5px 0;
}

.chat-input {
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  background-color: white;
}

.message-input {
  flex: 1;
  border-radius: 20px !important;
  background-color: #f5f7fa !important;
}

.emoji-btn, .attach-btn {
  color: #666;
}

.send-btn {
  background-color: #5a2ca0 !important;
  margin-left: 15px;
}

/* 分页样式 */
.pagination-container {
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
}

/* 新消息弹窗样式 */
.recipient-search {
  margin-bottom: 10px;
  border-radius: 20px !important;
  background-color: #f5f7fa !important;
}

.recipient-list {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
}

.recipient-item {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.recipient-item:hover {
  background-color: #f5f7fa;
}

.recipient-item img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.form-textarea {
  min-height: 150px;
  resize: vertical;
}
</style>