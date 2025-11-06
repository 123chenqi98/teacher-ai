import { ref, computed } from 'vue'
import type { FilterState, DashboardData, TimeGranularity, DistributionItem } from '../types'

// 模拟数据源：实际项目可替换为后端接口
function mockFetchDashboard(filter: FilterState): Promise<DashboardData> {
  const base = 1000
  const roles = {
    teacher: 120,
    student: 800,
    parent: 180,
    admin: 12,
  }
  const overview = {
    totalUsers: roles.teacher + roles.student + roles.parent + roles.admin,
    roleDistribution: roles,
    activeUsers: {
      day: 260,
      week: 1200,
      month: 3600,
    },
    activityShare: {
      teacher: 0.32,
      student: 0.55,
      parent: 0.13,
    },
  }

  // 核心概览指标（用户/业务/系统）
  const core = {
    user: {
      totalUsers: overview.totalUsers,
      newUsers: { today: 28, yesterday: 22, last7d: 160 },
      active: { dau: overview.activeUsers.day, mau: 3800 },
      retention: { d1: 0.63, d7: 0.42 },
    },
    business: {
      operationsTotal: 12540,
      pendingTasks: 37,
      revenue: 256000, // 元
      conversionRate: 0.087,
    },
    system: {
      onlineUsers: 312,
      apiCallsToday: 48620,
      errorLogsToday: 18,
      resourceUsage: { cpu: 0.47, memory: 0.61 },
    },
  }
  const modules = [
    '智能备课',
    '作业管理',
    '学情分析',
    '资源库',
    '课堂互动',
  ]
  const moduleVisits = modules.map((m, i) => ({ module: m, visits: base + i * 123 }))
  const ranking = [...moduleVisits].sort((a, b) => b.visits - a.visits)

  const labelOf = (g: TimeGranularity, idx: number) =>
    g === 'day' ? `D${idx}` : g === 'week' ? `W${idx}` : `M${idx}`

  const trends = [
    {
      name: '用户增长趋势',
      points: Array.from({ length: 10 }).map((_, i) => ({ label: labelOf(filter.granularity, i + 1), value: base + i * 80 })),
    },
    {
      name: '功能使用波动',
      points: Array.from({ length: 10 }).map((_, i) => ({ label: labelOf(filter.granularity, i + 1), value: base + i * ((i % 3 === 0) ? 40 : 20) })),
    },
  ]

  // 分类分布统计
  const mk = (pairs: [string, number][]): DistributionItem[] => pairs.map(([name, value]) => ({ name, value }))
  const distributions = {
    userRegion: mk([
      ['华东', 420], ['华南', 360], ['华北', 280], ['西南', 180], ['东北', 120],
    ]),
    device: mk([
      ['PC端', 680], ['移动端', 780],
    ]),
    role: mk([
      ['教师', roles.teacher], ['学生', roles.student], ['家长', roles.parent], ['管理员', roles.admin],
    ]),
    orderType: mk([
      ['普通订单', 320], ['活动订单', 140], ['会员续费', 220],
    ]),
    taskStatus: mk([
      ['已完成', 520], ['待处理', 96], ['失败', 24],
    ]),
  }

  // 学科使用量分布（示例数据，可替换后端返回）
  const subjects = mk([
    ['语文', 820], ['数学', 980], ['英语', 910], ['物理', 640], ['化学', 600], ['生物', 520], ['历史', 450], ['地理', 480], ['政治', 430],
  ])

  return Promise.resolve({
    overview,
    usage: { moduleVisits, ranking },
    trends,
    core,
    distributions,
    subjects,
  })
}

export function useDashboard() {
  const filter = ref<FilterState>({
    range: [null, null],
    granularity: 'day',
    region: null,
    school: null,
  })
  const loading = ref(false)
  const data = ref<DashboardData | null>(null)

  async function refresh() {
    loading.value = true
    try {
      data.value = await mockFetchDashboard(filter.value)
    } finally {
      loading.value = false
    }
  }

  const canExportScope = (role: 'teacher' | 'student' | 'parent' | 'admin') => {
    // 简单权限模型：
    // teacher/student/parent 仅可导出个人或所属学校
    // admin 可导出全局
    return role === 'admin' ? 'global' : 'school'
  }

  const hasData = computed(() => !!data.value)

  return {
    filter,
    loading,
    data,
    refresh,
    hasData,
    canExportScope,
  }
}