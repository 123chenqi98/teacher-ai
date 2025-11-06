export type UserRole = 'teacher' | 'student' | 'parent' | 'admin'

export type TimeGranularity = 'day' | 'week' | 'month'

export interface FilterState {
  range: [Date | null, Date | null]
  granularity: TimeGranularity
  region: string | null
  school: string | null
}

export interface SystemOverviewStats {
  totalUsers: number
  roleDistribution: Record<UserRole, number>
  activeUsers: {
    day: number
    week: number
    month: number
  }
  activityShare: {
    teacher: number
    student: number
    parent: number
  }
}

// 核心概览指标
export interface CoreUserMetrics {
  totalUsers: number
  newUsers: { today: number; yesterday: number; last7d: number }
  active: { dau: number; mau: number }
  retention: { d1: number; d7: number }
}

export interface CoreBusinessMetrics {
  operationsTotal: number
  pendingTasks: number
  revenue: number
  conversionRate: number
}

export interface CoreSystemMetrics {
  onlineUsers: number
  apiCallsToday: number
  errorLogsToday: number
  resourceUsage: { cpu: number; memory: number }
}

export interface CoreOverview {
  user: CoreUserMetrics
  business: CoreBusinessMetrics
  system: CoreSystemMetrics
}

// 分类统计分布
export interface DistributionItem { name: string; value: number }
export interface Distributions {
  userRegion: DistributionItem[]
  device: DistributionItem[]
  role: DistributionItem[]
  orderType: DistributionItem[]
  taskStatus: DistributionItem[]
}

export interface ModuleUsageItem {
  module: string
  visits: number
}

export interface UsageStats {
  moduleVisits: ModuleUsageItem[]
  ranking: ModuleUsageItem[]
}

export interface TrendPoint {
  label: string
  value: number
}

export interface TrendSeries {
  name: string
  points: TrendPoint[]
}

export interface DashboardData {
  overview: SystemOverviewStats
  usage: UsageStats
  trends: TrendSeries[]
  core: CoreOverview
  distributions: Distributions
  subjects: DistributionItem[]
}