import { ref, computed } from 'vue'
import { openModal } from '@/utils/modal'
import AuditDetailModal from '@/components/modals/AuditDetailModal.vue'
import AuditExportModal from '@/components/modals/AuditExportModal.vue'
import { ElMessage } from 'element-plus'

export type AuditStatus = 'success' | 'fail'

export interface AuditLog {
  id: string
  time: string
  user: string
  action: string
  target: string
  status: AuditStatus
  ip: string
}

export interface AuditFilter {
  keyword: string
  action: string | ''
  status: AuditStatus | ''
  range: [Date | null, Date | null]
}

function mockAudit(): AuditLog[] {
  const actions = ['登录', '修改配置', '新增用户', '停用账号', '导出报告']
  return Array.from({ length: 30 }).map((_, i) => ({
    id: String(i + 1),
    time: `2025-10-${(i % 28 + 1).toString().padStart(2, '0')} ${(8 + (i % 8)).toString().padStart(2, '0')}:${(i % 60).toString().padStart(2, '0')}`,
    user: ['admin01', 'teacher02', 'student08', 'parent03'][i % 4],
    action: actions[i % actions.length],
    target: ['系统', '账号:1001', '账号:2003', '配置项:安全'][i % 4],
    status: i % 9 === 0 ? 'fail' : 'success',
    ip: `10.0.0.${(i % 200) + 1}`,
  }))
}

export function useAudit() {
  const loading = ref(false)
  const filter = ref<AuditFilter>({ keyword: '', action: '', status: '', range: [null, null] })
  const all = ref<AuditLog[]>(mockAudit())

  const list = computed(() => {
    return all.value.filter(a =>
      (!filter.value.keyword || a.user.includes(filter.value.keyword) || a.target.includes(filter.value.keyword)) &&
      (!filter.value.action || a.action === filter.value.action) &&
      (!filter.value.status || a.status === filter.value.status)
    )
  })

  function query() { loading.value = true; setTimeout(() => loading.value = false, 300) }
  function reset() { filter.value = { keyword: '', action: '', status: '', range: [null, null] } }
  async function exportLogs() {
    const res = await openModal(AuditExportModal, { defaultRange: filter.value.range })
    if (res?.type === 'confirm' && res.payload) {
      ElMessage.success(`已提交导出（${res.payload.format.toUpperCase()}）`)
    }
  }
  async function view(id: string) {
    const log = all.value.find(x => x.id === id); if (!log) return
    await openModal(AuditDetailModal, { log })
  }

  return { loading, filter, list, query, reset, exportLogs, view }
}