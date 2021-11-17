import { IDataType } from '@/http/type'
import requestInstance from '@/http'

enum DashboardAPI {
  categoryGoodsCount = '/categoryCount.json',
  categoryGoodsSale = '/categorySale.json',
  categoryGoodsFavor = '/categoryFavor.json',
  categoryGoodsMap = '/categoryMap.json'
}

export function getCategoryCount() {
  return requestInstance.get<IDataType>({
    url: DashboardAPI.categoryGoodsCount
  })
}
export function getCategorySale() {
  return requestInstance.get<IDataType>({
    url: DashboardAPI.categoryGoodsSale
  })
}
export function getCategoryFavor() {
  return requestInstance.get<IDataType>({
    url: DashboardAPI.categoryGoodsFavor
  })
}
export function getCategoryMap() {
  return requestInstance.get<IDataType>({
    url: DashboardAPI.categoryGoodsMap
  })
}
