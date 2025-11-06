import { ref, computed } from 'vue'
import { openModal } from '@/utils/modal'
import AccountEditModal from '@/components/modals/AccountEditModal.vue'
import ResetPasswordModal from '@/components/modals/ResetPasswordModal.vue'
import RiskFlagModal from '@/components/modals/RiskFlagModal.vue'
import { ElMessage } from 'element-plus'

export type RoleOpt = 'teacher' | 'student' | 'parent' | 'admin'
export type StatusOpt = 'enabled' | 'disabled'

export interface AccountItem {
  id: string
  name: string
  role: RoleOpt
  status: StatusOpt
  risk: 'low' | 'medium' | 'high'
  school: string
  region: string
  lastLogin: string
}

export interface AccountFilter {
  role: RoleOpt | ''
  status: StatusOpt | ''
  region: string | ''
  school: string | ''
  keyword: string
}

function mockAccounts(): AccountItem[] {
  const names = ['wang', 'li', 'zhang', 'zhao', 'chen', 'yang']
  const roles: RoleOpt[] = ['teacher', 'student', 'parent', 'admin']
  const schools = ['一中', '二中', '实验高中', '外国语']
  const regions = ['east', 'south', 'north']
  return Array.from({ length: 28 }).map((_, i) => ({
    id: String(i + 1),
    name: `${names[i % names.length]}_${i + 1001}`,
    role: roles[i % roles.length],
    status: i % 7 === 0 ? 'disabled' : 'enabled',
    risk: i % 9 === 0 ? 'high' : i % 4 === 0 ? 'medium' : 'low',
    school: schools[i % schools.length],
    region: regions[i % regions.length],
    lastLogin: `2025-10-${(i % 28 + 1).toString().padStart(2, '0')} 12:${(i % 60).toString().padStart(2, '0')}`,
  }))
}

export function useAccounts() {
  const loading = ref(false)
  const filter = ref<AccountFilter>({ role: '', status: '', region: '', school: '', keyword: '' })
  const all = ref<AccountItem[]>(mockAccounts())

  const list = computed(() => {
    return all.value.filter(a =>
      (!filter.value.role || a.role === filter.value.role) &&
      (!filter.value.status || a.status === filter.value.status) &&
      (!filter.value.region || a.region === filter.value.region) &&
      (!filter.value.school || a.school === filter.value.school) &&
      (!filter.value.keyword || a.name.includes(filter.value.keyword))
    )
  })

  function query() { loading.value = true; setTimeout(() => loading.value = false, 300) }
  function reset() { filter.value = { role: '', status: '', region: '', school: '', keyword: '' } }
  function add() { ElMessage.info('新增账号（演示占位）') }
  function toggle(id: string) { const a = all.value.find(x => x.id === id); if (a) a.status = a.status === 'enabled' ? 'disabled' : 'enabled' }
  async function edit(id: string) {
    const a = all.value.find(x => x.id === id); if (!a) return
    const res = await openModal(AccountEditModal, { account: a })
    if (res?.type === 'confirm' && res.payload) {
      a.name = res.payload.name
      a.role = res.payload.role
      a.status = res.payload.status
      a.school = res.payload.school
      a.region = res.payload.region
      ElMessage.success('账号信息已更新')
    }
  }
  async function resetPwd(id: string) {
    const a = all.value.find(x => x.id === id); if (!a) return
    const res = await openModal(ResetPasswordModal, { userName: a.name })
    if (res?.type === 'confirm') {
      ElMessage.success('密码已重置并生效')
    }
  }
  async function riskFlag(id: string) {
    const a = all.value.find(x => x.id === id); if (!a) return
    const res = await openModal(RiskFlagModal, { userName: a.name, currentRisk: a.risk })
    if (res?.type === 'confirm' && res.payload) {
      a.risk = res.payload.risk
      ElMessage.warning(`已标记为${res.payload.risk === 'high' ? '高' : res.payload.risk === 'medium' ? '中' : '低'}风险`)
    }
  }
  function authorize(id: string) { alert(`授权账号 ${id}（演示）`) }

  return { loading, filter, list, query, reset, add, toggle, edit, resetPwd, authorize, riskFlag }
}