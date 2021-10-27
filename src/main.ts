import { createApp } from 'vue'
import App from './App.vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import router from './router'
import store from './store'
import globalConfig from '../global'

const app = createApp(App)

app.use(store)

app.use(router)

globalConfig(app)
// app.use(ElementPlus)
app.mount('#app')
