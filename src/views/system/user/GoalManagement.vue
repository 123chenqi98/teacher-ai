<template>
  <div class="goal-management-page">
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
          <li class="nav-item active">
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
          <h1>目标管理</h1>
          <p>设定和跟踪您的教学和个人发展目标</p>
        </div>

        <!-- 顶部统计卡片区 -->
        <div class="stats-cards">
          <div class="card stat-card">
            <div class="card-body">
              <div class="stat-icon">
                <i class="fa fa-bullseye"></i>
              </div>
              <div class="stat-info">
                <div class="stat-label">总目标数</div>
                <div class="stat-value">8</div>
              </div>
            </div>
          </div>
          <div class="card stat-card">
            <div class="card-body">
              <div class="stat-icon">
                <i class="fa fa-spinner"></i>
              </div>
              <div class="stat-info">
                <div class="stat-label">进行中目标</div>
                <div class="stat-value">5</div>
              </div>
            </div>
          </div>
          <div class="card stat-card">
            <div class="card-body">
              <div class="stat-icon">
                <i class="fa fa-check"></i>
              </div>
              <div class="stat-info">
                <div class="stat-label">已完成目标</div>
                <div class="stat-value">3</div>
              </div>
            </div>
          </div>
          <div class="card stat-card">
            <div class="card-body">
              <div class="stat-icon">
                <i class="fa fa-percent"></i>
              </div>
              <div class="stat-info">
                <div class="stat-label">平均完成率</div>
                <div class="stat-value">68%</div>
              </div>
            </div>
          </div>
          <div class="card stat-card">
            <div class="card-body">
              <div class="stat-icon">
                <i class="fa fa-calendar"></i>
              </div>
              <div class="stat-info">
                <div class="stat-label">最近目标</div>
                <div class="stat-value">2023-04-15</div>
              </div>
            </div>
          </div>
          <div class="card stat-card">
            <div class="card-body">
              <div class="stat-icon">
                <i class="fa fa-clock"></i>
              </div>
              <div class="stat-info">
                <div class="stat-label">平均完成时间</div>
                <div class="stat-value">2.5 天</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 我的目标区域 -->
        <div class="section-title">我的目标</div>
        
        <!-- 筛选栏 -->
        <div class="filter-bar">
          <div class="filter-group">
            <label class="filter-label">目标类型</label>
            <select class="filter-select" v-model="filter.type">
              <option value="all">全部类型</option>
              <option value="learning">学习目标</option>
              <option value="task">任务目标</option>
              <option value="teaching">教学目标</option>
              <option value="reading">阅读目标</option>
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label">目标状态</label>
            <select class="filter-select" v-model="filter.status">
              <option value="all">全部状态</option>
              <option value="in-progress">进行中</option>
              <option value="completed">已完成</option>
              <option value="pending">待开始</option>
            </select>
          </div>
          <div class="filter-group">
            <label class="filter-label">排序方式</label>
            <select class="filter-select" v-model="filter.sort">
              <option value="deadline">按截止日期</option>
              <option value="progress">按完成进度</option>
              <option value="created">按创建时间</option>
            </select>
          </div>
          <div class="filter-actions">
            <button class="btn add-btn" @click="openAddGoalModal">
              <i class="fa fa-plus"></i>
              <span>添加新目标</span>
            </button>
          </div>
        </div>
        
        <!-- 目标卡片区 -->
        <div class="goal-cards">
          <div class="card goal-card" v-for="goal in filteredGoals" :key="goal.id">
            <div class="card-body">
              <div class="goal-header">
                <div class="goal-type" :class="getGoalTypeClass(goal.type)">
                  {{ getGoalTypeName(goal.type) }}
                </div>
                <div class="goal-status" :class="getGoalStatusClass(goal.status)">
                  {{ getGoalStatusName(goal.status) }}
                </div>
              </div>
              <div class="goal-title">
                {{ goal.title }}
              </div>
              <div class="goal-description">
                {{ goal.description }}
              </div>
              <div class="goal-progress">
                <div class="progress-bar-container">
                  <div class="progress-bar" :style="{ width: goal.progress + '%' }"></div>
                </div>
                <div class="progress-text">
                  {{ goal.progress }}% 完成
                </div>
              </div>
              <div class="goal-date">
                <i class="fa fa-calendar"></i>
                <span v-if="goal.status === 'completed'">
                  完成日期: {{ formatDate(goal.completedDate) }}
                </span>
                <span v-else>
                  截止日期: {{ formatDate(goal.deadline) }}
                </span>
              </div>
              <div class="goal-actions">
                <button class="btn edit-btn" @click="openEditGoalModal(goal)">
                  <i class="fa fa-pencil"></i>
                  <span>编辑</span>
                </button>
                <button class="btn delete-btn" @click="confirmDeleteGoal(goal.id)">
                  <i class="fa fa-trash"></i>
                  <span>删除</span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- 无目标提示 -->
          <div class="no-goals" v-if="filteredGoals.length === 0">
            <i class="fa fa-flag-o"></i>
            <p>暂无目标数据，请添加新目标</p>
          </div>
        </div>
      </div>
    </main>

    <!-- 添加/编辑目标弹窗 -->
    <div class="modal-backdrop" v-if="showGoalModal">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">{{ isEditing ? '编辑目标' : '添加新目标' }}</h3>
          <button class="close-btn" @click="closeGoalModal">
            <i class="fa fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveGoal">
            <div class="form-group">
              <label class="form-label">目标名称 <span class="required">*</span></label>
              <input 
                type="text" 
                class="form-input" 
                v-model="currentGoal.title" 
                placeholder="请输入目标名称" 
                required
              >
            </div>
            <div class="form-group">
              <label class="form-label">目标类型 <span class="required">*</span></label>
              <select 
                class="form-select" 
                v-model="currentGoal.type" 
                required
              >
                <option value="">请选择目标类型</option>
                <option value="learning">学习目标</option>
                <option value="task">任务目标</option>
                <option value="teaching">教学目标</option>
                <option value="reading">阅读目标</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">目标描述 <span class="required">*</span></label>
              <textarea 
                class="form-textarea" 
                v-model="currentGoal.description" 
                placeholder="请详细描述目标内容和衡量标准" 
                rows="4"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">截止日期 <span class="required">*</span></label>
              <input 
                type="date" 
                class="form-input" 
                v-model="currentGoal.deadline" 
                required
              >
            </div>
            <div class="form-group">
              <label class="form-label">当前进度（%）</label>
              <input 
                type="number" 
                class="form-input" 
                v-model="currentGoal.progress" 
                min="0" 
                max="100" 
                placeholder="0-100"
              >
            </div>
            <div class="form-actions">
              <button type="button" class="btn cancel-btn" @click="closeGoalModal">取消</button>
              <button type="submit" class="btn save-btn">保存</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- 删除确认弹窗 -->
    <div class="modal-backdrop" v-if="showDeleteModal">
      <div class="modal confirm-modal">
        <div class="modal-header">
          <h3 class="modal-title">确认删除</h3>
          <button class="close-btn" @click="closeDeleteModal">
            <i class="fa fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>您确定要删除这个目标吗？此操作不可撤销。</p>
          <div class="form-actions">
            <button class="btn cancel-btn" @click="closeDeleteModal">取消</button>
            <button class="btn delete-btn" @click="deleteGoal">确认删除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoalManagement',
  data() {
    return {
      // 筛选条件
      filter: {
        type: 'all',
        status: 'all',
        sort: 'deadline'
      },
      
      // 目标数据 - 添加示例数据
      goals: [
        {
          id: 1,
          title: "完成学期教学计划",
          type: "teaching",
          description: "制定下学期的数学教学计划，包括课程大纲、教学进度和评估方法",
          deadline: "2023-09-15",
          progress: 80,
          status: "in-progress",
          completedDate: null
        },
        {
          id: 2,
          title: "参加教育技术培训",
          type: "learning",
          description: "参加学校组织的教育技术培训课程，学习最新的教学软件和方法",
          deadline: "2023-08-30",
          progress: 100,
          status: "completed",
          completedDate: "2023-08-15"
        },
        {
          id: 3,
          title: "阅读教育心理学书籍",
          type: "reading",
          description: "阅读《教育心理学》并撰写读书笔记，应用到教学实践中",
          deadline: "2023-10-01",
          progress: 30,
          status: "in-progress",
          completedDate: null
        },
        {
          id: 4,
          title: "准备期中考试试卷",
          type: "task",
          description: "设计并完成高一年级数学期中考试试卷，包括选择题、填空题和解答题",
          deadline: "2023-10-15",
          progress: 0,
          status: "pending",
          completedDate: null
        },
        {
          id: 5,
          title: "改进课堂教学方法",
          type: "teaching",
          description: "尝试新的教学方法，提高学生参与度和学习效果",
          deadline: "2023-11-30",
          progress: 50,
          status: "in-progress",
          completedDate: null
        },
        {
          id: 6,
          title: "参加教学研讨会",
          type: "learning",
          description: "参加地区性的数学教学研讨会，与其他教师交流经验",
          deadline: "2023-09-25",
          progress: 0,
          status: "pending",
          completedDate: null
        },
        {
          id: 7,
          title: "完成教学论文",
          type: "task",
          description: "撰写一篇关于数学教学方法的论文，准备发表",
          deadline: "2023-12-15",
          progress: 20,
          status: "in-progress",
          completedDate: null
        },
        {
          id: 8,
          title: "阅读教育研究期刊",
          type: "reading",
          description: "每月阅读至少2篇教育研究期刊文章，了解最新教育趋势",
          deadline: "2023-12-31",
          progress: 75,
          status: "in-progress",
          completedDate: null
        }
      ],
      
      // 弹窗状态
      showGoalModal: false,
      showDeleteModal: false,
      isEditing: false,
      currentGoal: {
        id: null,
        title: '',
        type: '',
        description: '',
        deadline: '',
        progress: 0,
        status: 'pending',
        completedDate: null
      },
      deleteGoalId: null
    };
  },
  computed: {
    // 将原来的 methods.filter 改名为 filteredGoals
    filteredGoals() {
      let result = [...this.goals];
      
      // 按类型筛选
      if (this.filter.type !== 'all') {
        result = result.filter(goal => goal.type === this.filter.type);
      }
      
      // 按状态筛选
      if (this.filter.status !== 'all') {
        result = result.filter(goal => goal.status === this.filter.status);
      }
      
      // 排序
      result.sort((a, b) => {
        switch (this.filter.sort) {
          case 'deadline':
            return new Date(a.deadline) - new Date(b.deadline);
          case 'progress':
            return b.progress - a.progress;
          case 'created':
            // 假设创建时间越早，id越小
            return a.id - b.id;
          default:
            return 0;
        }
      });
      
      return result;
    }
  },
  methods: {
    // 格式化日期
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    },
    
    // 获取目标类型样式
    getGoalTypeClass(type) {
      switch (type) {
        case 'learning':
          return 'bg-blue-100 text-blue-800';
        case 'task':
          return 'bg-green-100 text-green-800';
        case 'teaching':
          return 'bg-purple-100 text-purple-800';
        case 'reading':
          return 'bg-yellow-100 text-yellow-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    },
    
    // 获取目标类型名称
    getGoalTypeName(type) {
      switch (type) {
        case 'learning':
          return '学习目标';
        case 'task':
          return '任务目标';
        case 'teaching':
          return '教学目标';
        case 'reading':
          return '阅读目标';
        default:
          return '其他目标';
      }
    },
    
    // 获取目标状态样式
    getGoalStatusClass(status) {
      switch (status) {
        case 'in-progress':
          return 'bg-blue-100 text-blue-800';
        case 'completed':
          return 'bg-green-100 text-green-800';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    },
    
    // 获取目标状态名称
    getGoalStatusName(status) {
      switch (status) {
        case 'in-progress':
          return '进行中';
        case 'completed':
          return '已完成';
        case 'pending':
          return '待开始';
        default:
          return '未知状态';
      }
    },
    
    // 打开添加目标弹窗
    openAddGoalModal() {
      this.isEditing = false;
      this.currentGoal = {
        id: null,
        title: '',
        type: '',
        description: '',
        deadline: '',
        progress: 0,
        status: 'pending',
        completedDate: null
      };
      this.showGoalModal = true;
    },
    
    // 打开编辑目标弹窗
    openEditGoalModal(goal) {
      this.isEditing = true;
      this.currentGoal = { ...goal };
      this.showGoalModal = true;
    },
    
    // 关闭目标弹窗
    closeGoalModal() {
      this.showGoalModal = false;
    },
    
    // 保存目标
    saveGoal() {
      if (this.isEditing) {
        // 更新现有目标
        const index = this.goals.findIndex(goal => goal.id === this.currentGoal.id);
        if (index !== -1) {
          // 如果进度为100%且状态不是已完成，则更新状态和完成日期
          if (this.currentGoal.progress === 100 && this.currentGoal.status !== 'completed') {
            this.currentGoal.status = 'completed';
            this.currentGoal.completedDate = this.formatDate(new Date());
          }
          // 如果进度小于100%且状态是已完成，则更新状态
          else if (this.currentGoal.progress < 100 && this.currentGoal.status === 'completed') {
            this.currentGoal.status = 'in-progress';
            this.currentGoal.completedDate = null;
          }
          
          this.goals.splice(index, 1, this.currentGoal);
        }
      } else {
        // 添加新目标
        const newGoal = {
          ...this.currentGoal,
          id: this.goals.length > 0 ? Math.max(...this.goals.map(g => g.id)) + 1 : 1,
          status: this.currentGoal.progress === 100 ? 'completed' : 'pending',
          completedDate: this.currentGoal.progress === 100 ? this.formatDate(new Date()) : null
        };
        this.goals.push(newGoal);
      }
      
      this.closeGoalModal();
    },
    
    // 确认删除目标
    confirmDeleteGoal(id) {
      this.deleteGoalId = id;
      this.showDeleteModal = true;
    },
    
    // 关闭删除确认弹窗
    closeDeleteModal() {
      this.showDeleteModal = false;
      this.deleteGoalId = null;
    },
    
    // 删除目标
    deleteGoal() {
      if (this.deleteGoalId) {
        this.goals = this.goals.filter(goal => goal.id !== this.deleteGoalId);
        this.closeDeleteModal();
      }
    }
  }
};
</script>

<style scoped>
/* 全局样式 */
.goal-management-page {
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

/* 章节标题 */
.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  padding-left: 5px;
  border-left: 4px solid #6c63ff;
}

/* 顶部统计卡片区 */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: #f8f9ff;
  border: 1px solid #e6e3ff;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.stat-card .card-body {
  padding: 15px;
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(108, 99, 255, 0.1);
  color: #6c63ff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.stat-icon i {
  font-size: 20px;
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 22px;
  font-weight: bold;
  color: #333;
}

/* 筛选栏 */
.filter-bar {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.filter-group {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.filter-label {
  font-size: 14px;
  color: #6c757d;
  margin-right: 10px;
}

.filter-select {
  padding: 8px 15px;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  outline: none;
  transition: border-color 0.3s;
}

.filter-select:focus {
  border-color: #6c63ff;
}

.filter-actions {
  margin-left: auto;
}

.add-btn {
  background-color: #6c63ff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}

.add-btn i {
  margin-right: 5px;
}

.add-btn:hover {
  background-color: #5a4bcf;
}

/* 目标卡片区 */
.goal-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.goal-card {
  background-color: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.goal-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.goal-card .card-body {
  padding: 20px;
}

.goal-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.goal-type, .goal-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.goal-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.goal-description {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 15px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goal-progress {
  margin-bottom: 15px;
}

.progress-bar-container {
  height: 8px;
  background-color: #f1f3f5;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 5px;
}

.progress-bar {
  height: 100%;
  background-color: #6c63ff;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 14px;
  color: #6c63ff;
  text-align: right;
}

.goal-date {
  font-size: 12px;
  color: #6c757d;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.goal-date i {
  margin-right: 5px;
}

.goal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.edit-btn {
  background-color: #f1f3f5;
  color: #6c757d;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}

.edit-btn i {
  margin-right: 5px;
}

.edit-btn:hover {
  background-color: #e9ecef;
}

.delete-btn {
  background-color: #fff1f0;
  color: #f5222d;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
}

.delete-btn i {
  margin-right: 5px;
}

.delete-btn:hover {
  background-color: #ffe0e0;
}

/* 无目标提示 */
.no-goals {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  color: #6c757d;
  background-color: #f8f9ff;
  border: 1px dashed #e6e3ff;
  border-radius: 8px;
}

.no-goals i {
  font-size: 48px;
  margin-bottom: 15px;
}

/* 弹窗样式 */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.confirm-modal {
  width: 400px;
}

.modal-header {
  padding: 15px 20px;
  border-bottom: 1px solid #e9ecef;
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
  font-size: 20px;
  color: #6c757d;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
}

/* 表单样式 */
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
  border: 1px solid #e9ecef;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: #6c63ff;
  box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.2);
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn {
  background-color: #f1f3f5;
  color: #6c757d;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
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

/* 响应式调整 */
@media (max-width: 992px) {
  .goal-cards {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 80px;
  }
  
  .logo span,
  .nav-item span {
    display: none;
  }
  
  .nav-item {
    justify-content: center;
  }
  
  .nav-item.active {
    border-left: none;
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .filter-bar {
    flex-wrap: wrap;
  }
  
  .filter-group {
    margin-bottom: 10px;
    flex: 1;
    min-width: 150px;
  }
  
  .stats-cards {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .goal-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .top-nav {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .search-box {
    width: 100%;
    margin-bottom: 10px;
  }
  
  .user-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .stats-cards {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
  
  .stat-value {
    font-size: 18px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .cancel-btn, .save-btn {
    width: 100%;
  }
}
</style>
