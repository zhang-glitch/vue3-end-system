// 定义需要展示哪些数据
const propList = [
  {
    prop: 'name',
    label: '姓名',
    slotName: 'name'
  },
  {
    prop: 'realname',
    label: '真实姓名',
    slotName: 'realname'
  },
  {
    prop: 'cellphone',
    label: '手机号',
    slotName: 'cellphone'
  },
  {
    prop: 'status',
    label: '状态',
    slotName: 'status'
  },
  {
    prop: 'createAt',
    label: '创建时间',
    slotName: 'createAt'
  },
  {
    prop: 'updateAt',
    label: '更新时间',
    slotName: 'updateAt'
  },
  // 操作列
  {
    label: '操作',
    slotName: 'operateColumn',
    width: '150'
  }
]

const containTableConfig = {
  listTitle: '用户列表',
  propList,
  isNumberColumn: true,
  isSelectColumn: true
}

export default containTableConfig
