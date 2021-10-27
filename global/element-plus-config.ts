import { App } from 'vue'
import { ElAffix, ElButton } from 'element-plus'
import 'element-plus/dist/index.css'

const elComponents = [ElButton, ElAffix]

export default function (app: App): void {
  for (const componentItem of elComponents) {
    app.component(componentItem.name, componentItem)
  }
}
