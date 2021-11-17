type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  // 来获取对应表单项的数据
  field: string
  // formitem的选项
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
  // 是否显示该表单项
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout: any
  itemStyle: any
}
