import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { messageList, type MessageItem } from '@/data/user/messageCenterData/MessageListData'

// 响应式数据
const activeMessageTab = ref('all') // 当前激活的标签页
const messageSearchKeyword = ref('') // 消息搜索关键词
const messageStatusFilter = ref('all') // 消息状态筛选值
const showNewMessageModal = ref(false) // 新建消息弹窗显示状态

// 事件处理函数
/**
 * 标签页切换处理
 * @param {Object} tab - 选中的标签页对象
 */
const handleMessageTabChange = (tab: any) => {
    const name = typeof tab === 'string'
      ? tab
      : (tab?.props?.name ?? tab?.paneName ?? 'all')
    activeMessageTab.value = name
    currentTab.value = name as any
    currentPage.value = 1
}

// 消息搜索处理
const handleMessageSearch = () => {
    currentPage.value = 1
}

// 消息状态筛选变更处理
const handleStatusFilterChange = () => {
    filterStatus.value = (messageStatusFilter.value || 'all') as any
    currentPage.value = 1
}

// 选择与批量删除
const selectedSet = ref<Set<MessageItem>>(new Set())
const isSelected = (item: MessageItem) => selectedSet.value.has(item)
const selectedCount = computed(() => selectedSet.value.size)
const toggleSelect = (item: MessageItem, val?: boolean) => {
  const has = selectedSet.value.has(item)
  const next = val === undefined ? !has : !!val
  if (next) selectedSet.value.add(item)
  else selectedSet.value.delete(item)
}

const clearSelection = () => selectedSet.value.clear()

const handleDeleteSelectedMessages = () => {
  const count = selectedSet.value.size
  if (!count) {
    ElMessage.info('请先选择要删除的消息')
    return
  }
  messageList.value = messageList.value.filter(i => !selectedSet.value.has(i))
  clearSelection()
  const maxPage = Math.max(1, Math.ceil(messageList.value.length / pageSize.value))
  if (currentPage.value > maxPage) currentPage.value = maxPage
  ElMessage.success(`已删除 ${count} 条消息`)
}

/**
 * 打开新建消息弹窗
 */
const openNewMessageModal = () => {
    showNewMessageModal.value = true
    console.log('打开新建消息弹窗')
}
const currentTab = ref<'all' | 'private' | 'comment' | 'mention'>('all')
const filterStatus = ref<'all' | 'unread' | 'read'>('all')
const currentPage = ref(1)
const pageSize = ref(7)

const selectedMessage = ref<any | null>(null)
const chatMessages = ref<Array<{ content: string | string[]; time: string; isSelf?: boolean }>>([])
const newMessageContent = ref('')

const newMessageForm = ref<{ recipient: string; content: string }>({ recipient: '', content: '' })

const filteredMessageList = computed(() => {
  let list = messageList.value
  if (currentTab.value !== 'all') {
    list = list.filter(i => i.type === currentTab.value)
  }
  if (filterStatus.value !== 'all') {
    list = list.filter(i => i.status === filterStatus.value)
  }
  const kw = messageSearchKeyword.value.trim().toLowerCase()
  if (kw) {
    list = list.filter(i => String(i.sender).toLowerCase().includes(kw) || String(i.content).toLowerCase().includes(kw))
  }
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return list.slice(start, end)
})

const filteredTotalCount = computed(() => {
  let list = messageList.value
  if (currentTab.value !== 'all') {
    list = list.filter(i => i.type === currentTab.value)
  }
  if (filterStatus.value !== 'all') {
    list = list.filter(i => i.status === filterStatus.value)
  }
  const kw = messageSearchKeyword.value.trim().toLowerCase()
  if (kw) {
    list = list.filter(i => String(i.sender).toLowerCase().includes(kw) || String(i.content).toLowerCase().includes(kw))
  }
  return list.length
})

const handleTabClick = (pane: any) => {
  currentTab.value = (pane.props?.name || 'all') as any
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
}

const handleCurrentChange = (page: number) => {
  currentPage.value = page
}

const selectMessage = (item: any) => {
  selectedMessage.value = item
  chatMessages.value = [
    { content: '你好，请查看最新安排。', time: '10:18' },
    { content: '好的，已收到。', time: '10:19', isSelf: true },
  ]
}

const closeChat = () => {
  selectedMessage.value = null
}

const sendMessage = () => {
  const text = newMessageContent.value.trim()
  if (!text) return
  chatMessages.value.push({ content: text, time: new Date().toLocaleTimeString(), isSelf: true })
  newMessageContent.value = ''
}

const selectRecipient = (item: { name: string }) => {
  newMessageForm.value.recipient = item.name
}

const sendNewMessage = () => {
  const { recipient, content } = newMessageForm.value
  if (!recipient || !content.trim()) {
    ElMessage.warning('请填写收件人和内容')
    return
  }
  messageList.value.unshift({ sender: recipient, avatar: 'https://via.placeholder.com/40', time: new Date().toLocaleString(), content, type: 'private', status: 'unread' })
  showNewMessageModal.value = false
  newMessageForm.value = { recipient: '', content: '' }
  ElMessage.success('消息已发送')
}

const exportMessages = () => {
  const list = filteredMessageList.value
  if (!list.length) {
    ElMessage.info('无可导出的消息记录')
    return
  }
  const headers = ['发送者','时间','类型','状态','内容']
  const rows = list.map(i => [i.sender, i.time, i.type, i.status, i.content.replace('\n',' ').replace(',', ' ')])
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = '消息记录.csv'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  ElMessage.success(`已导出 ${list.length} 条消息记录`)
}

export {
    activeMessageTab,
    messageSearchKeyword,
    messageStatusFilter,
    showNewMessageModal,
    handleMessageTabChange,
    handleMessageSearch,
    handleStatusFilterChange,
    handleDeleteSelectedMessages,
    openNewMessageModal,
    currentTab,
    filterStatus,
    currentPage,
    pageSize,
    selectedMessage,
    chatMessages,
    newMessageContent,
    newMessageForm,
    filteredMessageList,
    filteredTotalCount,
    handleTabClick,
    handleSizeChange,
    handleCurrentChange,
    selectMessage,
    closeChat,
    sendMessage,
    selectRecipient,
    sendNewMessage,
    exportMessages,
    isSelected,
    selectedCount,
    toggleSelect
}
