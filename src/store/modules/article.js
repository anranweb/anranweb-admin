import { articleColumn } from '@/api/article'

const state = {
  articleType: '' // 文章类型
}

const mutations = {
  SET_ARTICLETYPE: (state, val) => {
    state.articleType = val
  }
}

const actions = {

  getArticleType({ commit }) {
    return new Promise((resolve, reject) => {
      if (state.articleType === '') {
        articleColumn().then(response => {
          commit('SET_ARTICLETYPE', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve(state.articleType)
      }
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
