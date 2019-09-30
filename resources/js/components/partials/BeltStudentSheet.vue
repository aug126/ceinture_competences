<template>
  <v-dialog v-model="show" width="850">
    <v-card id="BeltStudentSheet">
      <v-card-title class="headline grey lighten-2" primary-title>
        <!-- EDITABLE -->
        <v-text-field v-if="edit" v-model="editedName" placeholder="Prénom N." solo></v-text-field>
        <span v-else>{{student.student_name}}</span>
        <v-spacer />
        <v-btn v-if="!edit" class="info--text" @click="toggleFileOption">
          <v-icon v-if="fileOption === 'message'" title="afficher les dates">mdi-calendar</v-icon>
          <v-icon v-else title="afficher les commentaires">mdi-comment</v-icon>
        </v-btn>
      </v-card-title>
      <v-simple-table :fixed-header="true">
        <thead>
          <tr>
            <th
              class="text-center border-right"
              :class="skill.skill_name === columnSelected ? 'w-50' : ''"
              v-for="(skill, i) in student.skills"
              :key="i"
              @click="columnSelected = skill.skill_name"
            >{{ skill.skill_name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td valign="top" class="border-right" v-for="(skill, i) in student.skills" :key="i">
              <div class="h-100">
                <v-tooltip
                  :open-on-click="false"
                  :disabled="!update[disabledOption]"
                  v-for="(update, j) in skill.updates"
                  :key="j"
                  top
                >
                  <template v-slot:activator="{ on }">
                    <div
                      v-on="on"
                      :class="getThemeColor(update.status)"
                      class="text-center lighten-5 update"
                      :style="'border-left: 8px solid ' + (update.status === 'success' && skill.colors[update.actualLevel - 1] || 'transparent') + ' !important'"
                    >
                      <!-- EDITABLE -->
                      <v-text-field
                        v-model="editedUpdates[i][j].message"
                        v-if="edit"
                        height="2rem"
                        background-color="transparent"
                        solo
                      ></v-text-field>
                      <span v-else>{{update[fileOption] || '- - - -'}}</span>
                    </div>
                  </template>
                  <span>{{update[disabledOption]}}</span>
                </v-tooltip>
              </div>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="!edit" color="primary" dark outlined @click="show = false">Close</v-btn>
        <template v-else>
          <v-btn color="primary" dark outlined @click="show = false">Cancel</v-btn>
          <v-btn color="primary" dark @click="editStudent">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: {
    student: Object
  },
  watch: {
    student(newVal) {
      if (newVal.student_name) {
        this.show = true;
        if (this.edit) {
          this.editedName = this.student.student_name;
          Object.entries(this.student.skills).forEach(([id, skill]) => {
            this.editedUpdates[id] = skill.updates;
          });
        }
      }
    },
    show(val) {
      if (val === false) {
        this.$emit("close");
        this.columnSelected = "";
      }
    }
  },
  data() {
    return {
      show: false,
      fileOption: "message",
      disabledOption: "date",
      editedName: "",
      columnSelected: "",
      editedUpdates: {}
    };
  },
  methods: {
    getThemeColor(status) {
      switch (status) {
        case "success":
          return "success";
        case "practice":
          return "secondary";
        case "fail":
          return "error";
      }
    },
    toggleFileOption() {
      this.disabledOption = this.fileOption;
      if (this.fileOption === "message") this.fileOption = "date";
      else this.fileOption = "message";
    },
    async editStudent() {
      let updates = Object.values(this.editedUpdates).reduce((all, updates) => {
        return [...all, ...updates];
      }, []);
      console.log(updates);
      this.student.student_name = this.editedName;
      let requests = [
        axios.post("/student/edit-updates", { updates }),
        axios.post(`student-editname/${this.student.id}`, {
          student: this.student
        })
      ];
      let resps = await Promise.all(requests);
      this.$store.dispatch("getStudentsUpdates", this.$route.params.id);
      this.show = false;
    }
  },
  computed: {
    edit() {
      return this.student.editable;
    }
  }
};
</script>
<style lang="sass">
#BeltStudentSheet
  tbody tr:hover
    background: none !important
  th.border-right:hover
    cursor: pointer
  th, td
    &.border-right
      border-right: 1px solid rgba(0, 0, 0, 0.54) !important
      word-break: keep-all
  td 
    padding: 0
    div.update 
      border-bottom: 1px solid rgba(0, 0, 0, 0.54) !important
      padding: .4rem
      height: 2.1rem
      overflow: hidden
  .v-text-field__details
    display: none
  td .v-input__slot
    min-height: 2rem
    margin-top: -0.4rem
</style>
