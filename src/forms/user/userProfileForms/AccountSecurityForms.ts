import { ref } from "vue";
import { ElMessage, ElNotification, ElMessageBox } from "element-plus";
import { userInfo, isSubmitting } from "@/data/user/userProfileData/PersonalInformationData.ts";
// 表单 Ref（导出给模板使用）
export const securityFormRef = ref(null);

// 账号安全表单数据
export const securityForm = ref({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    phone: userInfo.value?.phone || "", // 容错处理：避免 userInfo 未初始化
    email: userInfo.value?.email || "", // 容错处理
    twoFactorEnabled: false,
});

// 两个步骤验证交互状态（全部导出给模板）
export const twoFactorDialogVisible = ref(false);
export const twoFactorInput = ref("");
export const twoFactorCode = ref("");
export const sendingTwoFactor = ref(false);

// 手机号脱敏（导出给模板）
export const maskPhone = (phone: string) =>
    phone ? phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") : "未绑定";

// 邮箱脱敏（导出给模板）
export const maskEmail = (email: string) =>
    email ? email.replace(/(^.).+(@.+$)/, "$1***$2") : "未绑定";

// 生成6位随机验证码
const generateTwoFactorCode = () => String(Math.floor(100000 + Math.random() * 900000));

// 发送验证码（导出给模板）
export const sendTwoFactorCode = async () => {
    sendingTwoFactor.value = true;
    try {
        // 模拟接口请求延迟
        await new Promise((resolve) => setTimeout(resolve, 600));
        twoFactorCode.value = generateTwoFactorCode();

        ElNotification({
            title: "验证码已发送",
            message: `已发送至 ${maskPhone(securityForm.value.phone)} / ${maskEmail(securityForm.value.email)}`,
            type: "success",
            duration: 1600,
            position: "top-right",
        });
    } catch (err) {
        ElMessage({ message: "验证码发送失败", type: "error" });
        console.error("发送验证码失败：", err);
    } finally {
        sendingTwoFactor.value = false;
    }
};

// 两步验证开关变更（导出给模板）
export const handleTwoFactorChange = async (val: boolean) => {
    if (val) {
        // 开启：校验手机号/邮箱是否存在
        if (!securityForm.value.phone && !securityForm.value.email) {
            ElMessage({ message: "请先绑定手机号或邮箱", type: "warning" });
            securityForm.value.twoFactorEnabled = false;
            return;
        }
        twoFactorInput.value = "";
        await sendTwoFactorCode();
        twoFactorDialogVisible.value = true;
    } else {
        // 关闭：确认弹窗
        try {
            await ElMessageBox.confirm(
                "关闭两步验证后，登录将不再需要验证码，是否继续？",
                "确认关闭",
                { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }
            );
            securityForm.value.twoFactorEnabled = false;
            ElMessage({ message: "已关闭两步验证", type: "success" });
        } catch {
            // 用户取消：恢复开关状态
            securityForm.value.twoFactorEnabled = true;
            ElMessage({ message: "已取消关闭", type: "info" });
        }
    }
};

// 确认开启两步验证（导出给模板）
export const confirmEnableTwoFactor = () => {
    if (!twoFactorInput.value) {
        ElMessage({ message: "请输入验证码", type: "warning" });
        return;
    }
    if (twoFactorInput.value !== twoFactorCode.value) {
        ElMessage({ message: "验证码不正确，请重试", type: "error" });
        return;
    }
    securityForm.value.twoFactorEnabled = true;
    twoFactorDialogVisible.value = false;
    ElMessage({ message: "两步验证已开启", type: "success" });
};

// 取消开启两步验证（导出给模板）
export const cancelEnableTwoFactor = () => {
    twoFactorDialogVisible.value = false;
    securityForm.value.twoFactorEnabled = false;
    ElMessage({ message: "已取消开启", type: "info" });
};

// 表单校验规则（导出给模板）
export const securityRules = ref({
    currentPassword: [{ required: true, message: "请输入当前密码", trigger: "blur" }],
    newPassword: [
        { required: true, message: "请输入新密码", trigger: "blur" },
        { min: 8, message: "至少 8 位，建议包含数字与字母", trigger: "blur" },
    ],
    confirmPassword: [
        { required: true, message: "请再次输入新密码", trigger: "blur" },
        {
            validator: (rule: any, value: string, callback: (err?: Error) => void) => {
                if (value !== securityForm.value.newPassword) {
                    callback(new Error("两次输入的新密码不一致"));
                } else {
                    callback();
                }
            },
            trigger: "blur",
        },
    ],
    phone: [
        { required: false, message: "请输入手机号", trigger: "blur" },
        { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号码", trigger: "blur" },
    ],
    email: [
        { required: false, message: "请输入邮箱", trigger: "blur" },
        { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
    ],
});

// 重置表单（内部使用）
const securityReset = (formRef: any) => {
    formRef?.resetFields();
    // 恢复绑定信息为用户当前信息
    securityForm.value.phone = userInfo.value?.phone || "";
    securityForm.value.email = userInfo.value?.email || "";
    // 清空密码输入
    securityForm.value.currentPassword = "";
    securityForm.value.newPassword = "";
    securityForm.value.confirmPassword = "";
};

// 提交表单（导出给模板）
export const handleSecuritySubmit = async (formRef: any) => {
    try {
        isSubmitting.value = true;
        // 表单校验
        await formRef?.validate();

        ElNotification({
            title: "正在保存安全设置",
            message: "请稍候…",
            type: "info",
            position: "top-right",
            duration: 1200,
        });

        // 模拟接口请求：保存数据到 userInfo
        await new Promise((resolve) => setTimeout(resolve, 800));
        userInfo.value.phone = securityForm.value.phone;
        userInfo.value.email = securityForm.value.email;

        ElMessage({ message: "安全设置已更新", type: "success", duration: 1800 });

        // 提交后清空密码输入
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

// 重置表单（带确认弹窗，导出给模板）
export const handleSecurityReset = async (formRef: any) => {
    try {
        await ElMessageBox.confirm(
            "将恢复为当前绑定的手机号/邮箱，并清空密码输入。是否继续？",
            "确认重置",
            { confirmButtonText: "确定", cancelButtonText: "取消", type: "warning" }
        );
        securityReset(formRef);
        ElMessage({ message: "已重置为当前绑定信息", type: "success" });
    } catch {
        ElMessage({ message: "已取消重置", type: "info" });
    }
};