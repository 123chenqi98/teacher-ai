/**
 * 出勤管理 - 概览统计和待处理数据
 */

// ==================== 统计项配置（用于 AttendanceSummaryComponent） ====================
export const attendanceStatItemsConfig = [
  {
    key: 'attendanceRate',
    label: '出勤率',
    color: '#67C23A'
  },
  {
    key: 'lateRate',
    label: '迟到率',
    color: '#E6A23C'
  },
  {
    key: 'absenceRate',
    label: '缺勤率',
    color: '#F56C6C'
  },
  {
    key: 'leaveCount',
    label: '请假数',
    color: '#409EFF'
  }
]

// ==================== 标签页配置（用于 AttendanceSummaryComponent） ====================
export const attendanceTabsConfig = [
  {
    label: '本周',
    name: 'week',
    dataKey: 'week',
    compareKey: 'compareLastWeek',
    fontSize: {
      label: '15px',
      value: '24px',
      compare: '16px'
    }
  },
  {
    label: '本月',
    name: 'month',
    dataKey: 'month',
    compareKey: 'compareLastMonth',
    fontSize: {
      label: '12px',
      value: '24px',
      compare: '11px'
    }
  },
  {
    label: '本学期',
    name: 'semester',
    dataKey: 'semester',
    compareKey: 'compareLastSemester',
    fontSize: {
      label: '12px',
      value: '24px',
      compare: '11px'
    }
  }
]

// ==================== 出勤概览统计 ====================
export const attendanceOverviewStatic = {
  week: {
    attendanceRate: '96.8%',
    lateRate: '2.3%',
    absenceRate: '0.5%',
    leaveCount: 3,
    compareLastWeek: {
      attendanceRate: '+1.2%',
      lateRate: '+0.5%',
      absenceRate: '-0.3%',
      leaveCount: '0'
    }
  },
  month: {
    attendanceRate: '95.7%',
    lateRate: '2.1%',
    absenceRate: '0.7%',
    leaveCount: 8,
    compareLastMonth: {
      attendanceRate: '+0.8%',
      lateRate: '-0.2%',
      absenceRate: '-0.5%',
      leaveCount: '-2'
    }
  },
  semester: {
    attendanceRate: '96.2%',
    lateRate: '2.0%',
    absenceRate: '0.6%',
    leaveCount: 15,
    compareLastSemester: {
      attendanceRate: '+0.3%',
      lateRate: '+0.1%',
      absenceRate: '-0.4%',
      leaveCount: '+3'
    }
  }
}

// ==================== 今日未打卡学生 ====================
export const todayUnpunchStatic = {
  count: 3,
  list: [
    {
      studentId: 'student_006',
      studentName: '赵强',
      unpunchedCourses: ['数学（第2节）', '物理（第3节）'],
      contact: '138****6789'
    },
    {
      studentId: 'student_012',
      studentName: '林小丽',
      unpunchedCourses: ['英语（第1节）'],
      contact: '139****3456'
    },
    {
      studentId: 'student_025',
      studentName: '陈宇',
      unpunchedCourses: ['化学（第4节）'],
      contact: '137****8901'
    }
  ]
}

