import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration'

const lightTheme = {
  dark: false,
  colors: {
    primary: '#228796',
  },
}
const darkTheme = {
  dark: true,
  colors: {
    primary: '#bcbdff',
  },
}

export default defineVuetifyConfiguration({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },
  defaults: {
    VBtn: {
      color: 'primary',
      flat: true,
    },
  },
})
