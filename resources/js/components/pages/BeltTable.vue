<template>
  <div>
    <belt-student-sheet @close="studentSheet = {}" :student="studentSheet" />
    <h1 v-if="Object.keys(programsObj).length === 0">Cette classe n'a pas de programme !</h1>
    <v-card v-else>
      <v-simple-table id="ceinture-table" :fixed-header="true" :height="tableHeight" :dense="false">
        <thead>
          <tr>
            <th>
              <v-btn small color="info" dark depressed>
                <v-icon>mdi-table-edit</v-icon>
              </v-btn>
            </th>

            <th class="end-program-class" :class="'height-x' + (nbrStudents + 1)">
              <h4>{{currentClasse && currentClasse.classe_name}}</h4>
            </th>
            <template v-for="(program, programId) in programsObj">
              <th
                v-for="(skill, skillId) in program.skills"
                :key="skillId"
                :class="[{'end-program-class': isLastKey(program.skills, skillId), 'height-0': isLastKey(programsObj, programId)}, 'height-x' + (nbrStudents + 1)]"
              >{{skill.skill_name}}</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(student, studentId) in (currentClasse && currentClasse.students)"
            :key="studentId"
          >
            <td>
              <strong>{{ student.order_number }}</strong>
            </td>
            <td class="name">
              <strong @click="() => showStudentSheet(student)">{{ student.student_name }}</strong>
            </td>

            <td v-for="(skill, i) in student.skills" :key="i">
              <belt-actions
                :competence="skill"
                :classeId="currentClasse.id"
                :studentId="student.id"
              >
                <ceinture-type-2 v-if="getColor(skill)" :color="getColor(skill)"></ceinture-type-2>
              </belt-actions>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
import CeintureType2 from "../svg/ceinture-type-2";
import BeltActions from "../partials/BeltActions";
import BeltStudentSheet from "../partials/BeltStudentSheet";
import config from "../../config";
import { mapGetters } from "vuex";
export default {
  components: {
    CeintureType2,
    BeltActions,
    BeltStudentSheet
  },

  methods: {
    showStudentSheet(student) {
      this.studentSheet = student;
    },
    getStudentsUpdates() {
      this.$store.dispatch("getStudentsUpdates", this.$route.params.id);
    },
    getProgramsSkills() {
      this.$store.dispatch("getProgramsSkills", this.$route.params.id);
    },
    isLastKey(obj, key) {
      let allKeys = Object.keys(obj);
      let lastKey = allKeys[allKeys.length - 1];
      return lastKey == key;
    },
    getColor(skill) {
      let updates = skill.updates;
      let colors = skill.colors;
      let lastUpdate = updates[updates.length - 1] || {};
      let colorObj = colors.find(color => color.skill_level === lastUpdate.actual_level);
      return colorObj ? colorObj.hexa_color : null;
    }
  },

  mounted() {
    this.tableHeight = document.body.clientHeight - 148;
  },

  beforeMount() {
    this.getStudentsUpdates();
    this.getProgramsSkills();
  },

  data() {
    return {
      tableHeight: 0,
      studentSheet: {}
    };
  },

  computed: {
    currentClasse() {
      let classeId = this.$route.params.id;
      let classe = this.$store.state.classes[classeId];
      if (classe === undefined) {
        this.$router.push({ path: "/" });
        return {};
      }
      return classe;
    },
    programsObj() {
      let programs = this.currentClasse.programs;
      if (programs === undefined) return {};
      return programs;
    },
    nbrStudents() {
      if (!this.currentClasse || !this.currentClasse.students) return 0;
      return Object.keys(this.currentClasse.students).length;
    }
  },

  watch: {
    $route() {
      this.getStudentsUpdates();
      this.getProgramsSkills();
    }
  }
};
</script>

<style lang="sass">
#ceinture-table
  th, td
    font-size: 1.2rem
    border-color: black
    text-align: center
    user-select: none
  // .border-right
  //   border-right: 1px solid



  // MIXIN
  // mixin permet de prévoir une hauteur de cellule x le nombre de students pour couvrir tout le tableau.

  $rows: 50
  @mixin height-x-calc 
  @for $i from 1 through $rows 
    .height-x#{$i}::after
      height: calc(#{$i} * 100%)
  @include height-x-calc 
  .height-0::after
      height: 0 !important

  th.end-program-class::after
    position: absolute
    content: ''
    width: 2px
    background: #ed4900
    display: block
    top: 0
    right: 0

  tr:last-child
    td 
      border-bottom: 1px solid black
  tr:first-child
    td 
      border-top: 1px solid black
  // Modifications inputs pour changer les données.
  tbody tr:hover
    background: none !important
  td.name
    cursor: pointer
    > strong 
      display: block
      transition: color .2s ease-in
    &:hover > strong
      color: #4057b5 !important
</style>