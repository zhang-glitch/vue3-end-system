// 定义需要展示哪些数据
const propList = [
  {
    prop: 'name',
    label: '角色',
    slotName: 'name'
  },
  {
    prop: 'intro',
    label: '具有的权限',
    slotName: 'intro'
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
  listTitle: '角色列表',
  propList,
  isNumberColumn: true,
  isSelectColumn: true
}

export default containTableConfig
