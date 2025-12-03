<script setup lang="ts">
import "@/assets/user/goalManagementCss/okr-management.css"
import {ElButton, ElCard, ElDivider, ElProgress, ElTag, ElTooltip} from "element-plus";
import {Calendar, Delete, Document, Edit, Plus} from "@element-plus/icons-vue";
import {deleteObjective, editObjective, formatDate, getObjectiveStatusText, getObjectiveStatusType, getProgressColor, sortObjectives} from "@/utils/user/teacher/info/goalManagement/DataUtlis.ts";
import {objectives} from "@/data/user/goalManagement/TargetData.ts";
import {addKeyResult, deleteKeyResult, editKeyResult} from "@/utils/user/teacher/info/goalManagement/KeyResultDataUtils.ts";
</script>

<template>
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
              <el-tag :type="getObjectiveStatusType(objective.progress)" size="small" class="okr-status-tag">
                {{ getObjectiveStatusText(objective.progress) }}
              </el-tag>
            </div>
            <p class="okr-objective-description">{{ objective.description }}</p>
            <div class="okr-objective-meta">
              <el-tooltip :content="`截止日期: ${objective.deadline}`" placement="bottom">
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
              <el-progress type="circle" :percentage="objective.progress" :width="80" :stroke-width="6" :color="getProgressColor(objective.progress)"/>
              <div class="okr-progress-text">{{ objective.progress }}%</div>
            </div>
            <div class="okr-action-buttons">
              <el-tooltip content="添加关键结果" placement="top">
                <el-button circle @click="addKeyResult(objective.id)" class="okr-action-btn">
                  <el-icon><Plus /></el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip content="编辑目标" placement="top">
                <el-button circle @click="editObjective(objective)" class="okr-action-btn">
                  <el-icon><Edit /></el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip content="删除目标" placement="top">
                <el-button circle type="danger" @click="deleteObjective(objective.id)" class="okr-action-btn">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </el-tooltip>
            </div>
          </div>
        </div>

        <el-divider class="okr-kr-divider" />

        <div class="okr-key-results">
          <div v-for="kr in objective.keyResults" :key="kr.id" class="okr-key-result-item">
            <div class="okr-kr-info">
              <h5>{{ kr.title }}</h5>
              <div class="okr-kr-progress-info">
                <span>{{ kr.currentValue }} / {{ kr.targetValue }}</span>
              </div>
            </div>
            <div class="okr-kr-progress">
              <el-progress :percentage="kr.progress" :stroke-width="8" :show-text="false" :color="getProgressColor(kr.progress)"/>
            </div>
            <div class="okr-kr-value">{{ kr.progress }}%</div>
            <div class="okr-kr-actions">
              <el-tooltip content="编辑关键结果" placement="top">
                <el-button circle size="small" @click="editKeyResult(objective.id, kr)" class="okr-kr-action-btn">
                  <el-icon><Edit /></el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip content="删除关键结果" placement="top">
                <el-button circle size="small" type="danger" @click="deleteKeyResult(objective.id, kr.id)" class="okr-kr-action-btn">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </el-tooltip>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </el-card>
</template>

<style scoped>

</style>