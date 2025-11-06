export type ThemeTokens = {
  primary: string
  primary600: string
  primary700: string
  bg: string
  surface: string
  border: string
  text: string
  muted: string
}

export const purpleTheme: ThemeTokens = {
  primary: '#7c4dff',
  primary600: '#6a3dff',
  primary700: '#5b2dff',
  // 使用浅色主题，背景与卡片为白色系
  bg: '#f6f7fb',
  surface: '#ffffff',
  border: '#e6e4f0',
  text: '#2b2840',
  muted: '#6b6792',
}

export function applyTheme(tokens: ThemeTokens) {
  const root = document.documentElement
  root.style.setProperty('--color-primary', tokens.primary)
  root.style.setProperty('--color-primary-600', tokens.primary600)
  root.style.setProperty('--color-primary-700', tokens.primary700)
  root.style.setProperty('--color-bg', tokens.bg)
  root.style.setProperty('--color-surface', tokens.surface)
  root.style.setProperty('--color-border', tokens.border)
  root.style.setProperty('--color-text', tokens.text)
  root.style.setProperty('--color-muted', tokens.muted)
}