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
</style>
