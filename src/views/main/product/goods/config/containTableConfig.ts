// 定义需要展示哪些数据
const propList = [
  { prop: 'name', label: '商品名称', minWidth: '80' },
  { prop: 'oldPrice', label: '原价格', minWidth: '80', slotName: 'oldPrice' },
  { prop: 'newPrice', label: '现价格', minWidth: '80', slotName: 'newPrice' },
  { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
  { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
  {
    prop: 'createAt',
    label: '创建时间',
    minWidth: '250',
    slotName: 'createAt'
  },
  {
    prop: 'updateAt',
    label: '更新时间',
    minWidth: '250',
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
  listTitle: '商品列表',
  propList,
  isNumberColumn: true,
  isSelectColumn: true
}

export default containTableConfig
