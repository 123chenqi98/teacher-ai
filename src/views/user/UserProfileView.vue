<script>
import { User, UserFilled, DataAnalysis, Aim, Bell, Notebook, QuestionFilled, Message, Folder, Setting, Search, Reading } from '@element-plus/icons-vue';
import router from "@/router/index.ts";
import LeftNavigationComponents from "@/components/user/LeftNavigationComponents.vue";
import TopNavigationComponents from "@/components/user/TopNavigationComponents.vue";

export default {
  name: 'BasicInfoModule',
  components: {
    TopNavigationComponents,
    LeftNavigationComponents, User, UserFilled, DataAnalysis, Aim, Bell, Notebook, QuestionFilled, Message, Folder, Setting, Search, Reading },
  data() {
    return {
      activeTab: 'profile',
      isEditing: false,
      avatarPreview: 'https://randomuser.me/api/portraits/women/44.jpg',
      searchText: '',
      form: {
        name: '张三',
        nickname: '数学达人',
        gender: 'female',
        birthDate: '1985-06-15',
        mobile: '13812345678',
        email: 'zhangsan@example.com',
        department: 'primary',
        subject: 'math',
        title: 'senior',
        entryDate: '2017-09-01',
        intro: '数学教育专业毕业，拥有8年教学经验，专注于初中数学教学。曾获得市级优秀教师称号，\n擅长激发学生学习兴趣，培养学生的数学思维能力。',
        education: '2003-2007年 北京师范大学 数学教育专业 本科\n2007-2010年 北京师范大学 数学教育专业 硕士'
      },
      departments: [
        { label: '初中部', value: 'primary' },
        { label: '高中部', value: 'junior' },
        { label: '小学部', value: 'senior' }
      ],
      subjects: [
        { label: '数学', value: 'math' },
        { label: '语文', value: 'chinese' },
        { label: '英语', value: 'english' },
        { label: '物理', value: 'physics' },
        { label: '化学', value: 'chemistry' }
      ],
      titles: [
        { label: '初级教师', value: 'junior' },
        { label: '中级教师', value: 'intermediate' },
        { label: '高级教师', value: 'senior' }
      ],
      loginLogs: [
        { time: '2025-07-20 09:30:25', ip: '192.168.1.100', device: 'Windows 10, Chrome 114.0.0.0', status: '成功' },
        { time: '2025-07-19 16:45:12', ip: '192.168.1.100', device: 'Windows 10, Chrome 114.0.0.0', status: '成功' },
        { time: '2025-07-18 14:20:36', ip: '192.168.1.100', device: 'Windows 10, Chrome 114.0.0.0', status: '成功' },
        { time: '2025-07-17 08:15:42', ip: '192.168.1.100', device: 'Windows 10, Chrome 114.0.0.0', status: '成功' },
        { time: '2025-07-16 20:05:18', ip: '192.168.1.100', device: 'Windows 10, Chrome 114.0.0.0', status: '成功' },
        { time: '2025-07-15 11:30:05', ip: '192.168.1.101', device: 'macOS Monterey, Safari 15.5', status: '失败（密码错误）' }
      ]
    };
  },
  methods: {
    router() {
      return router
    },
    toggleEditMode() {
      this.isEditing = !this.isEditing;
    }
  }
};
</script>

<template>
  <div class="basic-info-module">
    <left-navigation-components />

    <!-- 右侧主内容区 -->
    <main class="main-content">
      <top-navigation-components />

      <!-- 内容区域 -->
      <div class="content-area">
        <!-- 页面标题 -->
        <div class="page-title">
          <h1>基本信息</h1>
          <p>管理您的个人信息、账号安全及隐私设置</p>
        </div>

        <!-- 标签页导航（Element Plus） -->
        <el-tabs v-model="activeTab" class="tabs-nav">
          <el-tab-pane label="个人资料" name="profile" />
          <el-tab-pane label="账号安全" name="security" />
          <el-tab-pane label="登录日志" name="login-log" />
        </el-tabs>

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

            <!-- 编辑模式（Element Plus 表单） -->
            <div v-if="isEditing" class="edit-mode">
              <el-card class="edit-card" shadow="hover">
                <el-form :model="form" label-width="110px" class="el-form-grid">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="上传头像">
                        <div class="avatar-preview">
                          <el-avatar :src="avatarPreview" size="large" />
                          <div class="avatar-info">
                            <p>支持 JPG/PNG，建议 200×200px，≤5MB</p>
                            <el-upload action="#" :show-file-list="false">
                              <el-button type="primary">选择图片</el-button>
                            </el-upload>
                          </div>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20">
                    <el-col :span="6">
                      <el-form-item label="姓名" required>
                        <el-input v-model="form.name" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="昵称">
                        <el-input v-model="form.nickname" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="性别">
                        <el-select v-model="form.gender" placeholder="请选择">
                          <el-option label="女" value="female" />
                          <el-option label="男" value="male" />
                          <el-option label="其他" value="other" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="出生日期">
                        <el-date-picker v-model="form.birthDate" type="date" placeholder="选择日期" value-format="YYYY-MM-DD" />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20">
                    <el-col :span="6">
                      <el-form-item label="手机号码" required>
                        <el-input v-model="form.mobile" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="电子邮箱">
                        <el-input v-model="form.email" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="所属部门">
                        <el-select v-model="form.department" placeholder="请选择">
                          <el-option v-for="d in departments" :key="d.value" :label="d.label" :value="d.value" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="任教学科">
                        <el-select v-model="form.subject" placeholder="请选择">
                          <el-option v-for="s in subjects" :key="s.value" :label="s.label" :value="s.value" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20">
                    <el-col :span="6">
                      <el-form-item label="职称">
                        <el-select v-model="form.title" placeholder="请选择">
                          <el-option v-for="t in titles" :key="t.value" :label="t.label" :value="t.value" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="入职时间">
                        <el-date-picker v-model="form.entryDate" type="date" placeholder="选择日期" value-format="YYYY-MM-DD" />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-form-item label="个人简介">
                    <el-input v-model="form.intro" type="textarea" :rows="4" />
                  </el-form-item>

                  <el-form-item label="教育经历">
                    <el-input v-model="form.education" type="textarea" :rows="3" />
                  </el-form-item>

                  <div class="form-actions">
                    <el-button @click="toggleEditMode">取消</el-button>
                    <el-button type="primary">保存修改</el-button>
                  </div>
                </el-form>
              </el-card>
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
                    <el-button class="action-btn">修改密码</el-button>
                    <el-tag type="success">已设置</el-tag>
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
                    <el-button class="action-btn">更换手机</el-button>
                    <el-tag type="success">已绑定</el-tag>
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
                    <el-button class="action-btn">更换邮箱</el-button>
                    <el-tag type="success">已绑定</el-tag>
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
                    <el-button class="action-btn">立即开启</el-button>
                    <el-tag type="warning">未开启</el-tag>
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
                    <el-button class="action-btn">管理设备</el-button>
                    <el-tag type="info">查看</el-tag>
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
                  <el-table :data="loginLogs" style="width: 100%">
                    <el-table-column prop="time" label="登录时间" width="220" />
                    <el-table-column prop="ip" label="登录 IP" width="160" />
                    <el-table-column prop="device" label="登录设备" />
                    <el-table-column label="状态" width="160">
                      <template #default="scope">
                        <el-tag :type="scope.row.status === '成功' ? 'success' : 'danger'">{{ scope.row.status }}</el-tag>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div class="load-more">
                  <el-button class="load-more-btn">加载更多</el-button>
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






.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
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
