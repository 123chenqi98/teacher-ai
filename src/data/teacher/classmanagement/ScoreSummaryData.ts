/**
 * 成绩概览组件配置数据
 * src/data/teacher/classmanagement/ScoreSummaryData.ts
 */

// ==================== 成绩项配置 ====================
export const scoreItemsConfig = [
  {
    key: 'classAverageScore',
    label: '班级平均分',
    color: '#303133',
    valueColor: '#303133'
  },
  {
    key: 'gradeRank',
    label: '在年级排名',
    color: '#303133',
    valueColor: '#E6A23C'
  },
  {
    key: 'excellentRate',
    label: '优秀率',
    color: '#303133',
    valueColor: '#67C23A'
  },
  {
    key: 'passRate',
    label: '及格率',
    color: '#303133',
    valueColor: '#409EFF'
  }
]

// ==================== 作业统计相关 ====================
export const homeworkLabels = {
  title: '作业统计',
  completionRateLabel: '完成率',
  unsubmittedTop3Label: '未提交TOP'
}
