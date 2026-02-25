import type { ComputedRef, Ref } from 'vue'

import type { ThemeMode } from '@/types/layouts/ThemeMode'
import { inject } from 'vue'

interface ThemeControls {
  themeMode: Ref<ThemeMode>
  currentTheme: ComputedRef<string>
  handleThemeModeChange: (newMode: ThemeMode) => void
  isLight: ComputedRef<boolean>
  isDark: ComputedRef<boolean>
  isSystem: ComputedRef<boolean>
  setLight: () => void
  setDark: () => void
  setSystem: () => void
}

// useAppTheme 是主題遙控器 (簡單使用)

/**
 * 通用主題使用 hook
 */
const createThemeComposable = (injectKey: string, errorMessage: string) => {
  return () => {
    const themeControls = inject<ThemeControls | null>(injectKey, null)

    if (!themeControls) {
      throw new Error(errorMessage)
    }

    return themeControls
  }
}

// 前台主題
export const useAppTheme = createThemeComposable('themeControls', 'useAppTheme() must be used within default layout')

// 後台主題
export const useBackstageTheme = createThemeComposable(
  'backstageThemeControls',
  'useBackstageTheme() must be used within backstage layout'
)
