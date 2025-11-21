<template>
  <div class="goal-management-page">
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
      <!-- 顶部导航栏 -->
      <el-header class="top-nav">
        <div class="search-box">
          <el-input v-model="search" placeholder="搜索..." :prefix-icon="Search" clearable />
        </div>
        <div class="user-actions">
          <el-button text>
            <el-badge :value="3" class="item">
              <el-icon><Bell /></el-icon>
            </el-badge>
          </el-button>
          <el-button text>
            <el-badge :value="5" class="item">
              <el-icon><Message /></el-icon>
            </el-badge>
          </el-button>
          <el-button text>
            <el-icon><Setting /></el-icon>
          </el-button>
          <div class="user-profile">
            <el-avatar src="https://randomuser.me/api/portraits/women/44.jpg" />
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
        <el-card class="filter-bar" shadow="never">
          <el-form inline>
            <el-form-item label="目标类型">
              <el-select v-model="filter.type" placeholder="请选择">
                <el-option label="全部类型" value="all" />
                <el-option label="学习目标" value="learning" />
                <el-option label="任务目标" value="task" />
                <el-option label="教学目标" value="teaching" />
                <el-option label="阅读目标" value="reading" />
              </el-select>
            </el-form-item>
            <el-form-item label="目标状态">
              <el-select v-model="filter.status" placeholder="请选择">
                <el-option label="全部状态" value="all" />
                <el-option label="进行中" value="in-progress" />
                <el-option label="已完成" value="completed" />
                <el-option label="待开始" value="pending" />
              </el-select>
            </el-form-item>
            <el-form-item label="排序方式">
              <el-select v-model="filter.sort" placeholder="请选择">
                <el-option label="按截止日期" value="deadline" />
                <el-option label="按完成进度" value="progress" />
                <el-option label="按创建时间" value="created" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="openAddGoalModal">
                <el-icon><Plus /></el-icon>
                添加新目标
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
        
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
    <el-dialog v-model="showGoalModal" :title="isEditing ? '编辑目标' : '添加新目标'" width="500px">
      <el-form @submit.prevent="saveGoal" label-position="top">
        <el-form-item label="目标名称" required>
          <el-input v-model="currentGoal.title" placeholder="请输入目标名称" />
        </el-form-item>
        <el-form-item label="目标类型" required>
          <el-select v-model="currentGoal.type" placeholder="请选择目标类型">
            <el-option label="学习目标" value="learning" />
            <el-option label="任务目标" value="task" />
            <el-option label="教学目标" value="teaching" />
            <el-option label="阅读目标" value="reading" />
          </el-select>
        </el-form-item>
        <el-form-item label="目标描述" required>
          <el-input v-model="currentGoal.description" type="textarea" :rows="4" placeholder="请详细描述目标内容和衡量标准" />
        </el-form-item>
        <el-form-item label="截止日期" required>
          <el-date-picker v-model="currentGoal.deadline" type="date" value-format="YYYY-MM-DD" placeholder="选择日期" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="当前进度（%）">
          <el-input-number v-model="currentGoal.progress" :min="0" :max="100" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeGoalModal">取消</el-button>
          <el-button type="primary" @click="saveGoal">保存</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 删除确认弹窗 -->
    <el-dialog v-model="showDeleteModal" title="确认删除" width="400px">
      <p>您确定要删除这个目标吗？此操作不可撤销。</p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDeleteModal">取消</el-button>
          <el-button type="danger" @click="deleteGoal">确认删除</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { 
  User, UserFilled, DataAnalysis, Aim, Bell, Notebook, QuestionFilled, Message, Folder, Setting, Search, Plus, Reading
} from '@element-plus/icons-vue';
import router from "@/router/index.ts";

export default {
  name: 'GoalManagement',
  components: { User, UserFilled, DataAnalysis, Aim, Bell, Notebook, QuestionFilled, Message, Folder, Setting, Search, Plus, Reading },
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
    Search() {
      return Search
    },
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
    router() {
      return router
    },
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

<!--<style scoped>-->
<!--/* 全局样式 */-->
<!--.goal-management-page {-->
<!--  display: flex;-->
<!--  min-height: 100vh;-->
<!--  font-family: 'Inter', system-ui, sans-serif;-->
<!--}-->

<!--/* 左侧导航栏 */-->
<!--.sidebar {-->
<!--  width: 240px;-->
<!--  background-color: #5a4bcf;-->
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
<!--}-->





<!--.nav-item i {-->
<!--  font-size: 18px;-->
<!--  margin-right: 10px;-->
<!--  width: 24px;-->
<!--  text-align: center;-->
<!--}-->

<!--/* 右侧主内容区 */-->
<!--.main-content {-->
<!--  flex: 1;-->
<!--  background-color: #f8f9fa;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--}-->




<!--.search-box {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  background-color: #f1f3f5;-->
<!--  border-radius: 4px;-->
<!--  padding: 8px 15px;-->
<!--  width: 300px;-->
<!--}-->

<!--.search-box i {-->
<!--  color: #6c757d;-->
<!--  margin-right: 10px;-->
<!--}-->

<!--.search-box input {-->
<!--  background: none;-->
<!--  border: none;-->
<!--  outline: none;-->
<!--  flex: 1;-->
<!--  font-size: 14px;-->
<!--}-->

<!--.user-actions {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--}-->


<!--.user-profile {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  margin-left: 20px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.user-profile img {-->
<!--  width: 40px;-->
<!--  height: 40px;-->
<!--  border-radius: 50%;-->
<!--  object-fit: cover;-->
<!--  margin-right: 10px;-->
<!--}-->

<!--.user-info {-->
<!--  text-align: left;-->
<!--}-->

<!--.user-name {-->
<!--  font-weight: bold;-->
<!--  font-size: 14px;-->
<!--}-->

<!--.user-role {-->
<!--  font-size: 12px;-->
<!--  color: #6c757d;-->
<!--}-->

<!--/* 内容区域 */-->
<!--.content-area {-->
<!--  flex: 1;-->
<!--  padding: 20px;-->
<!--  overflow-y: auto;-->
<!--}-->

<!--/* 页面标题 */-->
<!--.page-title {-->
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
<!--  color: #6c757d;-->
<!--}-->

<!--/* 章节标题 */-->
<!--.section-title {-->
<!--  font-size: 18px;-->
<!--  font-weight: bold;-->
<!--  color: #333;-->
<!--  margin-bottom: 15px;-->
<!--  padding-left: 5px;-->
<!--  border-left: 4px solid #6c63ff;-->
<!--}-->

<!--/* 顶部统计卡片区 */-->
<!--.stats-cards {-->
<!--  display: grid;-->
<!--  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));-->
<!--  gap: 15px;-->
<!--  margin-bottom: 30px;-->
<!--}-->

<!--.stat-card {-->
<!--  background-color: #f8f9ff;-->
<!--  border: 1px solid #e6e3ff;-->
<!--  border-radius: 8px;-->
<!--  overflow: hidden;-->
<!--  transition: transform 0.3s, box-shadow 0.3s;-->
<!--}-->

<!--.stat-card:hover {-->
<!--  transform: translateY(-5px);-->
<!--  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);-->
<!--}-->

<!--.stat-card .card-body {-->
<!--  padding: 15px;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--}-->

<!--.stat-icon {-->
<!--  width: 40px;-->
<!--  height: 40px;-->
<!--  border-radius: 50%;-->
<!--  background-color: rgba(108, 99, 255, 0.1);-->
<!--  color: #6c63ff;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  margin-right: 15px;-->
<!--}-->

<!--.stat-icon i {-->
<!--  font-size: 20px;-->
<!--}-->

<!--.stat-info {-->
<!--  flex: 1;-->
<!--}-->

<!--.stat-label {-->
<!--  font-size: 14px;-->
<!--  color: #6c757d;-->
<!--  margin-bottom: 5px;-->
<!--}-->

<!--.stat-value {-->
<!--  font-size: 22px;-->
<!--  font-weight: bold;-->
<!--  color: #333;-->
<!--}-->

<!--/* 筛选栏 */-->
<!--.filter-bar {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  background-color: white;-->
<!--  border-radius: 8px;-->
<!--  padding: 15px 20px;-->
<!--  margin-bottom: 20px;-->
<!--  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);-->
<!--}-->


<!--.add-btn i {-->
<!--  margin-right: 5px;-->
<!--}-->


<!--/* 目标卡片区 */-->
<!--.goal-cards {-->
<!--  display: grid;-->
<!--  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));-->
<!--  gap: 20px;-->
<!--  margin-bottom: 30px;-->
<!--}-->

<!--.goal-card {-->
<!--  background-color: white;-->
<!--  border: 1px solid #e9ecef;-->
<!--  border-radius: 8px;-->
<!--  overflow: hidden;-->
<!--  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);-->
<!--  transition: transform 0.3s, box-shadow 0.3s;-->
<!--}-->

<!--.goal-card:hover {-->
<!--  transform: translateY(-5px);-->
<!--  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);-->
<!--}-->

<!--.goal-card .card-body {-->
<!--  padding: 20px;-->
<!--}-->

<!--.goal-header {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.goal-type, .goal-status {-->
<!--  padding: 4px 8px;-->
<!--  border-radius: 4px;-->
<!--  font-size: 12px;-->
<!--  font-weight: 500;-->
<!--}-->

<!--.goal-title {-->
<!--  font-size: 16px;-->
<!--  font-weight: bold;-->
<!--  color: #333;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.goal-description {-->
<!--  font-size: 14px;-->
<!--  color: #6c757d;-->
<!--  margin-bottom: 15px;-->
<!--  line-height: 1.5;-->
<!--  display: -webkit-box;-->
<!--  -webkit-line-clamp: 3;-->
<!--  line-clamp: 3;-->
<!--  -webkit-box-orient: vertical;-->
<!--  overflow: hidden;-->
<!--}-->

<!--.goal-progress {-->
<!--  margin-bottom: 15px;-->
<!--}-->

<!--.progress-bar-container {-->
<!--  height: 8px;-->
<!--  background-color: #f1f3f5;-->
<!--  border-radius: 4px;-->
<!--  overflow: hidden;-->
<!--  margin-bottom: 5px;-->
<!--}-->

<!--.progress-bar {-->
<!--  height: 100%;-->
<!--  background-color: #6c63ff;-->
<!--  border-radius: 4px;-->
<!--  transition: width 0.5s ease;-->
<!--}-->

<!--.progress-text {-->
<!--  font-size: 14px;-->
<!--  color: #6c63ff;-->
<!--  text-align: right;-->
<!--}-->

<!--.goal-date {-->
<!--  font-size: 12px;-->
<!--  color: #6c757d;-->
<!--  margin-bottom: 15px;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--}-->

<!--.goal-date i {-->
<!--  margin-right: 5px;-->
<!--}-->

<!--.goal-actions {-->
<!--  display: flex;-->
<!--  justify-content: flex-end;-->
<!--  gap: 10px;-->
<!--}-->

<!--.edit-btn {-->
<!--  background-color: #f1f3f5;-->
<!--  color: #6c757d;-->
<!--  border: none;-->
<!--  border-radius: 6px;-->
<!--  padding: 6px 12px;-->
<!--  cursor: pointer;-->
<!--  font-size: 12px;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  transition: background-color 0.3s;-->
<!--}-->

<!--.edit-btn i {-->
<!--  margin-right: 5px;-->
<!--}-->

<!--.edit-btn:hover {-->
<!--  background-color: #e9ecef;-->
<!--}-->

<!--.delete-btn {-->
<!--  background-color: #fff1f0;-->
<!--  color: #f5222d;-->
<!--  border: none;-->
<!--  border-radius: 6px;-->
<!--  padding: 6px 12px;-->
<!--  cursor: pointer;-->
<!--  font-size: 12px;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  transition: background-color 0.3s;-->
<!--}-->

<!--.delete-btn i {-->
<!--  margin-right: 5px;-->
<!--}-->

<!--.delete-btn:hover {-->
<!--  background-color: #ffe0e0;-->
<!--}-->

<!--/* 无目标提示 */-->
<!--.no-goals {-->
<!--  grid-column: 1 / -1;-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  padding: 50px 0;-->
<!--  color: #6c757d;-->
<!--  background-color: #f8f9ff;-->
<!--  border: 1px dashed #e6e3ff;-->
<!--  border-radius: 8px;-->
<!--}-->

<!--.no-goals i {-->
<!--  font-size: 48px;-->
<!--  margin-bottom: 15px;-->
<!--}-->














<!--/* 响应式调整 */-->
<!--@media (max-width: 992px) {-->
<!--  .goal-cards {-->
<!--    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));-->
<!--  }-->
<!--}-->

<!--@media (max-width: 768px) {-->
<!--  .sidebar {-->
<!--    width: 80px;-->
<!--  }-->
<!--  -->
<!--  .logo span,-->
<!--  .nav-item span {-->
<!--    display: none;-->
<!--  }-->
<!--  -->

<!--  -->
<!--  .filter-bar {-->
<!--    flex-wrap: wrap;-->
<!--  }-->
<!--  -->

<!--  .stats-cards {-->
<!--    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));-->
<!--  }-->
<!--  -->
<!--  .goal-cards {-->
<!--    grid-template-columns: 1fr;-->
<!--  }-->
<!--}-->

<!--@media (max-width: 576px) {-->
<!--  -->
<!--  .search-box {-->
<!--    width: 100%;-->
<!--    margin-bottom: 10px;-->
<!--  }-->
<!--  -->
<!--  .user-actions {-->
<!--    width: 100%;-->
<!--    justify-content: space-between;-->
<!--  }-->
<!--  -->
<!--  .stats-cards {-->
<!--    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));-->
<!--  }-->
<!--  -->
<!--  .stat-value {-->
<!--    font-size: 18px;-->
<!--  }-->

<!--}-->
<!--</style>-->
