<script lang="ts" setup>
const router = useRouter()
const backstageThemeManager = useThemeManager('backstageThemeMode', 'backstageThemeControls')

const logout = () => {
  router.push('/')
}
onMounted(() => {
  backstageThemeManager.initialize()
})

onUnmounted(() => {
  backstageThemeManager.cleanup()
})

// 提供給後台頁面
provide('backstageThemeControls', backstageThemeManager.createProvideData())
</script>

<template>
  <div :data-theme="backstageThemeManager.currentTheme.value">
    <header>
      <VRadioGroup
        :model-value="backstageThemeManager.themeMode.value"
        inline
        hide-details
        @update:model-value="
          (value) => {
            if (value) backstageThemeManager.createProvideData().handleThemeModeChange(value)
          }
        "
      >
        <VRadio value="light" label="淺色模式" color="primary" />
        <VRadio value="dark" label="深色模式" color="primary" />
        <VRadio value="system" label="跟隨系統" color="primary" />
      </VRadioGroup>
      <VBtn @click="logout">登出</VBtn>
    </header>
    <div class="backstage">
      <aside>側邊欄</aside>
      <NuxtPage />
    </div>
  </div>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  border-bottom: 1px solid var(--theme-primary);
}
.backstage {
  display: grid;
  grid-template-columns: auto 1fr;
  height: calc(100vh - 25px);

  aside {
    border-right: 1px solid var(--theme-primary);
  }
}
</style>
