import { IForm, IFormItem } from '@/base-ui/Form/src/type'
const formItemOptions: IFormItem[] = [
  {
    field: 'name',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名'
  },
  {
    field: 'realname',
    label: '真实姓名',
    type: 'input',
    placeholder: '请输入真实姓名'
  },
  {
    field: 'password',
    label: '密码',
    type: 'password',
    placeholder: '请输入密码',
    isHidden: false
  },
  {
    field: 'cellphone',
    label: '电话号码',
    type: 'input',
    placeholder: '请输入电话号码',
    isHidden: false
  },
  {
    field: 'role',
    label: '选择角色',
    type: 'select',
    placeholder: '请选择角色',
    isHidden: false
  },
  {
    field: 'department',
    label: '选择部门',
    type: 'select',
    placeholder: '请选择部门',
    isHidden: false
  }
]

const modalDialogConfig: IForm = {
  formItems: formItemOptions,
  labelWidth: '120px',
  colLayout: {
    xl: 24, // >1920px 4个
    lg: 24,
    md: 24,
    sm: 24,
    xs: 24
  },
  itemStyle: { padding: '0 30px 0 0' }
}

export default modalDialogConfig
