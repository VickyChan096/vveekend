<script setup lang="ts">
const themeManager = useThemeManager('themeMode', 'themeControls')

onMounted(() => {
  themeManager.initialize()
})

onUnmounted(() => {
  themeManager.cleanup()
})

// 提供給子組件
provide('themeControls', themeManager.createProvideData())

const router = useRouter()
const login = () => {
  router.push('/backstage')
}
</script>

<template>
  <div :data-theme="themeManager.currentTheme.value">
    <header>
      <VRadioGroup
        :model-value="themeManager.themeMode.value"
        inline
        hide-details
        @update:model-value="
          (value) => {
            if (value) themeManager.createProvideData().handleThemeModeChange(value)
          }
        "
      >
        <VRadio value="light" label="淺色模式" color="primary" />
        <VRadio value="dark" label="深色模式" color="primary" />
        <VRadio value="system" label="跟隨系統" color="primary" />
      </VRadioGroup>
      <VBtn @click="login">登入</VBtn>
    </header>
    <NuxtPage />
  </div>
</template>

<style lang="scss" scoped>
div[data-theme] {
  min-height: 100vh;
  color: var(--theme-text);
  background-color: var(--theme-background);
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  border-bottom: 1px solid var(--theme-primary);
}
</style>
