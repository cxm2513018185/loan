import { login, logout, getInfo } from '@/api/article'
import { setToken, getToken } from '@/utils/token'

const state = {
  token: getToken(),
  roles: []
}
const getters = {
  token: state => state.token,   //token
  roles: state => state.roles,   //用户角色
}
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_ROLES(state, roles) {
    state.roles = roles
  }
}

const actions = {
  // 登录
  Login({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password })
        .then(response => {
          const { data } = response.data;
          commit('SET_TOKEN', data.token); //mutations
          setToken(data.token); //值保存到cookie
          // 存储用户名
          sessionStorage.setItem("username", account.trim());
          resolve(data.token)
        }).catch(error => {
          reject(error)
        })
    })
  },

  // 获取详情
  GetInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response.data;
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        commit('SET_ROLES', data.roles)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出
  Logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        sessionStorage.removeItem("username");
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
