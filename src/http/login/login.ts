import requestInstance from '..'
import { IDataType } from '../type'
import { IAccount, ILoginResult, IUserInfoResult } from './type'

// 定义login请求的路径
enum LoginAPI {
  AccountLogin = '/login.json',
  LoginUserInfo = '/users.json', // 用法: /users/1
  UserMenus = '/userMenu.json' // 用法: role/1/menu
}

// 请求登录接口
export function requestLogin(account: IAccount) {
  return requestInstance.get<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 用户详情
export function requestUserInfoById(id: number) {
  return requestInstance.get<IDataType<IUserInfoResult>>({
    url: LoginAPI.LoginUserInfo,
    showLoading: false
  })
}

export function requestUserMenusByRoleId(id: number) {
  return requestInstance.get<IDataType>({
    url: LoginAPI.UserMenus,
    showLoading: false
  })
}
