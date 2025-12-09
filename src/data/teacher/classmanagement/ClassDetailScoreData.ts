/**
 * 班级详情 - 成绩和作业统计数据
 */

// ==================== 成绩概览 ====================
export const scoreOverviewStatic = {
  classAverageScore: 82.5,
  gradeRank: '第3名',
  excellentRate: '35%',
  passRate: '92%',
  subjectAverage: [
    { subject: '语文', score: 85 },
    { subject: '数学', score: 78 },
    { subject: '英语', score: 88 },
    { subject: '物理', score: 82 },
    { subject: '化学', score: 79 },
    { subject: '生物', score: 83 }
  ]
}

// ==================== 成绩趋势 ====================
export const scoreTrendStatic = {
  examTypes: ['月考', '期中', '期末'],
  classScores: [79, 81, 82.5],
  gradeScores: [77, 79, 80]
}

// ==================== 作业统计 ====================
export const homeworkStatsStatic = {
  publishedCount: 15,
  completionRate: '94%',
  unsubmittedTop3: [
    { subject: '数学', unsubmittedCount: 3 },
    { subject: '物理', unsubmittedCount: 2 },
    { subject: '化学', unsubmittedCount: 1 }
  ]
}

