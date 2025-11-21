import {ElMessage, ElNotification, type FormInstance, type UploadFile} from "element-plus";
import { userInfo, isSubmitting, toggleEditMode } from "@/data/user/userProfileData/PersonalInformationData.ts";
import {reactive, ref} from "vue";

const teacherInfoRef = ref<FormInstance | null>(null);
const teacherInfoForm = reactive({
    avatar: "",
    realName: "",
    nickname: "",
    gender: "",
    phone: "",
    email: "",
    department: "",
    birthDate: "",
    hireDate: "",
    teachingAge: "",
    subject: "",
    title: "",
    educationBackground: "",
    intro: "",
})
// 表单校验规则（补充完整必填项校验）
const teacherFormRules = {
    realName: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
    nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
    gender: [{ required: true, message: "请选择性别", trigger: "change" }],
    phone: [
        { required: true, message: "请输入手机号码", trigger: "blur" },
        { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的11位手机号码", trigger: "blur" },
    ],
    email: [
        { required: true, message: "请输入电子邮箱", trigger: "blur" },
        { type: "email", message: "请输入正确的电子邮箱格式", trigger: "blur" },
    ],
    department: [{ required: true, message: "请输入所属部门", trigger: "blur" }],
    birthDate: [{ required: true, message: "请选择出生日期", trigger: "change" }],
    hireDate: [{ required: true, message: "请选择入职时间", trigger: "change" }],
    teachingAge: [
        { required: true, message: "请输入教龄", trigger: "blur" },
        { type: "number", min: 0, max: 40, message: "教龄范围为0-40年", trigger: "blur" },
    ],
    subject: [{ required: true, message: "请输入任教学科", trigger: "blur" }],
    title: [{ required: true, message: "请输入职称", trigger: "blur" }],
    educationBackground: [{ required: true, message: "请输入学历", trigger: "blur" }],
    intro: [{ max: 500, message: "个人简介最多输入500字", trigger: "blur" }],
};

const handleAvatarUpload = (response: any, fileList: UploadFile[]) => {
    try {
        if (response.code === 200 && response.data?.url) {
            userInfo.value.avatar = response.data.url;
            // 更新文件列表
            fileList.splice(0, fileList.length);
            fileList.push({
                uid: Date.now(),
                name: "avatar.jpg",
                url: response.data.url,
                status: "success",
            });
            ElMessage.success("头像上传成功");
        } else {
            ElMessage.error("头像上传失败：" + (response || "接口返回异常"));
        }
    } catch (error) {
        ElMessage.error("头像上传失败，请重试");
        console.error("头像上传错误：", error);
    }
};

// 表单提交
const handleSubmit = async (formRef: FormInstance | null) => {
    try {
        if (!formRef) return;

        isSubmitting.value = true;
        // 表单校验
        await formRef.validate();

        // 提交中提示
        ElNotification({
            title: "保存中",
            message: "正在保存您的个人信息，请稍候...",
            type: "info",
            position: "top-right",
            duration: 1500,
        });

        // 模拟接口请求（实际项目替换为真实接口）
        await new Promise((resolve) => setTimeout(resolve, 1200));

        // 提交成功提示
        ElMessage({
            message: "个人信息保存成功！",
            type: "success",
            duration: 2000,
        });

        // 切换到查看模式
        toggleEditMode();
    } catch (error) {
        ElMessage({
            message: "保存失败，请检查表单填写是否正确",
            type: "error",
            duration: 2500,
        });
        console.error("表单提交失败：", error);
    } finally {
        isSubmitting.value = false;
    }
};

// 取消编辑（支持重置头像）
const handleCancel = (formRef: FormInstance | null, resetAvatar?: () => void) => {
    if (formRef) {
        formRef.resetFields(); // 重置表单字段
    }
    resetAvatar?.(); // 恢复头像原始值
    toggleEditMode(); // 切换到查看模式
    ElMessage.info("已取消编辑");
};

export {
    teacherInfoRef,
    teacherInfoForm,
    teacherFormRules,
    handleAvatarUpload,
    handleSubmit,
    handleCancel,
}