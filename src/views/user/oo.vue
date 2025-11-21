<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
import { ElCard, ElRow, ElCol, ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElInputNumber, ElProgress, ElTag, ElDivider, ElTooltip, ElDatePicker } from 'element-plus'
import { Plus, Edit, Delete, Aim, Calendar, Document, Trophy } from '@element-plus/icons-vue'
import LeftNavigationComponents from "@/components/user/LeftNavigationComponents.vue"
import TopNavigationComponents from "@/components/user/TopNavigationComponents.vue"
import "@/assets/user/UserOverallCss.css"
import "@/assets/user/goalManagementCss/okr-management.css"

// 定义目标数据结构
interface KeyResult {
  id: number
  title: string
  progress: number
  targetValue: number
  currentValue: number
}

interface Objective {
  id: number
  title: string
  description: string
  progress: number
  deadline: string
  keyResults: KeyResult[]
}

// 模拟目标数据
const objectives = ref<Objective[]>([
  {
    id: 1,
    title: '提升教学质量',
    description: '通过改进教学方法和课程内容，提高学生的学习效果',
    progress: 75,
    deadline: '2025-12-31',
    keyResults: [
      {
        id: 101,
        title: '学生满意度达到90%以上',
        progress: 80,
        targetValue: 90,
        currentValue: 72
      },
      {
        id: 102,
        title: '课程完成率达到95%',
        progress: 70,
        targetValue: 95,
        currentValue: 67
      }
    ]
  },
  {
    id: 2,
    title: '个人专业发展',
    description: '通过学习和培训提升自己的专业能力',
    progress: 60,
    deadline: '2025-06-30',
    keyResults: [
      {
        id: 201,
        title: '完成3个专业认证课程',
        progress: 66,
        targetValue: 3,
        currentValue: 2
      },
      {
        id: 202,
        title: '发表至少2篇教学研究论文',
        progress: 50,
        targetValue: 2,
        currentValue: 1
      }
    ]
  },
  {
    id: 3,
    title: '提高学生参与度',
    description: '通过互动式教学方法提高学生课堂参与度',
    progress: 40,
    deadline: '2025-09-30',
    keyResults: [
      {
        id: 301,
        title: '课堂互动次数增加50%',
        progress: 45,
        targetValue: 50,
        currentValue: 22
      },
      {
        id: 302,
        title: '学生提问数量提升30%',
        progress: 35,
        targetValue: 30,
        currentValue: 10
      }
    ]
  }
])

// 表单相关
const dialogVisible = ref(false)
const editMode = ref(false)
const currentObjective = reactive({
  id: 0,
  title: '',
  description: '',
  deadline: ''
})

const currentKeyResult = reactive({
  id: 0,
  title: '',
  targetValue: 0,
  currentValue: 0
})

const keyResultDialogVisible = ref(false)
const objectiveIdForKeyResult = ref(0)

// 统计数据
const statsData = ref([
  { title: '总目标数', value: objectives.value.length, icon: Aim, color: '#409EFF' },
  { title: '已完成目标', value: objectives.value.filter(obj => obj.progress === 100).length, icon: Trophy, color: '#67C23A' },
  { title: '关键结果数', value: objectives.value.reduce((sum, obj) => sum + obj.keyResults.length, 0), icon: Document, color: '#E6A23C' },
  { title: '平均进度', value: `${Math.round(objectives.value.reduce((sum, obj) => sum + obj.progress, 0) / objectives.value.length || 0)}%`,icon: Calendar, color: '#F56C6C' }
])

// 完成情况数据
const completedObjectives = ref(objectives.value.filter(obj => obj.progress === 100).length)
const inProgressObjectives = ref(objectives.value.filter(obj => obj.progress > 0 && obj.progress < 100).length)
const notStartedObjectives = ref(objectives.value.filter(obj => obj.progress === 0).length)
const completionRate = ref(Math.round(objectives.value.reduce((sum, obj) => sum + obj.progress, 0) / objectives.value.length || 0))

// 图表实例
let progressChart: echarts.ECharts | null = null

// 添加新目标
const addObjective = () => {
  editMode.value = false
  Object.assign(currentObjective, {
    id: 0,
    title: '',
    description: '',
    deadline: ''
  })
  dialogVisible.value = true
}

// 获取目标状态类型
const getObjectiveStatusType = (progress: number) => {
  if (progress === 0) return ''
  if (progress === 100) return 'success'
  return 'warning'
}

// 获取目标状态文本
const getObjectiveStatusText = (progress: number) => {
  if (progress === 0) return '未开始'
  if (progress === 100) return '已完成'
  return '进行中'
}

// 获取进度颜色
const getProgressColor = (percentage: number) => {
  if (percentage < 30) return '#F56C6C'
  if (percentage < 70) return '#E6A23C'
  return '#67C23A'
}

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}-${date.getDate()}`
}

// 对目标进行排序
const sortObjectives = () => {
  objectives.value.sort((a, b) => b.progress - a.progress)
}

// 编辑目标
const editObjective = (objective: Objective) => {
  editMode.value = true
  Object.assign(currentObjective, objective)
  dialogVisible.value = true
}

// 保存目标
const saveObjective = () => {
  if (editMode.value) {
    // 编辑模式
    const index = objectives.value.findIndex(obj => obj.id === currentObjective.id)
    if (index !== -1) {
      objectives.value[index] = { ...objectives.value[index], ...currentObjective }
    }
  } else {
    // 新增模式
    const newObjective: Objective = {
      ...currentObjective,
      progress: 0,
      keyResults: []
    }
    objectives.value.push(newObjective)
  }
  
  // 更新统计数据
  updateStats()
  dialogVisible.value = false
}

// 删除目标
const deleteObjective = (id: number) => {
  objectives.value = objectives.value.filter(obj => obj.id !== id)
  
  // 更新统计数据
  updateStats()
}

// 更新统计数据
const updateStats = () => {
  statsData.value[0].value = objectives.value.length
  statsData.value[1].value = objectives.value.filter(obj => obj.progress === 100).length
  statsData.value[2].value = objectives.value.reduce((sum, obj) => sum + obj.keyResults.length, 0)
  statsData.value[3].value = `${Math.round(objectives.value.reduce((sum, obj) => sum + obj.progress, 0) / objectives.value.length || 0)}%`
  
  completedObjectives.value = objectives.value.filter(obj => obj.progress === 100).length
  inProgressObjectives.value = objectives.value.filter(obj => obj.progress > 0 && obj.progress < 100).length
  notStartedObjectives.value = objectives.value.filter(obj => obj.progress === 0).length
  completionRate.value = Math.round(objectives.value.reduce((sum, obj) => sum + obj.progress, 0) / objectives.value.length || 0)
}

// 添加关键结果
const addKeyResult = (objectiveId: number) => {
  objectiveIdForKeyResult.value = objectiveId
  Object.assign(currentKeyResult, {
    id: 0,
    title: '',
    targetValue: 0,
    currentValue: 0
  })
  keyResultDialogVisible.value = true
}

// 编辑关键结果
const editKeyResult = (objectiveId: number, keyResult: KeyResult) => {
  objectiveIdForKeyResult.value = objectiveId
  Object.assign(currentKeyResult, keyResult)
  keyResultDialogVisible.value = true
}

// 保存关键结果
const saveKeyResult = () => {
  const objective = objectives.value.find(obj => obj.id === objectiveIdForKeyResult.value)
  if (objective) {
    if (currentKeyResult.id) {
      // 编辑模式
      const index = objective.keyResults.findIndex(kr => kr.id === currentKeyResult.id)
      if (index !== -1) {
        objective.keyResults[index] = { ...objective.keyResults[index], ...currentKeyResult }
      }
    } else {
      // 新增模式
      const newKeyResult: KeyResult = {
        ...currentKeyResult,
        progress: currentKeyResult.targetValue ? Math.round((currentKeyResult.currentValue / currentKeyResult.targetValue) * 100) : 0
      }
      objective.keyResults.push(newKeyResult)
    }
    
    // 更新目标进度
    objective.progress = objective.keyResults.length 
      ? Math.round(objective.keyResults.reduce((sum, kr) => sum + kr.progress, 0) / objective.keyResults.length)
      : 0
    
    // 更新统计数据
    updateStats()
  }
  keyResultDialogVisible.value = false
}

// 删除关键结果
const deleteKeyResult = (objectiveId: number, keyResultId: number) => {
  const objective = objectives.value.find(obj => obj.id === objectiveId)
  if (objective) {
    objective.keyResults = objective.keyResults.filter(kr => kr.id !== keyResultId)
    // 更新目标进度
    objective.progress = objective.keyResults.length 
      ? Math.round(objective.keyResults.reduce((sum, kr) => sum + kr.progress, 0) / objective.keyResults.length)
      : 0
    
    // 更新统计数据
    updateStats()
  }
}

// 初始化图表
const initCharts = () => {
  // 进度概览图
  const progressChartElement = document.getElementById('progressChart')
  if (progressChartElement) {
    progressChart = echarts.init(progressChartElement)
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: objectives.value.map(obj => obj.title),
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          max: 100,
          axisLabel: {
            formatter: '{value}%'
          }
        }
      ],
      series: [
        {
          name: '目标进度',
          type: 'bar',
          barWidth: '60%',
          data: objectives.value.map(obj => obj.progress),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          }
        }
      ]
    }
    progressChart.setOption(option)
  }
}

// 窗口大小改变时重置图表
const resizeCharts = () => {
  if (progressChart) {
    progressChart.resize()
  }
}

onMounted(() => {
  initCharts()
  window.addEventListener('resize', resizeCharts)
  updateStats()
})

// 组件卸载前清理事件监听器
// 注意：在实际项目中，应该使用 onBeforeUnmount 钩子来清理
</script>

<template>
  <div class="teacher-dashboard">
    <!-- 左侧导航栏 -->
    <LeftNavigationComponents />
    <main class="main-content-teacher-info">
      <!-- 顶部导航栏 -->
      <TopNavigationComponents />
      <!-- 内容区域 -->
      <div class="content-area">
        <div class="okr-goal-management">
          <div class="okr-page-header">
            <div class="okr-header-content">
              <h2><el-icon class="okr-header-icon"><Aim /></el-icon> 目标管理</h2>
              <p class="okr-header-subtitle">通过OKR方法管理您的教学目标和关键结果</p>
            </div>
            <el-button type="primary" @click="addObjective" class="okr-add-goal-btn">
              <el-icon><Plus /></el-icon> 添加目标
            </el-button>
          </div>

          <el-row :gutter="20" class="okr-stats-row">
            <el-col :span="6" v-for="stat in statsData" :key="stat.title">
              <el-card class="okr-stat-card" shadow="hover">
                <div class="okr-stat-content">
                  <div class="okr-stat-icon-wrapper">
                    <el-icon :size="24" :color="stat.color"><component :is="stat.icon" /></el-icon>
                  </div>
                  <div class="okr-stat-info">
                    <div class="okr-stat-value">{{ stat.value }}</div>
                    <div class="okr-stat-label">{{ stat.title }}</div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>

          <el-row :gutter="20" class="okr-chart-section">
            <el-col :span="16">
              <el-card class="okr-chart-card" shadow="hover">
                <template #header>
                  <div class="okr-card-header">
                    <span>目标进度概览</span>
                  </div>
                </template>
                <div id="progressChart" style="height: 300px;"></div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="okr-completion-card" shadow="hover">
                <template #header>
                  <div class="okr-card-header">
                    <span>完成情况</span>
                  </div>
                </template>
                <div class="okr-completion-content">
                  <div class="okr-completion-chart">
                    <el-progress type="circle" :percentage="completionRate" :width="120" />
                  </div>
                  <div class="okr-completion-stats">
                    <div class="okr-stat-item">
                      <span class="okr-stat-label">已完成</span>
                      <span class="okr-stat-value">{{ completedObjectives }}</span>
                    </div>
                    <div class="okr-stat-item">
                      <span class="okr-stat-label">进行中</span>
                      <span class="okr-stat-value">{{ inProgressObjectives }}</span>
                    </div>
                    <div class="okr-stat-item">
                      <span class="okr-stat-label">未开始</span>
                      <span class="okr-stat-value">{{ notStartedObjectives }}</span>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>

          <el-card class="okr-objectives-list-card" shadow="hover">
            <template #header>
              <div class="okr-card-header">
                <span>目标列表</span>
                <el-button type="text" @click="sortObjectives">按进度排序
                </el-button>
              </div>
            </template>

            <div v-for="objective in objectives" :key="objective.id" class="okr-objective-item">
              <el-card class="okr-objective-card" shadow="hover">
                <div class="okr-objective-header">
                  <div class="okr-objective-info">
                    <div class="okr-objective-title">
                      <h4>{{ objective.title }}</h4>
                      <el-tag
                        :type="getObjectiveStatusType(objective.progress)"
                        size="small"
                        class="okr-status-tag"
                      >
                        {{ getObjectiveStatusText(objective.progress) }}
                      </el-tag>
                    </div>
                    <p class="okr-objective-description">{{ objective.description }}</p>
                    <div class="okr-objective-meta">
                      <el-tooltip
                        :content="`截止日期: ${objective.deadline}`"
                        placement="top"
                      >
                        <el-tag size="small" class="okr-meta-tag">
                          <el-icon><Calendar /></el-icon>
                          {{ formatDate(objective.deadline) }}
                        </el-tag>
                      </el-tooltip>
                      <el-tag type="success" size="small" class="okr-meta-tag">
                        <el-icon><Document /></el-icon>
                        {{ objective.keyResults.length }} 个关键结果
                      </el-tag>
                    </div>
                  </div>
                  <div class="okr-objective-actions">
                    <div class="okr-progress-section">
                      <el-progress
                        type="circle"
                        :percentage="objective.progress"
                        :width="80"
                        :stroke-width="6"
                        :color="getProgressColor(objective.progress)"
                      />
                      <div class="okr-progress-text">{{ objective.progress }}%</div>
                    </div>
                    <div class="okr-action-buttons">
                      <el-tooltip content="添加关键结果" placement="top">
                        <el-button
                          circle
                          @click="addKeyResult(objective.id)"
                          class="okr-action-btn"
                        >
                          <el-icon><Plus /></el-icon>
                        </el-button>
                      </el-tooltip>
                      <el-tooltip content="编辑目标" placement="top">
                        <el-button
                          circle
                          @click="editObjective(objective)"
                          class="okr-action-btn"
                        >
                          <el-icon><Edit /></el-icon>
                        </el-button>
                      </el-tooltip>
                      <el-tooltip content="删除目标" placement="top">
                        <el-button
                          circle
                          type="danger"
                          @click="deleteObjective(objective.id)"
                          class="okr-action-btn"
                        >
                          <el-icon><Delete /></el-icon>
                        </el-button>
                      </el-tooltip>
                    </div>
                  </div>
                </div>

                <el-divider class="okr-kr-divider" />

                <div class="okr-key-results">
                  <div 
                    v-for="kr in objective.keyResults" 
                    :key="kr.id" 
                    class="okr-key-result-item"
                  >
                    <div class="okr-kr-info">
                      <h5>{{ kr.title }}</h5>
                      <div class="okr-kr-progress-info">
                        <span>{{ kr.currentValue }} / {{ kr.targetValue }}</span>
                      </div>
                    </div>
                    <div class="okr-kr-progress">
                      <el-progress 
                        :percentage="kr.progress" 
                        :stroke-width="8" 
                        :show-text="false"
                        :color="getProgressColor(kr.progress)"
                      />
                    </div>
                    <div class="okr-kr-value">{{ kr.progress }}%</div>
                    <div class="okr-kr-actions">
                      <el-tooltip content="编辑关键结果" placement="top">
                        <el-button 
                          circle 
                          size="small" 
                          @click="editKeyResult(objective.id, kr)"
                          class="okr-kr-action-btn"
                        >
                          <el-icon><Edit /></el-icon>
                        </el-button>
                      </el-tooltip>
                      <el-tooltip content="删除关键结果" placement="top">
                        <el-button 
                          circle 
                          size="small" 
                          type="danger" 
                          @click="deleteKeyResult(objective.id, kr.id)"
                          class="okr-kr-action-btn"
                        >
                          <el-icon><Delete /></el-icon>
                        </el-button>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </el-card>
        </div>
      </div>
    </main>
  </div>

  <!-- 目标编辑对话框 -->
  <el-dialog v-model="dialogVisible" :title="editMode ? '编辑目标' : '添加目标'" width="500px" class="okr-dialog">
    <el-form :model="currentObjective" label-width="80px">
      <el-form-item label="目标标题">
        <el-input v-model="currentObjective.title" />
      </el-form-item>
      <el-form-item label="目标描述">
        <el-input v-model="currentObjective.description" type="textarea" />
      </el-form-item>
      <el-form-item label="截止日期">
        <el-date-picker v-model="currentObjective.deadline" type="date" placeholder="选择日期" style="width: 100%" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="okr-dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveObjective">保存</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 关键结果编辑对话框 -->
  <el-dialog v-model="keyResultDialogVisible" title="关键结果" width="500px" class="okr-dialog">
    <el-form :model="currentKeyResult" label-width="80px">
      <el-form-item label="KR标题">
        <el-input v-model="currentKeyResult.title" />
      </el-form-item>
      <el-form-item label="当前值">
        <el-input-number v-model="currentKeyResult.currentValue" :min="0" />
      </el-form-item>
      <el-form-item label="目标值">
        <el-input-number v-model="currentKeyResult.targetValue" :min="0" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="okr-dialog-footer">
        <el-button @click="keyResultDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveKeyResult">保存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>