import type { DashboardData } from './types'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'

export async function exportExcel(data: DashboardData, scope: 'global' | 'school') {
  const wb = XLSX.utils.book_new()
  const overviewSheet = XLSX.utils.json_to_sheet([
    { 指标: '总用户数', 数值: data.overview.totalUsers },
    { 指标: '教师', 数值: data.overview.roleDistribution.teacher },
    { 指标: '学生', 数值: data.overview.roleDistribution.student },
    { 指标: '家长', 数值: data.overview.roleDistribution.parent },
    { 指标: '管理员', 数值: data.overview.roleDistribution.admin },
    { 指标: '活跃(日)', 数值: data.overview.activeUsers.day },
    { 指标: '活跃(周)', 数值: data.overview.activeUsers.week },
    { 指标: '活跃(月)', 数值: data.overview.activeUsers.month },
  ])
  XLSX.utils.book_append_sheet(wb, overviewSheet, '运营概览')

  const usageSheet = XLSX.utils.json_to_sheet(data.usage.moduleVisits.map(m => ({ 模块: m.module, 访问量: m.visits })))
  XLSX.utils.book_append_sheet(wb, usageSheet, '模块访问')

  const rankSheet = XLSX.utils.json_to_sheet(data.usage.ranking.map(m => ({ 模块: m.module, 访问量: m.visits })))
  XLSX.utils.book_append_sheet(wb, rankSheet, '使用排行')

  const filename = scope === 'global' ? '统计报告-全局.xlsx' : '统计报告-学校.xlsx'
  XLSX.writeFile(wb, filename)
}

export async function exportPdf(data: DashboardData, scope: 'global' | 'school') {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  let y = 40
  doc.setFontSize(16)
  doc.text('后台管理统计报告', 40, y)
  y += 30
  doc.setFontSize(12)
  doc.text(`导出范围：${scope === 'global' ? '全局' : '所属学校'}`, 40, y)
  y += 20

  doc.text('系统运营概览', 40, y)
  y += 16
  const lines = [
    `总用户数：${data.overview.totalUsers}`,
    `教师：${data.overview.roleDistribution.teacher}  学生：${data.overview.roleDistribution.student}  家长：${data.overview.roleDistribution.parent}  管理员：${data.overview.roleDistribution.admin}`,
    `活跃（日/周/月）：${data.overview.activeUsers.day} / ${data.overview.activeUsers.week} / ${data.overview.activeUsers.month}`,
  ]
  lines.forEach(l => { doc.text(l, 40, y); y += 16 })

  y += 10
  doc.text('功能使用统计 - 模块访问', 40, y)
  y += 16
  data.usage.moduleVisits.forEach(m => { doc.text(`${m.module}：${m.visits}`, 40, y); y += 16 })

  y += 10
  doc.text('功能使用统计 - 频率排行', 40, y)
  y += 16
  data.usage.ranking.forEach(m => { doc.text(`${m.module}：${m.visits}`, 40, y); y += 16 })

  const filename = scope === 'global' ? '统计报告-全局.pdf' : '统计报告-学校.pdf'
  doc.save(filename)
}