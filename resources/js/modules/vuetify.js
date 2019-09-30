import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

import colors from 'vuetify/lib/util/colors'


Vue.use(Vuetify)

const theme = {
  dark: false,
  themes: {
    light: {
      primary: colors.cyan,
      secondary: colors.blueGrey.darken3,
      accent: '#5b76a2',
      error: '#FF5252',
      info: '#7a067b', //'#ed4900', //'#ed4900', //colors.indigo,
      success: '#4CAF50',
      warning: '#ed4900',
    },
    dark: {
      // primary: '#1976D2',
      // secondary: '#424242',
      // accent: '#5b76a2',
      // error: '#FF5252',
      // info: '#2196F3',
      // success: '#4CAF50',
      // warning: '#FFC107',
    }
  }
}

export default new Vuetify({
  icons: {
    iconfont: 'mdi' // 'mdiSvg', 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
  },
  theme
})