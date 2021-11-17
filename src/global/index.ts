import { App } from 'vue'
import elementPlusConfig from './element-plus-config'

export default function registerAppConfig(app: App): void {
  elementPlusConfig(app)
}
