<script setup lang="ts">
import LeftNavigationComponents from "@/components/user/LeftNavigationComponents.vue"
import "@/assets/user/UserOverallCss.css"
import { ref, reactive, computed, onMounted } from "vue"
import {
  ElButton, ElCard, ElCol, ElDialog, ElForm, ElFormItem, ElIcon, ElInput,
  ElOption, ElPagination, ElRow, ElSelect, ElTag, ElMessage, ElTooltip,
  ElPopover, ElMenu, ElMenuItem, ElDivider, ElSwitch, ElUpload
} from "element-plus"
import {
  Plus, Edit, Delete, Search, Notebook, Calendar, Eye, Star, StarFilled,
  History, Filter, RefreshCw, More, Download, Share2, Bookmark,
  Check, X, Clock, AlertCircle, FileText, Save, ArrowUp, ArrowDown
} from "@element-plus/icons-vue"

// 扩展状态类型
type Status = "published" | "draft" | "reviewing" | "rejected"
// 扩展学科类型
type Subject = "math" | "chinese" | "english" | "physics" | "chemistry" | "biology" | "history" | "geography" | "politics"
// 扩展年级类型
type Grade = "grade7" | "grade8" | "grade9" | "grade10" | "grade11" | "grade12"
// 扩展难度类型
type Difficulty = "easy" | "medium" | "hard"
// 定义el-tag支持的type类型




// 筛选条件
const searchQuery = ref("")
const selectedSubject = ref<Subject | "">("")
const selectedGrade = ref<Grade | "">("")
const selectedStatus = ref<Status | "">("")
const selectedDifficulty = ref<Difficulty | "">("")
const sortBy = ref<keyof LessonPlan>("lastUpdated")
const sortOrder = ref<"asc" | "desc">("desc")
const showMyCollection = ref(false)

// 分页控制
const currentPage = ref(1)
const pageSize = ref(6)

// 模态框控制
const newLessonModalOpen = ref(false)
const editLessonModalOpen = ref(false)
const detailModalOpen = ref(false)
const currentLesson = reactive<Partial<LessonPlan>>({
  tags: [],
  isCollected: false,
  difficulty: "medium"
})

// 表单引用
const newLessonFormRef = ref<ElFormInstance | null>(null)
const editLessonFormRef = ref<ElFormInstance | null>(null)

// 表单验证规则
const formRules = reactive({
  title: [{ required: true, message: "请输入教案标题", trigger: "blur" }, { min: 5, max: 50, message: "标题长度在5-50个字符之间", trigger: "blur" }],
  description: [{ required: true, message: "请输入教案简介", trigger: "blur" }, { min: 20, max: 300, message: "简介长度在20-300个字符之间", trigger: "blur" }],
  subject: [{ required: true, message: "请选择学科", trigger: "change" }],
  grade: [{ required: true, message: "请选择年级", trigger: "change" }],
  difficulty: [{ required: true, message: "请选择难度", trigger: "change" }],
  status: [{ required: true, message: "请选择状态", trigger: "change" }]
})



// 分页后的列表
const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredList.value.slice(start, start + pageSize.value)
})

// 打开新增模态框
const openNewLessonModal = () => {
  Object.assign(currentLesson, {
    id: undefined,
    title: "",
    description: "",
    subject: "",
    grade: "",
    status: "draft",
    difficulty: "medium",
    views: 0,
    favorites: 0,
    edits: 1,
    createTime: new Date().toISOString().split("T")[0],
    lastUpdated: new Date().toISOString().split("T")[0],
    author: "我",
    tags: [],
    isCollected: false,
    fileSize: "0MB",
    version: "v1.0"
  })
  newLessonModalOpen.value = true
}

// 打开编辑模态框
const openEditLessonModal = (lesson: LessonPlan) => {
  Object.assign(currentLesson, { ...lesson })
  editLessonModalOpen.value = true
}

// 打开详情模态框
const openDetailModal = (lesson: LessonPlan) => {
  Object.assign(currentLesson, { ...lesson })
  detailModalOpen.value = true
}

// 保存教案
const saveLesson = async () => {
  // 表单验证
  if (currentLesson.id) {
    // 编辑现有教案
    if (editLessonFormRef.value) {
      try {
        await editLessonFormRef.value.validate()
        const idx = lessonPlans.value.findIndex(l => l.id === currentLesson.id)
        if (idx !== -1) {
          lessonPlans.value[idx] = {
            ...lessonPlans.value[idx],
            ...(currentLesson as LessonPlan),
            lastUpdated: new Date().toISOString().split("T")[0],
            edits: (lessonPlans.value[idx].edits || 0) + 1,
            version: `v${(parseFloat((lessonPlans.value[idx].version || "v1.0").replace("v", "")) + 0.1).toFixed(1)}`
          }
        }
        editLessonModalOpen.value = false
        ElMessage.success("教案已成功更新")
      } catch (error) {
        return
      }
    }
  } else {
    // 创建新教案
    if (newLessonFormRef.value) {
      try {
        await newLessonFormRef.value.validate()
        const newItem: LessonPlan = {
          ...(currentLesson as LessonPlan),
          id: Date.now(),
          views: 0,
          favorites: 0,
          edits: 1,
          createTime: new Date().toISOString().split("T")[0],
          lastUpdated: new Date().toISOString().split("T")[0],
          author: "我",
          tags: currentLesson.tags || [],
          isCollected: false,
          fileSize: "0.5MB",
          version: "v1.0"
        }
        lessonPlans.value.unshift(newItem)
        newLessonModalOpen.value = false
        ElMessage.success("教案已成功创建")
      } catch (error) {
        return
      }
    }
  }
}

// 删除教案
const deleteLesson = (lesson: LessonPlan) => {
  ElMessage.confirm(
      "确定要删除这个教案吗？删除后将无法恢复。",
      "删除确认",
      {
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
        type: "warning"
      }
  ).then(() => {
    lessonPlans.value = lessonPlans.value.filter(l => l.id !== lesson.id)
    ElMessage.success("教案已成功删除")
  }).catch(() => {
    ElMessage.info("已取消删除")
  })
}

// 切换收藏状态
const toggleCollection = (lesson: LessonPlan, e: Event) => {
  e.stopPropagation()
  const idx = lessonPlans.value.findIndex(l => l.id === lesson.id)
  if (idx !== -1) {
    lessonPlans.value[idx].isCollected = !lessonPlans.value[idx].isCollected
    ElMessage.success(
        lessonPlans.value[idx].isCollected
            ? "已添加到收藏"
            : "已取消收藏"
    )
  }
}

// 重置筛选条件
const resetFilters = () => {
  searchQuery.value = ""
  selectedSubject.value = ""
  selectedGrade.value = ""
  selectedStatus.value = ""
  selectedDifficulty.value = ""
  showMyCollection.value = false
  sortBy.value = "lastUpdated"
  sortOrder.value = "desc"
  currentPage.value = 1
}

// 切换排序方式
const toggleSort = (key: keyof LessonPlan) => {
  if (sortBy.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc"
  } else {
    sortBy.value = key
    sortOrder.value = "desc"
  }
}

// 下载教案
const downloadLesson = (lesson: LessonPlan, e: Event) => {
  e.stopPropagation()
  ElMessage.info(`正在下载 ${lesson.title}...`)
  // 实际项目中这里会触发文件下载逻辑
}

// 分享教案
const shareLesson = (lesson: LessonPlan, e: Event) => {
  e.stopPropagation()
  ElMessage.info("分享功能已触发")
  // 实际项目中这里会触发分享逻辑
}

// 初始化页面加载动画
onMounted(() => {
  // 模拟加载效果
  setTimeout(() => {
    document.querySelector('.main-content')?.classList.add('loaded')
  }, 300)
})

// 辅助函数：获取状态标签样式
const getStatusTagProps = (status: Status) => {
  switch (status) {
    case "published":
      return { type: "success", icon: Check }
    case "draft":
      return { type: "info", icon: FileText }
    case "reviewing":
      return { type: "warning", icon: Clock }
    case "rejected":
      return { type: "danger", icon: AlertCircle }
    default:
      return { type: "default", icon: FileText }
  }
}

// 辅助函数：获取难度标签样式
const getDifficultyTagProps = (difficulty: Difficulty) => {
  switch (difficulty) {
    case "easy":
      return { type: "success", label: "简单" }
    case "medium":
      return { type: "warning", label: "中等" }
    case "hard":
      return { type: "danger", label: "困难" }
    default:
      return { type: "default", label: "未知" }
  }
}

// 辅助函数：获取学科名称
const getSubjectName = (subject: Subject) => {
  const subjectMap: Record<Subject, string> = {
    math: "数学",
    chinese: "语文",
    english: "英语",
    physics: "物理",
    chemistry: "化学",
    biology: "生物",
    history: "历史",
    geography: "地理",
    politics: "政治"
  }
  return subjectMap[subject] || "未知"
}

// 辅助函数：获取年级名称
const getGradeName = (grade: Grade) => {
  const gradeMap: Record<Grade, string> = {
    grade7: "七年级",
    grade8: "八年级",
    grade9: "九年级",
    grade10: "高一",
    grade11: "高二",
    grade12: "高三"
  }
  return gradeMap[grade] || "未知"
}
</script>

<template>
  <div class="lesson-plan-container">
    <left-navigation-components />
    <main class="main-content" :class="{ loaded: true }">
      <div class="content-area">



        <!-- 筛选条件卡片 -->
        <el-card class="filters-card" :border="false" shadow="hover">
          <div class="filters-header">
            <div class="filters-title">
              <ElIcon><Filter /></ElIcon>
              <span>筛选条件</span>
            </div>
            <el-button type="text" @click="resetFilters" class="reset-btn">
              <ElIcon size="14"><RefreshCw /></ElIcon>
              重置筛选
            </el-button>
          </div>

          <el-row :gutter="20" align="middle" class="filters-content">
            <el-col :span="6">
              <el-input
                  v-model="searchQuery"
                  :prefix-icon="Search"
                  placeholder="搜索标题、简介或标签"
                  clearable
                  class="search-input"
              />
            </el-col>
            <el-col :span="4">
              <el-select v-model="selectedSubject" placeholder="学科" clearable class="filter-select">
                <el-option label="数学" value="math" />
                <el-option label="语文" value="chinese" />
                <el-option label="英语" value="english" />
                <el-option label="物理" value="physics" />
                <el-option label="化学" value="chemistry" />
                <el-option label="生物" value="biology" />
                <el-option label="历史" value="history" />
                <el-option label="地理" value="geography" />
                <el-option label="政治" value="politics" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="selectedGrade" placeholder="年级" clearable class="filter-select">
                <el-option label="七年级" value="grade7" />
                <el-option label="八年级" value="grade8" />
                <el-option label="九年级" value="grade9" />
                <el-option label="高一" value="grade10" />
                <el-option label="高二" value="grade11" />
                <el-option label="高三" value="grade12" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="selectedStatus" placeholder="状态" clearable class="filter-select">
                <el-option label="已发布" value="published" />
                <el-option label="草稿" value="draft" />
                <el-option label="审核中" value="reviewing" />
                <el-option label="已驳回" value="rejected" />
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-select v-model="selectedDifficulty" placeholder="难度" clearable class="filter-select">
                <el-option label="简单" value="easy" />
                <el-option label="中等" value="medium" />
                <el-option label="困难" value="hard" />
              </el-select>
            </el-col>
            <el-col :span="3" class="filter-switch">
              <el-switch
                  v-model="showMyCollection"
                  active-text="只看收藏"
                  inactive-text="全部显示"
                  active-color="#f7ba1e"
              />
            </el-col>
          </el-row>

          <!-- 排序条件 -->
          <div class="sort-container">
            <span class="sort-label">排序：</span>
            <el-select
                v-model="sortBy"
                placeholder="排序字段"
                size="small"
                class="sort-select"
                @change="toggleSort(sortBy)"
            >
              <el-option label="最后更新" value="lastUpdated" />
              <el-option label="浏览量" value="views" />
              <el-option label="收藏数" value="favorites" />
              <el-option label="创建时间" value="createTime" />
            </el-select>
            <el-button
                size="small"
                :icon="ArrowUp"
                @click="sortOrder = 'asc'"
                :class="{ 'sort-active': sortOrder === 'asc' }"
            />
            <el-button
                size="small"
                :icon="ArrowDown"
                @click="sortOrder = 'desc'"
                :class="{ 'sort-active': sortOrder === 'desc' }"
            />
          </div>
        </el-card>

        <!-- 教案列表 -->
        <div class="lesson-list-header">
          <div class="list-info">
            <span>找到 {{ stats.filteredTotal }} 个教案</span>
          </div>
          <div class="view-toggle">
            <el-button size="small" type="text" :class="{ active: true }">卡片视图</el-button>
            <el-button size="small" type="text">列表视图</el-button>
          </div>
        </div>

        <el-row :gutter="24" class="lesson-grid">
          <el-col :span="8" v-for="item in paginatedList" :key="item.id">
            <el-card
                shadow="hover"
                :border="false"
                class="lesson-card"
                @click="openDetailModal(item)"
            >
              <!-- 收藏按钮 -->
              <el-button
                  class="collect-btn"
                  :icon="item.isCollected ? StarFilled : Star"
                  :type="item.isCollected ? 'warning' : 'text'"
                  @click="toggleCollection(item, $event)"
                  circle
                  size="default"
              />

              <!-- 教案头部 -->
              <div class="lesson-header">
                <div class="lesson-title">
                  <ElIcon><Notebook /></ElIcon>
                  <span>{{ item.title }}</span>
                </div>
                <div class="lesson-status">
                  <el-tag
                      :type="getStatusTagProps(item.status).type"
                      class="status-tag"
                  >
                    <ElIcon :component="getStatusTagProps(item.status).icon" size="14" />
                    <span v-if="item.status === 'published'">已发布</span>
                    <span v-else-if="item.status === 'draft'">草稿</span>
                    <span v-else-if="item.status === 'reviewing'">审核中</span>
                    <span v-else>已驳回</span>
                  </el-tag>
                </div>
              </div>

              <!-- 教案标签 -->
              <div class="lesson-tags">
                <el-tag size="default" type="info" class="subject-tag">
                  {{ getSubjectName(item.subject) }}
                </el-tag>
                <el-tag size="default" type="primary" class="grade-tag">
                  {{ getGradeName(item.grade) }}
                </el-tag>
                <el-tag
                    size="default"
                    :type="getDifficultyTagProps(item.difficulty).type"
                    class="difficulty-tag"
                >
                  {{ getDifficultyTagProps(item.difficulty).label }}
                </el-tag>
                <el-tag size="default" type="default" class="version-tag">
                  {{ item.version }}
                </el-tag>
              </div>

              <!-- 教案简介 -->
              <p class="lesson-desc">
                {{ item.description }}
              </p>

              <!-- 教案标签 -->
              <div class="lesson-keywords">
                <el-tag
                    size="default"
                    type="text"
                    class="keyword-tag"
                    v-for="tag in item.tags"
                    :key="tag"
                >
                  {{ tag }}
                </el-tag>
              </div>

              <!-- 教案元数据 -->
              <div class="lesson-meta">
                <el-tooltip content="创建时间" placement="top">
                  <div class="meta-item">
                    <ElIcon size="14"><Calendar /></ElIcon>
                    <span>{{ item.createTime }}</span>
                  </div>
                </el-tooltip>
                <el-tooltip content="浏览量" placement="top">
                  <div class="meta-item">
                    <ElIcon size="14"><Eye /></ElIcon>
                    <span>{{ item.views }}</span>
                  </div>
                </el-tooltip>
                <el-tooltip content="收藏数" placement="top">
                  <div class="meta-item">
                    <ElIcon size="14"><Star /></ElIcon>
                    <span>{{ item.favorites }}</span>
                  </div>
                </el-tooltip>
                <el-tooltip content="更新次数" placement="top">
                  <div class="meta-item">
                    <ElIcon size="14"><History /></ElIcon>
                    <span>{{ item.edits }}</span>
                  </div>
                </el-tooltip>
                <el-tooltip content="文件大小" placement="top">
                  <div class="meta-item">
                    <ElIcon size="14"><FileText /></ElIcon>
                    <span>{{ item.fileSize }}</span>
                  </div>
                </el-tooltip>
              </div>

              <!-- 操作按钮 -->
              <div class="lesson-actions">
                <el-popover
                    placement="top"
                    trigger="click"
                    @click.stop
                >
                  <template #reference>
                    <el-button size="small" :icon="More" type="text" class="more-btn" />
                  </template>
                  <el-menu size="small" class="action-menu">
                    <el-menu-item @click="openEditLessonModal(item)">
                      <ElIcon><Edit /></ElIcon>
                      <span>编辑</span>
                    </el-menu-item>
                    <el-menu-item @click="downloadLesson(item, $event)">
                      <ElIcon><Download /></ElIcon>
                      <span>下载</span>
                    </el-menu-item>
                    <el-menu-item @click="shareLesson(item, $event)">
                      <ElIcon><Share2 /></ElIcon>
                      <span>分享</span>
                    </el-menu-item>
                    <el-divider />
                    <el-menu-item @click="deleteLesson(item)" class="menu-danger">
                      <ElIcon><Delete /></ElIcon>
                      <span>删除</span>
                    </el-menu-item>
                  </el-menu>
                </el-popover>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <!-- 空状态 -->
        <div v-if="filteredList.length === 0" class="empty-state">
          <div class="empty-icon">
            <ElIcon><FileText /></ElIcon>
          </div>
          <div class="empty-title">暂无符合条件的教案</div>
          <div class="empty-desc">
            您可以尝试调整筛选条件，或者点击下方按钮创建新教案
          </div>
          <el-button type="primary" :icon="Plus" @click="openNewLessonModal" class="empty-btn">
            新增教案
          </el-button>
        </div>

        <!-- 分页 -->
        <div class="pagination-wrap" v-if="filteredList.length > 0">
          <el-pagination
              v-model:current-page="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="filteredList.length"
              @size-change="(val) => pageSize.value = val"
              @current-change="(val) => currentPage.value = val"
          />
        </div>
      </div>
    </main>

    <!-- 新增教案模态框 -->
    <el-dialog
        v-model="newLessonModalOpen"
        title="新增教案"
        width="800px"
        :close-on-click-modal="false"
        draggable
    >
      <el-form
          :model="currentLesson"
          label-width="100px"
          :rules="formRules"
          ref="newLessonFormRef"
          class="lesson-form"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="教案标题" prop="title">
              <el-input v-model="currentLesson.title" placeholder="请输入教案标题（5-50字）" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学科" prop="subject">
              <el-select v-model="currentLesson.subject" placeholder="请选择学科">
                <el-option label="数学" value="math" />
                <el-option label="语文" value="chinese" />
                <el-option label="英语" value="english" />
                <el-option label="物理" value="physics" />
                <el-option label="化学" value="chemistry" />
                <el-option label="生物" value="biology" />
                <el-option label="历史" value="history" />
                <el-option label="地理" value="geography" />
                <el-option label="政治" value="politics" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年级" prop="grade">
              <el-select v-model="currentLesson.grade" placeholder="请选择年级">
                <el-option label="七年级" value="grade7" />
                <el-option label="八年级" value="grade8" />
                <el-option label="九年级" value="grade9" />
                <el-option label="高一" value="grade10" />
                <el-option label="高二" value="grade11" />
                <el-option label="高三" value="grade12" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="难度级别" prop="difficulty">
              <el-select v-model="currentLesson.difficulty" placeholder="请选择难度级别">
                <el-option label="简单" value="easy" />
                <el-option label="中等" value="medium" />
                <el-option label="困难" value="hard" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="教案简介" prop="description">
              <el-input
                  v-model="currentLesson.description"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入教案简介（20-300字），简要描述教案的主要内容和特点"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="关键词标签">
              <el-input
                  v-model="currentLesson.tags"
                  placeholder="请输入关键词标签，多个标签用逗号分隔"
              />
              <div class="form-hint">提示：添加合适的关键词标签有助于快速查找教案</div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="上传文件">
              <el-upload
                  class="upload-demo"
                  action="#"
                  :file-list="[]"
                  :auto-upload="false"
              >
                <el-button size="small" type="primary">选择文件</el-button>
                <div class="upload-hint">支持PDF、PPT、Word等格式，单个文件不超过20MB</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="newLessonModalOpen=false">取消</el-button>
        <el-button type="primary" @click="saveLesson">保存为草稿</el-button>
        <el-button type="success" @click="saveLesson">保存并发布</el-button>
      </template>
    </el-dialog>

    <!-- 编辑教案模态框 -->
    <el-dialog
        v-model="editLessonModalOpen"
        title="编辑教案"
        width="800px"
        :close-on-click-modal="false"
        draggable
    >
      <el-form
          :model="currentLesson"
          label-width="100px"
          :rules="formRules"
          ref="editLessonFormRef"
          class="lesson-form"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="教案标题" prop="title">
              <el-input v-model="currentLesson.title" placeholder="请输入教案标题（5-50字）" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="(currentLesson.status as Status)" placeholder="请选择状态">
                <el-option label="已发布" value="published" />
                <el-option label="草稿" value="draft" />
                <el-option label="审核中" value="reviewing" />
                <el-option label="已驳回" value="rejected" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学科" prop="subject">
              <el-select v-model="currentLesson.subject" placeholder="请选择学科">
                <el-option label="数学" value="math" />
                <el-option label="语文" value="chinese" />
                <el-option label="英语" value="english" />
                <el-option label="物理" value="physics" />
                <el-option label="化学" value="chemistry" />
                <el-option label="生物" value="biology" />
                <el-option label="历史" value="history" />
                <el-option label="地理" value="geography" />
                <el-option label="政治" value="politics" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="年级" prop="grade">
              <el-select v-model="currentLesson.grade" placeholder="请选择年级">
                <el-option label="七年级" value="grade7" />
                <el-option label="八年级" value="grade8" />
                <el-option label="九年级" value="grade9" />
                <el-option label="高一" value="grade10" />
                <el-option label="高二" value="grade11" />
                <el-option label="高三" value="grade12" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="难度级别" prop="difficulty">
              <el-select v-model="currentLesson.difficulty" placeholder="请选择难度级别">
                <el-option label="简单" value="easy" />
                <el-option label="中等" value="medium" />
                <el-option label="困难" value="hard" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="版本号">
              <el-input v-model="currentLesson.version" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="教案简介" prop="description">
              <el-input
                  v-model="currentLesson.description"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入教案简介（20-300字）"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="关键词标签">
              <el-input
                  v-model="currentLesson.tags"
                  placeholder="请输入关键词标签，多个标签用逗号分隔"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="更新文件">
              <el-upload
                  class="upload-demo"
                  action="#"
                  :file-list="[]"
                  :auto-upload="false"
              >
                <el-button size="small" type="primary">重新上传</el-button>
                <div class="upload-file-info">
                  当前文件：{{ currentLesson.title }}.pdf ({{ currentLesson.fileSize }})
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="editLessonModalOpen=false">取消</el-button>
        <el-button type="primary" @click="saveLesson">保存修改</el-button>
      </template>
    </el-dialog>

    <!-- 教案详情模态框 -->
    <el-dialog
        v-model="detailModalOpen"
        title="教案详情"
        width="900px"
        :close-on-click-modal="false"
        draggable
    >
      <div class="lesson-detail">
        <div class="detail-header">
          <h2 class="detail-title">{{ currentLesson.title }}</h2>
          <div class="detail-actions">
            <el-button size="small" @click="openEditLessonModal(currentLesson as LessonPlan)" :icon="Edit">
              编辑
            </el-button>
            <el-button size="small" type="success" :icon="Download">
              下载
            </el-button>
            <el-button size="small" type="primary" :icon="Share2">
              分享
            </el-button>
            <el-button
                size="small"
                :type="currentLesson.isCollected ? 'warning' : 'default'"
                :icon="currentLesson.isCollected ? StarFilled : Star"
                @click="toggleCollection(currentLesson as LessonPlan, $event)"
            >
              {{ currentLesson.isCollected ? '已收藏' : '收藏' }}
            </el-button>
          </div>
        </div>

        <el-row :gutter="20" class="detail-meta">
          <el-col :span="4">
            <div class="meta-label">学科</div>
            <div class="meta-value">{{ getSubjectName(currentLesson.subject as Subject) }}</div>
          </el-col>
          <el-col :span="4">
            <div class="meta-label">年级</div>
            <div class="meta-value">{{ getGradeName(currentLesson.grade as Grade) }}</div>
          </el-col>
          <el-col :span="4">
            <div class="meta-label">难度</div>
            <div class="meta-value">
              <el-tag
                  size="mini"
                  :type="getDifficultyTagProps(currentLesson.difficulty as Difficulty).type"
              >
                {{ getDifficultyTagProps(currentLesson.difficulty as Difficulty).label }}
              </el-tag>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="meta-label">状态</div>
            <div class="meta-value">
              <el-tag
                  size="mini"
                  :type="getStatusTagProps(currentLesson.status as Status).type"
              >
                <ElIcon :component="getStatusTagProps(currentLesson.status as Status).icon" size="12" />
                <span v-if="currentLesson.status === 'published'">已发布</span>
                <span v-else-if="currentLesson.status === 'draft'">草稿</span>
                <span v-else-if="currentLesson.status === 'reviewing'">审核中</span>
                <span v-else>已驳回</span>
              </el-tag>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="meta-label">创建时间</div>
            <div class="meta-value">{{ currentLesson.createTime }}</div>
          </el-col>
          <el-col :span="4">
            <div class="meta-label">最后更新</div>
            <div class="meta-value">{{ currentLesson.lastUpdated }}</div>
          </el-col>
        </el-row>

        <el-divider />

        <div class="detail-content">
          <div class="content-section">
            <h3 class="section-title">教案简介</h3>
            <div class="section-content">
              {{ currentLesson.description }}
            </div>
          </div>

          <el-divider />

          <div class="content-section">
            <h3 class="section-title">关键词标签</h3>
            <div class="section-content">
              <el-tag
                  size="default"
                  type="text"
                  class="keyword-tag"
                  v-for="tag in currentLesson.tags"
                  :key="tag"
              >
                {{ tag }}
              </el-tag>
            </div>
          </div>

          <el-divider />

          <div class="content-section">
            <h3 class="section-title">文件信息</h3>
            <div class="file-info">
              <el-card :border="false" class="file-card">
                <div class="file-icon">
                  <ElIcon><FileText /></ElIcon>
                </div>
                <div class="file-details">
                  <div class="file-name">{{ currentLesson.title }}.pdf</div>
                  <div class="file-meta">
                    <span>文件大小：{{ currentLesson.fileSize }}</span>
                    <span>版本号：{{ currentLesson.version }}</span>
                    <span>更新次数：{{ currentLesson.edits }} 次</span>
                  </div>
                </div>
                <el-button type="success" size="small" :icon="Download" class="file-download">
                  下载文件
                </el-button>
              </el-card>
            </div>
          </div>

          <el-divider />

          <div class="content-section">
            <h3 class="section-title">使用统计</h3>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-card :border="false" class="stat-card-small">
                  <div class="stat-label">浏览量</div>
                  <div class="stat-value">{{ currentLesson.views }}</div>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card :border="false" class="stat-card-small">
                  <div class="stat-label">收藏数</div>
                  <div class="stat-value">{{ currentLesson.favorites }}</div>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card :border="false" class="stat-card-small">
                  <div class="stat-label">下载量</div>
                  <div class="stat-value">{{ Math.floor((currentLesson.views as number) * 0.3) }}</div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="detailModalOpen=false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>


/* 筛选卡片 */
.filters-card {
  margin-bottom: 24px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.filters-title {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: #1d2129;
}

.filters-title el-icon {
  margin-right: 8px;
  color: #409eff;
}

.reset-btn {
  color: #666;
}

.reset-btn:hover {
  color: #409eff;
}

.filters-content {
  margin-bottom: 16px;
}

.search-input {
  width: 100%;
}

.filter-select {
  width: 100%;
}

.filter-switch {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.el-switch {
  --el-switch-on-color: #f7ba1e;
  --el-switch-off-color: #e5e7eb;
}

.sort-container {
  display: flex;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #f0f2f5;
}

.sort-label {
  font-size: 14px;
  color: #666;
  margin-right: 12px;
}

.sort-select {
  width: 140px;
  margin-right: 8px;
}

.sort-active {
  color: #409eff;
}

/* 教案列表头部 */
.lesson-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.list-info {
  font-size: 14px;
  color: #666;
}

.view-toggle {
  display: flex;
  gap: 8px;
}

.view-toggle .active {
  color: #409eff;
  font-weight: 500;
}

/* 教案卡片 */
.lesson-grid {
  margin-bottom: 24px;
}

.lesson-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
}

.lesson-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

.collect-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.8);
}

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.lesson-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 16px;
  color: #1d2129;
  flex: 1;
  overflow: hidden;
}

.lesson-title span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lesson-status {
  margin-left: 8px;
}

.status-tag {
  padding: 2px 8px;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.lesson-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.subject-tag, .grade-tag, .difficulty-tag, .version-tag {
  padding: 2px 8px;
  font-size: 12px;
}

.version-tag {
  background-color: #f5f7fa;
  color: #888;
}

.lesson-desc {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lesson-keywords {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.keyword-tag {
  background-color: #f0f2f5;
  color: #666;
  padding: 1px 6px;
  font-size: 12px;
}

.lesson-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
  font-size: 12px;
  color: #888;
  border-top: 1px solid #f0f2f5;
  padding-top: 12px;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.lesson-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
}

.more-btn {
  color: #888;
}

.more-btn:hover {
  color: #409eff;
}

.action-menu {
  width: 120px;
}

.menu-danger {
  color: #f56c6c;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 24px;
}

.empty-icon {
  font-size: 64px;
  color: #c0c4cc;
  margin-bottom: 24px;
}

.empty-title {
  font-size: 18px;
  color: #1d2129;
  margin-bottom: 8px;
  font-weight: 500;
}

.empty-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
  text-align: center;
  max-width: 400px;
}

.empty-btn {
  background-color: #409eff;
  border-color: #409eff;
}

/* 分页 */
.pagination-wrap {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

/* 表单样式 */
.lesson-form {
  margin-top: 8px;
}

.form-hint {
  font-size: 12px;
  color: #888;
  margin-top: 8px;
}

.upload-hint {
  font-size: 12px;
  color: #888;
  margin-top: 8px;
}

.upload-file-info {
  font-size: 13px;
  color: #666;
  margin-top: 8px;
}

/* 详情模态框样式 */
.lesson-detail {
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 16px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.detail-title {
  font-size: 20px;
  font-weight: 600;
  color: #1d2129;
  margin: 0;
  flex: 1;
}

.detail-actions {
  display: flex;
  gap: 8px;
}

.detail-meta {
  margin-bottom: 24px;
}

.meta-label {
  font-size: 12px;
  color: #888;
  margin-bottom: 4px;
}

.meta-value {
  font-size: 14px;
  color: #1d2129;
  font-weight: 500;
}

.content-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  color: #1d2129;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}

.section-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 16px;
  background-color: #409eff;
  margin-right: 8px;
  border-radius: 2px;
}

.section-content {
  font-size: 14px;
  color: #333;
  line-height: 1.8;
}

.file-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.file-icon {
  font-size: 32px;
  color: #409eff;
  margin-right: 16px;
}

.file-details {
  flex: 1;
}

.file-name {
  font-size: 14px;
  font-weight: 500;
  color: #1d2129;
  margin-bottom: 4px;
}

.file-meta {
  font-size: 12px;
  color: #666;
  display: flex;
  gap: 16px;
}

.file-download {
  margin-left: 16px;
}

.stat-card-small {
  padding: 12px;
  text-align: center;
  background-color: #f5f7fa;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .lesson-grid el-col {
    --el-col-span: 12 !important;
  }

  .stats-row el-col {
    --el-col-span: 8 !important;
  }
}

@media (max-width: 768px) {
  .lesson-grid el-col {
    --el-col-span: 24 !important;
  }

  .stats-row el-col {
    --el-col-span: 12 !important;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .filters-content el-col {
    --el-col-span: 24 !important;
    margin-bottom: 12px;
  }
}
</style>