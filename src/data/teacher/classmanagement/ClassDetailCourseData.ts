/**
 * 班级详情 - 课程表数据
 */

// ==================== 课程表 - 周视图 ====================
export const courseWeekViewStatic = [
  {
    timeSlot: '08:00-08:45',
    monday: { courseName: '语文', teacher: '赵老师', classroom: '301教室' },
    tuesday: { courseName: '数学', teacher: '孙老师', classroom: '301教室' },
    wednesday: { courseName: '英语', teacher: '吴老师', classroom: '301教室' },
    thursday: { courseName: '物理', teacher: '郑老师', classroom: '302教室' },
    friday: { courseName: '化学', teacher: '王老师', classroom: '302教室' },
    saturday: { courseName: '生物', teacher: '冯老师', classroom: '301教室' },
    sunday: '休息'
  },
  {
    timeSlot: '08:55-09:40',
    monday: { courseName: '数学', teacher: '孙老师', classroom: '301教室' },
    tuesday: { courseName: '物理', teacher: '郑老师', classroom: '302教室' },
    wednesday: { courseName: '语文', teacher: '赵老师', classroom: '301教室' },
    thursday: { courseName: '英语', teacher: '吴老师', classroom: '301教室' },
    friday: { courseName: '生物', teacher: '冯老师', classroom: '302教室' },
    saturday: { courseName: '化学', teacher: '王老师', classroom: '302教室' },
    sunday: '休息'
  },
  {
    timeSlot: '10:00-10:45',
    monday: { courseName: '英语', teacher: '吴老师', classroom: '301教室' },
    tuesday: { courseName: '化学', teacher: '王老师', classroom: '302教室' },
    wednesday: { courseName: '物理', teacher: '郑老师', classroom: '302教室' },
    thursday: { courseName: '数学', teacher: '孙老师', classroom: '301教室' },
    friday: { courseName: '语文', teacher: '赵老师', classroom: '301教室' },
    saturday: { courseName: '自习', teacher: '张三（班主任）', classroom: '301教室' },
    sunday: '休息'
  }
]

// ==================== 课程变动通知 ====================
export const courseChangeNoticeStatic = [
  {
    id: 'course_change_001',
    title: '周三第3节物理课代课通知',
    type: '代课',
    originalCourse: '物理（郑老师）',
    changeContent: '由李老师代课',
    time: '2025-11-05 10:00-10:45',
    classroom: '302教室',
    publishTime: '2025-11-02'
  },
  {
    id: 'course_change_002',
    title: '周五第2节化学课取消通知',
    type: '取消',
    originalCourse: '化学（王老师）',
    changeContent: '因教师培训取消，后续安排补课',
    time: '2025-11-07 08:55-09:40',
    classroom: '302教室',
    publishTime: '2025-11-03'
  },
  {
    id: 'course_change_003',
    title: '周六新增数学补课通知',
    type: '新增补课',
    originalCourse: '无',
    changeContent: '针对月考重点题型讲解',
    time: '2025-11-09 09:00-11:00',
    classroom: '301教室',
    publishTime: '2025-11-04'
  }
]
