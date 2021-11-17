import { PageContainTable } from '@/components/PageContainTable'
import { ref } from 'vue'
export default function pageQueryRequest() {
  const pageContainTableRef = ref<InstanceType<typeof PageContainTable>>()
  // 因为网络请求在page-contain-table中，所以需要获取到该组件对象，然后调用方法。
  const handleClear = () => {
    // 刷新后，重新请求
    pageContainTableRef.value?.getListData()
  }
  const handleSearch = (queryInfo: any) => {
    // 点击查询后，重新请求
    pageContainTableRef.value?.getListData(queryInfo)
  }
  return {
    pageContainTableRef,
    handleClear,
    handleSearch
  }
}
