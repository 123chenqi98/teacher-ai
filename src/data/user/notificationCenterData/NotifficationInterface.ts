//通知项接口
import type {NotificationType} from "@/utils/user/teacher/info/notificationCenter/NotificationEditUtils.ts";

export interface NotificationItem {
    id: string | number;
    title: string;
    sender: string;
    time: string;
    content: string;
    type: NotificationType; // 复用类型，避免硬编码
    read: boolean;
    selected: boolean;
}

// 通知设置接口（移除冗余的索引签名，保持严谨）
export interface NotificationSettings {
    systemNotice: boolean;       // 系统通知
    importantReminder: boolean;  // 重要提醒
    successNotice: boolean;      // 成功通知
    errorReminder: boolean;      // 错误提醒
    emailNotification: boolean;  // 邮件通知
    smsNotification: boolean;    // 短信通知
}