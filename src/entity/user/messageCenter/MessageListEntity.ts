// 响应式数据
import {ref} from "vue";
import type {MessageItem} from "@/data/user/messageCenterData/MessageListData.ts";

const activeMessageTab = ref('all') // 当前激活的标签页
const messageSearchKeyword = ref('') // 消息搜索关键词
const messageStatusFilter = ref('all') // 消息状态筛选值
const showNewMessageModal = ref(false) // 新建消息弹窗显示状态

// 选择与批量删除
const selectedSet = ref<Set<MessageItem>>(new Set())

const currentTab = ref<'all' | 'private' | 'comment' | 'mention'>('all')
const filterStatus = ref<'all' | 'unread' | 'read'>('all')
const currentPage = ref(1)
const pageSize = ref(7)

const selectedMessage = ref<any | null>(null)
const chatMessages = ref<Array<{ content: string | string[]; time: string; isSelf?: boolean }>>([])
const newMessageContent = ref('')

const newMessageForm = ref<{ recipient: string; content: string }>({ recipient: '', content: '' })



export {
    activeMessageTab,
    messageSearchKeyword,
    messageStatusFilter,
    showNewMessageModal,
    selectedSet,
    currentTab,
    filterStatus,
    currentPage,
    pageSize,
    selectedMessage,
    chatMessages,
    newMessageContent,
    newMessageForm
}