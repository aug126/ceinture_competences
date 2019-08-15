import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  classes: [{
    id: 'time',
    name: 'fake',
    studentsBelt: [{
      numero: 1,
      name: 'name 1',
      competences: {
        grammaire: 0,
        conjugaison: 0,
        orthographe: 0,
        numération: 0,
        calculsEcrits: 0,
        mesures: 0,
        géométrie: 0
      }
    }, {
      numero: 2,
      name: 'name 2',
      competences: {
        grammaire: 0,
        conjugaison: 0,
        orthographe: 0,
        numération: 0,
        calculsEcrits: 0,
        mesures: 0,
        géométrie: 0
      }
    }]
  }],
  overlayLoader: false
}

const getters = {
  currentClasse: (state, getters) => (id) => state.classes.find((classe) => classe.id == id),
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
  getters,
  mutations,
})