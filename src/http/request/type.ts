import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface IRequestInterceptors<T = AxiosResponse> {
  requestSuccessInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestErrorInterceptor?: (err: any) => any
  responseSuccessInterceptor?: (res: T) => T
  responseErrorInterceptor?: (err: any) => any
}

export interface IRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // 每个request实例可以不传入拦截器
  interceptors?: IRequestInterceptors<T>
  showLoading?: boolean
}
