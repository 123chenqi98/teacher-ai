<template>
  <div class="lesson-plan-management">
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
          <li class="nav-item active">
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
            <h1>教案管理</h1>
            <p>管理您的个人教案和收藏的教案</p>
          </div>
          <div class="tab-navigation">
            <ul class="tabs">
              <li class="tab-item active">
                <span>我的教案</span>
                <div class="tab-indicator"></div>
              </li>
              <li class="tab-item">
                <span>我的收藏</span>
                <div class="tab-indicator"></div>
              </li>
              <li class="tab-item">
                <span>共享教案</span>
                <div class="tab-indicator"></div>
              </li>
            </ul>
          </div>
        </div>

        <!-- 搜索与筛选区 -->
        <div class="search-filter-bar">
          <div class="search-container">
            <i class="fa fa-search search-icon"></i>
            <input type="text" placeholder="搜索教案名称、内容..." class="search-input">
          </div>
          <div class="filter-container">
            <select class="filter-select">
              <option value="">所有学科</option>
              <option value="math">数学</option>
              <option value="chinese">语文</option>
              <option value="english">英语</option>
              <option value="physics">物理</option>
              <option value="chemistry">化学</option>
              <option value="biology">生物</option>
              <option value="history">历史</option>
              <option value="geography">地理</option>
              <option value="politics">政治</option>
            </select>
            <select class="filter-select">
              <option value="">所有年级</option>
              <option value="grade1">一年级</option>
              <option value="grade2">二年级</option>
              <option value="grade3">三年级</option>
              <option value="grade4">四年级</option>
              <option value="grade5">五年级</option>
              <option value="grade6">六年级</option>
              <option value="grade7">七年级</option>
              <option value="grade8">八年级</option>
              <option value="grade9">九年级</option>
              <option value="grade10">高一</option>
              <option value="grade11">高二</option>
              <option value="grade12">高三</option>
            </select>
            <select class="filter-select">
              <option value="">所有状态</option>
              <option value="published">已发布</option>
              <option value="draft">草稿</option>
              <option value="reviewing">审核中</option>
              <option value="rejected">已驳回</option>
            </select>
            <button class="btn primary-btn new-lesson-btn" @click="showNewLessonModal = true">
              <i class="fa fa-plus"></i>
              <span>新建教案</span>
            </button>
          </div>
        </div>

        <!-- 教案卡片区域 -->
        <div class="lesson-cards-grid">
          <!-- 教案卡片 1 -->
          <div class="lesson-card">
            <div class="card-header">
              <h3 class="lesson-title">一元二次方程的解法与应用</h3>
              <div class="lesson-tags">
                <span class="tag subject math">数学</span>
                <span class="tag status published">已发布</span>
              </div>
            </div>
            <div class="card-body">
              <p class="lesson-description">
                本教案详细介绍了一元二次方程的四种解法：直接开平方法、配方法、公式法和因式分解法，并通过实例讲解了一元二次方程在实际生活中的应用。
              </p>
            </div>
            <div class="card-footer">
              <div class="lesson-meta">
                <span class="meta-item">
                  <i class="fa fa-eye"></i>
                  <span>128</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-star"></i>
                  <span>36</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-pencil"></i>
                  <span>8</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-calendar"></i>
                  <span>2023-10-25</span>
                </span>
              </div>
              <div class="lesson-actions">
                <button class="action-btn more-btn">
                  <i class="fa fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- 教案卡片 2 -->
          <div class="lesson-card">
            <div class="card-header">
              <h3 class="lesson-title">平行四边形的性质与判定</h3>
              <div class="lesson-tags">
                <span class="tag subject math">数学</span>
                <span class="tag status draft">草稿</span>
              </div>
            </div>
            <div class="card-body">
              <p class="lesson-description">
                本教案涵盖了平行四边形的定义、性质定理和判定定理，通过几何证明和实例练习帮助学生理解和掌握平行四边形的相关知识。
              </p>
            </div>
            <div class="card-footer">
              <div class="lesson-meta">
                <span class="meta-item">
                  <i class="fa fa-eye"></i>
                  <span>45</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-star"></i>
                  <span>12</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-pencil"></i>
                  <span>15</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-calendar"></i>
                  <span>2023-11-01</span>
                </span>
              </div>
              <div class="lesson-actions">
                <button class="action-btn more-btn">
                  <i class="fa fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- 教案卡片 3 -->
          <div class="lesson-card">
            <div class="card-header">
              <h3 class="lesson-title">一次函数的图像与性质</h3>
              <div class="lesson-tags">
                <span class="tag subject math">数学</span>
                <span class="tag status reviewing">审核中</span>
              </div>
            </div>
            <div class="card-body">
              <p class="lesson-description">
                本教案系统讲解了一次函数的概念、图像绘制方法、性质特点以及在实际问题中的应用，通过大量例题和练习帮助学生掌握一次函数的相关知识。
              </p>
            </div>
            <div class="card-footer">
              <div class="lesson-meta">
                <span class="meta-item">
                  <i class="fa fa-eye"></i>
                  <span>76</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-star"></i>
                  <span>23</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-pencil"></i>
                  <span>6</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-calendar"></i>
                  <span>2023-10-30</span>
                </span>
              </div>
              <div class="lesson-actions">
                <button class="action-btn more-btn">
                  <i class="fa fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- 教案卡片 4 -->
          <div class="lesson-card">
            <div class="card-header">
              <h3 class="lesson-title">相似三角形的判定与性质</h3>
              <div class="lesson-tags">
                <span class="tag subject math">数学</span>
                <span class="tag status rejected">已驳回</span>
              </div>
            </div>
            <div class="card-body">
              <p class="lesson-description">
                本教案详细介绍了相似三角形的定义、判定定理和性质定理，通过几何证明和实例练习帮助学生理解和掌握相似三角形的相关知识。
              </p>
            </div>
            <div class="card-footer">
              <div class="lesson-meta">
                <span class="meta-item">
                  <i class="fa fa-eye"></i>
                  <span>52</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-star"></i>
                  <span>9</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-pencil"></i>
                  <span>11</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-calendar"></i>
                  <span>2023-10-20</span>
                </span>
              </div>
              <div class="lesson-actions">
                <button class="action-btn more-btn">
                  <i class="fa fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- 教案卡片 5 -->
          <div class="lesson-card">
            <div class="card-header">
              <h3 class="lesson-title">二次函数的图像与性质</h3>
              <div class="lesson-tags">
                <span class="tag subject math">数学</span>
                <span class="tag status published">已发布</span>
              </div>
            </div>
            <div class="card-body">
              <p class="lesson-description">
                本教案系统讲解了二次函数的概念、图像绘制方法、性质特点以及在实际问题中的应用，通过大量例题和练习帮助学生掌握二次函数的相关知识。
              </p>
            </div>
            <div class="card-footer">
              <div class="lesson-meta">
                <span class="meta-item">
                  <i class="fa fa-eye"></i>
                  <span>156</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-star"></i>
                  <span>42</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-pencil"></i>
                  <span>7</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-calendar"></i>
                  <span>2023-10-15</span>
                </span>
              </div>
              <div class="lesson-actions">
                <button class="action-btn more-btn">
                  <i class="fa fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- 教案卡片 6 -->
          <div class="lesson-card">
            <div class="card-header">
              <h3 class="lesson-title">圆的基本性质</h3>
              <div class="lesson-tags">
                <span class="tag subject math">数学</span>
                <span class="tag status draft">草稿</span>
              </div>
            </div>
            <div class="card-body">
              <p class="lesson-description">
                本教案涵盖了圆的定义、基本性质、圆心角、圆周角、弦、弧等概念，通过几何证明和实例练习帮助学生理解和掌握圆的相关知识。
              </p>
            </div>
            <div class="card-footer">
              <div class="lesson-meta">
                <span class="meta-item">
                  <i class="fa fa-eye"></i>
                  <span>38</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-star"></i>
                  <span>15</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-pencil"></i>
                  <span>9</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-calendar"></i>
                  <span>2023-11-03</span>
                </span>
              </div>
              <div class="lesson-actions">
                <button class="action-btn more-btn">
                  <i class="fa fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- 教案卡片 7 -->
          <div class="lesson-card">
            <div class="card-header">
              <h3 class="lesson-title">三角函数的基本概念</h3>
              <div class="lesson-tags">
                <span class="tag subject math">数学</span>
                <span class="tag status published">已发布</span>
              </div>
            </div>
            <div class="card-body">
              <p class="lesson-description">
                本教案详细介绍了三角函数的定义、任意角的三角函数、同角三角函数基本关系、诱导公式等内容，通过实例讲解帮助学生理解三角函数的基本概念。
              </p>
            </div>
            <div class="card-footer">
              <div class="lesson-meta">
                <span class="meta-item">
                  <i class="fa fa-eye"></i>
                  <span>112</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-star"></i>
                  <span>28</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-pencil"></i>
                  <span>5</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-calendar"></i>
                  <span>2023-10-08</span>
                </span>
              </div>
              <div class="lesson-actions">
                <button class="action-btn more-btn">
                  <i class="fa fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- 教案卡片 8 -->
          <div class="lesson-card">
            <div class="card-header">
              <h3 class="lesson-title">概率的基本概念</h3>
              <div class="lesson-tags">
                <span class="tag subject math">数学</span>
                <span class="tag status reviewing">审核中</span>
              </div>
            </div>
            <div class="card-body">
              <p class="lesson-description">
                本教案系统讲解了随机事件、频率与概率、古典概型、几何概型等概率的基本概念和计算方法，通过实例和练习帮助学生理解概率的基本思想。
              </p>
            </div>
            <div class="card-footer">
              <div class="lesson-meta">
                <span class="meta-item">
                  <i class="fa fa-eye"></i>
                  <span>67</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-star"></i>
                  <span>19</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-pencil"></i>
                  <span>4</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-calendar"></i>
                  <span>2023-10-28</span>
                </span>
              </div>
              <div class="lesson-actions">
                <button class="action-btn more-btn">
                  <i class="fa fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
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
            <li class="pagination-item">4</li>
            <li class="pagination-item">5</li>
            <li class="pagination-item">
              <i class="fa fa-angle-right"></i>
            </li>
          </ul>
        </div>
      </div>
    </main>

    <!-- 新建教案弹窗 -->
    <div class="modal-overlay" v-if="showNewLessonModal" @click="showNewLessonModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">新建教案</h2>
          <button class="close-btn" @click="showNewLessonModal = false">
            <i class="fa fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form class="lesson-form">
            <div class="form-group">
              <label class="form-label">教案标题</label>
              <input type="text" class="form-input" placeholder="请输入教案标题">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">所属学科</label>
                <select class="form-select">
                  <option value="">全部学科</option>
                  <option value="math">数学</option>
                  <option value="chinese">语文</option>
                  <option value="english">英语</option>
                  <option value="physics">物理</option>
                  <option value="chemistry">化学</option>
                  <option value="biology">生物</option>
                  <option value="history">历史</option>
                  <option value="geography">地理</option>
                  <option value="politics">政治</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">适用年级</label>
                <select class="form-select">
                  <option value="">所有年级</option>
                  <option value="grade1">一年级</option>
                  <option value="grade2">二年级</option>
                  <option value="grade3">三年级</option>
                  <option value="grade4">四年级</option>
                  <option value="grade5">五年级</option>
                  <option value="grade6">六年级</option>
                  <option value="grade7">七年级</option>
                  <option value="grade8">八年级</option>
                  <option value="grade9">九年级</option>
                  <option value="grade10">高一</option>
                  <option value="grade11">高二</option>
                  <option value="grade12">高三</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">教案内容</label>
              <textarea class="form-textarea" placeholder="请输入教案详细内容，包括教学目标、教学过程、教学重难点、教学方法等..."></textarea>
            </div>
            <div class="form-status">
              <span class="status-label">保存状态：</span>
              <span class="status-value">draft（草稿）</span>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn secondary-btn cancel-btn" @click="showNewLessonModal = false">取消</button>
          <button class="btn primary-btn save-btn">保存教案</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LessonPlanManagement',
  data() {
    return {
      showNewLessonModal: false
    };
  },
  methods: {
    // 可以在这里添加方法
  }
};
</script>

<style scoped>
/* 基础样式 */
.lesson-plan-management {
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

.search-box {
  display: flex;
  align-items: center;
  background-color: #f5f7fa;
  border-radius: 20px;
  padding: 0 15px;
  width: 300px;
}

.search-box i {
  color: #999;
  margin-right: 10px;
}

.search-box input {
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

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #f5222d;
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

.tab-navigation {
  margin-bottom: 10px;
}

.tabs {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.tab-item {
  margin-left: 20px;
  position: relative;
  cursor: pointer;
}

.tab-item:first-child {
  margin-left: 0;
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

.tab-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #5a2ca0;
  transform: scaleX(0);
  transition: transform 0.3s;
}

.tab-item.active .tab-indicator {
  transform: scaleX(1);
}

/* 搜索与筛选区样式 */
.search-filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #f5f7fa;
  border-radius: 20px;
  padding: 0 15px;
  width: 350px;
}

.search-icon {
  color: #999;
  margin-right: 10px;
}

.search-input {
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  height: 36px;
  font-size: 14px;
}

.filter-container {
  display: flex;
  align-items: center;
}

.filter-select {
  padding: 8px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 10px;
  font-size: 14px;
  color: #666;
  outline: none;
}

.filter-select:first-child {
  margin-left: 0;
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

.new-lesson-btn {
  margin-left: 15px;
}

/* 教案卡片区域样式 */
.lesson-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.lesson-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.lesson-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 15px;
  border-bottom: 1px solid #f5f7fa;
}

.lesson-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.lesson-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.tag.subject {
  background-color: #f0e6ff;
  color: #5a2ca0;
}

.tag.subject.math {
  background-color: #e6f7ff;
  color: #1890ff;
}




.tag.status {
  font-weight: normal;
}

.tag.status.published {
  background-color: #f6ffed;
  color: #52c41a;
}

.tag.status.draft {
  background-color: #f5f5f5;
  color: #666;
}

.tag.status.reviewing {
  background-color: #fff7e6;
  color: #faad14;
}

.tag.status.rejected {
  background-color: #fff1f0;
  color: #f5222d;
}

.card-body {
  padding: 15px;
}

.lesson-description {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  padding: 15px;
  border-top: 1px solid #f5f7fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lesson-meta {
  display: flex;
  align-items: center;
  gap: 15px;
}

.meta-item {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #999;
}

.meta-item i {
  margin-right: 3px;
  font-size: 12px;
}

.lesson-actions {
  display: flex;
  align-items: center;
}

.action-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 14px;
}

.more-btn {
  color: #999;
}

.more-btn:hover {
  color: #5a2ca0;
}

/* 分页组件样式 */
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.pagination-item {
  margin: 0 5px;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-item:hover:not(.disabled) {
  background-color: #f5f7fa;
  color: #5a2ca0;
}

.pagination-item.active {
  background-color: #5a2ca0;
  color: white;
}

.pagination-item.disabled {
  color: #ccc;
  cursor: not-allowed;
}

.pagination-item i {
  font-size: 16px;
}

/* 新建教案弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 700px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 15px 20px;
  border-bottom: 1px solid #f5f7fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  color: #666;
  font-size: 18px;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
}

.lesson-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  outline: none;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: #5a2ca0;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-row .form-group {
  flex: 1;
}

.form-textarea {
  min-height: 150px;
  resize: vertical;
}

.form-status {
  display: flex;
  align-items: center;
  margin-top: 5px;
  font-size: 12px;
  color: #999;
}

.status-label {
  margin-right: 5px;
}

.status-value {
  color: #5a2ca0;
  font-weight: 500;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #f5f7fa;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-btn {
  margin-right: 10px;
}

.save-btn {
  background-color: #5a2ca0;
  color: white;
}

.save-btn:hover {
  background-color: #4a2486;
}
</style>