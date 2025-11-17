<script setup>
import LeftNavigationComponents from "@/components/user/LeftNavigationComponents.vue";
import TopNavigationComponents from "@/components/user/TopNavigationComponents.vue";
import "@/assets/user/UserOverallCss.css"
// 导入 Element Plus 图标
import {User, Lock, Clock, UploadFilled, Edit, Check, Close, RefreshRight} from "@element-plus/icons-vue";
import { ref } from "vue";
import { ElMessage, ElNotification, ElMessageBox } from "element-plus";

// 账号安全表单（现在 userInfo 已声明，可正常访问）
const securityFormRef = ref(null);
const securityForm = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  phone: userInfo.value.phone, // 正常访问
  email: userInfo.value.email, // 正常访问
  twoFactorEnabled: false,
});

// 两步验证交互状态
const twoFactorDialogVisible = ref(false);
const twoFactorInput = ref("");
const twoFactorCode = ref("");
const sendingTwoFactor = ref(false);

const maskPhone = (p) => (p ? p.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") : "未绑定");
const maskEmail = (e) => (e ? e.replace(/(^.).+(@.+$)/, "$1***$2") : "未绑定");

const generateTwoFactorCode = () => String(Math.floor(100000 + Math.random() * 900000));

const sendTwoFactorCode = async () => {
  sendingTwoFactor.value = true;
  // 模拟发送验证码
  twoFactorCode.value = generateTwoFactorCode();
  await new Promise((r) => setTimeout(r, 600));
  ElNotification({
    title: "验证码已发送",
    message: `已发送至 ${maskPhone(securityForm.value.phone)} / ${maskEmail(securityForm.value.email)}`,
    type: "success",
    duration: 1600,
    position: "top-right",
  });
  sendingTwoFactor.value = false;
};

const handleTwoFactorChange = async (val) => {
  if (val) {
    twoFactorInput.value = "";
    await sendTwoFactorCode();
    twoFactorDialogVisible.value = true;
  } else {
    try {
      await ElMessageBox.confirm("关闭两步验证后，登录将不再需要验证码，是否继续？", "确认关闭", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      securityForm.value.twoFactorEnabled = false;
      ElMessage({ message: "已关闭两步验证", type: "success" });
    } catch {
      // 用户取消，恢复为开启状态
      securityForm.value.twoFactorEnabled = true;
      ElMessage({ message: "已取消关闭", type: "info" });
    }
  }
};

const confirmEnableTwoFactor = () => {
  if (twoFactorInput.value !== twoFactorCode.value) {
    ElMessage({ message: "验证码不正确，请重试", type: "error" });
    return;
  }
  securityForm.value.twoFactorEnabled = true;
  twoFactorDialogVisible.value = false;
  ElMessage({ message: "两步验证已开启", type: "success" });
};

const cancelEnableTwoFactor = () => {
  twoFactorDialogVisible.value = false;
  securityForm.value.twoFactorEnabled = false;
  ElMessage({ message: "已取消开启", type: "info" });
};

const securityRules = ref({
  currentPassword: [{ required: true, message: "请输入当前密码", trigger: "blur" }],
  newPassword: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    { min: 8, message: "至少 8 位，建议包含数字与字母", trigger: "blur" },
  ],
  confirmPassword: [
    { required: true, message: "请再次输入新密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== securityForm.value.newPassword) {
          callback(new Error("两次输入的新密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  phone: [{ pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号码", trigger: "blur" }],
  email: [{ type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }],
});

const handleSecuritySubmit = async (formRef) => {
  try {
    isSubmitting.value = true;
    await formRef?.validate();

    ElNotification({
      title: "正在保存安全设置",
      message: "请稍候…",
      type: "info",
      position: "top-right",
      duration: 1200,
    });

    // 假装调用接口保存：更新绑定信息到 userInfo
    userInfo.value.phone = securityForm.value.phone;
    userInfo.value.email = securityForm.value.email;

    ElMessage({ message: "安全设置已更新", type: "success", duration: 1800 });

    // 清空密码输入
    securityForm.value.currentPassword = "";
    securityForm.value.newPassword = "";
    securityForm.value.confirmPassword = "";
  } catch (err) {
    ElMessage({ message: "保存失败，请检查输入", type: "error", duration: 2500 });
    console.error("保存账号安全设置失败：", err);
  } finally {
    isSubmitting.value = false;
  }
};

const securityReset = (formRef) => {
  formRef?.resetFields();
  securityForm.value.phone = userInfo.value.phone; // 现在 userInfo 已声明，无报错
  securityForm.value.email = userInfo.value.email;
};

// 重置前确认弹窗
const handleSecurityReset = async (formRef) => {
  try {
    await ElMessageBox.confirm(
      "将恢复为当前绑定的手机号/邮箱，并清空密码输入。是否继续？",
      "确认重置",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }
    );
    securityReset(formRef);
    // 清空密码输入
    securityForm.value.currentPassword = "";
    securityForm.value.newPassword = "";
    securityForm.value.confirmPassword = "";
    ElMessage({ message: "已重置为当前绑定信息", type: "success" });
  } catch {
    ElMessage({ message: "已取消重置", type: "info" });
  }
};

// 登录日志示例数据
const loginLogs = ref([
  { time: "2025-11-14 14:42:37", device: "Windows / Chrome", ip: "192.168.0.12", location: "上海", status: "成功" },
  { time: "2025-11-12 08:12:51", device: "iPhone / Safari", ip: "10.0.0.5", location: "北京", status: "成功" },
  { time: "2025-11-10 21:03:05", device: "Mac / Edge", ip: "203.1.1.8", location: "深圳", status: "失败" },
  { time: "2025-11-08 10:22:43", device: "Android / Firefox", ip: "182.128.1.10", location: "广州", status: "成功" },
  { time: "2025-11-06 15:30:20", device: "Windows / Chrome", ip: "192.168.0.12", location: "上海", status: "成功" },
  { time: "2025-11-04 09:15:12", device: "iPhone / Safari", ip: "10.0.0.5", location: "北京", status: "成功" },
  { time: "2025-11-02 12:45:30", device: "Mac / Edge", ip: "203.1.1.8", location: "深圳", status: "成功" },
  { time: "2025-11-01 07:20:15", device: "Android / Firefox", ip: "182.128.1.10", location: "广州", status: "成功" },
]);

// 3. 定义表单校验规则
const formRules = ref({
  realName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "change" }],
  phone: [
    { required: true, message: "请输入手机号码", trigger: "blur" },
    { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号码", trigger: "blur" },
  ],
  email: [
    { required: true, message: "请输入电子邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的电子邮箱格式", trigger: "blur" },
  ],
  department: [{ required: true, message: "请输入所属部门", trigger: "blur" }],
  birthDate: [{ required: true, message: "请选择出生日期", trigger: "change" }],
  hireDate: [{ required: true, message: "请选择入职时间", trigger: "change" }],
});

// 4. 实现缺失的方法


// 头像上传成功处理
const handleAvatarUpload = (response) => {
  // 实际项目中根据接口返回格式调整
  if (response.code === 200) {
    userInfo.value.avatar = response.data.url;
  }
};

// 表单提交
const handleSubmit = async (formRef) => {
  try {
    isSubmitting.value = true;
    await formRef?.validate();

    // 提交过程提示（浮窗）
    ElNotification({
      title: "正在保存",
      message: "请稍候…",
      type: "info",
      position: "top-right",
      duration: 500,
    });

    // 提交逻辑（如调用接口保存数据）
    console.log("提交的用户信息：", userInfo.value);

    // 成功提示
    ElMessage({
      message: "保存成功",
      type: "success",
      duration: 3000,
    });

    // 提交成功后切换到查看模式
    toggleEditMode();
  } catch (error) {
    ElMessage({
      message: "保存失败，请检查表单输入",
      type: "error",
      duration: 2500,
    });
    console.error("表单校验失败：", error);
  } finally {
    isSubmitting.value = false;
  }
};

// 取消编辑
const handleCancel = (formRef) => {
  formRef.resetFields(); // 重置表单
  toggleEditMode(); // 切换到查看模式
};
</script>

<template>
  <div class="teacher-dashboard">
    <!-- 左侧导航栏 -->
    <LeftNavigationComponents />
    <main class="main-content">
      <!-- 顶部导航栏 -->
      <TopNavigationComponents />
      <!-- 内容区域 -->
      <div class="content-area">
            <!-- 账号安全标签页 -->
            <div v-if="activeTab === 'security'" class="security-tab">
              <el-form :model="securityForm" :rules="securityRules" ref="securityFormRef" label-width="120px">
                <el-divider content-position="left">修改密码</el-divider>
                <el-row :gutter="16">
                  <el-col :span="8">
                    <el-form-item label="当前密码" prop="currentPassword">
                      <el-input v-model="securityForm.currentPassword" type="password" show-password placeholder="请输入当前密码" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="新密码" prop="newPassword">
                      <el-input v-model="securityForm.newPassword" type="password" show-password placeholder="至少 8 位，建议含数字与字母" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="确认新密码" prop="confirmPassword">
                      <el-input v-model="securityForm.confirmPassword" type="password" show-password placeholder="再次输入新密码" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-divider content-position="left">绑定信息</el-divider>
                <el-row :gutter="16">
                  <el-col :span="8">
                    <el-form-item label="绑定手机" prop="phone">
                      <el-input v-model="securityForm.phone" placeholder="请输入绑定手机号" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="绑定邮箱" prop="email">
                      <el-input v-model="securityForm.email" placeholder="请输入绑定邮箱" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="两步验证">
                      <el-switch
                        v-model="securityForm.twoFactorEnabled"
                        active-text="已启用"
                        inactive-text="未启用"
                        @change="handleTwoFactorChange"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-space class="security-actions" direction="horizontal" :size="16">
                  <el-button type="primary" :icon="Check" :loading="isSubmitting" :disabled="isSubmitting" @click="handleSecuritySubmit(securityFormRef)">保存安全设置</el-button>
                  <el-button :icon="RefreshRight" @click="handleSecurityReset(securityFormRef)">重置</el-button>
                </el-space>
              </el-form>
              <!-- 两步验证开启对话框 -->
              <el-dialog v-model="twoFactorDialogVisible" title="开启两步验证" width="460px" :close-on-click-modal="false">
                <el-text class="el-text">为了提升账号安全，开启后登录需额外输入一次性验证码。</el-text>
                <el-divider />
                <el-descriptions :column="2" class="twofactor-dst">
                  <el-descriptions-item label="手机号">
                    <el-text>{{ maskPhone(securityForm.phone) }}</el-text>
                  </el-descriptions-item>
                  <el-descriptions-item label="邮箱">
                    <el-text>{{ maskEmail(securityForm.email) }}</el-text>
                  </el-descriptions-item>
                </el-descriptions>
                <el-space direction="horizontal" :size="12" style="margin-bottom: 8px;">
                  <el-button type="primary" :loading="sendingTwoFactor" @click="sendTwoFactorCode">重新发送验证码</el-button>
                  <el-text class="el-text el-text--secondary">当前验证码：{{ twoFactorCode }}</el-text>
                </el-space>
                <el-form label-width="100px">
                  <el-form-item label="验证码">
                    <el-input v-model="twoFactorInput" placeholder="请输入6位验证码" maxlength="6" style="max-width: 240px;" />
                  </el-form-item>
                </el-form>
                <template #footer>
                  <el-space :size="12">
                    <el-button @click="cancelEnableTwoFactor">取消</el-button>
                    <el-button type="primary" @click="confirmEnableTwoFactor">验证并开启</el-button>
                  </el-space>
                </template>
              </el-dialog>
            </div>

            <!-- 登录日志标签页 -->
            <div v-if="activeTab === 'login-log'" class="login-log-tab">
              <el-table :data="loginLogs" stripe style="width: 100%">
                <el-table-column prop="time" label="登录时间" width="180" />
                <el-table-column prop="device" label="设备" />
                <el-table-column prop="ip" label="IP 地址" width="140" />
                <el-table-column prop="location" label="位置" width="120" />
                <el-table-column prop="status" label="状态" width="100" />
              </el-table>
            </div>
            </el-card>

            <!-- 编辑模式（el-form 组件） -->
            <el-card shadow="hover" class="profile-card" v-else>
              <el-tabs v-model="activeTab" class="tabs-inside" type="card">
                <el-tab-pane label="个人资料" name="profile" :icon="User" />
                <el-tab-pane label="账号安全" name="security" :icon="Lock" />
                <el-tab-pane label="登录日志" name="login-log" :icon="Clock" />
              </el-tabs>
              <div v-if="activeTab === 'profile'">
              <el-form :model="userInfo" :rules="formRules" ref="editFormRef" label-width="100px" :label-suffix="''">
                <!-- 头像上传区域 -->
                <el-form-item label="头像" class="avatar-form-item">
                  <el-upload action="/api/upload/avatar" :on-success="handleAvatarUpload" :file-list="[]" list-type="picture-card" :limit="1" accept="image/*">
                    <el-avatar :size="100" class="upload-avatar">
                      <img :src="userInfo.avatar" alt="头像" />
                      <div class="avatar-upload-mask">
                        <UploadFilled class="upload-icon" />
                      </div>
                    </el-avatar>
                  </el-upload>
                </el-form-item>

                <!-- 个人简介 -->
                <el-form-item label="个人简介">
                  <el-input v-model="userInfo.intro" type="textarea" :rows="3" placeholder="请输入个人简介" :resize="none"/>
                </el-form-item>

                <!-- 表单网格布局（使用 el-row + el-col 替代原生 div） -->
                <el-row :gutter="20" class="form-grid">
                  <el-col :span="12">
                    <el-form-item label="姓名" prop="realName">
                      <el-input v-model="userInfo.realName" placeholder="请输入姓名" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="昵称" prop="nickname">
                      <el-input v-model="userInfo.nickname" placeholder="请输入昵称" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="性别" prop="gender">
                      <el-select v-model="userInfo.gender" placeholder="请选择性别" clearable>
                        <el-option label="男" value="男" />
                        <el-option label="女" value="女" />
                        <el-option label="其他" value="其他" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="出生日期" prop="birthDate">
                      <el-date-picker v-model="userInfo.birthDate" type="date" placeholder="请选择出生日期" value-format="YYYY-MM-DD" clearable/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="手机号码" prop="phone">
                      <el-input v-model="userInfo.phone" placeholder="请输入手机号码" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="电子邮箱" prop="email">
                      <el-input v-model="userInfo.email" placeholder="请输入电子邮箱" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="所属部门" prop="department">
                      <el-input v-model="userInfo.department" placeholder="请输入所属部门" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="教龄">
                      <el-input v-model="userInfo.teachingAge" placeholder="请输入教龄" clearable type="number" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="任教学科">
                      <el-input v-model="userInfo.subject" placeholder="请输入任教学科" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="职称">
                      <el-input v-model="userInfo.title" placeholder="请输入职称" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="入职时间" prop="hireDate">
                      <el-date-picker v-model="userInfo.hireDate" type="date" placeholder="请选择入职时间" value-format="YYYY-MM-DD" clearable/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12"> 
                    <el-form-item label="学历">
                      <el-input v-model="userInfo.educationBackground" placeholder="请输入学历" clearable />
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 表单操作按钮（使用 el-space 优化按钮间距） -->
                <el-space class="form-actions" direction="horizontal" :size="16">
                  <el-button type="primary" @click="handleSubmit(editFormRef)" :icon="Check" :loading="isSubmitting" :disabled="isSubmitting">提交保存</el-button>
                  <el-button @click="handleCancel(editFormRef)" :icon="Close">取消编辑</el-button>
                </el-space>
              </el-form>
            </div>
          </el-card>
        </div>


      </div>
    </main>
  </div>
</template>

<style scoped>
/* 页面标题样式 */
.page-title {
  margin-bottom: 20px;
}

/* 个人资料卡片样式 */
.profile-card {
  padding: 24px;
}

/* 头像区域样式 */
.profile-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.avatar {
  border: 2px solid #e6f7ff;
  margin: 30px 40px;
  cursor: pointer;
}
.header-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.edit-btn {
  width: 140px;
  margin-left: auto;
}

/* 头像右侧姓名与摘要样式 */
.profile-title {
  margin-top: 5px;
}
.profile-name {
  margin: 0;
  color: #409eff;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.2;
}
.basic-meta {
  margin: 4px 0 8px;
  color: var(--el-text-color-secondary);
  font-size: 16px;
}

/* 个人简介样式 */
.profile-intro {
  margin: 16px 0;
  line-height: 1.8;
  font-size: 14px;
}
.summary-descriptions {
  margin-top: 4px;
}
/* 摘要与详细信息排版优化 */

.details-descriptions {
  margin-top: 12px;
}

.detail-value {
  font-size: 14px;
}
/* 编辑模式样式 */
.avatar-form-item {
  margin-bottom: 24px;
}
.upload-avatar {
  position: relative;
  overflow: hidden;
}
.avatar-upload-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  cursor: pointer;
}
.upload-avatar:hover .avatar-upload-mask {
  opacity: 1;
}
.upload-icon {
  color: #fff;
  font-size: 24px;
}

/* 表单网格样式 */
.form-grid {
  margin-bottom: 24px;
}

/* 表单操作按钮样式 */
.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
/* 账号安全样式 */
.security-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}
.security-tab :deep(.el-divider__text) {
  font-weight: 600;
}

/* 登录日志样式 */
.login-log-tab {
  margin-top: 8px;
}
</style>
