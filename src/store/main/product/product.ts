import { IRootState } from './../../type'
import { Module } from 'vuex'
import { IProductStateType } from './type'
import {
  getCategoryCount,
  getCategoryFavor,
  getCategorySale,
  getCategoryMap
} from '../../../http/main/product/category'

const product: Module<IProductStateType, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryCountList: [],
      categorySaleList: [],
      categoryFavorList: [],
      categoryMapList: []
    }
  },
  mutations: {
    changeCategoryCountList(state, list) {
      state.categoryCountList = list
    },
    changeCategorySaleList(state, list) {
      state.categorySaleList = list
    },
    changeCategoryFavorList(state, list) {
      state.categoryFavorList = list
    },
    changeCategoryMapList(state, list) {
      state.categoryMapList = list
    }
  },
  actions: {
    async getCategoryCountListAction({ commit }) {
      const categoryCountResult = await getCategoryCount()
      commit('changeCategoryCountList', categoryCountResult.data)
    },
    async getCategorySaleListAction({ commit }) {
      const categorySaleResult = await getCategorySale()
      commit('changeCategorySaleList', categorySaleResult.data)
    },
    async getCategoryFavorListAction({ commit }) {
      const categoryFavorResult = await getCategoryFavor()
      commit('changeCategoryFavorList', categoryFavorResult.data)
    },
    async getCategoryMapListAction({ commit }) {
      const categoryMapResult = await getCategoryMap()
      commit('changeCategoryMapList', categoryMapResult.data)
    }
  }
}

export default product
