<template>
  <div>
    <belt-student-sheet @close="studentSheet = {}" :student="studentSheet" />
    <v-card>
      <v-simple-table id="ceinture-table" :fixed-header="true" :height="tableHeight" :dense="false">
        <thead>
          <tr>
            <th>
              <v-btn small color="info" dark depressed>
                <v-icon>mdi-table-edit</v-icon>
              </v-btn>
            </th>
            <th class="border-right">
              <h4>{{currentClasse && currentClasse.classe_name}}</h4>
            </th>
            <th
              v-for="(colors, competence) in competenceObject"
              :key="competence"
              :class="{'border-right': competence === 'orthographe'}"
            >{{competence}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, studentId) in (currentClasse && currentClasse.students)" :key="studentId">
            <td>
              <!-- <v-text-field disabled v-model="student.numero"></v-text-field> -->
              <strong>{{ student.order_number }}</strong>
            </td>
            <td class="border-right name">
              <strong @click="() => showStudentSheet(student)">{{ student.student_name }}</strong>
            </td>
            <td
              v-for="(allUpdates, competence) in student.competences"
              :key="competence"
              :class="{'border-right': competence === 'orthographe'}"
            >
              <!-- @click="() => upLvl(student, competence)" -->
              <belt-actions :competence-updates="allUpdates" :competence-name="competence">
                <ceinture-type-2
                  v-if="niveau(allUpdates) > 0"
                  :color="competenceObject[competence][niveau(allUpdates)]"
                ></ceinture-type-2>
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
    upLvl(row, competence) {
      let maxLvl = this.competenceObject[competence].length - 1;
      let currentLvl = row.competences[competence];
      if (maxLvl > currentLvl) row.competences[competence] += 1;
    },
    niveau(allUpdatesMessages) {
      let up = allUpdatesMessages;
      return up[up.length - 1] && up[up.length - 1].actualLevel;
    },
    showStudentSheet(student) {
      this.studentSheet = student;
    },
    getStudentsUpdates() {
      this.$store.dispatch('getStudentsUpdates', this.$route.params.id);
    },
    getProgramsSkills() {
      this.$store.dispatch('getProgramsSkills', this.$route.params.id)
    }
  },

  mounted() {
    this.tableHeight = document.body.clientHeight - 148;
  },

  beforeMount() {
    if (this.currentClasse === undefined) this.$router.push({ path: "/" });
    else {
      this.getStudentsUpdates();
      this.getProgramsSkills();
    }
  },

  data() {
    return {
      tableHeight: 0,
      competenceObject: config.competences,
      studentSheet: {}
    };
  },

  computed: {
    currentClasse() {
      let classeId = this.$route.params.id;
      return this.$store.state.classes[classeId];
    }
  },

  watch: {
    $route() {
      this.getStudentsUpdates();
      this.getProgramsSkills();
    },
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
  .border-right
    border-right: 1px solid
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