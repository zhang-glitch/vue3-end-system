export interface IAccount {
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}

export interface IUserInfoResult {
  name: string
  realname: string
  password: string
  cellphone: number
  departmentId: number
  roleId: number
}
