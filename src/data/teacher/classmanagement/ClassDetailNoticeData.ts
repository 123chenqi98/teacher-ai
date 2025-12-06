/**
 * 班级详情 - 通知公告数据
 */

// ==================== 通知公告 ====================
export const noticeListStatic = [
  {
    id: 'notice_001',
    title: '2026年高考报名工作通知',
    type: '学校公告',
    source: '教务处',
    content: '2026年高考报名将于11月15日启动，请各位同学准备好身份证、户口本等相关材料，按班级统一提交报名信息。',
    time: '2025-11-01',
    readCount: 28,
    totalCount: 45,
    isRead: false,
    attachment: '高考报名须知.pdf'
  },
  {
    id: 'notice_002',
    title: '11月月考安排及复习建议',
    type: '班级通知',
    source: '张三（班主任）',
    content: '11月月考将于11月18-20日进行，考试科目为全部主科，请同学们合理安排复习时间，重点关注薄弱学科。',
    time: '2025-11-03',
    readCount: 35,
    totalCount: 45,
    isRead: true,
    attachment: '11月月考复习提纲.docx'
  },
  {
    id: 'notice_003',
    title: '班级卫生值日表更新通知',
    type: '班级通知',
    source: '张三（班主任）',
    content: '11月班级卫生值日表已更新，请各位同学查看并按时完成值日工作，保持教室整洁。',
    time: '2025-11-02',
    readCount: 40,
    totalCount: 45,
    isRead: true,
    attachment: '11月值日表.xlsx'
  },
  {
    id: 'notice_004',
    title: '系统升级维护通知',
    type: '系统通知',
    source: '校园系统管理员',
    content: '11月6日00:00-06:00校园教务系统将进行升级维护，期间将无法访问作业提交、成绩查询等功能，请提前安排好相关操作。',
    time: '2025-11-04',
    readCount: 18,
    totalCount: 45,
    isRead: false,
    attachment: ''
  }
]

// ==================== 通知列表表格列配置 ====================
export const noticeListColumns = [
  {
    prop: 'title',
    label: '公告标题',
    minWidth: 180,
    showOverflowTooltip: true
  },
  {
    prop: 'type',
    label: '通知类型',
    width: 120
  },
  {
    prop: 'source',
    label: '发布方',
    width: 130
  },
  {
    prop: 'time',
    label: '发布时间',
    width: 140
  },
  {
    prop: 'readInfo',
    label: '阅读情况',
    width: 130
  },
  {
    prop: 'isRead',
    label: '状态',
    width: 100
  }
]
