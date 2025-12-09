/**
 * 班级统计概览数据
 * src/data/teacher/classmanagement/ClassStatsOverviewData.ts
 */

import { Grid, User, DocumentChecked, Histogram } from '@element-plus/icons-vue'

// ==================== 统计卡片配置 ====================
export const statsCardConfig = [
  {
    key: 'totalClasses',
    label: '班级总数',
    unit: '个班级',
    icon: Grid,
    iconColor: '#409EFF',
    dataKey: 'totalClasses' as const
  },
  {
    key: 'totalStudents',
    label: '学生总数',
    unit: '名学生',
    icon: User,
    iconColor: '#67C23A',
    dataKey: 'totalStudents' as const
  },
  {
    key: 'avgStudentPerClass',
    label: '平均班级规模',
    unit: '人/班',
    icon: Histogram,
    iconColor: '#E6A23C',
    dataKey: 'avgStudentPerClass' as const
  },
  {
    key: 'activeClasses',
    label: '活跃班级',
    unit: '个班级',
    icon: DocumentChecked,
    iconColor: '#A25DFA',
    dataKey: 'activeClasses' as const
  }
]
