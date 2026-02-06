/**
 * 通用主題管理器
 * @param storageKey localStorage 的鍵名
 * @param provideKey provide/inject 的鍵名
 */
export const useThemeManager = (storageKey: string, _provideKey: string) => {
  const theme = useTheme()

  type ThemeMode = 'light' | 'dark' | 'system'
  const themeMode = ref<ThemeMode>('system')

  const currentTheme = computed(() => theme.global.name.value)

  let mediaQuery: MediaQueryList | null = null
  let handleThemeChange: ((e: MediaQueryListEvent) => void) | null = null

  // 偵測系統主題偏好
  const detectSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  }

  // 載入設定
  const loadSettings = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey) as ThemeMode
      themeMode.value = saved || 'system'
    }
  }

  // 儲存設定
  const saveSettings = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, themeMode.value)
    }
  }

  // 設定監聽器
  const setupThemeListener = () => {
    if (typeof window !== 'undefined' && !mediaQuery) {
      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      handleThemeChange = (e: MediaQueryListEvent) => {
        if (themeMode.value === 'system') {
          theme.change(e.matches ? 'dark' : 'light')
        }
      }
      mediaQuery.addEventListener('change', handleThemeChange)
    }
  }

  // 移除監聽器
  const removeThemeListener = () => {
    if (mediaQuery && handleThemeChange) {
      mediaQuery.removeEventListener('change', handleThemeChange)
    }
  }

  // 更新主題
  const updateTheme = () => {
    switch (themeMode.value) {
      case 'light':
        theme.change('light')
        break
      case 'dark':
        theme.change('dark')
        break
      case 'system':
        theme.change(detectSystemTheme())
        break
    }
  }

  // 改變主題模式
  const handleThemeModeChange = (newMode: ThemeMode) => {
    themeMode.value = newMode
    saveSettings()
    updateTheme()
  }

  // 初始化
  const initialize = () => {
    loadSettings()
    setupThemeListener()
    updateTheme()
  }

  // 清理
  const cleanup = () => {
    removeThemeListener()
  }

  // 監聽變化
  watch(themeMode, updateTheme)

  // 創建 provide 數據
  const createProvideData = () => ({
    themeMode,
    currentTheme,
    handleThemeModeChange,
    isLight: computed(() => currentTheme.value === 'light'),
    isDark: computed(() => currentTheme.value === 'dark'),
    isSystem: computed(() => themeMode.value === 'system'),
    setLight: () => handleThemeModeChange('light'),
    setDark: () => handleThemeModeChange('dark'),
    setSystem: () => handleThemeModeChange('system'),
  })

  return {
    themeMode,
    currentTheme,
    initialize,
    cleanup,
    createProvideData,
  }
}
