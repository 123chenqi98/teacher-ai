/**
 * 教师身份指示器组件配置数据
 * src/data/teacher/classmanagement/TeacherRoleData.ts
 */

// ==================== 类型定义 ====================
export type TeacherRoleType = 'headTeacher' | 'subjectTeacher'

export interface ClassItemWithRole {
  classId: string
  className: string
  role: TeacherRoleType
}

export interface RoleSectionConfig {
  key: TeacherRoleType
  label: string
  tagType: 'success' | 'info' | 'warning' | 'danger'
  emptyDescription: string
}

// ==================== 静态文本配置 ====================
export const teacherRoleIndicatorText = {
  cardTitle: '教师身份',
  headTeacherLabel: '班主任',
  headTeacherCount: (count: number) => `班主任: ${count}`
}

// ==================== 教师身份类型配置 ====================
export const roleTypesConfig: RoleSectionConfig[] = [
  {
    key: 'headTeacher',
    label: '班主任班级',
    tagType: 'success',
    emptyDescription: '暂无班主任班级'
  },
  {
    key: 'subjectTeacher',
    label: '科任班级',
    tagType: 'info',
    emptyDescription: '暂无科任班级'
  }
]

// ==================== 其他配置 ====================
export const roleBadgeImageSize = 60
