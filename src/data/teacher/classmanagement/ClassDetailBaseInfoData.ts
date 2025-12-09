/**
 * 班级详情 - 基础信息和功能入口
 */

// ==================== 班级基础信息 ====================
export const classBaseInfoStatic = {
  classId: 'class_001',
  className: '高三(1)班',
  grade: '高三',
  mainSubject: '理科综合',
  createTime: '2024-09-01',
  headTeacher: '张三',
  contactPhone: '138****1234',
  classIntro: '本班级为高三重点理科班，学风浓厚，目标冲刺高考重点大学，现有学生45人，涵盖数学、物理、化学、生物等核心学科教学。'
}

export const infoItems = [
    { key: 'className', label: '班级名称' },
    { key: 'grade', label: '年级' },
    { key: 'mainSubject', label: '主要学科' },
    { key: 'headTeacher', label: '班主任' },
    { key: 'contactPhone', label: '联系电话' },
    { key: 'createTime', label: '创建时间' }
]

// ==================== 功能跳转入口 ====================
export const jumpEntryStatic = [
  {
    name: '出勤记录',
    icon: 'el-icon-user-check',
    path: '/teacher/class/generalOverview/class_001',
    desc: '查看/管理班级出勤数据'
  },
  {
    name: '作业管理',
    icon: 'el-icon-document',
    path: '/teacher/class/homework/class_001',
    desc: '发布/批改/统计班级作业'
  },
  {
    name: '课堂点名',
    icon: 'el-icon-check',
    path: '/teacher/class/rollcall/class_001',
    desc: '实时课堂点名打卡'
  },
  {
    name: '成绩分析',
    icon: 'el-icon-chart-line',
    path: '/teacher/class/attendance-analysis/class_001',
    desc: '深度分析班级/学生成绩'
  }
]

