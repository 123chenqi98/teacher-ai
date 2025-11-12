import { ref } from 'vue'
import {Collection, Folder, Message, User} from "@element-plus/icons-vue";

// 近期操作历史数据
export const activityList = ref([
    {
        icon: Document,
        content: '创建了新教案《二次函数的应用》',
        time: '2小时前',
        iconComponent: Document
    },
    {
        icon: Collection,
        content: '收藏了习题《勾股定理专项训练》',
        time: '3小时前',
        iconComponent: Collection
    },
    {
        icon: Folder,
        content: '上传了资源《数学课作PPT模板》',
        time: '1天前',
        iconComponent: Folder
    },
    {
        icon: User,
        content: '修改了个人手机号为138****1234',
        time: '1天前',
        iconComponent: User
    },
    {
        icon: Message,
        content: '给学生小明回复了4条疑问',
        time: '2天前',
        iconComponent: Message
    }
])