// aqui pode ser tratado diversos recursos, como no e-comerce: guardar o carrinho do cliente

// no caso, aqui é salvo apenas o login do user

import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default createStore({
  state() { // dados que serão manipulados ao usar a pagina
  
    return {
      authenticated: false,
      token: null,
      userId: null
    }

  },
  getters: {

    authenticated: state => state.authenticated,
    token: state => state.token,
    userId: state => state.userId

  },
  mutations: {

    authenticated(state, data) {
      state.authenticated = true
      state.token = data.token
      state.userId = data.userId
    },
    logout(state){
      state.authenticated = false
      state.token = null
      state.userId = null
    }

  },
  plugins: [vuexLocal.plugin]
})
