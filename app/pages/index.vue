<script setup lang="ts">
const themeControls = useAppTheme()

const title = '首頁'
</script>

<template>
  <div class="index">
    <Title>{{ title }} |</Title>
    <h1>Index</h1>
    <VRadioGroup
      :model-value="themeControls.themeMode.value"
      inline
      hide-details
      @update:model-value="
        (value) => {
          if (value !== null) {
            themeControls.handleThemeModeChange(value)
          }
        }
      "
    >
      <VRadio value="light" label="淺色模式" color="primary" />
      <VRadio value="dark" label="深色模式" color="primary" />
      <VRadio value="system" label="跟隨系統" color="primary" />
    </VRadioGroup>
    <button class="theme-btn">測試按鈕</button>
  </div>
</template>

<style lang="scss" scoped>
.index {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

h1 {
  font-size: 3rem;
  color: var(--theme-primary);
  transition: color 0.2s ease;
}

// 使用 theme-colors mixin 的範例
.theme-btn {
  @include theme-colors; // 套用主題顏色
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
}
</style>
