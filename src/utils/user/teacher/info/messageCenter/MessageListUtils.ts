// 扩展类型定义，包含新增的 system 和 notice 类型
type MessageType = 'private' | 'comment' | 'mention' | 'system' | 'notice';

/**
 * 根据消息类型获取标签类型（适配UI组件的tag类型）
 * @param type 消息类型
 * @returns 标签类型字符串
 */
export const getTagType = (type: MessageType) => {
    switch (type) {
        case 'private':
            return 'success';
        case 'comment':
            return 'info';
        case 'mention':
            return 'warning';
        case 'system': // 系统消息 - 紫色/主色调
            return 'primary';
        case 'notice': // 通知类消息 - 蓝色/提示色
            return 'info'; // 也可根据需求改为 'primary' 或 'danger'
        default:
            return '';
    }
};

/**
 * 根据消息类型获取标签显示文本
 * @param type 消息类型
 * @returns 标签显示文本
 */
export const getTagText = (type: MessageType) => {
    switch (type) {
        case 'private':
            return '私信';
        case 'comment':
            return '评论';
        case 'mention':
            return '@我';
        case 'system': // 系统消息文本
            return '系统';
        case 'notice': // 通知类消息文本
            return '通知';
        default:
            return '其他';
    }
};