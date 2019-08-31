import Vue from 'vue'
import Vuex from 'vuex'
import config from '../config'
import axios from 'axios';

Vue.use(Vuex)

const state = {
  /**====== getClasses() :
   * students: [{
   *  ->
   *  ===>updates: [{
   *    }]
   * }],
   * classes: [{
   *  id: 1,
   *  classe_name: 'ex class name'
   * }]
   */
  students: [],
  classes: [{
    id: 'time',
    name: 'fake',
    studentsBelt: [{
      numero: 1,
      name: 'name 1',
      competences: {
        grammaire: [{
          date: '19 aout',
          message: 'test message laissé',
          status: 'success', // 'success' | 'fail' | 'practice'
          actualLevel: 1
        }, {
          date: '19 aout',
          message: '',
          status: 'success', // 'success' | 'fail' | 'practice'
          actualLevel: 2
        }, {
          date: '19 aout',
          message: '',
          status: 'success', // 'success' | 'fail' | 'practice'
          actualLevel: 3
        }, {
          date: '19 aout',
          message: '',
          status: 'success', // 'success' | 'fail' | 'practice'
          actualLevel: 4
        }, {
          date: '19 aout',
          message: '',
          status: 'success', // 'success' | 'fail' | 'practice'
          actualLevel: 5
        }, {
          date: '19 aout',
          message: '',
          status: 'success', // 'success' | 'fail' | 'practice'
          actualLevel: 6
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

  // Globals paramètres :
  // =================
  overlayLoader: false,
  notifyInfo: {
    status: null,
    show: false,
    message: null
  }
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
    // Cette fonction devrait être appelée par son action pour vérification.
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
  },
  // notifications infos (snakbar)
  showInfo(state, {
    message,
    status = null
  }) {
    state.notifyInfo = {
      show: true,
      message,
      status
    }
  },
  hideInfo(state, data = null) {
    state.notifyInfo = {
      show: false,
      message: null,
      status: null,
    }
  },

  // SET DATAS
  // =================
  setInitialClasses(state, classes) {
    state.classes = classes;
    console.log(classes);
  },

  setStudentsUpdates(state, students) {
    state.students = students;
    console.log(students);
  }
}

const actions = {
  updateCompetence(context, {
    competenceUpdates,
    competenceName,
    status,
    message = ''
  }) {
    if (!status || !competenceUpdates || !competenceName) return console.error('il faut un status/competenceUpdates/competenceName dans {} pour update une competence');
    let maxLevel = config.competences[competenceName].length - 1; // - 1 car la première valeur est empty pour l'icone "start"
    let lastUpdate = competenceUpdates[competenceUpdates.length - 1] || {};
    let actualLevel = lastUpdate.actualLevel || 0;
    if (actualLevel === maxLevel)
      context.commit("showInfo", {
        message: "Le Niveau de compétence est déjà au maximum",
        status: 'warning'
      })
    else context.commit("updateCompetence", {
      competenceUpdates,
      status,
      message
    });

  },

  // GET DATAS
  // =================
  async getClasses(context) {
    let origin = window.location.origin;
    let classes = await axios.get(origin + '/api/classes');
    context.commit('setInitialClasses', classes.data);
  },

  async getClasseStudentsUpdates(context, id) {
    let origin = window.location.origin;
    let students = await axios.get(`${origin}/api/classes/${id}`);
    context.commit('setStudentsUpdates', students.data);
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})