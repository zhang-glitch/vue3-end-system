import { App } from 'vue'
import elementPlusConfig from './element-plus-config'
import 'element-plus/theme-chalk/base.css'

export default function registerAppConfig(app: App): void {
  elementPlusConfig(app)
}
