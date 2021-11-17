import localCache from '@/utils/cache'
import { IRootState } from './../type'
import { Module } from 'vuex'
import { ILoginStateType } from './type'
import {
  requestLogin,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/http/login/login'
import { IAccount } from '@/http/login/type'
import MapRoute from '@/utils/map-route'
import router from '../../router'

const login: Module<ILoginStateType, IRootState> = {
  namespaced: true,
  state() {
    return {
      // 这样赋值会引起后面添加动态路由的错误
      // token: localCache.getCache('token') ?? '',
      // userInfo: localCache.getCache('userInfo') ?? '',
      // userMenus: localCache.getCache('userMenus') ?? ''
      token: '',
      userInfo: '',
      userMenus: ''
    }
  },
  mutations: {
    changeToken(state, token) {
      state.token = token
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus) {
      state.userMenus = userMenus
      // 动态加载路由
      const routes = MapRoute(userMenus)
      for (const route of routes) {
        router.addRoute('main', route)
      }
    }
  },
  actions: {
    // 处理login请求
    async accountLoginAction({ commit }, payload: IAccount) {
      const result = await requestLogin(payload)
      localCache.setCache('token', result.data.token)
      commit('changeToken', result.data.token)
      // 获取用户详情
      const userInfo = await requestUserInfoById(result.data.id)
      localCache.setCache('userInfo', userInfo.data)
      commit('changeUserInfo', userInfo.data)
      // 获取用户菜单
      const userMenus = await requestUserMenusByRoleId(result.data.id)

      localCache.setCache('userMenus', userMenus.data)
      commit('changeUserMenus', userMenus.data)
      // 4.跳到首页
      router.push('/main')
    },
    // 初始化state
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  },
  modules: {}
}

export default login
