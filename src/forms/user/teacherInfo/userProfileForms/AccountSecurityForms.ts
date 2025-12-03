import {reactive, ref} from "vue";
import { ElMessage, ElNotification } from "element-plus";
import { userInfo } from "@/data/user/userProfileData/PersonalInformationData.ts";
import { isSubmitting } from "@/utils/user/teacher/info/userProfile/PersonalInformationUtils.ts";

// 表单 Ref（导出给模板使用）
const securityFormRef = ref(null);

// 账号安全表单数据
const securityForm = reactive({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    phone:"",
    email: "",
});

// 二次确认密码
const confirmPasswordValidate = (rule: any, value: string, callback: (err?: Error) => void) => {
    if (value !== securityForm.newPassword) {
        callback(new Error("两次输入的新密码不一致"));
    } else {
        callback();
    }
}

// 表单校验规则（导出给模板）
const securityRules = ref({
    currentPassword: [{ required: true, message: "请输入当前密码", trigger:["blur", "change"]}],
    newPassword: [
        { required: true, message: "请输入新密码", trigger:["blur", "change"] },
        { min: 8, message: "至少 8 位，建议包含数字与字母", trigger:["blur", "change"] },
    ],
    confirmPassword: [
        { required: true, message: "请再次输入新密码", trigger: ["blur", "change"] },
        { validator: confirmPasswordValidate, trigger:["blur", "change"]}
    ],
    phone: [
        { required: false, message: "请输入手机号", trigger:["blur", "change"]},
        { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号码", trigger:["blur", "change"] },
    ],
    email: [
        { required: false, message: "请输入邮箱", trigger: ["blur", "change"] },
        { type: "email", message: "请输入正确的邮箱格式", trigger:["blur", "change"] },
    ],
});


// 提交表单
const handleSecuritySubmit = async (formRef: any) => {
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
        userInfo.value.phone = securityForm.phone;
        userInfo.value.email = securityForm.email;

        ElMessage({ message: "安全设置已更新", type: "success", duration: 1800 });

        // 提交后清空密码输入
        securityForm.currentPassword = "";
        securityForm.newPassword = "";
        securityForm.confirmPassword = "";
    } catch (err) {
        ElMessage({ message: "保存失败，请检查输入", type: "error", duration: 2500 });
        console.error("保存账号安全设置失败：", err);
    } finally {
        isSubmitting.value = false;
    }
};

export {
    securityFormRef,
    securityForm,
    confirmPasswordValidate,
    securityRules,
    handleSecuritySubmit

}