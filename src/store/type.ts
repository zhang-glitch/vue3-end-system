import { ILoginStateType } from './login/type'
import { ISystemStateType } from './main/system/type'
import { ISystemStateType } from './main/system/type'
import { IProductStateType } from './main/product/type'

export interface IRootState {
  roleList: any[]
  departmentList: any[]
}

export interface IModuleState {
  login: ILoginStateType
  system: ISystemStateType
  product: IProductStateType
}

export type IStoreType = IRootState & IModuleState
