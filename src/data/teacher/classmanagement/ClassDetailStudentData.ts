/**
 * 班级详情 - 学生管理数据
 */

// ==================== 学生列表数据 ====================
export const studentListStatic = [
  {
    studentId: 'student_001',
    name: '李华',
    gender: '男',
    contact: '139****5678',
    joinTime: '2024-09-01',
    status: '优秀',
    latestScore: 92,
    absenceCount: 0,
    homeworkCompletionRate: '98%'
  },
  {
    studentId: 'student_002',
    name: '王芳',
    gender: '女',
    contact: '136****9012',
    joinTime: '2024-09-01',
    status: '优秀',
    latestScore: 88,
    absenceCount: 1,
    homeworkCompletionRate: '95%'
  },
  {
    studentId: 'student_003',
    name: '张伟',
    gender: '男',
    contact: '137****3456',
    joinTime: '2024-09-02',
    status: '进步中',
    latestScore: 76,
    absenceCount: 0,
    homeworkCompletionRate: '89%'
  },
  {
    studentId: 'student_004',
    name: '刘敏',
    gender: '女',
    contact: '135****7890',
    joinTime: '2024-09-01',
    status: '需关注',
    latestScore: 65,
    absenceCount: 2,
    homeworkCompletionRate: '75%'
  },
  {
    studentId: 'student_005',
    name: '陈明',
    gender: '男',
    contact: '134****2345',
    joinTime: '2024-09-03',
    status: '请假',
    latestScore: 80,
    absenceCount: 0,
    homeworkCompletionRate: '90%'
  }
]

// ==================== 学生列表表格列配置 ====================
export const studentListColumns = [
  {
    prop: 'name',
    label: '学生姓名',
    minWidth: 120
  },
  {
    prop: 'gender',
    label: '性别',
    width: 80
  },
  {
    prop: 'contact',
    label: '联系方式',
    minWidth: 140,
    showOverflowTooltip: true
  },
  {
    prop: 'joinTime',
    label: '加入时间',
    width: 130
  },
  {
    prop: 'status',
    label: '学生状态',
    width: 100
  },
  {
    prop: 'latestScore',
    label: '最新成绩',
    width: 100
  },
  {
    prop: 'absenceCount',
    label: '缺勤次数',
    width: 100
  },
  {
    prop: 'homeworkCompletionRate',
    label: '作业完成率',
    width: 130
  }
]
