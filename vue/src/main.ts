import { createApp } from 'vue'
import moment from 'moment'
import App from './App.vue'
import router from './router'
import { store } from './store'

const app = createApp(App as any).use(store).use(router)

app.config.globalProperties.$filters = {
  formatTime (value: string) {
    return moment.utc(value).format('YYYY-MM-DD HH:mm:ss')
  }
}

app.mount('#app')
