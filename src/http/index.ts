// service统一出口
import Request from './request'
// import { BASE_URL, TIME_OUT } from './request/config'

import localCache from '@/utils/cache'

const requestInstance = new Request({
  // baseURL: BASE_URL,
  // timeout: TIME_OUT,
  baseURL: '/mock',
  timeout: 5000,
  interceptors: {
    requestSuccessInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    requestErrorInterceptor: (err) => {
      return err
    },
    responseSuccessInterceptor: (res) => {
      return res
    },
    responseErrorInterceptor: (err) => {
      return err
    }
  }
})

export default requestInstance
