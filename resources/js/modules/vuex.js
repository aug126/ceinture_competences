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
        grammaire: [{
          date: '',
          message: '',
          status: 'success', // 'success' | 'fail' | 'practice'
          actualLevel: 1
        }],
        conjugaison: [],
        orthographe: [],
        numération: [],
        calculsEcrits: [],
        mesures: [],
        géométrie: []
      }
    }, {
      numero: 2,
      name: 'name 2',
      competences: {
        grammaire: [],
        conjugaison: [],
        orthographe: [],
        numération: [],
        calculsEcrits: [],
        mesures: [],
        géométrie: []
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
  updateCompetence(state, {
    competenceUpdates,
    status,
    message = ''
  }) {
    if (!status || !competenceUpdates) return console.error('il faut un status/competenceUpdates = {} pour update une competence');
    let date = new Date;
    const month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    date = `${date.getDate()} ${month[date.getMonth()]}`;
    let lastUpdate = competenceUpdates[competenceUpdates.length - 1] || {};
    let lastLevel = lastUpdate.actualLevel || 0;
    competenceUpdates.push({
      date,
      message,
      status, // 'success' | 'fail' | 'practice'
      actualLevel: status === 'success' ? ++lastLevel : lastLevel
    })
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