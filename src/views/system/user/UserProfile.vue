<template>
  <div class="basic-info-module">
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
          <li class="nav-item active">
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
        <!-- 页面标题 -->
        <div class="page-title">
          <h1>基本信息</h1>
          <p>管理您的个人信息、账号安全及隐私设置</p>
        </div>

        <!-- 标签页导航 -->
        <div class="tabs-nav">
          <button class="tab-btn" :class="{ active: activeTab === 'profile' }" @click="switchTab('profile')">
            <span>个人资料</span>
            <div class="tab-indicator" :class="{ show: activeTab === 'profile' }"></div>
          </button>
          <button class="tab-btn" :class="{ active: activeTab === 'security' }" @click="switchTab('security')">
            <span>账号安全</span>
            <div class="tab-indicator" :class="{ show: activeTab === 'security' }"></div>
          </button>
          <button class="tab-btn" :class="{ active: activeTab === 'login-log' }" @click="switchTab('login-log')">
            <span>登录日志</span>
            <div class="tab-indicator" :class="{ show: activeTab === 'login-log' }"></div>
          </button>
        </div>

        <!-- 标签页内容 -->
        <div class="tab-content">
          <!-- 个人资料标签页 -->
          <div v-if="activeTab === 'profile'" class="profile-tab">
            <!-- 查看模式 -->
            <div v-if="!isEditing" class="view-mode">
              <div class="card profile-card">
                <div class="card-body">
                  <div class="profile-header">
                    <div class="avatar">
                      <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="教师头像">
                    </div>
                    <div class="profile-actions">
                      <button class="btn edit-btn" @click="toggleEditMode">编辑信息</button>
                    </div>
                  </div>
                  
                  <div class="profile-intro">
                    <h3>个人简介</h3>
                    <p>
                      数学教育专业毕业，拥有8年教学经验，专注于初中数学教学。曾获得市级优秀教师称号，
                      擅长激发学生学习兴趣，培养学生的数学思维能力。
                    </p>
                  </div>
                  
                  <div class="profile-details">
                    <div class="detail-row">
                      <div class="detail-item">
                        <div class="detail-label">姓名</div>
                        <div class="detail-value">张三</div>
                      </div>
                      <div class="detail-item">
                        <div class="detail-label">昵称</div>
                        <div class="detail-value">数学达人</div>
                      </div>
                      <div class="detail-item">
                        <div class="detail-label">性别</div>
                        <div class="detail-value">女</div>
                      </div>
                      <div class="detail-item">
                        <div class="detail-label">出生日期</div>
                        <div class="detail-value">1985-06-15</div>
                      </div>
                    </div>
                    <div class="detail-row">
                      <div class="detail-item">
                        <div class="detail-label">手机号码</div>
                        <div class="detail-value">138****5678</div>
                      </div>
                      <div class="detail-item">
                        <div class="detail-label">电子邮箱</div>
                        <div class="detail-value">zhangsan@example.com</div>
                      </div>
                      <div class="detail-item">
                        <div class="detail-label">所属部门</div>
                        <div class="detail-value">初中部</div>
                      </div>
                      <div class="detail-item">
                        <div class="detail-label">教龄</div>
                        <div class="detail-value">8年</div>
                      </div>
                    </div>
                    <div class="detail-row">
                      <div class="detail-item">
                        <div class="detail-label">任教学科</div>
                        <div class="detail-value">数学</div>
                      </div>
                      <div class="detail-item">
                        <div class="detail-label">职称</div>
                        <div class="detail-value">高级教师</div>
                      </div>
                      <div class="detail-item">
                        <div class="detail-label">入职时间</div>
                        <div class="detail-value">2017-09-01</div>
                      </div>
                      <div class="detail-item">
                        <div class="detail-label">最后登录时间</div>
                        <div class="detail-value">2025-07-20 09:30</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 编辑模式 -->
            <div v-if="isEditing" class="edit-mode">
              <div class="card edit-card">
                <div class="card-body">
                  <div class="form-group avatar-upload">
                    <label class="form-label">上传头像</label>
                    <div class="avatar-preview">
                      <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="预览头像">
                      <div class="avatar-placeholder" v-if="!avatarPreview">
                        <i class="fa fa-camera"></i>
                        <span>点击上传</span>
                      </div>
                    </div>
                    <div class="avatar-info">
                      <p>支持 JPG/PNG 格式，建议尺寸 200×200px，大小不超过 5MB</p>
                      <button class="btn upload-btn">选择图片</button>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">姓名 <span class="required">*</span></label>
                      <input type="text" class="form-input" value="张三" required>
                    </div>
                    <div class="form-group">
                      <label class="form-label">昵称</label>
                      <input type="text" class="form-input" value="数学达人">
                    </div>
                    <div class="form-group">
                      <label class="form-label">性别</label>
                      <select class="form-select">
                        <option value="female" selected>女</option>
                        <option value="male">男</option>
                        <option value="other">其他</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-label">出生日期</label>
                      <input type="date" class="form-input" value="1985-06-15">
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">手机号码 <span class="required">*</span></label>
                      <input type="tel" class="form-input" value="13812345678" required>
                    </div>
                    <div class="form-group">
                      <label class="form-label">电子邮箱</label>
                      <input type="email" class="form-input" value="zhangsan@example.com">
                    </div>
                    <div class="form-group">
                      <label class="form-label">所属部门</label>
                      <select class="form-select">
                        <option value="">请选择</option>
                        <option value="primary" selected>初中部</option>
                        <option value="junior">高中部</option>
                        <option value="senior">小学部</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-label">任教学科</label>
                      <select class="form-select">
                        <option value="">请选择</option>
                        <option value="math" selected>数学</option>
                        <option value="chinese">语文</option>
                        <option value="english">英语</option>
                        <option value="physics">物理</option>
                        <option value="chemistry">化学</option>
                      </select>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">职称</label>
                      <select class="form-select">
                        <option value="">请选择</option>
                        <option value="junior">初级教师</option>
                        <option value="intermediate">中级教师</option>
                        <option value="senior" selected>高级教师</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-label">入职时间</label>
                      <input type="date" class="form-input" value="2017-09-01">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">个人简介</label>
                    <textarea class="form-textarea" rows="4">
数学教育专业毕业，拥有8年教学经验，专注于初中数学教学。曾获得市级优秀教师称号，
擅长激发学生学习兴趣，培养学生的数学思维能力。
                    </textarea>
                  </div>

                  <div class="form-group">
                    <label class="form-label">教育经历</label>
                    <textarea class="form-textarea" rows="3">
2003-2007年 北京师范大学 数学教育专业 本科
2007-2010年 北京师范大学 数学教育专业 硕士
                    </textarea>
                  </div>

                  <div class="form-actions">
                    <button class="btn cancel-btn" @click="toggleEditMode">取消</button>
                    <button class="btn save-btn">保存修改</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 账号安全标签页 -->
          <div v-if="activeTab === 'security'" class="security-tab">
            <div class="card security-card">
              <div class="card-body">
                <div class="security-item">
                  <div class="security-info">
                    <div class="security-title">登录密码</div>
                    <div class="security-desc">
                      <span>密码强度：强</span>
                      <span class="separator">|</span>
                      <span>上次修改时间：2025-07-15</span>
                    </div>
                  </div>
                  <div class="security-actions">
                    <button class="btn action-btn">修改密码</button>
                    <span class="status-tag success">已设置</span>
                  </div>
                </div>

                <div class="security-item">
                  <div class="security-info">
                    <div class="security-title">绑定手机号码</div>
                    <div class="security-desc">
                      <span>138****5678</span>
                      <span class="separator">|</span>
                      <span>用于登录和安全验证</span>
                    </div>
                  </div>
                  <div class="security-actions">
                    <button class="btn action-btn">更换手机</button>
                    <span class="status-tag success">已绑定</span>
                  </div>
                </div>

                <div class="security-item">
                  <div class="security-info">
                    <div class="security-title">绑定电子邮箱</div>
                    <div class="security-desc">
                      <span>zhangsan@example.com</span>
                      <span class="separator">|</span>
                      <span>用于密码找回和重要通知</span>
                    </div>
                  </div>
                  <div class="security-actions">
                    <button class="btn action-btn">更换邮箱</button>
                    <span class="status-tag success">已绑定</span>
                  </div>
                </div>

                <div class="security-item">
                  <div class="security-info">
                    <div class="security-title">二次验证</div>
                    <div class="security-desc">
                      <span>开启后，登录时需要输入验证码，提高账号安全性</span>
                    </div>
                  </div>
                  <div class="security-actions">
                    <button class="btn action-btn">立即开启</button>
                    <span class="status-tag warning">未开启</span>
                  </div>
                </div>

                <div class="security-item">
                  <div class="security-info">
                    <div class="security-title">登录设备管理</div>
                    <div class="security-desc">
                      <span>查看当前登录的设备，可远程退出异常登录</span>
                    </div>
                  </div>
                  <div class="security-actions">
                    <button class="btn action-btn">管理设备</button>
                    <span class="status-tag info">查看</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 登录日志标签页 -->
          <div v-if="activeTab === 'login-log'" class="login-log-tab">
            <div class="card login-log-card">
              <div class="card-header">
                <div class="card-title">登录日志</div>
                <div class="record-count">共 24 条记录</div>
              </div>
              <div class="card-body">
                <div class="table-container">
                  <table class="login-log-table">
                    <thead>
                      <tr>
                        <th>登录时间</th>
                        <th>登录 IP</th>
                        <th>登录设备</th>
                        <th>状态</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2025-07-20 09:30:25</td>
                        <td>192.168.1.100</td>
                        <td>Windows 10, Chrome 114.0.0.0</td>
                        <td><span class="status success">成功</span></td>
                      </tr>
                      <tr>
                        <td>2025-07-19 16:45:12</td>
                        <td>192.168.1.100</td>
                        <td>Windows 10, Chrome 114.0.0.0</td>
                        <td><span class="status success">成功</span></td>
                      </tr>
                      <tr>
                        <td>2025-07-18 14:20:36</td>
                        <td>192.168.1.100</td>
                        <td>Windows 10, Chrome 114.0.0.0</td>
                        <td><span class="status success">成功</span></td>
                      </tr>
                      <tr>
                        <td>2025-07-17 08:15:42</td>
                        <td>192.168.1.100</td>
                        <td>Windows 10, Chrome 114.0.0.0</td>
                        <td><span class="status success">成功</span></td>
                      </tr>
                      <tr>
                        <td>2025-07-16 20:05:18</td>
                        <td>192.168.1.100</td>
                        <td>Windows 10, Chrome 114.0.0.0</td>
                        <td><span class="status success">成功</span></td>
                      </tr>
                      <tr>
                        <td>2025-07-15 11:30:05</td>
                        <td>192.168.1.101</td>
                        <td>macOS Monterey, Safari 15.5</td>
                        <td><span class="status danger">失败（密码错误）</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="load-more">
                  <button class="btn load-more-btn">加载更多</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部版权区 -->
      <footer class="footer">
        <div class="footer-content">
          <div class="copyright">
            <p>© 版权归智慧科技有限公司所有 ©2025 年 10 月 20 日</p>
          </div>
          <div class="footer-links">
            <a href="#">服务条款</a>
            <a href="#">个人信息保护</a>
            <a href="#">隐私中心</a>
          </div>
          <div class="contact">
            <div class="qrcode">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://example.com/contact" alt="联系我们二维码">
              <p>联系我们</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  </div>
</template>

<script>
export default {
  name: 'BasicInfoModule',
  data() {
    return {
      activeTab: 'profile', // 默认选中个人资料标签页
      isEditing: false, // 默认处于查看模式
      avatarPreview: 'https://randomuser.me/api/portraits/women/44.jpg' // 头像预览图
    };
  },
  methods: {
    // 切换标签页
    switchTab(tab) {
      this.activeTab = tab;
    },
    // 切换编辑/查看模式
    toggleEditMode() {
      this.isEditing = !this.isEditing;
    }
  }
};
</script>

<style scoped>
/* 全局样式 */
.basic-info-module {
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

/* 标签页导航 */
.tabs-nav {
  display: flex;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 20px;
}

.tab-btn {
  position: relative;
  padding: 12px 20px;
  background: none;
  border: none;
  font-size: 16px;
  color: #6c757d;
  cursor: pointer;
  margin-right: 10px;
}

.tab-btn.active {
  color: #6c63ff;
  font-weight: bold;
}

.tab-indicator {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #6c63ff;
  transform: scaleX(0);
  transition: transform 0.3s;
}

.tab-indicator.show {
  transform: scaleX(1);
}

/* 标签页内容 */
.tab-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* 卡片样式 */
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.card-header {
  padding: 15px 20px;
  border-bottom: 1px solid #f1f3f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.card-body {
  padding: 20px;
}

/* 个人资料标签页 */
.profile-card {
  background-color: #f8f9ff;
  border: 1px solid #e6e3ff;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.edit-btn {
  background-color: #6c63ff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.edit-btn:hover {
  background-color: #5a4bcf;
}

.profile-intro {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
}

.profile-intro h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.profile-intro p {
  color: #6c757d;
  line-height: 1.6;
}

.profile-details {
  margin-top: 20px;
}

.detail-row {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.detail-item {
  flex: 1;
  min-width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
}

.detail-label {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 5px;
}

.detail-value {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

/* 编辑模式 */
.edit-card {
  border: 1px solid #e6e3ff;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.required {
  color: #e63946;
}

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #6c63ff;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: #5a4bcf;
  box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.2);
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px 20px;
}

.form-row .form-group {
  flex: 1;
  min-width: 200px;
  padding: 0 10px;
  margin-bottom: 0;
}

.avatar-upload {
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
}

.avatar-preview {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px dashed #6c63ff;
  margin-right: 20px;
  position: relative;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #6c63ff;
  background-color: rgba(108, 99, 255, 0.05);
}

.avatar-placeholder i {
  font-size: 24px;
  margin-bottom: 5px;
}

.avatar-info {
  flex: 1;
}

.avatar-info p {
  font-size: 12px;
  color: #6c757d;
  margin-bottom: 10px;
}

.upload-btn {
  background-color: #f8f9ff;
  color: #6c63ff;
  border: 1px solid #6c63ff;
  border-radius: 6px;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.upload-btn:hover {
  background-color: #e6e3ff;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}

.cancel-btn {
  background-color: #f1f3f5;
  color: #6c757d;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
  transition: background-color 0.3s;
}

.cancel-btn:hover {
  background-color: #e9ecef;
}

.save-btn {
  background-color: #6c63ff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.save-btn:hover {
  background-color: #5a4bcf;
}

/* 账号安全标签页 */
.security-card {
  border: 1px solid #e9ecef;
}

.security-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f1f3f5;
}

.security-item:last-child {
  border-bottom: none;
}

.security-info {
  flex: 1;
}

.security-title {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
}

.security-desc {
  font-size: 14px;
  color: #6c757d;
}

.separator {
  margin: 0 10px;
  color: #adb5bd;
}

.security-actions {
  display: flex;
  align-items: center;
}

.action-btn {
  background-color: #f8f9ff;
  color: #6c63ff;
  border: 1px solid #6c63ff;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 0;
  margin-right: 15px;
  transition: background-color 0.3s;
}

.action-btn:hover {
  background-color: #e6e3ff;
}

.status-tag {
  padding: 3px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-tag.success {
  background-color: #e6f7ee;
  color: #4cae50;
}

.status-tag.warning {
  background-color: #fff3e0;
  color: #ff9800;
}

.status-tag.info {
  background-color: #e6f7ff;
  color: #1890ff;
}

/* 登录日志标签页 */
.login-log-card {
  border: 1px solid #e9ecef;
}

.record-count {
  font-size: 14px;
  color: #6c757d;
}

.table-container {
  overflow-x: auto;
}

.login-log-table {
  width: 100%;
  border-collapse: collapse;
}

.login-log-table th,
.login-log-table td {
  padding: 12px 15px;
  text-align: left;
  font-size: 14px;
}

.login-log-table th {
  background-color: #f8f9ff;
  color: #6c63ff;
  font-weight: 500;
}

.login-log-table tbody tr {
  border-bottom: 1px solid #f1f3f5;
}

.login-log-table tbody tr:last-child {
  border-bottom: none;
}

.status {
  padding: 3px 8px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status.success {
  background-color: #e6f7ee;
  color: #4cae50;
}

.status.danger {
  background-color: #fff1f0;
  color: #f5222d;
}

.load-more {
  text-align: center;
  padding: 15px 0;
}

.load-more-btn {
  background-color: #f8f9ff;
  color: #6c63ff;
  border: 1px solid #6c63ff;
  border-radius: 6px;
  padding: 8px 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.load-more-btn:hover {
  background-color: #e6e3ff;
}

/* 底部版权区 */
.footer {
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 20px;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.copyright p {
  font-size: 14px;
  color: #6c757d;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links a {
  font-size: 14px;
  color: #6c63ff;
  text-decoration: none;
}

.footer-links a:hover {
  text-decoration: underline;
}

.contact {
  display: flex;
  align-items: center;
}

.qrcode {
  text-align: center;
}

.qrcode img {
  width: 80px;
  height: 80px;
  margin-bottom: 5px;
}

.qrcode p {
  font-size: 12px;
  color: #6c757d;
}
</style>
