<script setup lang="ts">
import {Calendar, Delete, Download, Edit, Filter, Histogram, Notebook, Refresh, Share, Star, StarFilled, View, Document} from "@element-plus/icons-vue";
import {deleteLesson, openDetailModal, openNewLessonModal, paginatedList, toggleCollection} from "@/forms/user/teacherInfo/lessonPlanManagerForms/DataStatisticsForms.ts";
import {getDifficultyTagProps, getGradeName, getStatusTagProps, getSubjectName} from "@/utils/user/teacher/info/lessonPlanManager/AuxiliaryFunctionUtils.ts";
import {
  filteredList,
  handleAction,
  resetFilters,
  stats,
  toggleSort
} from "@/utils/user/teacher/info/lessonPlanManager/StatisticsDataUtils.ts";
import {currentPage, pageSize, searchQuery, selectedDifficulty, selectedGrade, selectedStatus, selectedSubject, showMyCollection, sortBy, sortOrder} from "@/entity/auth/teacherInfo/LessonPlanManager.ts";
import "@/assets/user/lessonPlanManagerCss/LessonListCss.css"
import LessonEditComponents from "./LessonEditComponents.vue";
</script>

<template>
  <el-card class="lesson-merge-box" shadow="hover">
  <!-- 教案列表 -->
  <div class="lesson-list-header">
    <!-- 筛选条件卡片 -->
    <div class="filters-card">
      <div class="filters-header">
        <div class="filters-title">
          <el-icon><Filter /></el-icon>
          <span>筛选条件</span>
        </div>
        <el-button type="text" @click="resetFilters" class="reset-btn">
          <el-icon size="14"><Refresh /></el-icon>
          重置筛选
        </el-button>
      </div>

      <el-row :gutter="20" align="middle" class="filters-content">
        <el-col :span="6">
          <el-input v-model="searchQuery" icon="Search" placeholder="搜索标题、简介或标签" clearable class="search-input"/>
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
          <el-switch v-model="showMyCollection" active-text="只看收藏" active-color="#f7ba1e"/>
        </el-col>
      </el-row>

      <!-- 排序条件 -->
      <div class="sort-container">
        <span class="sort-label">排序：</span>
        <el-select v-model="sortBy" placeholder="排序字段" size="small" class="sort-select" @change="toggleSort(sortBy)">
          <el-option label="最后更新" value="lastUpdated" />
          <el-option label="浏览量" value="views" />
          <el-option label="收藏数" value="favorites" />
          <el-option label="创建时间" value="createTime" />
        </el-select>
        <el-button size="small" icon="ArrowUp" @click="sortOrder = 'asc'" :class="{ 'sort-active': sortOrder === 'asc' }"/>
        <el-button size="small" icon="ArrowDown" @click="sortOrder = 'desc'" :class="{ 'sort-active': sortOrder === 'desc' }"/>
      </div>
    </div>

    <div class="list-meta-row">
      <div class="list-info">
        <span>找到 {{ stats.filteredTotal }} 个教案</span>
      </div>
      <div class="view-toggle">
        <el-button size="small" type="text" :class="{ active: true }">卡片视图</el-button>
        <el-button size="small" type="text">列表视图</el-button>
      </div>
    </div>
  </div>

  <el-row :gutter="24" class="lesson-grid">
    <el-col :span="8" v-for="item in paginatedList" :key="item.id">
      <el-card shadow="hover" :border="false" class="lesson-card" @click="openDetailModal(item)">
        <!-- 收藏按钮 -->
        <el-button class="collect-btn" :class="{ collected: item.isCollected }" @click="toggleCollection(item, $event)" circle size="default">
          <el-icon v-if="item.isCollected"><StarFilled /></el-icon>
          <el-icon v-else><Star /></el-icon>
        </el-button>

        <!-- 教案头部 -->
        <div class="lesson-header">
          <div class="lesson-title">
            <el-icon><Notebook /></el-icon>
            <span>{{ item.title }}</span>
          </div>
          <div class="lesson-status">
            <el-tag :type="getStatusTagProps(item.status).type" class="status-tag">
              <el-icon><component :is="getStatusTagProps(item.status).icon" /></el-icon>
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
          <el-tag size="default" :type="getDifficultyTagProps(item.difficulty).type" class="difficulty-tag">
            {{ getDifficultyTagProps(item.difficulty).label }}
          </el-tag>
          <el-tag size="default" type="info" class="version-tag">
            {{ item.version }}
          </el-tag>
        </div>

        <!-- 教案简介 -->
        <p class="lesson-desc">
          {{ item.description }}
        </p>

        <!-- 教案标签 -->
        <div class="lesson-keywords">
          <el-tag size="default" type="info" class="keyword-tag" v-for="tag in item.tags" :key="tag">
            {{ tag }}
          </el-tag>
        </div>

        <!-- 教案元数据 -->
        <div class="lesson-meta">
          <el-tooltip content="创建时间" placement="top">
            <div class="meta-item">
              <el-icon size="14"><Calendar /></el-icon>
              <span>{{ item.createTime }}</span>
            </div>
          </el-tooltip>
          <el-tooltip content="浏览量" placement="top">
            <div class="meta-item">
              <el-icon size="14"><View /></el-icon>
              <span>{{ item.views }}</span>
            </div>
          </el-tooltip>
          <el-tooltip content="收藏数" placement="top">
            <div class="meta-item">
              <el-icon size="14"><Star /></el-icon>
              <span>{{ item.favorites }}</span>
            </div>
          </el-tooltip>
          <el-tooltip content="更新次数" placement="top">
            <div class="meta-item">
              <el-icon size="14"><Histogram /></el-icon>
              <span>{{ item.edits }}</span>
            </div>
          </el-tooltip>
          <el-tooltip content="文件大小" placement="top">
            <div class="meta-item">
              <el-icon size="14"><Document /></el-icon>
              <span>{{ item.fileSize }}</span>
            </div>
          </el-tooltip>
        </div>

        <!-- 操作按钮 -->
        <div class="lesson-actions">
          <el-popover placement="top" trigger="click">
            <template #reference>
              <el-button size="small" icon="More" type="text" class="more-btn" @click.stop />
            </template>
            <el-menu size="small" class="action-menu" @select="(idx:string) => handleAction(idx, item)">
              <el-menu-item index="edit">
                <el-icon><Edit /></el-icon>
                <span>编辑</span>
              </el-menu-item>
              <el-menu-item index="detail">
                <el-icon><Document /></el-icon>
                <span>详情</span>
              </el-menu-item>
              <el-menu-item index="download">
                <el-icon><Download /></el-icon>
                <span>下载</span>
              </el-menu-item>
              <el-menu-item index="share">
                <el-icon><Share /></el-icon>
                <span>分享</span>
              </el-menu-item>
              <el-divider />
              <el-menu-item index="delete" class="menu-danger" @click.stop="deleteLesson(item)">
                <el-icon><Delete /></el-icon>
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
      <el-icon><Document /></el-icon>
    </div>
    <div class="empty-title">暂无符合条件的教案</div>
    <div class="empty-desc">
      您可以尝试调整筛选条件，或者点击下方按钮创建新教案
    </div>
    <el-button type="primary" icon="Plus" @click="openNewLessonModal" class="empty-btn">
      新增教案
    </el-button>
  </div>

  <!-- 分页 -->
  <div class="pagination-wrap" v-if="filteredList.length > 0">
    <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="stats.filteredTotal"
        @size-change="(val:number) => pageSize = val"
        @current-change="(val:number) => currentPage = val"
    />
  </div>
  </el-card>
  <!-- 编辑/新增弹窗组件挂载 -->
  <LessonEditComponents />
</template>

<style scoped>

</style>