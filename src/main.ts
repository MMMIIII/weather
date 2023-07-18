import { createApp } from 'vue'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import quasarIconSet from 'quasar/icon-set/material-icons-sharp'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import 'quasar/dist/quasar.css'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import messages from './i18n/messages.ts'

const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'en-us',
  messages: messages,
  datetimeFormats: {
    ru: {
      day: {
        day: "numeric",
      },
      weekday: {
        weekday: "short",
      },
      time: {
        hour: "numeric",
        minute: "numeric",
      },
    },
    'en-us': {
      day: {
        day: "numeric",
      },
      weekday: {
        weekday: "short",
      },
      time: {
        hour: "numeric",
        minute: "numeric",
      },
    }
  },
  legacy: false 
})

const pinia = createPinia()
const app = createApp(App)



app.use(i18n)

app.use(Quasar, {
  plugins: {}, 
  iconSet: quasarIconSet,
})

app.use(pinia)
app.mount('#app')