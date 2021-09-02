import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    provinceName: "hubei",
    provincePath: "/static/map/json/province/hubei.json",
  },
  mutations: {
    updatename(state, Name) {
      state.provinceName = Name;
    },
    updatepath(state, Path) {
      state.provincePath = Path;
    }
  },
  actions: {
  },
  modules: {
  }
})
