import { getPageListData } from '@/http/main/system/system'
import { IRootState } from '@/store/type'
import { Module } from 'vuex'
import { ISystemStateType } from './type'

const system: Module<ISystemStateType, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0
    }
  },
  getters: {
    getPageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    getPageListDataCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changeUsersList(state, usersList) {
      state.usersList = usersList
    },
    changeUsersCount(state, count) {
      state.usersCount = count
    },
    changeRoleList(state, roleList) {
      state.roleList = roleList
      state.roleCount = state.roleList.length
    },
    changeRoleCount(state, count) {
      state.roleCount = count
    },
    changeGoodsList(state, goodsList) {
      state.goodsList = goodsList
      state.goodsCount = state.goodsList.length
    },
    changeGoodsCount(state, count) {
      state.goodsCount = count
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const requestUrl = `/${payload.pageName}List.json`
      const list = await getPageListData(requestUrl, payload)
      const mutationName =
        payload.pageName.slice(0, 1).toUpperCase() + payload.pageName.slice(1)
      commit(
        `change${mutationName}List`,
        list.data.slice(0, payload.queryInfo.offset)
      )
      commit(`change${mutationName}Count`, list.data.length)
    }
  }
}

export default system
