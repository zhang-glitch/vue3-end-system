import { ILoadingInstance } from 'element-plus/lib/components/loading'
import axios, { AxiosInstance } from 'axios'
import { IRequestConfig } from './type'
import { ElLoading } from 'element-plus/lib/components'

const DEFAULT_LOADING = true

class Request {
  public instance: AxiosInstance
  public showLoading: boolean
  public loadingInstance?: ILoadingInstance

  constructor(config: IRequestConfig) {
    // 默认不加载loading
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.instance = axios.create(config)
    // 先创建实例请求拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessInterceptor,
      config.interceptors?.requestErrorInterceptor
    )
    // 先创建实例请求拦截器
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessInterceptor,
      config.interceptors?.responseErrorInterceptor
    )
    // 创建全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('全局请求成功创建的拦截器')
        if (this.showLoading) {
          // 添加加载loading
          this.loadingInstance = ElLoading.service({
            text: '正在加载，请稍等...',
            background: 'rgba(0, 0, 0, .1)',
            lock: true
          })
        }
        return config
      },
      (err) => {
        // console.log('全局请求失败创建的拦截器')
        this.loadingInstance?.close()
        return err
      }
    )
    // 创建全局响应拦截器
    this.instance.interceptors.response.use(
      (config) => {
        // console.log('全局响应成功创建的拦截器')
        this.loadingInstance?.close()
        return config
      },
      (err) => {
        // console.log('全局响应失败创建的拦截器')
        this.loadingInstance?.close()
        return err
      }
    )
  }

  // 传入的泛型是约束返回值
  request<T>(config: IRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 定制该请求是否加loading。当为传入该参数时，默认为true
      if (config.showLoading === false) {
        this.showLoading = false
      }
      // 创建单个请求的请求拦截器
      if (config.interceptors?.requestSuccessInterceptor) {
        // 直接调用，然后将处理后的config返回
        config = config.interceptors.requestSuccessInterceptor(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          this.showLoading = DEFAULT_LOADING
          // 调用传入的响应拦截器
          if (config.interceptors?.responseSuccessInterceptor) {
            res = config.interceptors.responseSuccessInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: IRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default Request
