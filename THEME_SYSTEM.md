# 全局主題系統使用指南

## 🎨 架構概覽

這個主題系統採用了分層設計，實現了關注點分離：

1. **[preprocess.scss](assets/scss/preprocess.scss)** - 定義所有主題變數和 CSS Custom Properties
2. **[layouts/default.vue](layouts/default.vue)** - 全局主題控制邏輯
3. **[composables/useAppTheme.ts](composables/useAppTheme.ts)** - 提供便利的主題控制方法
4. **各個頁面/組件** - 直接使用 CSS 變數，無需關心主題切換邏輯

## 🚀 使用方式

### 1. 在組件中使用

```vue
<script setup>
// 使用 composable 獲取主題控制
const { isDark, currentTheme, toggleManualTheme } = useAppTheme()
</script>

<template>
  <div>
    <p>當前是{{ isDark ? '暗色' : '亮色' }}模式</p>
    <button @click="toggleManualTheme">切換主題</button>
  </div>
</template>

<style lang="scss" scoped>
/* 使用全局主題變數 */
.my-element {
  color: var(--theme-text);
  background-color: var(--theme-surface);
  border: 1px solid var(--theme-primary);
}
</style>
```

### 2. 可用的 CSS 變數

```scss
// 在任何 SCSS 文件中使用
.my-component {
  color: var(--theme-text); // 主要文字色
  background: var(--theme-background); // 背景色
  border: var(--theme-primary); // 主色調
  box-shadow: var(--theme-surface); // 表面色
  accent: var(--theme-secondary); // 次要色
}
```

### 3. Composable API

```typescript
const {
  // 狀態
  autoFollowBrowser, // 是否自動跟隨瀏覽器
  manualTheme, // 手動選擇的主題
  currentTheme, // 當前主題
  isDark, // 是否暗色模式
  isLight, // 是否亮色模式

  // 方法
  toggleAutoFollow, // 切換自動跟隨
  toggleManualTheme, // 切換手動主題
  enableDarkMode, // 啟用暗色模式
  enableLightMode, // 啟用亮色模式
} = useAppTheme()
```

## ⚙️ 系統特色

### ✅ 優點

- **關注點分離**: 主題邏輯集中在 layout，組件只關心樣式
- **零配置使用**: 組件直接使用 CSS 變數，無需額外設定
- **TypeScript 支援**: 完整的型別檢查和智能提示
- **自動持久化**: 設定自動儲存到 localStorage
- **響應式系統偏好**: 自動跟隨系統深淺模式設定
- **平滑動畫**: 內建 0.2s 的顏色過渡動畫

### 🔄 主題切換流程

1. Layout 監聽系統偏好變化或用戶手動操作
2. 更新 Vuetify 主題狀態
3. 同時更新 `data-theme` 屬性觸發 CSS 變數切換
4. 所有使用 `var(--theme-*)` 的元素自動更新

## 🎯 最佳實踐

1. **統一使用 CSS 變數**: 避免混用 SCSS 變數和 CSS 變數
2. **在 Layout 控制主題**: 不要在個別組件中直接操作主題
3. **使用 Composable**: 通過 `useAppTheme()` 獲取主題狀態和控制方法
4. **添加過渡動畫**: `transition: color 0.2s ease` 讓切換更流暢

## 🔧 擴展主題

如果需要添加新的主題色彩：

```scss
// 在 preprocess.scss 中添加
$custom-light: #your-color;
$custom-dark: #your-dark-color;

:root {
  --theme-custom: #{$custom-light};
}

[data-theme='dark'] {
  --theme-custom: #{$custom-dark};
}
```

然後在組件中使用：

```scss
.my-element {
  color: var(--theme-custom);
}
```

## 📁 檔案結構

```
app/
├── assets/scss/preprocess.scss    # 主題變數定義
├── layouts/default.vue           # 全局主題控制
├── composables/useAppTheme.ts    # 主題控制 API
├── pages/theme-example.vue       # 使用範例
└── app.vue                       # 首頁範例
```
