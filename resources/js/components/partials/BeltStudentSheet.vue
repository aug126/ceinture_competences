<template>
  <v-dialog v-model="show" width="850">
    <v-card id="BeltStudentSheet">
      <v-card-title class="headline grey lighten-2" primary-title>
        {{student.name}}
        <v-spacer />
        <v-btn class="info--text" @click="toggleFileOption">
          <v-icon v-if="fileOption === 'message'">mdi-file-eye</v-icon>
          <v-icon v-else>mdi-file-eye-outline</v-icon>
        </v-btn>
      </v-card-title>

      <v-simple-table>
        <thead>
          <tr>
            <th
              class="text-center border-right"
              v-for="(updates, competence) in student.competences"
              :key="competence"
            >{{ competence }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="student.competences">
            <td
              class="border-right"
              v-for="(updates, competence) in student.competences"
              :key="competence"
            >
              <div class="h-100">
                <v-tooltip
                  :open-on-click="false"
                  :disabled="!update[disabledOption]"
                  v-for="(update, i) in updates"
                  :key="i"
                  top
                >
                  <template v-slot:activator="{ on }">
                    <div
                      v-on="on"
                      :class="getThemeColor(update.status)"
                      class="text-center lighten-5 update"
                      :style="'border-left: 8px solid ' + (config[competence][update.actualLevel] || 'transparent') + ' !important'"
                    >{{update[fileOption]}}</div>
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
        <v-btn color="primary" dark outlined @click="show = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import config from "../../config";
export default {
  props: {
    student: Object
  },
  watch: {
    student(newVal) {
      console.log("student change : ", newVal);
      console.log("config, ", this.config);
      if (newVal.name) this.show = true;
    },
    show(val) {
      if (val === false) this.$emit("close");
    }
  },
  data() {
    return {
      show: false,
      config: config.competences,
      fileOption: "message",
      disabledOption: "date"
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
    }
  }
};
</script>
<style lang="sass">
#BeltStudentSheet
  tbody tr:hover
    background: none !important
  th, td
    &.border-right
      border-right: 1px solid rgba(0, 0, 0, 0.54) !important
  td 
    padding: 0
    div.update 
      border-bottom: 1px solid rgba(0, 0, 0, 0.54) !important
      padding: .4rem
      height: 2.1rem
</style>
