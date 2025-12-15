<script lang="ts" setup>
import "@/assets/contactUs/homeCss/ContactUsOnLineFeedBackCss.css"
import { feedbackFormRef, isSubmitting, submitSuccess, fileList, FormRules, handleFileChange, handleFileRemove,submitForm, section2,} from "@/utils/contactUs/ConatctOnlineFeedBack.ts"
import {feedbackForm} from "@/data/contactUs/ContactOnLineFeedBackContentData"
import { ElForm} from "element-plus"
</script>

<template>
  <div
      ref="section2"
      id="section2"
      class="contact-us-online-feedback-box"
  >
    <div class="FeedBack-container">
      <!-- Element Plus卡片容器 -->
      <el-card shadow="hover" class="feed-card">
<!--        表单头部-->
        <template #header>
          <div class="card-header">
            <h2 class="title">在线反馈表单</h2>
           </div>
        </template>

<!--        表单主体-->
        <el-form
            ref="feedbackFormRef"
            :model="feedbackForm"
            :rules="FormRules"
            label-width="100px"
            class="feedback-form"
        >
<!--         1. 名字输入框-->
                <el-form-item label="姓名" prop="name">
                  <el-input
                      v-model="feedbackForm.name"
                      placeholder="请输入您的名字"
                      maxlength="21"
                      show-word-limit
                  />
                </el-form-item>
<!--          2.电话号码输入框-->
                <el-form-item label="电话号码" prop="phone">
                  <el-input
                  v-model="feedbackForm.phone"
                  placeholder="请输入您的电话号码"
                  type="text"
                  maxlength="11"
                  show-word-limit
                  />
                </el-form-item>
<!--                 3. 反馈式下拉框-->
                <el-form-item label="反馈类型" prop="type">
                 <el-select
                     v-model="feedbackForm.type"
                     placeholder="请选择反馈的类型"
                 >
                   <el-option label="功能问题" value="problem"/>
                   <el-option label="优化建议" value="suggestion"/>
                   <el-option label="投诉举报" value="complaint"/>
                   <el-option label="其他问题"  value="other"/>
                 </el-select>
                </el-form-item>
<!--               4. 反馈内容-->
                <el-form-item  label="反馈内容" prop="content">
                  <el-input
                      v-model="feedbackForm.content"
                      type="textarea"
                      :rows="6"
                      placeholder="请详细描述您的问题/意见(不少于10个字)"
                      maxlength="500"
                      show-word-limit
                  />
                </el-form-item>

            <!--          5.附件上传-->
                <el-form-item label="附件上传">
                  <el-upload
                      class="upload-demo"
                      action="/api/upload"
                  :file-list="fileList"
                  :accept="['image/jpg','image/png','video/mp4']"
                  :on-change="handleFileChange"
                  :on-remove="handleFileRemove"
                  multiple>
                  <el-button type="primary" icon="el-icon-upload">点击上传</el-button>
                    <div class="el-upload__tip" slot="tip">支持jpg/png/mp4格式，单文件不超过10MB</div>
                  </el-upload>
                </el-form-item>

<!--          提交按钮-->
                <el-form-item class="submit-item">
                  <el-button
                      type="primary"
                      @click="submitForm"
                      :loading="isSubmitting"
                      class="submit-btn"
                  >
                    {{ isSubmitting ? '提交中':'提交反馈'}}
                  </el-button>
                </el-form-item>
              </el-form>

<!--          提交成功反馈-->
              <el-alert
                  v-if="submitSuccess"
                  title="反馈提交成功!我们会尽快与您联系"
                  type="success"
                  closable
                  @close="submitSuccess = false"
                  class="success-alert"
              />
      </el-card>
    </div>
  </div>
</template>
