<template>
  <div class="system-settings page-wrapper">
    <PageHeader title="系统设置" subtitle="系统基础设置、安全与通知、资源与日志、缓存清理与版本记录">
      <el-button type="primary" @click="handleSaveBasic">保存配置</el-button>
    </PageHeader>
    <StatsCards :items="sysStats" />
    <el-card class="section-card" shadow="never">
      <el-tabs v-model="activeTab">
        <!-- 基础设置 -->
        <el-tab-pane label="基础设置" name="basic">
          <el-form :model="basicForm" :rules="basicRules" ref="basicFormRef" label-width="150px" style="max-width: 600px">
            <el-form-item label="系统名称" prop="systemName">
              <el-input v-model="basicForm.systemName" placeholder="请输入系统名称" />
            </el-form-item>
            <el-form-item label="系统Logo" prop="logo">
              <div class="logo-upload">
                <el-upload
                  class="logo-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="handleLogoSuccess"
                  :before-upload="beforeLogoUpload"
                >
                  <img v-if="basicForm.logo" :src="basicForm.logo" class="logo" alt="logo" />
                  <el-icon v-else class="logo-uploader-icon"><Plus /></el-icon>
                </el-upload>
                <div class="upload-tip">建议尺寸：200x60px，支持 JPG/PNG 格式</div>
              </div>
            </el-form-item>
            <el-form-item label="版权信息" prop="copyright">
              <el-input v-model="basicForm.copyright" type="textarea" :rows="3" placeholder="请输入版权信息" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSaveBasic">保存</el-button>
              <el-button @click="handleResetBasic">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 安全设置 -->
        <el-tab-pane label="安全设置" name="security">
          <el-form :model="securityForm" :rules="securityRules" ref="securityFormRef" label-width="200px" style="max-width: 600px">
            <el-form-item label="登录失败次数限制" prop="loginFailureLimit">
              <el-input-number v-model="securityForm.loginFailureLimit" :min="3" :max="10" />
              <span style="margin-left: 10px; color: #999;">次（超过该次数将锁定账户）</span>
            </el-form-item>
            <el-form-item label="密码有效期" prop="passwordValidDays">
              <el-input-number v-model="securityForm.passwordValidDays" :min="30" :max="365" />
              <span style="margin-left: 10px; color: #999;">天（到期后需修改密码）</span>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSaveSecurity">保存</el-button>
              <el-button @click="handleResetSecurity">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 通知设置 -->
        <el-tab-pane label="通知设置" name="notification">
          <div class="notification-tabs">
            <el-tabs v-model="notificationType" type="card">
              <el-tab-pane label="短信模板" name="sms">
                <el-table :data="smsTemplates" border>
                  <el-table-column prop="name" label="模板名称" width="150" />
                  <el-table-column prop="content" label="模板内容" min-width="300" />
                  <el-table-column label="操作" width="150">
                    <template #default="scope">
                      <el-button size="small" type="primary" @click="handleEditTemplate(scope.row)">编辑</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="邮件模板" name="email">
                <el-table :data="emailTemplates" border>
                  <el-table-column prop="name" label="模板名称" width="150" />
                  <el-table-column prop="content" label="模板内容" min-width="300" />
                  <el-table-column label="操作" width="150">
                    <template #default="scope">
                      <el-button size="small" type="primary" @click="handleEditTemplate(scope.row)">编辑</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>

          <!-- 模板编辑对话框 -->
          <el-dialog :title="templateDialogTitle" v-model="templateDialogVisible" width="600px">
            <el-form :model="templateForm" :rules="templateRules" ref="templateFormRef" label-width="100px">
              <el-form-item label="模板名称" prop="name">
                <el-input v-model="templateForm.name" placeholder="请输入模板名称" />
              </el-form-item>
              <el-form-item label="模板内容" prop="content">
                <el-input v-model="templateForm.content" type="textarea" :rows="6" placeholder="请输入模板内容，可使用变量如 {code}、{link} 等" />
              </el-form-item>
              <el-form-item label="可用变量">
                <div style="color: #999; font-size: 12px;">
                  <div v-for="variable in templateForm.variables" :key="variable" style="margin: 5px 0;">
                    {{ '{' + variable + '}' }}
                  </div>
                </div>
              </el-form-item>
            </el-form>
            <template #footer>
              <el-button @click="templateDialogVisible = false">取消</el-button>
              <el-button type="primary" @click="handleSaveTemplate">保存</el-button>
            </template>
          </el-dialog>
        </el-tab-pane>

        <!-- 资源管理 -->
        <el-tab-pane label="资源管理" name="resource">
          <div class="resource-management">
            <div class="resource-header">
              <el-form :inline="true">
                <el-form-item label="分类">
                  <el-select v-model="resourceFilter.categoryId" placeholder="请选择分类" clearable style="width: 150px">
                    <el-option
                      v-for="cat in resourceCategories"
                      :key="cat.id"
                      :label="cat.name"
                      :value="cat.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="状态">
                  <el-select v-model="resourceFilter.status" placeholder="请选择状态" clearable style="width: 120px">
                    <el-option label="待审核" value="pending" />
                    <el-option label="已通过" value="approved" />
                    <el-option label="已拒绝" value="rejected" />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="loadResources">查询</el-button>
                  <el-button @click="handleResetResourceFilter">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-table :data="resources" border v-loading="resourceLoading">
              <el-table-column prop="title" label="资源标题" min-width="200" />
              <el-table-column prop="category" label="分类" width="120" />
              <el-table-column prop="author" label="作者" width="120" />
              <el-table-column prop="uploadTime" label="上传时间" width="180" />
              <el-table-column prop="fileSize" label="文件大小" width="100" />
              <el-table-column prop="status" label="状态" width="100">
                <template #default="scope">
                  <el-tag
                    :type="scope.row.status === 'approved' ? 'success' : scope.row.status === 'rejected' ? 'danger' : 'warning'"
                  >
                    {{ scope.row.status === 'approved' ? '已通过' : scope.row.status === 'rejected' ? '已拒绝' : '待审核' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template #default="scope">
                  <el-button
                    v-if="scope.row.status === 'pending'"
                    size="small"
                    type="success"
                    @click="handleAuditResource(scope.row, 'approved')"
                  >
                    通过
                  </el-button>
                  <el-button
                    v-if="scope.row.status === 'pending'"
                    size="small"
                    type="danger"
                    @click="handleAuditResource(scope.row, 'rejected')"
                  >
                    拒绝
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <!-- 日志管理 -->
        <el-tab-pane label="日志管理" name="logs">
          <div class="log-management">
            <div class="log-header">
              <el-form :inline="true">
                <el-form-item label="日志类型">
                  <el-select v-model="logFilter.type" placeholder="请选择类型" clearable style="width: 150px">
                    <el-option label="系统日志" value="system" />
                    <el-option label="操作日志" value="operation" />
                    <el-option label="异常日志" value="exception" />
                  </el-select>
                </el-form-item>
                <el-form-item label="级别">
                  <el-select v-model="logFilter.level" placeholder="请选择级别" clearable style="width: 120px">
                    <el-option label="信息" value="info" />
                    <el-option label="警告" value="warning" />
                    <el-option label="错误" value="error" />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="loadLogs">查询</el-button>
                  <el-button @click="handleResetLogFilter">重置</el-button>
                  <el-button type="info" @click="handleExportLogs">导出</el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-table :data="logs" border v-loading="logLoading">
              <el-table-column prop="type" label="类型" width="100">
                <template #default="scope">
                  <el-tag :type="scope.row.type === 'exception' ? 'danger' : scope.row.type === 'operation' ? 'success' : 'info'">
                    {{ scope.row.type === 'system' ? '系统' : scope.row.type === 'operation' ? '操作' : '异常' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="level" label="级别" width="80">
                <template #default="scope">
                  <el-tag :type="scope.row.level === 'error' ? 'danger' : scope.row.level === 'warning' ? 'warning' : 'info'">
                    {{ scope.row.level === 'info' ? '信息' : scope.row.level === 'warning' ? '警告' : '错误' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="content" label="内容" min-width="200" />
              <el-table-column prop="operator" label="操作人" width="120" />
              <el-table-column prop="module" label="模块" width="120" />
              <el-table-column prop="operationTime" label="时间" width="180" />
              <el-table-column prop="ip" label="IP地址" width="130" />
            </el-table>
          </div>
        </el-tab-pane>

        <!-- 缓存清理 -->
        <el-tab-pane label="缓存清理" name="cache">
          <div class="cache-management">
            <el-alert
              title="缓存清理提示"
              type="warning"
              :closable="false"
              style="margin-bottom: 20px"
            >
              <template #default>
                清理缓存可能会影响系统性能，请谨慎操作。建议在系统维护时间进行。
              </template>
            </el-alert>
            <el-form label-width="200px" style="max-width: 600px">
              <el-form-item label="选择清理类型">
                <el-select v-model="cacheType" placeholder="请选择缓存类型" style="width: 300px">
                  <el-option label="清理所有缓存" value="" />
                  <el-option label="清理系统缓存" value="system" />
                  <el-option label="清理用户缓存" value="user" />
                  <el-option label="清理数据缓存" value="data" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="handleClearCache">清理缓存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>

        <!-- 版本更新记录 -->
        <el-tab-pane label="版本更新记录" name="version">
          <el-timeline>
            <el-timeline-item
              v-for="version in versionRecords"
              :key="version.version"
              :timestamp="version.updateTime"
              placement="top"
            >
              <el-card>
                <h4>{{ version.version }}</h4>
                <p>{{ version.description }}</p>
                <p style="color: #999; font-size: 12px; margin-top: 5px;">更新人：{{ version.updater || '系统管理员' }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import PageHeader from '@/components/system/common/PageHeader.vue'
import StatsCards, { type StatItem } from '@/components/system/common/StatsCards.vue'
import type {
  SystemBasicConfig,
  SystemSecurityConfig,
  NotificationTemplate,
  TeachingResource,
  SystemLog,
  VersionRecord
} from '@/types/system';
import {
  getSystemBasicConfig,
  saveSystemBasicConfig,
  uploadLogo,
  getSystemSecurityConfig,
  saveSystemSecurityConfig,
  getNotificationTemplates,
  saveNotificationTemplate,
  getResourceCategories,
  getTeachingResources,
  auditResource,
  getSystemLogs,
  exportSystemLogs,
  clearCache,
  getVersionRecords
} from '@/services/system';

const activeTab = ref('basic');
const notificationType = ref('sms');
const cacheType = ref('');
const basicFormRef = ref<FormInstance>();
const securityFormRef = ref<FormInstance>();
const templateFormRef = ref<FormInstance>();

const basicForm = reactive<SystemBasicConfig>({
  systemName: '',
  logo: '',
  copyright: ''
});

const securityForm = reactive<SystemSecurityConfig>({
  loginFailureLimit: 5,
  passwordValidDays: 90
});

const basicRules: FormRules = {
  systemName: [{ required: true, message: '请输入系统名称', trigger: 'blur' }],
  copyright: [{ required: true, message: '请输入版权信息', trigger: 'blur' }]
};

const securityRules: FormRules = {
  loginFailureLimit: [{ required: true, message: '请输入登录失败次数限制', trigger: 'blur' }],
  passwordValidDays: [{ required: true, message: '请输入密码有效期', trigger: 'blur' }]
};

const smsTemplates = ref<NotificationTemplate[]>([]);
const emailTemplates = ref<NotificationTemplate[]>([]);
const templateDialogVisible = ref(false);
const templateDialogTitle = ref('编辑模板');
const templateForm = reactive<NotificationTemplate & { id?: number | string }>({
  id: '',
  type: 'sms',
  name: '',
  content: '',
  variables: []
});

const templateRules: FormRules = {
  name: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
  content: [{ required: true, message: '请输入模板内容', trigger: 'blur' }]
};

const resourceCategories = ref<any[]>([]);
const resources = ref<TeachingResource[]>([]);
const resourceLoading = ref(false);
const resourceFilter = reactive({
  categoryId: '',
  status: ''
});

const logs = ref<SystemLog[]>([]);
const logLoading = ref(false);
const logFilter = reactive({
  type: '',
  level: ''
});

const versionRecords = ref<VersionRecord[]>([]);
const uploadUrl = ref('#');
const sysStats = ref<StatItem[]>([
  { key: 'ver', name: '当前版本', value: 'v3.2.1' },
  { key: 'uptime', name: '系统运行', value: 85, suffix: '天' },
  { key: 'users', name: '活跃用户数', value: 3248 },
  { key: 'logs', name: '今日新增日志', value: 24 }
]);

// 加载基础设置
const loadBasicConfig = async () => {
  const res = await getSystemBasicConfig();
  if (res.code === 200) {
    Object.assign(basicForm, res.data);
  }
};

// 保存基础设置
const handleSaveBasic = async () => {
  if (!basicFormRef.value) return;
  await basicFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await saveSystemBasicConfig(basicForm);
      if (res.code === 200) {
        ElMessage.success('保存成功');
      }
    }
  });
};

// 重置基础设置
const handleResetBasic = () => {
  loadBasicConfig();
};

// Logo上传前验证
const beforeLogoUpload = (file: File) => {
  const isImage = file.type.startsWith('image/');
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isImage) {
    ElMessage.error('只能上传图片文件!');
    return false;
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB!');
    return false;
  }
  return true;
};

// Logo上传成功
const handleLogoSuccess = async (response: any, file: File) => {
  const res = await uploadLogo(file);
  if (res.code === 200) {
    basicForm.logo = res.data.url;
    ElMessage.success('上传成功');
  }
};

// 加载安全设置
const loadSecurityConfig = async () => {
  const res = await getSystemSecurityConfig();
  if (res.code === 200) {
    Object.assign(securityForm, res.data);
  }
};

// 保存安全设置
const handleSaveSecurity = async () => {
  if (!securityFormRef.value) return;
  await securityFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await saveSystemSecurityConfig(securityForm);
      if (res.code === 200) {
        ElMessage.success('保存成功');
      }
    }
  });
};

// 重置安全设置
const handleResetSecurity = () => {
  loadSecurityConfig();
};

// 加载通知模板
const loadTemplates = async () => {
  const smsRes = await getNotificationTemplates('sms');
  const emailRes = await getNotificationTemplates('email');
  if (smsRes.code === 200) {
    smsTemplates.value = smsRes.data;
  }
  if (emailRes.code === 200) {
    emailTemplates.value = emailRes.data;
  }
};

// 编辑模板
const handleEditTemplate = (template: NotificationTemplate) => {
  templateDialogTitle.value = '编辑模板';
  Object.assign(templateForm, { ...template });
  templateForm.type = notificationType.value as 'sms' | 'email';
  templateDialogVisible.value = true;
};

// 保存模板
const handleSaveTemplate = async () => {
  if (!templateFormRef.value) return;
  await templateFormRef.value.validate(async (valid) => {
    if (valid) {
      const res = await saveNotificationTemplate(templateForm);
      if (res.code === 200) {
        ElMessage.success('保存成功');
        templateDialogVisible.value = false;
        await loadTemplates();
      }
    }
  });
};

// 加载资源分类
const loadResourceCategories = async () => {
  const res = await getResourceCategories();
  if (res.code === 200) {
    resourceCategories.value = res.data;
  }
};

// 加载资源列表
const loadResources = async () => {
  resourceLoading.value = true;
  try {
    const res = await getTeachingResources(resourceFilter);
    if (res.code === 200) {
      resources.value = res.data;
    }
  } finally {
    resourceLoading.value = false;
  }
};

// 重置资源筛选
const handleResetResourceFilter = () => {
  Object.assign(resourceFilter, { categoryId: '', status: '' });
  loadResources();
};

// 审核资源
const handleAuditResource = async (resource: TeachingResource, status: 'approved' | 'rejected') => {
  const action = status === 'approved' ? '通过' : '拒绝';
  try {
    await ElMessageBox.confirm(`确定要${action}该资源吗？`, '提示', { type: 'warning' });
    const res = await auditResource(resource.id, status);
    if (res.code === 200) {
      ElMessage.success(`${action}成功`);
      await loadResources();
    }
  } catch (error) {
    // 用户取消
  }
};

// 加载日志
const loadLogs = async () => {
  logLoading.value = true;
  try {
    const res = await getSystemLogs(logFilter);
    if (res.code === 200) {
      logs.value = res.data;
    }
  } finally {
    logLoading.value = false;
  }
};

// 重置日志筛选
const handleResetLogFilter = () => {
  Object.assign(logFilter, { type: '', level: '' });
  loadLogs();
};

// 导出日志
const handleExportLogs = async () => {
  try {
    const res = await exportSystemLogs(logFilter);
    if (res.code === 200) {
      ElMessage.success('导出成功');
      window.open(res.data.downloadUrl);
    }
  } catch (error) {
    ElMessage.error('导出失败');
  }
};

// 清理缓存
const handleClearCache = async () => {
  try {
    await ElMessageBox.confirm('确定要清理缓存吗？清理后可能需要重新登录。', '提示', {
      type: 'warning'
    });
    const res = await clearCache(cacheType.value || undefined);
    if (res.code === 200) {
      ElMessage.success('缓存清理成功');
      cacheType.value = '';
    }
  } catch (error) {
    // 用户取消
  }
};

// 加载版本记录
const loadVersionRecords = async () => {
  const res = await getVersionRecords();
  if (res.code === 200) {
    versionRecords.value = res.data;
  }
};

onMounted(() => {
  loadBasicConfig();
  loadSecurityConfig();
  loadTemplates();
  loadResourceCategories();
  loadResources();
  loadLogs();
  loadVersionRecords();
});
</script>

<style scoped>
.system-settings {
  padding: 20px;
}

.logo-upload {
  display: flex;
  flex-direction: column;
}

.logo-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-uploader:hover {
  border-color: #409eff;
}

.logo-uploader-icon {
  font-size: 28px;
  color: #8c939d;
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.upload-tip {
  margin-top: 10px;
  font-size: 12px;
  color: #999;
}

.notification-tabs {
  margin-top: 20px;
}

.resource-management,
.log-management {
  margin-top: 20px;
}

.resource-header,
.log-header {
  margin-bottom: 20px;
}

.cache-management {
  padding: 20px 0;
}
</style>

