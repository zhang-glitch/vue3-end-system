import { createApp } from 'vue'
import App from './App.vue'
import store, { setupStore } from './store'
import router from './router'
import globalConfig from './global'
// import Request from './http/request'
// import { BASE_URL, TIME_OUT } from './http/request/config'

const app = createApp(App)
globalConfig(app)
app.use(store)
setupStore()
app.use(router)
app.mount('#app')
