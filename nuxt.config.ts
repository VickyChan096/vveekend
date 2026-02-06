// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    host: '127.0.0.1',
    port: 9999,
  },
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/vveekend/' : '/',
    rootTag: 'main',
    rootId: 'vveekend',
    head: {
      htmlAttrs: {
        lang: 'zh-TW',
      },
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'description', content: '週遊記' },
        { property: 'og:site_name', content: '週遊記' },
        { property: 'og:title', content: '週遊記' },
        { property: 'og:url', content: 'https://vickychan096.github.io/vveekend/' }, // 記得改正式機網址
        { property: 'og:description', content: '週遊記' },
        { property: 'og:image', content: '/cover.webp' }, // 記得改正式機網址
      ],
      titleTemplate: '%s 週遊記',
      link: [],
      script: [],
      noscript: [
        {
          innerHTML: `<p class="noscript-message">
        您的瀏覽器不支援 JavaScript 功能，若網頁功能無法正常運作，請開啟瀏覽器 JavaScript 狀態。</p>`,
        },
      ],
    },
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
