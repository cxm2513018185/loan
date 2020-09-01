import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user'
import permission from './modules/permission'

const store = new Vuex.Store({
  modules: {  //多个模 块
    user,
    permission
  }
})

export default store