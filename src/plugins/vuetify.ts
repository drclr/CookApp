/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify, ThemeDefinition } from 'vuetify'
//import colors from 'vuetify/lib/util/colors'

const ThemeApp: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#263238',
    surface: '#FFFFFF',
    error: '#D32F2F',
  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'ThemeApp',
    themes: {
      ThemeApp,
    }
    /*
    themes: {
      /*
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      }, 
      dark: {
        colors: {
          primary: '#34495E'
        }
      }
  },
  */
  },
})
