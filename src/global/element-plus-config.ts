import { App } from 'vue'
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElOption,
  ElSelect,
  ElTabPane,
  ElTabs,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElIcon,
  ElAvatar,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElCol,
  ElRow,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElTag,
  ElPagination,
  ElImage,
  ElDialog,
  ElCard
} from 'element-plus/lib/components'
import {
  Fold,
  Expand,
  Monitor,
  ChatDotRound,
  Tools,
  Suitcase,
  ArrowDown
} from '@element-plus/icons'

import 'element-plus/dist/index.css'

const elComponents = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElOption,
  ElSelect,
  ElTabPane,
  ElTabs,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElAvatar,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElCol,
  ElRow,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElTag,
  ElImage,
  ElDialog,
  ElCard,
  ElIcon,
  Fold,
  Expand,
  Monitor,
  ChatDotRound,
  Tools,
  Suitcase,
  ArrowDown
]

export default function (app: App): void {
  for (const componentItem of elComponents) {
    app.component(componentItem.name, componentItem)
  }
}
