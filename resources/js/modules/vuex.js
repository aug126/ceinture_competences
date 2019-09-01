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
  classes: [],
  // classes: [{
  //   id: 'time',
  //   name: 'fake',
  //   studentsBelt: [{
  //     numero: 1,
  //     name: 'name 1',
  //     competences: {
  //       grammaire: [{
  //         date: '19 aout',
  //         message: 'test message laissé',
  //         status: 'success', // 'success' | 'fail' | 'practice'
  //         actualLevel: 1
  //       }, {
  //         date: '19 aout',
  //         message: '',
  //         status: 'success', // 'success' | 'fail' | 'practice'
  //         actualLevel: 2
  //       }, {
  //         date: '19 aout',
  //         message: '',
  //         status: 'success', // 'success' | 'fail' | 'practice'
  //         actualLevel: 3
  //       }, {
  //         date: '19 aout',
  //         message: '',
  //         status: 'success', // 'success' | 'fail' | 'practice'
  //         actualLevel: 4
  //       }, {
  //         date: '19 aout',
  //         message: '',
  //         status: 'success', // 'success' | 'fail' | 'practice'
  //         actualLevel: 5
  //       }, {
  //         date: '19 aout',
  //         message: '',
  //         status: 'success', // 'success' | 'fail' | 'practice'
  //         actualLevel: 6
  //       }],
  //       conjugaison: [],
  //       orthographe: [],
  //       numération: [],
  //       calculsEcrits: [],
  //       mesures: [],
  //       géométrie: []
  //     }
  //   }, {
  //     numero: 2,
  //     name: 'name 2',
  //     competences: {
  //       grammaire: [],
  //       conjugaison: [],
  //       orthographe: [],
  //       numération: [],
  //       calculsEcrits: [],
  //       mesures: [],
  //       géométrie: []
  //     }
  //   }]
  // }],

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
  setClasses(state, classes) {
    state.classes = help.arrayToObjId(classes);
    console.log('classes : ', state.classes);
  },

  setProgramsSkills(state, programsObj) {
    for (let program of programsObj.programs) {
      for (let skill of program.skills) {
        skill.colors = help.arrayToObjId(skill.colors);
      }
      program.skills = help.arrayToObjId(program.skills);
    }
    let classe = state.classes[programsObj.classeId];
    classe.programs = help.arrayToObjId(programsObj.programs);
    state.classes[programsObj.classeId] = {...classe};
    console.log('programsSkills : ', state.classes);
  },

  setStudentsUpdates(state, studentsObj) {
    for (let student of studentsObj.students) {
      student.updates = help.arrayToObjId(student.updates);
    }
    let students = help.arrayToObjId(studentsObj.students);
    let classeId = studentsObj.classeId;
    let classe = state.classes[classeId];
    classe.students = students;
    state.classes[classeId] = {...classe};
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
    context.commit('setClasses', classes.data);
  },

  async getStudentsUpdates(context, classeId) {
    if (context.state.classes[classeId] === undefined) return;
    let origin = window.location.origin;
    let students = await axios.get(`${origin}/api/classes/${classeId}`);
    context.commit('setStudentsUpdates', {classeId, students: students.data});
  },

  async getProgramsSkills(context, classeId) {
    if (context.state.classes[classeId] === undefined) return;
    let origin = window.location.origin;
    let programs = await axios.get(origin + `/api/programs/${classeId}`);
    context.commit('setProgramsSkills', {classeId, programs: programs.data});
  },

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})


let help = {
  arrayToObjId(arrayOfObjects) {
    return arrayOfObjects.reduce(
      (obj, item) => {
        obj[item.id] = item;
        return obj;
      }, {}
    );
  }
}