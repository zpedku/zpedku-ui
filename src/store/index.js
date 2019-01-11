import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

import app from './modules/app'
import user from './modules/user'
import tab from './modules/tab'

const store = new vuex.Store({
  modules: {
    app,
    user,
    tab
  }
})


export default store
