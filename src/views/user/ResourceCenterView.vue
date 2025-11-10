<template>
  <div class="resource-center">
    <!-- 左侧导航栏（Element Plus） -->
    <el-aside class="sidebar" width="240px">
      <div class="logo">
        <el-icon><Reading /></el-icon>
        <span>教师个人中心</span>
      </div>
      <el-menu router :default-active="router.path" class="nav-menu" :unique-opened="true">
        <el-menu-item index="/user/dashboard">
          <el-icon><User /></el-icon>
          <span>个人概览</span>
        </el-menu-item>
        <el-menu-item index="/user/profile">
          <el-icon><UserFilled /></el-icon>
          <span>基本信息</span>
        </el-menu-item>
        <el-menu-item index="/user/analytics">
          <el-icon><DataAnalysis /></el-icon>
          <span>数据统计</span>
        </el-menu-item>
        <el-menu-item index="/user/goals">
          <el-icon><Aim /></el-icon>
          <span>目标管理</span>
        </el-menu-item>
        <el-menu-item index="/user/notifications">
          <el-icon><Bell /></el-icon>
          <span>通知中心</span>
        </el-menu-item>
        <el-menu-item index="/user/lessonPlans">
          <el-icon><Notebook /></el-icon>
          <span>教案管理</span>
        </el-menu-item>
        <el-menu-item index="/user/questionBank">
          <el-icon><QuestionFilled /></el-icon>
          <span>学习题库</span>
        </el-menu-item>
        <el-menu-item index="/user/messages">
          <el-icon><Message /></el-icon>
          <span>消息中心</span>
        </el-menu-item>
        <el-menu-item index="/user/resources">
          <el-icon><Folder /></el-icon>
          <span>资源中心</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧主内容区 -->
    <main class="main-content">
      <!-- 顶部导航栏（Element Plus） -->
      <el-header class="top-nav">
        <el-input v-model="searchQuery" placeholder="搜索..." class="search-box" size="large">
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        <div class="user-actions">
          <el-badge :value="3" class="item">
            <el-button text circle>
              <el-icon><Bell /></el-icon>
            </el-button>
          </el-badge>
          <el-badge :value="5" class="item">
            <el-button text circle>
              <el-icon><Message /></el-icon>
            </el-button>
          </el-badge>
          <el-button text circle>
            <el-icon><Setting /></el-icon>
          </el-button>
          <div class="user-profile">
            <el-avatar src="https://randomuser.me/api/portraits/women/44.jpg" size="large" />
            <div class="user-info">
              <span class="user-name">张三老师</span>
              <span class="user-role">数学教师</span>
            </div>
          </div>
        </div>
      </el-header>

      <!-- 内容区域 -->
      <div class="content-area">
        <!-- 页面标题 -->
        <div class="page-title">
          <h1>资源中心</h1>
          <p>管理和分享您的教学资源</p>
        </div>

        <!-- 顶部数据概览卡片区 -->
        <div class="stats-cards">
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fa fa-file-text-o"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">89</div>
              <div class="stat-label">我的资源总数</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fa fa-star-o"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">15</div>
              <div class="stat-label">收藏资源</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fa fa-cloud-upload"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">36</div>
              <div class="stat-label">已上传资源</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">
              <i class="fa fa-download"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">53</div>
              <div class="stat-label">已下载资源</div>
            </div>
          </div>
        </div>

        <!-- 标签页与搜索筛选区（Element Plus） -->
        <div class="tab-search-filter">
          <el-tabs v-model="currentTab">
            <el-tab-pane label="我的资源" name="my-resources" />
            <el-tab-pane label="收藏资源" name="collections" />
            <el-tab-pane label="资源分类" name="categories" />
            <el-tab-pane label="上传资源" name="upload" />
          </el-tabs>
          <div class="search-filter">
            <el-input v-model="searchQuery" placeholder="搜索资源名称、类型..." @input="filterResources" class="search-box">
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
            <div class="filter-dropdowns">
              <el-select v-model="typeFilter" @change="filterResources" style="width: 160px; margin-right: 12px;">
                <el-option label="全部类型" value="all" />
                <el-option label="PPT" value="ppt" />
                <el-option label="文档" value="doc" />
                <el-option label="PDF" value="pdf" />
                <el-option label="视频" value="video" />
                <el-option label="图片" value="image" />
                <el-option label="音频" value="audio" />
              </el-select>
              <el-select v-model="sortFilter" @change="filterResources" style="width: 220px;">
                <el-option label="按时间排序（新→旧）" value="time-desc" />
                <el-option label="按时间排序（旧→新）" value="time-asc" />
                <el-option label="按大小排序（大→小）" value="size-desc" />
                <el-option label="按大小排序（小→大）" value="size-asc" />
              </el-select>
            </div>
            <el-button type="primary" class="new-folder-btn" @click="showCreateFolderModal">
              <el-icon><Folder /></el-icon>
              新建文件夹
            </el-button>
          </div>
        </div>

        <!-- 内容区域 - 根据当前标签页显示不同内容 -->
        <div class="tab-content">
          <!-- 我的资源标签页内容 -->
          <div v-if="currentTab === 'my-resources'" class="my-resources-content">
            <!-- 我的文件夹区域 -->
            <div class="folders-section">
              <h2 class="section-title">我的文件夹</h2>
              <div class="folders-grid">
                <div class="folder-card" v-for="folder in folders" :key="folder.id" @click="openFolder(folder.id)">
                  <div class="folder-icon">
                    <i class="fa fa-folder"></i>
                  </div>
                  <div class="folder-info">
                    <div class="folder-name">{{ folder.name }}</div>
                    <div class="folder-size">{{ folder.fileCount }} 个文件・{{ folder.size }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 最近文件区域 -->
            <div class="recent-files-section">
              <h2 class="section-title">最近文件</h2>
              <div class="files-table">
                <table>
                  <thead>
                    <tr>
                      <th class="file-name">文件名</th>
                      <th class="file-type">类型</th>
                      <th class="file-size">大小</th>
                      <th class="file-time">上传时间</th>
                      <th class="file-actions">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="file in filteredRecentFiles" :key="file.id">
                      <td class="file-name">
                        <div class="file-icon">
                          <i :class="file.iconClass"></i>
                        </div>
                        <div class="file-title">{{ file.name }}</div>
                      </td>
                      <td class="file-type">{{ file.type }}</td>
                      <td class="file-size">{{ file.size }}</td>
                      <td class="file-time">{{ file.time }}</td>
                      <td class="file-actions">
                        <button class="action-btn download-btn" @click="downloadFile(file.id)">
                          <i class="fa fa-download"></i>
                        </button>
                        <button class="action-btn share-btn" @click="shareFile(file.id)">
                          <i class="fa fa-share-alt"></i>
                        </button>
                        <button class="action-btn delete-btn" @click="deleteFile(file.id)">
                          <i class="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 收藏资源标签页内容 -->
          <div v-if="currentTab === 'collections'" class="collections-content">
            <h2 class="section-title">收藏的资源</h2>
            <div class="collections-grid">
              <div class="collection-card" v-for="resource in filteredCollections" :key="resource.id">
                <div class="resource-icon">
                  <i :class="resource.iconClass"></i>
                </div>
                <div class="resource-info">
                  <div class="resource-name">{{ resource.name }}</div>
                  <div class="resource-desc">{{ resource.description }}</div>
                  <div class="resource-size">{{ resource.size }}</div>
                </div>
                <div class="resource-actions">
                  <button class="btn secondary-btn uncollect-btn" @click="uncollectResource(resource.id)">
                    <i class="fa fa-star-o"></i>
                    <span>取消收藏</span>
                  </button>
                  <button class="btn primary-btn share-btn" @click="shareResource(resource.id)">
                    <i class="fa fa-share-alt"></i>
                    <span>分享</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 资源分类标签页内容 -->
          <div v-if="currentTab === 'categories'" class="categories-content">
            <h2 class="section-title">资源分类</h2>
            <div class="categories-list">
              <div class="category-item" v-for="category in categories" :key="category.id">
                <div class="category-icon">
                  <i :class="category.iconClass"></i>
                </div>
                <div class="category-info">
                  <div class="category-name">{{ category.name }}</div>
                  <div class="category-count">{{ category.resourceCount }} 个资源</div>
                </div>
                <div class="category-progress">
                  <div class="progress-bar" :style="{ width: category.progress + '%' }"></div>
                </div>
              </div>
            </div>

            <!-- 热门资源推荐区域 -->
            <div class="popular-resources-section">
              <h2 class="section-title">热门资源推荐</h2>
              <div class="popular-resources-table">
                <table>
                  <thead>
                    <tr>
                      <th class="resource-name">资源名称</th>
                      <th class="resource-type">类型</th>
                      <th class="resource-time">上传时间</th>
                      <th class="resource-downloads">下载量</th>
                      <th class="resource-actions">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="resource in filteredPopularResources" :key="resource.id">
                      <td class="resource-name">
                        <div class="resource-icon">
                          <i :class="resource.iconClass"></i>
                        </div>
                        <div class="resource-title">{{ resource.name }}</div>
                      </td>
                      <td class="resource-type">{{ resource.type }}</td>
                      <td class="resource-time">{{ resource.time }}</td>
                      <td class="resource-downloads">{{ resource.downloads }}</td>
                      <td class="resource-actions">
                        <button class="action-btn download-btn" @click="downloadResource(resource.id)">
                          <i class="fa fa-download"></i>
                          <span>下载</span>
                        </button>
                        <button class="action-btn collect-btn" @click="collectResource(resource.id)">
                          <i class="fa fa-star-o"></i>
                          <span>收藏</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 上传资源标签页内容 -->
          <div v-if="currentTab === 'upload'" class="upload-content">
            <!-- 拖拽上传区 -->
            <div class="upload-area">
              <div class="upload-box" @click="selectFiles" @dragover.prevent @drop.prevent="handleDrop">
                <div class="upload-icon">
                  <i class="fa fa-cloud-upload"></i>
                </div>
                <div class="upload-text">
                  <p>点击或拖拽文件至此处上传</p>
                  <p>支持 PPT、DOC、PDF、视频等格式，单个文件不超过 10GB</p>
                </div>
                <button class="btn primary-btn select-files-btn">
                  <span>选择文件</span>
                </button>
                <input type="file" ref="fileInput" class="file-input" multiple @change="handleFileSelect">
              </div>
            </div>

            <!-- 上传进度条 -->
            <div class="upload-progress-section" v-if="uploadingFiles.length > 0">
              <h2 class="section-title">上传进度</h2>
              <div class="progress-list">
                <div class="progress-item" v-for="file in uploadingFiles" :key="file.id">
                  <div class="file-info">
                    <div class="file-name">{{ file.name }}</div>
                    <div class="file-size">{{ file.size }}</div>
                  </div>
                  <div class="progress-bar-container">
                    <div class="progress-bar" :style="{ width: file.progress + '%', backgroundColor: file.progressColor }"></div>
                  </div>
                  <div class="progress-info">
                    <div class="progress-percentage">{{ file.progress }}%</div>
                    <div class="progress-time">{{ file.remainingTime }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 上传设置 -->
            <div class="upload-settings-section">
              <h2 class="section-title">上传设置</h2>
              <div class="settings-form">
                <div class="form-group">
                  <label class="form-label">资源分类</label>
                  <select class="form-select" v-model="uploadForm.category">
                    <option value="ppt">PPT课件</option>
                    <option value="document">教案文档</option>
                    <option value="video">教学视频</option>
                    <option value="exam">考试题库</option>
                    <option value="image">素材图片</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">所属文件夹</label>
                  <select class="form-select" v-model="uploadForm.folder">
                    <option value="">无（根目录）</option>
                    <option v-for="folder in folders" :value="folder.id" :key="folder.id">{{ folder.name }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">资源描述</label>
                  <textarea class="form-textarea" v-model="uploadForm.description" placeholder="请输入资源描述..."></textarea>
                </div>
                <div class="form-group">
                  <label class="form-label">分享设置</label>
                  <div class="radio-group">
                    <label class="radio-item">
                      <input type="radio" name="shareSetting" value="private" v-model="uploadForm.shareSetting">
                      <span>仅自己可见</span>
                    </label>
                    <label class="radio-item">
                      <input type="radio" name="shareSetting" value="group" v-model="uploadForm.shareSetting">
                      <span>同组教师可见</span>
                    </label>
                    <label class="radio-item">
                      <input type="radio" name="shareSetting" value="public" v-model="uploadForm.shareSetting">
                      <span>全校教师可见</span>
                    </label>
                  </div>
                </div>
                <button class="btn primary-btn save-settings-btn" @click="saveUploadSettings">
                  <i class="fa fa-save"></i>
                  <span>保存设置</span>
                </button>
              </div>
            </div>

            <!-- 上传历史 -->
            <div class="upload-history-section">
              <h2 class="section-title">上传历史</h2>
              <div class="history-table">
                <table>
                  <thead>
                    <tr>
                      <th class="history-name">文件名</th>
                      <th class="history-time">上传时间</th>
                      <th class="history-status">状态</th>
                      <th class="history-actions">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="history in uploadHistory" :key="history.id">
                      <td class="history-name">
                        <div class="file-icon">
                          <i :class="history.iconClass"></i>
                        </div>
                        <div class="file-title">{{ history.name }}</div>
                      </td>
                      <td class="history-time">{{ history.time }}</td>
                      <td class="history-status">
                        <span :class="history.statusClass">{{ history.status }}</span>
                      </td>
                      <td class="history-actions">
                        <button class="action-btn view-btn" @click="viewFile(history.id)" v-if="history.status === '成功'">
                          <i class="fa fa-eye"></i>
                          <span>查看</span>
                        </button>
                        <button class="action-btn share-btn" @click="shareFile(history.id)" v-if="history.status === '成功'">
                          <i class="fa fa-share-alt"></i>
                          <span>分享</span>
                        </button>
                        <button class="action-btn retry-btn" @click="retryUpload(history.id)" v-if="history.status === '失败'">
                          <i class="fa fa-refresh"></i>
                          <span>重新上传</span>
                        </button>
                        <button class="action-btn delete-btn" @click="deleteHistory(history.id)">
                          <i class="fa fa-trash"></i>
                          <span>删除记录</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


<script>
import { 
  User, UserFilled, DataAnalysis, Aim, Bell, Notebook, QuestionFilled, Message, Folder, Setting, Search, Reading
} from '@element-plus/icons-vue';
import router from "@/router/index.js";

export default {
  name: 'ResourceCenter',
  components: { User, UserFilled, DataAnalysis, Aim, Bell, Notebook, QuestionFilled, Message, Folder, Setting, Search, Reading },
  data() {
    return {
      currentTab: 'my-resources',
      searchQuery: '',
      typeFilter: 'all',
      sortFilter: 'time-desc',
      showCreateFolderModal: false,
      newFolderName: '',
      newFolderParent: '',
      uploadForm: {
        category: 'ppt',
        folder: '',
        description: '',
        shareSetting: 'private'
      },
      folders: [
        { id: 1, name: '数学 PPT 课件', fileCount: 12, size: '3.2GB' },
        { id: 2, name: '教案文档', fileCount: 8, size: '1.8GB' },
        { id: 3, name: '教学视频', fileCount: 5, size: '12.5GB' },
        { id: 4, name: '考试题库', fileCount: 20, size: '0.9GB' },
        { id: 5, name: '素材图片', fileCount: 35, size: '2.1GB' }
      ],
      recentFiles: [
        { id: 1, name: '二次函数复习课件.pptx', type: 'PPT', size: '12MB', time: '2023-07-20 14:30', iconClass: 'fa fa-file-powerpoint-o' },
        { id: 2, name: '平行四边形的性质与判定教案.docx', type: '文档', size: '8MB', time: '2023-07-19 09:15', iconClass: 'fa fa-file-word-o' },
        { id: 3, name: '三角函数的图像与性质.pdf', type: 'PDF', size: '5MB', time: '2023-07-18 16:45', iconClass: 'fa fa-file-pdf-o' },
        { id: 4, name: '一元二次方程解法教学视频.mp4', type: '视频', size: '256MB', time: '2023-07-17 11:20', iconClass: 'fa fa-file-video-o' },
        { id: 5, name: '几何图形辅助线教学图片.png', type: '图片', size: '2MB', time: '2023-07-16 15:50', iconClass: 'fa fa-file-image-o' }
      ],
      collections: [
        { id: 1, name: '几何辅助线课件.pptx', description: '详细介绍几何辅助线的添加方法和技巧', size: '15MB', iconClass: 'fa fa-file-powerpoint-o' },
        { id: 2, name: '初中数学总复习资料.docx', description: '全面的初中数学知识点总结和例题解析', size: '10MB', iconClass: 'fa fa-file-word-o' },
        { id: 3, name: '数学思想方法讲座.pdf', description: '介绍数学解题中的常用思想方法', size: '8MB', iconClass: 'fa fa-file-pdf-o' },
        { id: 4, name: '函数图像绘制技巧视频.mp4', description: '详细讲解各类函数图像的绘制方法和技巧', size: '180MB', iconClass: 'fa fa-file-video-o' }
      ],
      categories: [
        { id: 1, name: 'PPT课件', resourceCount: 32, progress: 75, iconClass: 'fa fa-file-powerpoint-o' },
        { id: 2, name: '教案文档', resourceCount: 25, progress: 60, iconClass: 'fa fa-file-word-o' },
        { id: 3, name: '教学视频', resourceCount: 15, progress: 40, iconClass: 'fa fa-file-video-o' },
        { id: 4, name: '考试题库', resourceCount: 40, progress: 85, iconClass: 'fa fa-file-text-o' },
        { id: 5, name: '素材图片', resourceCount: 30, progress: 70, iconClass: 'fa fa-file-image-o' }
      ],
      popularResources: [
        { id: 1, name: '初中数学总复习课件.pptx', type: 'PPT', time: '2023-07-15', downloads: 128, iconClass: 'fa fa-file-powerpoint-o' },
        { id: 2, name: '数学思维训练方法.docx', type: '文档', time: '2023-07-10', downloads: 96, iconClass: 'fa fa-file-word-o' },
        { id: 3, name: '中考数学真题解析.pdf', type: 'PDF', time: '2023-07-05', downloads: 85, iconClass: 'fa fa-file-pdf-o' },
        { id: 4, name: '数学公式推导视频.mp4', type: '视频', time: '2023-06-28', downloads: 72, iconClass: 'fa fa-file-video-o' },
        { id: 5, name: '几何证明题解题思路分析.pptx', type: 'PPT', time: '2023-06-20', downloads: 65, iconClass: 'fa fa-file-powerpoint-o' }
      ],
      uploadingFiles: [
        { id: 1, name: '统计图表制作教程.pptx', size: '25MB', progress: 75, remainingTime: '00:15', progressColor: '#5a2ca0' },
        { id: 2, name: '概率与统计教案.docx', size: '12MB', progress: 45, remainingTime: '00:30', progressColor: '#52c41a' }
      ],
      uploadHistory: [
        { id: 1, name: '立体几何教学课件.pptx', time: '2023-07-19 14:30', status: '成功', statusClass: 'status-success', iconClass: 'fa fa-file-powerpoint-o' },
        { id: 2, name: '数据分析方法教案.docx', time: '2023-07-18 09:15', status: '成功', statusClass: 'status-success', iconClass: 'fa fa-file-word-o' },
        { id: 3, name: '数学建模案例视频.mp4', time: '2023-07-17 16:45', status: '失败', statusClass: 'status-error', iconClass: 'fa fa-file-video-o' },
        { id: 4, name: '函数性质练习题.pdf', time: '2023-07-16 11:20', status: '成功', statusClass: 'status-success', iconClass: 'fa fa-file-pdf-o' }
      ]
    };
  },
  methods: {
    router() {
      return router
    },
    filterResources() {
      // 实际应用中这里会根据搜索词和筛选条件过滤资源
      console.log('过滤资源:', this.searchQuery, this.typeFilter, this.sortFilter);
    },
    showCreateFolderModal() {
      this.showCreateFolderModal = true;
    },
    openFolder(folderId) {
      console.log('打开文件夹:', folderId);
      // 实际应用中这里会打开文件夹并显示其中的文件
    },
    downloadFile(fileId) {
      console.log('下载文件:', fileId);
      // 实际应用中这里会触发文件下载
    },
    shareFile(fileId) {
      console.log('分享文件:', fileId);
      // 实际应用中这里会打开分享对话框
    },
    deleteFile(fileId) {
      if (confirm('确定要删除这个文件吗？')) {
        this.recentFiles = this.recentFiles.filter(file => file.id !== fileId);
        alert('文件删除成功');
      }
    },
    uncollectResource(resourceId) {
      console.log('取消收藏资源:', resourceId);
      // 实际应用中这里会取消收藏资源
      this.collections = this.collections.filter(resource => resource.id !== resourceId);
      alert('已取消收藏');
    },
    shareResource(resourceId) {
      console.log('分享资源:', resourceId);
      // 实际应用中这里会打开分享对话框
    },
    downloadResource(resourceId) {
      console.log('下载资源:', resourceId);
      // 实际应用中这里会触发资源下载
    },
    collectResource(resourceId) {
      console.log('收藏资源:', resourceId);
      // 实际应用中这里会收藏资源
      const resource = this.popularResources.find(r => r.id === resourceId);
      if (resource) {
        this.collections.push({
          id: this.collections.length + 1,
          name: resource.name,
          description: `${resource.type}资源`,
          size: '未知',
          iconClass: resource.iconClass
        });
        alert('收藏成功');
      }
    },
    selectFiles() {
      // 修复：添加了 ref 属性并正确引用
      this.$refs.fileInput.click();
    },
    handleFileSelect(event) {
      const files = event.target.files;
      if (files.length > 0) {
        console.log('选择了文件:', files);
        // 实际应用中这里会处理文件选择
      }
    },
    handleDrop(event) {
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        console.log('拖拽了文件:', files);
        // 实际应用中这里会处理拖拽文件
      }
    },
    saveUploadSettings() {
      console.log('保存上传设置:', this.uploadForm);
      // 实际应用中这里会保存上传设置
      alert('上传设置已保存');
    },
    viewFile(fileId) {
      console.log('查看文件:', fileId);
      // 实际应用中这里会打开文件预览
    },
    retryUpload(historyId) {
      console.log('重新上传:', historyId);
      // 实际应用中这里会重新上传文件
    },
    deleteHistory(historyId) {
      if (confirm('确定要删除这条上传记录吗？')) {
        this.uploadHistory = this.uploadHistory.filter(history => history.id !== historyId);
        alert('上传记录已删除');
      }
    }
  },
  computed: {
    filteredRecentFiles() {
      // 实际应用中这里会根据搜索词和筛选条件过滤最近文件
      return this.recentFiles;
    },
    filteredCollections() {
      // 实际应用中这里会根据搜索词和筛选条件过滤收藏资源
      return this.collections;
    },
    filteredPopularResources() {
      // 实际应用中这里会根据搜索词和筛选条件过滤热门资源
      return this.popularResources;
    }
  }
};
</script>

<style scoped>
/* 基础样式 */
.resource-center {
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

.nav-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}



.nav-item i {
  font-size: 18px;
  margin-right: 10px;
  width: 20px;
  text-align: center;
}

.nav-item span {
  font-size: 14px;
}

/* 右侧主内容区样式 */
.main-content {
  flex: 1;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
}

/* 顶部导航栏样式 */
.top-nav {
  height: 60px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.top-nav .search-box {
  display: flex;
  align-items: center;
  background-color: #f5f7fa;
  border-radius: 20px;
  padding: 0 15px;
  width: 300px;
}

.top-nav .search-box i {
  color: #999;
  margin-right: 10px;
}

.top-nav .search-box input {
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  height: 36px;
}

.user-actions {
  display: flex;
  align-items: center;
}

.action-btn {
  background: none;
  border: none;
  color: #666;
  font-size: 18px;
  margin-left: 15px;
  cursor: pointer;
  position: relative;
}


.user-profile {
  display: flex;
  align-items: center;
  margin-left: 20px;
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

/* 页面标题样式 */
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
  color: #666;
}

/* 顶部数据概览卡片区样式 */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.stat-card {
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  background: white linear-gradient(135deg, #f0f5ff 0%, #e6f7ff 100%);
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #5a2ca0;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

/* 标签页与搜索筛选区样式 */
.tab-search-filter {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.tab-item span {
  font-size: 14px;
  color: #666;
  padding: 10px 0;
  display: inline-block;
}

.tab-item.active span {
  color: #5a2ca0;
  font-weight: bold;
}



.search-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-filter .search-box {
  flex: 1;
  max-width: 400px;
  display: flex;
  align-items: center;
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 0 15px;
  height: 36px;
}

.search-filter .search-box i {
  color: #999;
  margin-right: 10px;
}

.search-filter .search-box input {
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  height: 100%;
}

.filter-dropdowns {
  display: flex;
  margin-left: 15px;
}


.new-folder-btn {
  margin-left: 15px;
}

/* 按钮样式 */
.btn {
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
}

.btn i {
  margin-right: 5px;
}

.primary-btn {
  background-color: #5a2ca0;
  color: white;
  border: none;
}

.primary-btn:hover {
  background-color: #4a2486;
}

.secondary-btn {
  background-color: #f5f7fa;
  color: #666;
  border: 1px solid #ddd;
}

.secondary-btn:hover {
  background-color: #eee;
}

/* 内容区域 - 我的资源标签页样式 */
.my-resources-content {
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

/* 我的文件夹区域样式 */
.folders-section {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.folders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.folder-card {
  background-color: #fffbe6;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  border: 1px solid #ffe58f;
}

.folder-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.folder-icon {
  font-size: 24px;
  color: #faad14;
  margin-bottom: 10px;
}

.folder-info {
  display: flex;
  flex-direction: column;
}

.folder-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
}

.folder-size {
  font-size: 12px;
  color: #666;
}

/* 最近文件区域样式 */
.recent-files-section {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.files-table {
  overflow-x: auto;
}

.files-table table {
  width: 100%;
  border-collapse: collapse;
}

.files-table th,
.files-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #f5f7fa;
}

.files-table th {
  font-weight: 500;
  color: #333;
  background-color: #f9f9f9;
}

.files-table tbody tr:hover {
  background-color: #f9f9f9;
}

.file-name {
  display: flex;
  align-items: center;
}

.file-icon {
  font-size: 18px;
  margin-right: 10px;
  color: #5a2ca0;
}

.file-title {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-actions {
  display: flex;
  align-items: center;
}

.file-actions .action-btn {
  margin-left: 10px;
  font-size: 14px;
  color: #666;
}

.file-actions .action-btn:hover {
  color: #5a2ca0;
}

/* 内容区域 - 收藏资源标签页样式 */
.collections-content {
  display: flex;
  flex-direction: column;
}

.collections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
}

.collection-card {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
}

.resource-icon {
  font-size: 24px;
  color: #5a2ca0;
  margin-bottom: 10px;
}

.resource-info {
  margin-bottom: 15px;
}

.resource-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
}

.resource-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.resource-size {
  font-size: 12px;
  color: #999;
}

.resource-actions {
  display: flex;
  justify-content: space-between;
}

/* 内容区域 - 资源分类标签页样式 */
.categories-content {
  display: flex;
  flex-direction: column;
}

.categories-list {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.category-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f5f7fa;
}

.category-item:last-child {
  border-bottom: none;
}

.category-icon {
  font-size: 24px;
  color: #5a2ca0;
  margin-right: 15px;
  width: 30px;
  text-align: center;
}

.category-info {
  flex: 1;
}

.category-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
}

.category-count {
  font-size: 12px;
  color: #666;
}

.category-progress {
  width: 200px;
  height: 8px;
  background-color: #f5f7fa;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #5a2ca0;
  border-radius: 4px;
}

/* 热门资源推荐区域样式 */
.popular-resources-section {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.popular-resources-table {
  overflow-x: auto;
}

.popular-resources-table table {
  width: 100%;
  border-collapse: collapse;
}

.popular-resources-table th,
.popular-resources-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #f5f7fa;
}

.popular-resources-table th {
  font-weight: 500;
  color: #333;
  background-color: #f9f9f9;
}

.popular-resources-table tbody tr:hover {
  background-color: #f9f9f9;
}

.resource-actions {
  display: flex;
  align-items: center;
}

.resource-actions .action-btn {
  margin-left: 10px;
  font-size: 14px;
  color: #666;
}

.resource-actions .action-btn:hover {
  color: #5a2ca0;
}

/* 内容区域 - 上传资源标签页样式 */
.upload-content {
  display: flex;
  flex-direction: column;
}

/* 拖拽上传区样式 */
.upload-area {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.upload-box {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;
}

.upload-box:hover {
  border-color: #5a2ca0;
  background-color: #f9f0ff;
}

.upload-icon {
  font-size: 48px;
  color: #5a2ca0;
  margin-bottom: 20px;
}

.upload-text {
  margin-bottom: 20px;
}

.upload-text p {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.select-files-btn {
  margin: 0 auto;
}

.file-input {
  display: none;
}

/* 上传进度条样式 */
.upload-progress-section {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.progress-list {
  margin-top: 15px;
}

.progress-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.progress-item:last-child {
  margin-bottom: 0;
}

.progress-item .file-info {
  flex: 1;
  margin-right: 15px;
}

.progress-item .file-name {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.progress-item .file-size {
  font-size: 12px;
  color: #666;
}

.progress-bar-container {
  flex: 2;
  height: 8px;
  background-color: #f5f7fa;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 15px;
}

.progress-info {
  display: flex;
  align-items: center;
}

.progress-percentage {
  font-size: 12px;
  color: #333;
  margin-right: 15px;
  width: 40px;
  text-align: right;
}

.progress-time {
  font-size: 12px;
  color: #666;
}

/* 上传设置样式 */
.upload-settings-section {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.settings-form {
  margin-top: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
}

.form-select,
.form-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.radio-item {
  display: flex;
  align-items: center;
}

.radio-item input {
  margin-right: 5px;
}

.save-settings-btn {
  margin-top: 10px;
}

/* 上传历史样式 */
.upload-history-section {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.history-table {
  overflow-x: auto;
}

.history-table table {
  width: 100%;
  border-collapse: collapse;
}

.history-table th,
.history-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #f5f7fa;
}

.history-table th {
  font-weight: 500;
  color: #333;
  background-color: #f9f9f9;
}

.history-table tbody tr:hover {
  background-color: #f9f9f9;
}



.history-actions {
  display: flex;
  align-items: center;
}

.history-actions .action-btn {
  margin-left: 10px;
  font-size: 14px;
  color: #666;
}

.history-actions .action-btn:hover {
  color: #5a2ca0;
}



.modal-header h3 {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}


.modal-footer .btn {
  margin-left: 10px;
}
</style>
