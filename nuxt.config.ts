// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    host: '127.0.0.1',
    port: 9999,
  },
  app: {
    // 如果不是開發環境 (即生產環境)，就使用 /vveekend/
    baseURL: process.env.NODE_ENV === 'production' ? '/vveekend/' : '/',
  },
  css: ['@/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/preprocess.scss" as *;',
        },
      },
    },
  },
  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    'vuetify-nuxt-module',
  ],
  vuetify: {
    moduleOptions: {},
    vuetifyOptions: './vuetify.config.ts',
  },
})
