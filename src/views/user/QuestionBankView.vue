<template>
  <div class="learning-question-bank">
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
          <li class="nav-item active">
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
          <h1>学习题库</h1>
        </div>

        <!-- 顶部数据概览卡片区 -->
        <div class="stats-cards-grid">
          <div class="stat-card">
            <div class="stat-value">128</div>
            <div class="stat-label">总习题数</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">86</div>
            <div class="stat-label">已练习</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">42</div>
            <div class="stat-label">待练习</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">75%</div>
            <div class="stat-label">正确率</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">15</div>
            <div class="stat-label">今日练习</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">32</div>
            <div class="stat-label">错题数</div>
          </div>
        </div>

        <!-- 搜索与筛选区 -->
        <div class="search-filter-bar">
          <div class="search-container">
            <i class="fa fa-search search-icon"></i>
            <input type="text" placeholder="搜索习题名称、标签..." class="search-input">
          </div>
          <div class="filter-container">
            <select class="filter-select">
              <option value="">全部难度</option>
              <option value="easy">简单</option>
              <option value="medium">中等</option>
              <option value="hard">困难</option>
            </select>
            <select class="filter-select">
              <option value="">全部类型</option>
              <option value="single">单选题</option>
              <option value="multiple">多选题</option>
              <option value="judgment">判断题</option>
              <option value="fill">填空题</option>
              <option value="program">编程题</option>
              <option value="answer">解答题</option>
            </select>
            <select class="filter-select">
              <option value="">全部学科</option>
              <option value="math">数学</option>
              <option value="physics">物理</option>
              <option value="chemistry">化学</option>
              <option value="biology">生物</option>
              <option value="english">英语</option>
              <option value="chinese">语文</option>
              <option value="history">历史</option>
              <option value="geography">地理</option>
              <option value="politics">政治</option>
            </select>
            <button class="btn primary-btn add-question-btn" @click="showAddQuestionModal = true">
              <i class="fa fa-plus"></i>
              <span>添加习题</span>
            </button>
          </div>
        </div>

        <!-- 习题列表区域 -->
        <div class="questions-list">
          <!-- 习题卡片 1 -->
          <div class="question-card">
            <div class="card-header">
              <h3 class="question-title">数据结构 - 二叉树遍历</h3>
              <div class="question-tags">
                <span class="tag difficulty medium">中等</span>
                <span class="tag subject computer">计算机</span>
                <span class="tag type program">编程</span>
              </div>
            </div>
            <div class="card-body">
              <p class="question-summary">
                请实现二叉树的前序、中序和后序遍历算法，并分析各种遍历方法的时间复杂度和空间复杂度。要求使用递归和非递归两种方式实现。
              </p>
            </div>
            <div class="card-footer">
              <div class="question-meta">
                <span class="meta-item">
                  <i class="fa fa-eye"></i>
                  <span>156</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-check-circle"></i>
                  <span>85%</span>
                </span>
              </div>
              <div class="question-actions">
                <button class="btn primary-btn practice-btn">开始练习</button>
                <button class="btn secondary-btn answer-btn">查看答案</button>
              </div>
            </div>
          </div>

          <!-- 习题卡片 2 -->
          <div class="question-card">
            <div class="card-header">
              <h3 class="question-title">数学 - 微积分基本定理</h3>
              <div class="question-tags">
                <span class="tag difficulty hard">困难</span>
                <span class="tag subject math">数学</span>
                <span class="tag type answer">解答题</span>
              </div>
            </div>
            <div class="card-body">
              <p class="question-summary">
                请详细阐述微积分基本定理的内容，并证明该定理。同时，应用微积分基本定理计算以下定积分：∫₀¹ x² dx 和 ∫₀^π sin(x) dx。
              </p>
            </div>
            <div class="card-footer">
              <div class="question-meta">
                <span class="meta-item">
                  <i class="fa fa-eye"></i>
                  <span>128</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-check-circle"></i>
                  <span>62%</span>
                </span>
              </div>
              <div class="question-actions">
                <button class="btn primary-btn practice-btn">开始练习</button>
                <button class="btn secondary-btn answer-btn">查看答案</button>
              </div>
            </div>
          </div>

          <!-- 习题卡片 3 -->
          <div class="question-card">
            <div class="card-header">
              <h3 class="question-title">物理 - 牛顿运动定律</h3>
              <div class="question-tags">
                <span class="tag difficulty medium">中等</span>
                <span class="tag subject physics">物理</span>
                <span class="tag type multiple">多选题</span>
              </div>
            </div>
            <div class="card-body">
              <p class="question-summary">
                关于牛顿运动定律，下列说法正确的是：
                A. 牛顿第一定律是惯性定律
                B. 牛顿第二定律可以表示为F=ma
                C. 牛顿第三定律表明作用力和反作用力总是作用在同一个物体上
                D. 牛顿运动定律适用于所有参考系
              </p>
            </div>
            <div class="card-footer">
              <div class="question-meta">
                <span class="meta-item">
                  <i class="fa fa-eye"></i>
                  <span>189</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-check-circle"></i>
                  <span>78%</span>
                </span>
              </div>
              <div class="question-actions">
                <button class="btn primary-btn practice-btn">开始练习</button>
                <button class="btn secondary-btn answer-btn">查看答案</button>
              </div>
            </div>
          </div>

          <!-- 习题卡片 4 -->
          <div class="question-card">
            <div class="card-header">
              <h3 class="question-title">化学 - 化学反应速率</h3>
              <div class="question-tags">
                <span class="tag difficulty easy">简单</span>
                <span class="tag subject chemistry">化学</span>
                <span class="tag type single">单选题</span>
              </div>
            </div>
            <div class="card-body">
              <p class="question-summary">
                下列因素中，不会影响化学反应速率的是：
                A. 温度
                B. 催化剂
                C. 反应物浓度
                D. 反应物的总量
              </p>
            </div>
            <div class="card-footer">
              <div class="question-meta">
                <span class="meta-item">
                  <i class="fa fa-eye"></i>
                  <span>145</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-check-circle"></i>
                  <span>89%</span>
                </span>
              </div>
              <div class="question-actions">
                <button class="btn primary-btn practice-btn">开始练习</button>
                <button class="btn secondary-btn answer-btn">查看答案</button>
              </div>
            </div>
          </div>

          <!-- 习题卡片 5 -->
          <div class="question-card">
            <div class="card-header">
              <h3 class="question-title">生物 - DNA结构与复制</h3>
              <div class="question-tags">
                <span class="tag difficulty medium">中等</span>
                <span class="tag subject biology">生物</span>
                <span class="tag type fill">填空题</span>
              </div>
            </div>
            <div class="card-body">
              <p class="question-summary">
                DNA分子的结构是______，由两条______的核苷酸链组成。DNA复制是______复制，需要______酶的参与。
              </p>
            </div>
            <div class="card-footer">
              <div class="question-meta">
                <span class="meta-item">
                  <i class="fa fa-eye"></i>
                  <span>132</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-check-circle"></i>
                  <span>76%</span>
                </span>
              </div>
              <div class="question-actions">
                <button class="btn primary-btn practice-btn">开始练习</button>
                <button class="btn secondary-btn answer-btn">查看答案</button>
              </div>
            </div>
          </div>

          <!-- 习题卡片 6 -->
          <div class="question-card">
            <div class="card-header">
              <h3 class="question-title">英语 - 语法填空</h3>
              <div class="question-tags">
                <span class="tag difficulty easy">简单</span>
                <span class="tag subject english">英语</span>
                <span class="tag type fill">填空题</span>
              </div>
            </div>
            <div class="card-body">
              <p class="question-summary">
                请在下列句子的空白处填入适当的介词：
                1. She is interested ______ reading novels.
                2. He is good ______ playing basketball.
                3. They arrived ______ the airport at 9 o'clock.
              </p>
            </div>
            <div class="card-footer">
              <div class="question-meta">
                <span class="meta-item">
                  <i class="fa fa-eye"></i>
                  <span>167</span>
                </span>
                <span class="meta-item">
                  <i class="fa fa-check-circle"></i>
                  <span>92%</span>
                </span>
              </div>
              <div class="question-actions">
                <button class="btn primary-btn practice-btn">开始练习</button>
                <button class="btn secondary-btn answer-btn">查看答案</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 最近练习记录区域 -->
        <div class="recent-practice-section">
          <div class="section-header">
            <h2>最近练习记录</h2>
            <button class="view-all-btn">查看全部</button>
          </div>
          <div class="recent-practice-list">
            <div class="practice-record">
              <div class="record-content">
                <h4 class="record-title">数学 - 微积分基本定理</h4>
                <div class="record-meta">
                  <span class="meta-item">分数: 85</span>
                  <span class="meta-item">正确率: 85%</span>
                  <span class="meta-item">练习时间: 2023-11-05 14:30</span>
                </div>
              </div>
            </div>
            <div class="practice-record">
              <div class="record-content">
                <h4 class="record-title">物理 - 牛顿运动定律</h4>
                <div class="record-meta">
                  <span class="meta-item">分数: 90</span>
                  <span class="meta-item">正确率: 90%</span>
                  <span class="meta-item">练习时间: 2023-11-04 16:45</span>
                </div>
              </div>
            </div>
            <div class="practice-record">
              <div class="record-content">
                <h4 class="record-title">数据结构 - 二叉树遍历</h4>
                <div class="record-meta">
                  <span class="meta-item">分数: 75</span>
                  <span class="meta-item">正确率: 75%</span>
                  <span class="meta-item">练习时间: 2023-11-03 10:15</span>
                </div>
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

    <!-- 添加习题弹窗 -->
    <div class="modal-overlay" v-if="showAddQuestionModal" @click="showAddQuestionModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">添加习题</h2>
          <button class="close-btn" @click="showAddQuestionModal = false">
            <i class="fa fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form class="question-form">
            <div class="form-group">
              <label class="form-label">习题标题</label>
              <input type="text" class="form-input" placeholder="请输入习题标题">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">所属学科</label>
                <select class="form-select">
                  <option value="">全部学科</option>
                  <option value="math">数学</option>
                  <option value="physics">物理</option>
                  <option value="chemistry">化学</option>
                  <option value="biology">生物</option>
                  <option value="english">英语</option>
                  <option value="chinese">语文</option>
                  <option value="history">历史</option>
                  <option value="geography">地理</option>
                  <option value="politics">政治</option>
                  <option value="computer">计算机</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">难度等级</label>
                <select class="form-select">
                  <option value="">全部难度</option>
                  <option value="easy">简单</option>
                  <option value="medium">中等</option>
                  <option value="hard">困难</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">习题类型</label>
                <select class="form-select">
                  <option value="">全部类型</option>
                  <option value="single">单选题</option>
                  <option value="multiple">多选题</option>
                  <option value="judgment">判断题</option>
                  <option value="fill">填空题</option>
                  <option value="program">编程题</option>
                  <option value="answer">解答题</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">标签</label>
              <input type="text" class="form-input" placeholder="例如：数据结构，二叉树，编程（用逗号分隔）">
            </div>
            <div class="form-group">
              <label class="form-label">习题内容</label>
              <textarea class="form-textarea" placeholder="请输入习题详细内容"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">参考答案</label>
              <textarea class="form-textarea" placeholder="请输入习题参考答案"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn secondary-btn cancel-btn" @click="showAddQuestionModal = false">取消</button>
          <button class="btn primary-btn save-btn">保存习题</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LearningQuestionBank',
  data() {
    return {
      showAddQuestionModal: false
    };
  },
  methods: {
    // 可以在这里添加方法
  }
};
</script>

<!--<style scoped>-->
<!--/* 基础样式 */-->
<!--.learning-question-bank {-->
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

<!--/* 搜索与筛选区样式 */-->
<!--.search-filter-bar {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  margin-bottom: 20px;-->
<!--  background-color: white;-->
<!--  padding: 15px;-->
<!--  border-radius: 8px;-->
<!--  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);-->
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

<!--.filter-container {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--}-->

<!--.filter-select {-->
<!--  padding: 8px 15px;-->
<!--  border: 1px solid #ddd;-->
<!--  border-radius: 4px;-->
<!--  margin-left: 10px;-->
<!--  font-size: 14px;-->
<!--  color: #666;-->
<!--  outline: none;-->
<!--}-->

<!--.filter-select:first-child {-->
<!--  margin-left: 0;-->
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

<!--.add-question-btn {-->
<!--  margin-left: 15px;-->
<!--}-->

<!--/* 习题列表区域样式 */-->
<!--.questions-list {-->
<!--  display: grid;-->
<!--  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));-->
<!--  gap: 20px;-->
<!--  margin-bottom: 30px;-->
<!--}-->

<!--.question-card {-->
<!--  background-color: white;-->
<!--  border-radius: 8px;-->
<!--  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);-->
<!--  overflow: hidden;-->
<!--  transition: transform 0.3s, box-shadow 0.3s;-->
<!--}-->

<!--.question-card:hover {-->
<!--  transform: translateY(-5px);-->
<!--  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);-->
<!--}-->

<!--.card-header {-->
<!--  padding: 15px;-->
<!--  border-bottom: 1px solid #f5f7fa;-->
<!--}-->

<!--.question-title {-->
<!--  font-size: 16px;-->
<!--  font-weight: bold;-->
<!--  color: #333;-->
<!--  margin-bottom: 10px;-->
<!--  display: -webkit-box;-->
<!--  -webkit-line-clamp: 2;-->
<!--  line-clamp: 2;-->
<!--  -webkit-box-orient: vertical;-->
<!--  overflow: hidden;-->
<!--}-->

<!--.question-tags {-->
<!--  display: flex;-->
<!--  flex-wrap: wrap;-->
<!--  gap: 5px;-->
<!--}-->

<!--.tag {-->
<!--  padding: 3px 8px;-->
<!--  border-radius: 4px;-->
<!--  font-size: 12px;-->
<!--  font-weight: 500;-->
<!--}-->

<!--.tag.difficulty {-->
<!--  font-weight: normal;-->
<!--}-->

<!--.tag.difficulty.easy {-->
<!--  background-color: #f6ffed;-->
<!--  color: #52c41a;-->
<!--}-->

<!--.tag.difficulty.medium {-->
<!--  background-color: #fff7e6;-->
<!--  color: #faad14;-->
<!--}-->

<!--.tag.difficulty.hard {-->
<!--  background-color: #fff1f0;-->
<!--  color: #f5222d;-->
<!--}-->

<!--.tag.subject {-->
<!--  background-color: #f0e6ff;-->
<!--  color: #5a2ca0;-->
<!--}-->

<!--.tag.subject.math {-->
<!--  background-color: #e6f7ff;-->
<!--  color: #1890ff;-->
<!--}-->

<!--.tag.subject.physics {-->
<!--  background-color: #fff1f0;-->
<!--  color: #f5222d;-->
<!--}-->

<!--.tag.subject.chemistry {-->
<!--  background-color: #fff7e6;-->
<!--  color: #faad14;-->
<!--}-->

<!--.tag.subject.biology {-->
<!--  background-color: #f6ffed;-->
<!--  color: #52c41a;-->
<!--}-->

<!--.tag.subject.english {-->
<!--  background-color: #e6f7ff;-->
<!--  color: #1890ff;-->
<!--}-->

<!--.tag.subject.chinese {-->
<!--  background-color: #fff1f0;-->
<!--  color: #f5222d;-->
<!--}-->

<!--.tag.subject.computer {-->
<!--  background-color: #e6f7ff;-->
<!--  color: #1890ff;-->
<!--}-->

<!--.tag.type {-->
<!--  background-color: #f0e6ff;-->
<!--  color: #5a2ca0;-->
<!--}-->

<!--.tag.type.single {-->
<!--  background-color: #e6f7ff;-->
<!--  color: #1890ff;-->
<!--}-->

<!--.tag.type.multiple {-->
<!--  background-color: #fff7e6;-->
<!--  color: #faad14;-->
<!--}-->

<!--.tag.type.judgment {-->
<!--  background-color: #f6ffed;-->
<!--  color: #52c41a;-->
<!--}-->

<!--.tag.type.fill {-->
<!--  background-color: #fff1f0;-->
<!--  color: #f5222d;-->
<!--}-->

<!--.tag.type.program {-->
<!--  background-color: #e6f7ff;-->
<!--  color: #1890ff;-->
<!--}-->

<!--.tag.type.answer {-->
<!--  background-color: #fff7e6;-->
<!--  color: #faad14;-->
<!--}-->

<!--.card-body {-->
<!--  padding: 15px;-->
<!--}-->

<!--.question-summary {-->
<!--  font-size: 14px;-->
<!--  color: #666;-->
<!--  line-height: 1.5;-->
<!--  display: -webkit-box;-->
<!--  -webkit-line-clamp: 3;-->
<!--  line-clamp: 3;-->
<!--  -webkit-box-orient: vertical;-->
<!--  overflow: hidden;-->
<!--}-->

<!--.card-footer {-->
<!--  padding: 15px;-->
<!--  border-top: 1px solid #f5f7fa;-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--}-->

<!--.question-meta {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  gap: 15px;-->
<!--}-->

<!--.meta-item {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  font-size: 12px;-->
<!--  color: #999;-->
<!--}-->

<!--.meta-item i {-->
<!--  margin-right: 3px;-->
<!--  font-size: 12px;-->
<!--}-->

<!--.question-actions {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  gap: 10px;-->
<!--}-->

<!--.practice-btn {-->
<!--  background-color: #5a2ca0;-->
<!--  color: white;-->
<!--}-->

<!--.practice-btn:hover {-->
<!--  background-color: #4a2486;-->
<!--}-->

<!--.answer-btn {-->
<!--  background-color: #f5f7fa;-->
<!--  color: #666;-->
<!--  border: 1px solid #ddd;-->
<!--}-->

<!--.answer-btn:hover {-->
<!--  background-color: #eee;-->
<!--}-->

<!--/* 最近练习记录区域样式 */-->
<!--.recent-practice-section {-->
<!--  margin-bottom: 30px;-->
<!--}-->

<!--.section-header {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  margin-bottom: 15px;-->
<!--}-->

<!--.section-header h2 {-->
<!--  font-size: 18px;-->
<!--  font-weight: bold;-->
<!--  color: #333;-->
<!--}-->

<!--.view-all-btn {-->
<!--  font-size: 14px;-->
<!--  color: #5a2ca0;-->
<!--  background: none;-->
<!--  border: none;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.recent-practice-list {-->
<!--  background-color: white;-->
<!--  border-radius: 8px;-->
<!--  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);-->
<!--  overflow: hidden;-->
<!--}-->

<!--.practice-record {-->
<!--  padding: 15px;-->
<!--  border-bottom: 1px solid #f5f7fa;-->
<!--}-->

<!--.practice-record:last-child {-->
<!--  border-bottom: none;-->
<!--}-->

<!--.record-content {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--}-->

<!--.record-title {-->
<!--  font-size: 14px;-->
<!--  font-weight: 500;-->
<!--  color: #333;-->
<!--  margin-bottom: 5px;-->
<!--}-->

<!--.record-meta {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  gap: 15px;-->
<!--  font-size: 12px;-->
<!--  color: #999;-->
<!--}-->

<!--/* 分页组件样式 */-->
<!--.pagination-container {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  margin-top: 20px;-->
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

<!--/* 添加习题弹窗样式 */-->
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
<!--  width: 700px;-->
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

<!--.question-form {-->
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

<!--.form-input,-->
<!--.form-select,-->
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
<!--.form-select:focus,-->
<!--.form-textarea:focus {-->
<!--  border-color: #5a2ca0;-->
<!--}-->

<!--.form-row {-->
<!--  display: flex;-->
<!--  gap: 15px;-->
<!--}-->

<!--.form-row .form-group {-->
<!--  flex: 1;-->
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

<!--.save-btn {-->
<!--  background-color: #5a2ca0;-->
<!--  color: white;-->
<!--}-->

<!--.save-btn:hover {-->
<!--  background-color: #4a2486;-->
<!--}-->
<!--</style>-->
