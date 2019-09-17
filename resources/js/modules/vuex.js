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
    // competenceUpdates,
    competenceObj,
    status,
    message = '',
    classeId,
    studentId
  }) {
    // Cette fonction devrait être appelée par son action pour vérification.
    let date = new Date;
    const month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    date = `${date.getDate()} ${month[date.getMonth()]}`;
    let competenceUpdates = competenceObj.updates;
    let lastUpdate = competenceUpdates[competenceUpdates.length - 1] || {};
    let lastLevel = lastUpdate.actual_level || 0;
    competenceUpdates.push({
      date,
      message,
      status, // 'success' | 'fail' | 'practice'
      actual_level: status === 'success' ? ++lastLevel : lastLevel
    })
    console.log('new updates = ', competenceUpdates);
    state.classes[classeId].students[studentId].skills[competenceObj.id].updates = competenceUpdates;
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
      student.skills = help.arrayToObjId(student.skills);
    }
    let students = help.arrayToObjId(studentsObj.students);
    let classeId = studentsObj.classeId;
    let classe = state.classes[classeId];
    classe.students = students;
    state.classes[classeId] = {...classe};
  }
}

const actions = {

  // students,
  // classe,
  // programs,
  // skills
  async storeClasse(context, data) {
    if (!data.classe_name) return console.error('il faut une classe dans {} pour créer une classe.');
    let origin = window.location.origin;
    let resp = await axios.post(`${origin}/storeClasseStudents`, data);
    context.commit('setClasses', [...Object.values(context.state.classes), resp.data]);
    return resp.data;
    // .then((resp) => {
    //   console.log(resp.data);
    //   // context.commit();
    // })
  },

  updateCompetence(context, {
    // competenceUpdates,
    competenceObj,
    status,
    message = '',
    classeId,
    studentId
  }) {
    if (!status || !competenceObj) return console.error('il faut un status/competenceObj dans {} pour update une competence');
    // let maxLevel = config.competences[competenceName].length - 1; // - 1 car la première valeur est empty pour l'icone "start"
    let maxLevel = competenceObj.colors.length;
    let competenceUpdates = competenceObj.updates;
    let lastUpdate = competenceUpdates[competenceUpdates.length - 1] || {};
    let actualLevel = lastUpdate.actual_level || 0;
    if (actualLevel === maxLevel)
      context.commit("showInfo", {
        message: "Le Niveau de compétence est déjà au maximum",
        status: 'warning'
      })
    else {
      let data = {skillId: competenceObj.id, status, message};
      let origin = window.location.origin;
      axios.post(`${origin}/student/${studentId}/update`, data).then((resp) => {
        if (!resp.data.success)
          return console.error('erreur lors du store de l\'update');
        context.commit("updateCompetence", {
          competenceUpdates,
          competenceObj,
          status,
          message,
          classeId,
          studentId
        });
      }) 
    }
  },

  // GET DATAS
  // =================
  async getClasses(context) {
    let origin = window.location.origin;
    let classes = await axios.get(origin + '/classes');
    context.commit('setClasses', classes.data);
  },

  async getStudentsUpdates(context, classeId) {
    if (context.state.classes[classeId] === undefined) return;
    let origin = window.location.origin;
    let students = await axios.get(`${origin}/classes/${classeId}`);
    context.commit('setStudentsUpdates', {classeId, students: students.data});
  },

  async getProgramsSkills(context, classeId) {
    if (context.state.classes[classeId] === undefined) return;
    let origin = window.location.origin;
    let programs = await axios.get(origin + `/programs/${classeId}`);
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