// 1. 规范接口命名（首字母大写，语义化），删除错误的 defineProps 调用
export interface ContactInfoProps {
    phone: string;
    email: string;
    address: string;
    textColor: string;
    themeColor: string;
    cardBorderColor: string;
    showAddress: boolean;
}

// 2. 定义 Props 默认值（纯基础类型对象，无 Vue 配置语法）
export const contactInfoDefaultProps: ContactInfoProps = {
    phone: "400-123-4567",
    email: "contact@example.com", // 修复：去掉默认值前的多余空格
    address: "玉林市玉州区",
    textColor: "#333333",
    themeColor: "#bd3131",
    cardBorderColor: "#2066e0",
    showAddress: true,
};