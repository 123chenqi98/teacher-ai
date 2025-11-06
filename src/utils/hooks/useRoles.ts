import { ref, computed } from 'vue'
import { openModal } from '@/utils/modal'
import RoleAddModal from '@/components/modals/RoleAddModal.vue'
import RoleEditModal from '@/components/modals/RoleEditModal.vue'
import RoleAssignModal from '@/components/modals/RoleAssignModal.vue'
import RoleToggleConfirmModal from '@/components/modals/RoleToggleConfirmModal.vue'
import RoleDeleteConfirmModal from '@/components/modals/RoleDeleteConfirmModal.vue'
import { ElMessage } from 'element-plus'

export type RoleStatus = 'enabled' | 'disabled'

export interface RoleItem {
  id: string
  name: string
  usersCount: number
  permissions: string[]
  status: RoleStatus
}

export interface RoleFilter {
  keyword: string
  status: RoleStatus | ''
  permGroup: string | ''
}

function mockRoles(): RoleItem[] {
  const roles: RoleItem[] = [
    { id: '1', name: '管理员', usersCount: 12, permissions: ['系统配置', '用户管理', '审计查看'], status: 'enabled' },
    { id: '2', name: '教师', usersCount: 120, permissions: ['智能备课', '作业管理', '课堂互动'], status: 'enabled' },
    { id: '3', name: '学生', usersCount: 800, permissions: ['作业提交', '学情查看'], status: 'enabled' },
    { id: '4', name: '家长', usersCount: 180, permissions: ['学情查看'], status: 'disabled' },
  ]
  return roles
}

export function useRoles() {
  const loading = ref(false)
  const filter = ref<RoleFilter>({ keyword: '', status: '', permGroup: '' })
  const all = ref<RoleItem[]>(mockRoles())

  const list = computed(() => {
    return all.value.filter(r =>
      (!filter.value.keyword || r.name.includes(filter.value.keyword)) &&
      (!filter.value.status || r.status === filter.value.status) &&
      (!filter.value.permGroup || r.permissions.some(p => p.includes(filter.value.permGroup as string)))
    )
  })

  function query() { loading.value = true; setTimeout(() => loading.value = false, 300) }
  function reset() { filter.value = { keyword: '', status: '', permGroup: '' } }
  async function add() {
    const res = await openModal(RoleAddModal)
    if (res?.type === 'confirm' && res.payload) {
      const nextId = String(Math.max(0, ...all.value.map(r => Number(r.id))) + 1)
      all.value.push({ id: nextId, name: res.payload.name, usersCount: 0, permissions: res.payload.permissions ?? [], status: res.payload.status ?? 'enabled' })
      ElMessage.success('角色已创建')
    }
  }
  async function edit(id: string) {
    const r = all.value.find(x => x.id === id); if (!r) return
    const res = await openModal(RoleEditModal, { role: r })
    if (res?.type === 'confirm' && res.payload) {
      r.name = res.payload.name ?? r.name
      r.status = res.payload.status ?? r.status
      r.permissions = Array.isArray(res.payload.permissions) ? res.payload.permissions : r.permissions
      ElMessage.success('角色信息已更新')
    }
  }
  async function toggle(id: string) {
    const r = all.value.find(x => x.id === id); if (!r) return
    const res = await openModal(RoleToggleConfirmModal, { role: r })
    if (res?.type === 'confirm') {
      r.status = r.status === 'enabled' ? 'disabled' : 'enabled'
      ElMessage.success(r.status === 'enabled' ? '角色已启用' : '角色已停用')
    }
  }
  async function assign(id: string) {
    const r = all.value.find(x => x.id === id); if (!r) return
    const res = await openModal(RoleAssignModal, { role: r })
    if (res?.type === 'confirm' && res.payload) {
      r.permissions = Array.isArray(res.payload.permissions) ? res.payload.permissions : r.permissions
      ElMessage.success('权限已分配并生效')
    }
  }
  async function remove(id: string) {
    const r = all.value.find(x => x.id === id); if (!r) return
    const res = await openModal(RoleDeleteConfirmModal, { role: r })
    if (res?.type === 'confirm') {
      all.value = all.value.filter(x => x.id !== id)
      ElMessage.success('角色已删除')
    }
  }

  return { loading, filter, list, query, reset, add, edit, toggle, assign, remove }
}