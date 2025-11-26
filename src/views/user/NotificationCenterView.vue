<template>
  <div class="notification-center-v2">
    <!-- 左侧导航栏 - 使用 ElMenu 组件 -->
    <aside class="sidebar">
      <div class="logo">
        <i class="fa fa-graduation-cap"></i>
        <span>教师个人中心</span>
      </div>
      <el-menu
          background-color="#5a2ca0"
          text-color="white"
          active-text-color="white"
          class="nav-menu"
      >
        <el-menu-item index="1" class="nav-item">
          <i class="fa fa-user-circle"></i>
          <span>个人概览</span>
        </el-menu-item>
        <el-menu-item index="2" class="nav-item">
          <i class="fa fa-id-card"></i>
          <span>基本信息</span>
        </el-menu-item>
        <el-menu-item index="3" class="nav-item">
          <i class="fa fa-bar-chart"></i>
          <span>数据统计</span>
        </el-menu-item>
        <el-menu-item index="4" class="nav-item">
          <i class="fa fa-bullseye"></i>
          <span>目标管理</span>
        </el-menu-item>
        <el-menu-item index="5" class="nav-item" :class="{ 'active': true }">
          <i class="fa fa-bell"></i>
          <span>通知中心</span>
        </el-menu-item>
        <el-menu-item index="6" class="nav-item">
          <i class="fa fa-book"></i>
          <span>教案管理</span>
        </el-menu-item>
        <el-menu-item index="7" class="nav-item">
          <i class="fa fa-question-circle"></i>
          <span>学习题库</span>
        </el-menu-item>
        <el-menu-item index="8" class="nav-item">
          <i class="fa fa-envelope"></i>
          <span>消息中心</span>
        </el-menu-item>
        <el-menu-item index="9" class="nav-item">
          <i class="fa fa-folder-open"></i>
          <span>资源中心</span>
        </el-menu-item>
      </el-menu>
    </aside>

    <!-- 右侧主内容区 -->
    <main class="main-content">
      <!-- 顶部导航栏 - 使用 ElHeader 和布局组件 -->
      <el-header class="top-nav">
        <el-row :gutter="20" class="w-full h-full">
          <el-col :span="8">
            <!-- 搜索框 - 使用 ElInput 组件 -->
            <el-input
                placeholder="搜索..."
                prefix-icon="fa fa-search"
                class="search-box"
                size="medium"
            ></el-input>
          </el-col>
          <el-col :span="16" class="text-right">
            <div class="user-actions">
              <!-- 通知按钮 - 使用 ElBadge 和 ElButton 组件 -->
              <el-badge :value="3" class="action-badge">
                <el-button icon="fa fa-bell" type="text" class="action-btn"></el-button>
              </el-badge>
              <el-badge :value="5" class="action-badge">
                <el-button icon="fa fa-envelope" type="text" class="action-btn"></el-button>
              </el-badge>
              <el-button icon="fa fa-cog" type="text" class="action-btn"></el-button>

              <!-- 用户信息 - 使用 ElDropdown 组件 -->
              <el-dropdown trigger="click" class="user-profile">
                <div class="flex items-center cursor-pointer">
                  <el-avatar :size="36">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="用户头像">
                  </el-avatar>
                  <div class="user-info ml-2">
                    <span class="user-name">张三老师</span>
                    <span class="user-role">数学教师</span>
                  </div>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人设置</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>

      <!-- 内容区域 -->
      <div class="content-area">
        <!-- 标题与标签页 - 使用 ElTabs 组件 -->
        <div class="page-header">
          <div class="page-title">
            <h1>通知中心</h1>
            <p>查看和管理您的系统通知</p>
          </div>
          <el-tabs
              v-model="currentTab"
              class="tab-navigation"
              tab-position="top"
              :before-leave="handleTabChange"
          >
            <el-tab-pane label="全部" name="all" class="tab-item">
              <template #label>
                <span>全部</span>
              </template>
            </el-tab-pane>
            <el-tab-pane label="未读" name="unread" class="tab-item"></el-tab-pane>
            <el-tab-pane label="系统通知" name="system" class="tab-item"></el-tab-pane>
            <el-tab-pane label="重要提醒" name="important" class="tab-item"></el-tab-pane>
            <el-tab-pane label="成功通知" name="success" class="tab-item"></el-tab-pane>
            <el-tab-pane label="错误提醒" name="error" class="tab-item"></el-tab-pane>
          </el-tabs>
        </div>

        <!-- 操作栏 - 使用 ElButton 组件 -->
        <div class="action-bar">
          <div class="batch-actions">
            <!-- 全选复选框 - 使用 ElCheckbox 组件 -->
            <el-checkbox v-model="selectAll" @change="toggleSelectAll" class="select-all">
              全选
            </el-checkbox>
            <el-button
                type="text"
                class="secondary-btn mark-read-btn"
                @click="markSelectedAsRead"
                icon="fa fa-check"
            >
              标记为已读
            </el-button>
            <el-button
                type="text"
                class="secondary-btn delete-selected-btn"
                @click="deleteSelectedNotifications"
                icon="fa fa-trash"
            >
              删除选中
            </el-button>
            <el-button
                type="text"
                class="secondary-btn clear-all-btn"
                @click="clearAllNotifications"
                icon="fa fa-trash-o"
            >
              清空全部
            </el-button>
          </div>
          <div class="export-actions">
            <el-button
                type="primary"
                class="export-btn"
                icon="fa fa-download"
                :style="{ backgroundColor: '#5a2ca0', borderColor: '#5a2ca0' }"
            >
              导出通知记录
            </el-button>
          </div>
        </div>

        <!-- 通知列表区域 - 使用 ElCard 和 ElCheckbox 组件 -->
        <el-card class="notifications-list" shadow="hover">
          <div
              v-for="(item, index) in filteredNotifications"
              :key="item.id"
              class="notification-item"
              :class="{ 'unread': !item.read }"
          >
            <!-- 通知图标 - 使用 ElTag 组件模拟圆形图标 -->
            <el-tag
                :class="`notification-icon ${item.type}`"
                :style="{
                backgroundColor: getIconColor(item.type),
                color: 'white',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }"
            >
              <i :class="getIconClass(item.type)"></i>
            </el-tag>

            <div class="notification-content">
              <div class="notification-header">
                <div class="notification-title">{{ item.title }}</div>
                <div class="notification-meta">
                  <span class="notification-sender">{{ item.sender }}</span>
                  <span class="notification-time">{{ item.time }}</span>
                </div>
              </div>
              <div class="notification-text">{{ item.content }}</div>
            </div>

            <!-- 复选框 - 使用 ElCheckbox 组件 -->
            <el-checkbox
                v-model="item.selected"
                class="notification-checkbox"
                @change="handleSingleSelect"
            ></el-checkbox>
          </div>

          <!-- 空状态提示 - 使用 ElEmpty 组件 -->
          <el-empty
              v-if="filteredNotifications.length === 0"
              description="暂无通知"
              :image-size="100"
          ></el-empty>
        </el-card>

        <!-- 通知设置区域 - 使用 ElCard 和 ElSwitch 组件 -->
        <el-card class="notification-settings" shadow="hover" :body-style="{ padding: '20px' }">
          <h2 class="settings-title">通知设置</h2>
          <el-form :model="settings" class="settings-list">
            <el-form-item
                v-for="(value, key) in settings"
                :key="key"
                class="setting-item"
                :label="getSettingLabel(key)"
                :label-width="120"
            >
              <template #label>
                <div class="setting-info">
                  <div class="setting-name">{{ getSettingLabel(key) }}</div>
                  <div class="setting-description">{{ getSettingDesc(key) }}</div>
                </div>
              </template>
              <el-switch
                  v-model="settings[key]"
                  :active-color="#5a2ca0"
              ></el-switch>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </main>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import {
  ElMenu, ElMenuItem, ElInput, ElBadge, ElButton, ElDropdown,
  ElDropdownMenu, ElDropdownItem, ElAvatar, ElTabs, ElTabPane,
  ElCheckbox, ElCard, ElEmpty, ElForm, ElFormItem, ElSwitch, ElTag
} from 'element-plus';

export default defineComponent({
  name: 'NotificationCenterV2',
  components: {
    ElMenu, ElMenuItem, ElInput, ElBadge, ElButton, ElDropdown,
    ElDropdownMenu, ElDropdownItem, ElAvatar, ElTabs, ElTabPane,
    ElCheckbox, ElCard, ElEmpty, ElForm, ElFormItem, ElSwitch, ElTag
  },
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
    // 标签页切换处理
    handleTabChange(newTab) {
      this.currentTab = newTab;
    },
    // 全选切换
    toggleSelectAll() {
      this.notifications.forEach(notification => {
        notification.selected = this.selectAll;
      });
    },
    // 单个选中处理
    handleSingleSelect() {
      this.selectAll = this.notifications.length > 0 &&
          this.notifications.every(notification => notification.selected);
    },
    // 标记选中为已读
    markSelectedAsRead() {
      this.notifications.forEach(notification => {
        if (notification.selected) {
          notification.read = true;
        }
      });
      this.selectAll = false;
    },
    // 删除选中通知
    deleteSelectedNotifications() {
      this.notifications = this.notifications.filter(notification => !notification.selected);
      this.selectAll = false;
    },
    // 清空所有通知
    clearAllNotifications() {
      this.$confirm('确定要清空所有通知吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.notifications = [];
        this.selectAll = false;
        this.$message({
          type: 'success',
          message: '清空成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消清空'
        });
      });
    },
    // 获取通知图标颜色
    getIconColor(type) {
      const colorMap = {
        system: '#1890ff',
        important: '#fa8c16',
        success: '#52c41a',
        error: '#f5222d'
      };
      return colorMap[type] || '#1890ff';
    },
    // 获取通知图标类名
    getIconClass(type) {
      const iconMap = {
        system: 'fa fa-info-circle',
        important: 'fa fa-exclamation-triangle',
        success: 'fa fa-check-circle',
        error: 'fa fa-exclamation-circle'
      };
      return iconMap[type] || 'fa fa-info-circle';
    },
    // 获取设置项标签
    getSettingLabel(key) {
      const labelMap = {
        systemNotification: '系统通知',
        importantNotification: '重要提醒',
        successNotification: '成功通知',
        errorNotification: '错误提醒',
        emailNotification: '邮件通知',
        autoDelete: '通知自动删除'
      };
      return labelMap[key] || '';
    },
    // 获取设置项描述
    getSettingDesc(key) {
      const descMap = {
        systemNotification: '接收平台系统更新、维护等重要通知',
        importantNotification: '接收教案审核、会议等重要事项提醒',
        successNotification: '接收操作成功的反馈通知',
        errorNotification: '接收操作失败或异常的提醒',
        emailNotification: '同时通过邮件接收重要通知',
        autoDelete: '30天后自动删除已读通知'
      };
      return descMap[key] || '';
    }
  },
  computed: {
    // 过滤通知列表
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
        this.selectAll = this.notifications.length > 0 &&
            this.notifications.every(notification => notification.selected);
      }
    }
  }
});
</script>

<style scoped>
/* 基础样式 */
.notification-center-v2 {
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

.el-menu-item.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.el-menu-item.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.el-menu-item.nav-item.is-active {
  background-color: rgba(255, 255, 255, 0.2);
  border-left: 4px solid white;
}

.el-menu-item.nav-item i {
  font-size: 18px;
  margin-right: 10px;
  width: 20px;
  text-align: center;
}

/* 右侧主内容区样式 */
.main-content {
  flex: 1;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
}

.el-header.top-nav {
  padding: 0 20px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
}

.search-box {
  width: 300px;
}

.user-actions {
  display: flex;
  align-items: center;
}

.action-btn {
  font-size: 18px;
  margin-left: 15px;
  color: #666;
}

.action-badge {
  margin-left: 15px;
}

.user-profile {
  display: flex;
  align-items: center;
  margin-left: 20px;
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

/* 页面标题与标签页样式 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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
  color: #666;
}

.el-tabs.tab-navigation {
  width: auto;
  margin-bottom: 10px;
}

.el-tabs__nav {
  border-bottom: none;
}

.el-tab-pane.tab-item {
  margin-left: 20px;
}

.el-tab-pane.tab-item:first-child {
  margin-left: 0;
}

.el-tabs__item {
  font-size: 14px;
  color: #666;
  padding: 10px 0;
  position: relative;
}

.el-tabs__item.is-active {
  color: #5a2ca0;
  font-weight: bold;
}

.el-tabs__item.is-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #5a2ca0;
}

/* 操作栏样式 */
.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.batch-actions {
  display: flex;
  align-items: center;
}

.el-checkbox.select-all {
  margin-right: 15px;
  font-size: 14px;
  color: #666;
}

.secondary-btn {
  margin-right: 10px;
  color: #666;
  border: 1px solid #ddd;
  background-color: #f5f7fa;
}

.secondary-btn:hover {
  background-color: #eee;
  color: #666;
  border-color: #ddd;
}

/* 通知列表区域样式 */
.el-card.notifications-list {
  border-radius: 8px;
  margin-bottom: 30px;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  border-bottom: 1px solid #f5f7fa;
  transition: background-color 0.3s;
}

.notification-item:hover {
  background-color: #f9f9f9;
}

.notification-item.unread {
  background-color: #f9f0ff;
  border-left: 3px solid #5a2ca0;
}

.notification-icon {
  margin-right: 15px;
  flex-shrink: 0;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5px;
}

.notification-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-right: 10px;
}

.notification-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.notification-sender {
  font-size: 12px;
  color: #999;
  margin-bottom: 2px;
}

.notification-time {
  font-size: 12px;
  color: #999;
}

.notification-text {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.notification-checkbox {
  display: flex;
  align-items: flex-start;
  margin-left: 15px;
  padding-top: 3px;
}

/* 通知设置区域样式 */
.el-card.notification-settings {
  border-radius: 8px;
}

.settings-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.el-form.settings-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
}

.el-form-item.setting-item {
  margin-bottom: 0;
  border-bottom: 1px solid #f5f7fa;
  padding: 15px 0;
}

.el-form-item.setting-item:last-child {
  border-bottom: none;
}

.setting-info {
  flex: 1;
}

.setting-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
}

.setting-description {
  font-size: 12px;
  color: #666;
}

.el-switch {
  --el-switch-on-color: #5a2ca0;
}
</style>