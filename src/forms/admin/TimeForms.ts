/**
 * 时间相关的表单工具函数
 */

// 时间格式化接口
export interface TimeFormatOptions {
  includeSeconds?: boolean
  separator?: string
  showDate?: boolean
}

/**
 * 格式化时间为指定格式
 * @param date 日期对象
 * @param options 格式化选项
 * @returns 格式化后的时间字符串
 */
export const formatTime = (
  date: Date, 
  options: TimeFormatOptions = {}
): string => {
  const {
    includeSeconds = true,
    separator = '-',
    showDate = true
  } = options

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  let timeString = ''
  
  if (showDate) {
    timeString = `${year}${separator}${month}${separator}${day}`
  }
  
  const timePart = `${hours}:${minutes}${includeSeconds ? `:${seconds}` : ''}`
  
  return showDate ? `${timeString} ${timePart}` : timePart
}

/**
 * 获取当前时间格式化字符串
 * @param options 格式化选项
 * @returns 当前时间字符串
 */
export const getCurrentTime = (options?: TimeFormatOptions): string => {
  return formatTime(new Date(), options)
}

/**
 * 获取相对时间描述
 * @param date 目标日期
 * @returns 相对时间描述
 */
export const getRelativeTime = (date: Date): string => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (seconds < 60) {
    return `${seconds}秒前`
  } else if (minutes < 60) {
    return `${minutes}分钟前`
  } else if (hours < 24) {
    return `${hours}小时前`
  } else if (days < 30) {
    return `${days}天前`
  } else {
    return formatTime(date, { includeSeconds: false })
  }
}

/**
 * 验证时间格式
 * @param timeString 时间字符串
 * @param format 期望的格式
 * @returns 是否有效
 */
export const validateTimeFormat = (
  timeString: string, 
  format: TimeFormatOptions = {}
): boolean => {
  try {
    const parsed = new Date(timeString)
    return !isNaN(parsed.getTime())
  } catch {
    return false
  }
}

/**
 * 时间选择器的预设选项
 */
export const TIME_PRESETS = {
  RECENT: [
    { label: '最近5分钟', value: new Date(Date.now() - 5 * 60 * 1000) },
    { label: '最近15分钟', value: new Date(Date.now() - 15 * 60 * 1000) },
    { label: '最近30分钟', value: new Date(Date.now() - 30 * 60 * 1000) },
    { label: '最近1小时', value: new Date(Date.now() - 60 * 60 * 1000) },
  ],
  TODAY: [
    { label: '今天开始', value: new Date(new Date().setHours(0, 0, 0, 0)) },
    { label: '现在', value: new Date() },
  ]
}