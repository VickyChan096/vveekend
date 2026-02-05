import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

const vveekendTheme = {
  dark: false,
  colors: {
    primary: '#4eacba',
  },
}

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: 'vveekendTheme',
    themes: {
      vveekendTheme,
    },
  },
  defaults: {
    VBtn: {
      color: 'primary',
      size: 'small',
    },
  },
})
