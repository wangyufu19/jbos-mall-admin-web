import { login, logout, getInfo, getUserFunc } from '@/api/auth'
import { getToken, setToken, removeToken,setUserId,removeUserId } from '@/utils/auth'
import { resetRouter } from '@/router'

const TokenKey = 'mall_admin_web_token'
const UserIdKey = 'mall_admin_web_userid'

const getDefaultState = () => {
  return {
    accessToken: getToken(),
    user: {},
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, accessToken) => {
    state.accessToken = accessToken
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        const res = response.data
        commit('SET_TOKEN', res.data.accessToken)
        setToken(res.data.accessToken)
        setUserId(res.data.username)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.accessToken).then(response => {
        const res= response.data
        if (!res) {
          reject('Verification failed, please Login again.')
        }
        commit('SET_USER', res.data)
        // commit('SET_AVATAR', avatar)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user menu
  getUserFunc({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserFunc(state.accessToken).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.accessToken).then(response => {
        removeToken() // must remove  token  first
        removeUserId();
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

