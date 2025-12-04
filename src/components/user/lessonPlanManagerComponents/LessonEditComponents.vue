<script setup lang="ts">
import {
  lessonFormRef,
  currentLesson,
  formRules,
} from "@/forms/user/teacherInfo/lessonPlanManagerForms/DataStatisticsForms.ts";
import {
  downloadLesson,
  shareLesson
} from "@/utils/user/teacher/info/lessonPlanManager/StatisticsDataUtils.ts";
import {Download, Edit, Share, Star, StarFilled, Document} from "@element-plus/icons-vue";
import {
  getDifficultyTagProps,
  getGradeName,
  getStatusTagProps,
  getSubjectName
} from "@/utils/user/teacher/info/lessonPlanManager/AuxiliaryFunctionUtils.ts";
import type {
  Difficulty,
  LessonPlan,
  Status
} from "@/data/user/lessonPlanManagerData/interface/StatisticsInterface.ts";
import "@/assets/user/lessonPlanManagerCss/LessonEditCss.css"
import {
  lessonModalOpen,
  openEditLessonModal
} from "@/utils/user/teacher/info/lessonPlanManager/DialogUtils.ts";
import {detailModalOpen, isEditMode} from "@/entity/user/LessonPlanManager/DialogEntity.ts";
import {saveLesson, toggleCollection} from "@/utils/user/teacher/info/lessonPlanManager/TeacherPlanUtils.ts";
</script>

<template>
  <!-- 教案编辑/新增通用模态框 -->
  <el-dialog v-model="lessonModalOpen" :title="isEditMode ? '编辑教案' : '新增教案'" width="800px" :close-on-click-modal="false" draggable>
    <el-form
        :model="currentLesson"
        label-width="100px"
        :rules="formRules"
        ref="lessonFormRef"
        class="lesson-form">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="教案标题" prop="title">
            <el-input v-model="currentLesson.title" placeholder="请输入教案标题（5-50字）" />
          </el-form-item>
        </el-col>

        <!-- 仅编辑模式显示状态和版本号 -->
        <el-col :span="12" v-if="isEditMode">
          <el-form-item label="状态" prop="status">
            <el-select v-model="currentLesson.status" placeholder="请选择状态">
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
              <el-option label="一年级" value="grade1" />
              <el-option label="二年级" value="grade2" />
              <el-option label="三年级" value="grade3" />
              <el-option label="四年级" value="grade4" />
              <el-option label="五年级" value="grade5" />
              <el-option label="六年级" value="grade6" />
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

        <!-- 仅编辑模式显示版本号 -->
        <el-col :span="12" v-if="isEditMode">
          <el-form-item label="版本号">
            <el-input v-model="currentLesson.version" disabled />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="教案简介" prop="description">
            <el-input v-model="currentLesson.description" type="textarea" :rows="4" placeholder="请输入教案简介（20-300字）"/>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="关键词标签">
            <el-input v-model="currentLesson.tags" placeholder="请输入关键词标签，多个标签用逗号分隔"/>
            <div v-if="!isEditMode" class="form-hint">提示：添加合适的关键词标签有助于快速查找教案</div>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item :label="isEditMode ? '更新文件' : '上传文件'">
            <el-upload class="upload-demo" action="#" :file-list="[]" :auto-upload="false">
              <el-button size="small" type="primary">{{ isEditMode ? '重新上传' : '选择文件' }}</el-button>

              <div v-if="!isEditMode" class="upload-hint">支持PDF、PPT、Word等格式，单个文件不超过20MB</div>
              <div v-if="isEditMode" class="upload-file-info">
                当前文件：{{ currentLesson.title }}.pdf ({{ currentLesson.fileSize }})
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <el-button @click="lessonModalOpen = false">取消</el-button>

      <!-- 新增模式按钮 -->
      <template v-if="!isEditMode">
        <el-button type="primary" @click="currentLesson.status='draft'; saveLesson()">保存为草稿</el-button>
        <el-button type="success" @click="currentLesson.status='published'; saveLesson()">保存并发布</el-button>
      </template>

      <!-- 编辑模式按钮 -->
      <template v-if="isEditMode">
        <el-button type="primary" @click="saveLesson()">保存修改</el-button>
      </template>
    </template>
  </el-dialog>

  <!-- 教案详情模态框 -->
  <el-dialog v-model="detailModalOpen" title="教案详情" width="900px" :close-on-click-modal="false" draggable>
      <div class="lesson-detail">
        <div class="detail-header">
          <h2 class="detail-title">{{ currentLesson.title }}</h2>
          <div class="detail-actions">
            <el-button size="small" @click="openEditLessonModal(<LessonPlan>currentLesson)" :icon="Edit">
              编辑
            </el-button>
            <el-button size="small" type="success" :icon="Download" @click="downloadLesson(<LessonPlan>currentLesson, $event)">
              下载
            </el-button>
            <el-button size="small" type="primary" :icon="Share" @click="shareLesson(<LessonPlan>currentLesson, $event)">
              分享
            </el-button>
            <el-button
                size="small"
                :type="currentLesson.isCollected ? 'warning' : 'default'"
                :icon="currentLesson.isCollected ? StarFilled : Star"
                @click="toggleCollection(<LessonPlan>currentLesson, $event)"
            >
              {{ currentLesson.isCollected ? '已收藏' : '收藏' }}
            </el-button>
          </div>
        </div>

        <el-row :gutter="20" class="detail-meta">
          <el-col :span="4">
            <div class="meta-label">学科</div>
            <div class="meta-value">{{ getSubjectName(currentLesson.subject) }}</div>
          </el-col>
          <el-col :span="4">
            <div class="meta-label">年级</div>
            <div class="meta-value">{{ getGradeName(currentLesson.grade) }}</div>
          </el-col>
          <el-col :span="4">
            <div class="meta-label">难度</div>
            <div class="meta-value">
              <el-tag size="small" :type="getDifficultyTagProps(<Difficulty>currentLesson.difficulty).type">
                {{ getDifficultyTagProps(currentLesson.difficulty as Difficulty).label }}
              </el-tag>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="meta-label">状态</div>
            <div class="meta-value">
              <el-tag size="small" :type="getStatusTagProps(<Status>currentLesson.status).type">
                <el-icon :component="getStatusTagProps(<Status>currentLesson.status).icon" size="12" />
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
              <el-tag size="default" type="info" class="keyword-tag" v-for="tag in currentLesson.tags" :key="tag">
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
                  <el-icon><Document /></el-icon>
                </div>
                <div class="file-details">
                  <div class="file-name">{{ currentLesson.title }}.pdf</div>
                  <div class="file-meta">
                    <span>文件大小：{{ currentLesson.fileSize }}</span>
                    <span>版本号：{{ currentLesson.version }}</span>
                    <span>更新次数：{{ currentLesson.edits }} 次</span>
                  </div>
                </div>
                <el-button type="success" size="small" :icon="Download" class="file-download" @click="downloadLesson(<LessonPlan>currentLesson, $event)">
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
                  <div class="stat-value">{{ Math.floor((currentLesson.views || 0) * 0.3) }}</div>
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
</template>

<style scoped>

</style>