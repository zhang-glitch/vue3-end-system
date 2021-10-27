import { App } from 'vue'
import { ElButton, ElAffix } from 'element-plus/lib/components'
import 'element-plus/dist/index.css'

const elComponents = [ElButton, ElAffix]

export default function (app: App): void {
  for (const componentItem of elComponents) {
    app.component(componentItem.name, componentItem)
  }
}
