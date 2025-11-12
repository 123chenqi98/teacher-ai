import { ref } from 'vue'
import { Collection, Files, Folder } from "@element-plus/icons-vue";

// 收藏概览数据（分类展示收藏资源）
export const collectionStats = [
    { category: '教案', count: 18, icon: Document, color: '#6366f1' }, // 对应教案收藏
    { category: '习题', count: 12, icon: Files, color: '#10b981' }, // 对应习题收藏
    { category: '课件', count: 8, icon: Folder, color: '#f59e0b' }, // 对应课件收藏
    { category: '教学工具', count: 6, icon: Collection, color: '#ec4899' }, // 对应工具收藏
];

// 收藏列表数据（展示最近收藏的具体资源）
export const collectionList = ref([
    {
        title: '勾股定理专项训练',
        type: '习题',
        source: '初中数学资源库',
        time: '3小时前',
        icon: Files
    },
    {
        title: '一次函数课件PPT',
        type: '课件',
        source: '教研组长分享',
        time: '1天前',
        icon: Folder
    },
    {
        title: '中考数学压轴题解题思路',
        type: '教案',
        source: '全国优秀教案库',
        time: '2天前',
        icon: Document
    },
    {
        title: '几何画板教学实操指南',
        type: '教学工具',
        source: '教师技能平台',
        time: '3天前',
        icon: Collection
    }
]);