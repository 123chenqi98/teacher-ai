/**
 * 班级列表视图数据
 */

// ==================== 班级列表数据 ====================
export const classListStatic = [
  {
    classId: 'class_001',
    className: '高三(1)班',
    grade: '高三',
    subject: ['理科综合'],
    studentCount: 45,
    headTeacher: '张三',
    createTime: '2024-09-01',
    status: '正常',
    classIntro: '高三理科班'
  },
  {
    classId: 'class_002',
    className: '高二(3)班',
    grade: '高二',
    subject: ['数学', '物理'],
    studentCount: 42,
    headTeacher: '李四',
    createTime: '2024-09-01',
    status: '正常',
    classIntro: '高二数理班'
  },
  {
    classId: 'class_003',
    className: '高一(2)班',
    grade: '高一',
    subject: ['语文', '英语'],
    studentCount: 48,
    headTeacher: '王五',
    createTime: '2024-09-02',
    status: '正常',
    classIntro: '高一语英班'
  },
  {
    classId: 'class_004',
    className: '高三(5)班',
    grade: '高三',
    subject: ['文科综合'],
    studentCount: 40,
    headTeacher: '赵六',
    createTime: '2023-09-01',
    status: '归档',
    classIntro: '高三文科班'
  },
  {
    classId: 'class_005',
    className: '高二(1)班',
    grade: '高二',
    subject: ['化学', '生物'],
    studentCount: 43,
    headTeacher: '孙七',
    createTime: '2024-09-01',
    status: '正常',
    classIntro: '高二化生班'
  }
]


// ==================== 班级列表表格列配置 ====================
export const classListColumns = [
    {
        prop: 'className',
        label: '班级名称',
        minWidth: 120
    },
    {
        prop: 'grade',
        label: '年级',
        width: 100
    },
    {
        prop: 'subject',
        label: '学科',
        minWidth: 140,
        custom: true
    },
    {
        prop: 'studentCount',
        label: '学生数',
        width: 100
    },
    {
        prop: 'headTeacher',
        label: '班主任',
        width: 120
    },
    {
        prop: 'classIntro',
        label: '班级简介',
        minWidth: 200,
        showOverflowTooltip: true
    },
    {
        prop: 'createTime',
        label: '创建时间',
        width: 140
    },
    {
        prop: 'status',
        label: '状态',
        width: 100
    }
]

// ==================== 班级列表按钮文本 ====================
export const classListButtonText = {
  addClass: '新增班级',
  editClass: '编辑',
  deleteClass: '删除',
  exportBatch: '批量导出',
  archiveClass: '归档',
  restoreClass: '恢复',
  search: '查询',
  reset: '重置'
}

