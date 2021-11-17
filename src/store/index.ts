import { getPageListData } from '@/http/main/system/system'
import { createStore, Store, useStore as useVuexStore } from 'vuex'
import login from './login/login'
import { IRootState, IStoreType } from './type'
import system from './main/system/system'
import product from './main/product/product'

const store = createStore<IRootState>({
  state() {
    return {
      roleList: [],
      departmentList: []
    }
  },
  mutations: {
    // 改变roleList,和departmentList
    changeRoleList(state, list) {
      state.roleList = list
      state.departmentList = list
    }
  },
  actions: {
    accountLoginAction({ commit }, payload: any) {
      console.log('调用父类的action', payload)
    },
    // 获取部门列表和角色列表
    async getRoleListAction({ commit }, payload: any) {
      const roleListResult = await getPageListData('/roleList.json', payload)
      commit('changeRoleList', roleListResult.data)
    }
  },
  modules: {
    login,
    system,
    product
  }
})

// 初始化state.login
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getRoleListAction')
}

// 导出我们自己的useStore，以便以后做类型约束
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
