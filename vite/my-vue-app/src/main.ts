import { createApp } from 'vue'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import quasarIconSet from 'quasar/icon-set/material-icons-sharp'

// Import icon libraries
// ..required because of selected iconSet:
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'

// Import Quasar css
import 'quasar/dist/quasar.css'
import { createPinia } from 'pinia'

import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)
app.use(Quasar, {
  plugins: {}, 
  iconSet: quasarIconSet,
})
app.use(pinia)
app.mount('#app')