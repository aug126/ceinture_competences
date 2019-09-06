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
            <template v-for="(program) in programsObj">
              <th
                v-for="(skill, skillId) in program.skills"
                :key="skillId"
                :class="{'border-right': isLastKey(program.skills, skillId)}"
              >{{skill.skill_name}}</th>
              
            </template>
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
              v-for="(skill, i) in student.skills"
              :key="i"
            >
              <belt-actions :competence-updates="skill.updates" :competence="skill" :classeId="currentClasse.id" :studentId="student.id">
                  <ceinture-type-2
                    v-if="getColor(skill)"
                    :color="getColor(skill)"
                  ></ceinture-type-2>
                </belt-actions>
            </td>
            <!-- <template v-for="(program) in programsObj">
            <td
              v-for="(skill, skillId) in program.skills"
              :key="skillId"
              :class="{'border-right': isLastKey(program.skills, skillId)}"
            >
              <span class="d-none"> {{color = getSkillLevel(student.updates, skill)}} </span>
              <belt-actions :competence-updates="[]" :competence-name="skill.skill_name">
                <ceinture-type-2
                  v-if="color"
                  :color="color"
                ></ceinture-type-2>
              </belt-actions>
            </td>
            </template> -->

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
    // upLvl(row, competence) {
    //   let maxLvl = this.programsObj[competence].length - 1;
    //   let currentLvl = row.competences[competence];
    //   if (maxLvl > currentLvl) row.competences[competence] += 1;
    // },
    // niveau(allUpdatesMessages) {
    //   let up = allUpdatesMessages;
    //   return up[up.length - 1] && up[up.length - 1].actualLevel;
    // },
    showStudentSheet(student) {
      this.studentSheet = student;
    },
    getStudentsUpdates() {
      this.$store.dispatch('getStudentsUpdates', this.$route.params.id);
    },
    getProgramsSkills() {
      this.$store.dispatch('getProgramsSkills', this.$route.params.id)
    },
    isLastKey(obj, key) {
      let allKeys = Object.keys(obj);
      let lastKey = allKeys[allKeys.length - 1];
      return lastKey == key;
    },
    // getSkillLevel(updates, skill) {
    //   let updateSkillArr = Object.values(updates).filter(up => up.skill_id === skill.id);
    //   let nbrSuccess = updateSkillArr[updateSkillArr.length - 1].actual_level;
    //   let color = Object.values(skill.colors).find(color => color.skill_level == nbrSuccess);
    //   if (color === undefined) return null;
    //   return color.hexa_color;
    // },
    getColor(skill) {
      let colorObj = skill.colors[skill.updates[skill.updates.length - 1].actual_level - 1];
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
      // programsObj: config.competences,
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
      };
      return classe;
    },
    programsObj() {
      let programs = this.currentClasse.programs;
      if (programs === undefined) 
        return {};
      return programs;
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