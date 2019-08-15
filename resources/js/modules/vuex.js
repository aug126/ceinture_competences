import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  classes: [],
  overlayLoader: false
}

const mutations = {
  // classes
  addClasse(state, newClasse) {
    state.classes.push(newClasse);
  },
  // loader
  startLoader(state) {
    console.log('start loader');
    state.overlayLoader = true;
  },
  stopLoader(state) {
    console.log('stop loader');
    state.overlayLoader = false;
  }
}

export default new Vuex.Store({
  state,
  mutations
})