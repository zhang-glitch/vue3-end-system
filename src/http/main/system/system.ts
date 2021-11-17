import { IDataType } from '@/http/type'
import requestInstance from '@/http'

export function getPageListData(url: string, queryInfo: any) {
  return requestInstance.get<IDataType>({
    url
  })
}
