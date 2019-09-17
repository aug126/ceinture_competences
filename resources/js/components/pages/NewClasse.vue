<template>
  <div id="NewClasse">
    <h1>Créez une classe avec des élèves.</h1>
    <v-card class="p-static">
      <v-card-text>
        <h2>La classe</h2>
        <v-form ref="form" v-model="valid">
          <v-container>
            <v-row>
              <!-- Classe et élèves -->
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="className"
                  :rules="classRules"
                  label="Nom de classe (ex: 5ème 2019)"
                  required
                ></v-text-field>
                <v-text-field v-model="eleveList" label="Elève 1, élève 2, ..." :rules="eleveRules"></v-text-field>
              </v-col>

              <!-- Chip élèves -->
              <v-col cols="12" md="8">
                <v-chip
                  class="ma-2"
                  v-for="(eleve, index) in chipEleveList"
                  :key="index + eleve"
                  pill
                  close
                  @click:close="() => closeChip(index)"
                >
                  <v-avatar left :color="getRandomColor(eleve)">{{eleve.charAt(0)}}</v-avatar>
                  {{eleve}}
                </v-chip>
              </v-col>
            </v-row>
            <hr />

            <!-- Programmes / skills-->
            <h2>Les compétences</h2>
            <div v-for="(program, i) in programsSkills" :key="i">
              <NewProgramSkills :previews-colors="previewsColors" :program="program" />
            </div>

            <!-- ADD / DEL Programs -->
            <v-row>
              <v-col col="12" :md="multiProgr ? 2 : 4">
                <div class="my-2">
                  <v-btn @click="addProgr" large class="w-100 add-progr">
                    <v-icon color="info">mdi-plus</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-col v-if="multiProgr" col="12" md="2">
                <div class="my-2">
                  <v-btn @click="delProgr" large class="w-100 add-progr">
                    <v-icon color="info">mdi-minus</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>

            <hr />
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="clear">Annuler</v-btn>
        <v-btn text @click="createClasse" color="info">Créer</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import NewProgramSkills from "../partials/NewProgramSkills";
export default {
  components: { NewProgramSkills },
  data() {
    return {
      valid: false,
      className: "5 ème primaire 2019",
      classRules: [v => !!v || "Le nom de la classe est requis."],

      eleveList:
        "Cyrille, Sandrine, Augustin, Larissa, Grigori, Aurélie, Damien",
      eleveRules: [
        v => this.validUniqueEleve(v) || "Il ne peut pas y avoir 2 même noms"
      ],
      programsSkills: [
        { name: "", competences: "", levels: [], countSkills: 0 }
      ],
      programRules: [],
      previewsColors: []
    };
  },
  methods: {
    closeChip(index) {
      this.chipEleveList.splice(index, 1);
      this.eleveList = this.chipEleveList.join(", ");
    },
    validUniqueEleve: v => {
      let list = v.split(",").map(name => name.trim());
      let checkUnique = {};
      let validation = true;
      list.forEach(eleve => {
        if (checkUnique[eleve] !== undefined) return (validation = false);
        checkUnique[eleve] = 1;
      });
      return validation;
    },
    getRandomColor(eleve) {
      let letter = eleve.charCodeAt(0) - 65;
      let num = letter * 9;
      let num2 = 255 - num;
      let num3 = num > num2 ? num : num2;
      return `rgb(${num}, ${num2}, ${num3})`;
    },
    clear() {
      this.eleveList = "";
      this.className = "";
      this.$refs.form.resetValidation();
    },
    addProgr() {
      this.programsSkills.push({
        name: "",
        competences: "",
        levels: [],
        countSkills: 0
      });
    },
    delProgr() {
      this.programsSkills.pop();
    },

    async createClasse() {
      this.$refs.form.validate();
      if (this.valid === false) return;
      let progr_skills = this.programsSkills
        .map(progr => ({
          program_name: progr.name,
          competences: progr.competences
            .split(",")
            .map(comp => comp.trim())
            .filter(progr => !!progr)
        }))
        .filter(prog => !!prog.program_name);
      console.log(progr_skills);

      // insert datas
      let datas = {
        students: this.chipEleveList,
        classe_name: this.className,
        progr_skills
        // programs: // TODO à ajouter,
        // skills: // TODO à ajouter
      };
      console.log("datas = ", datas);
      let newClasse = await this.$store.dispatch("storeClasse", datas);
      console.log("newClasse", newClasse);
      // this.$router.push({ path: "/ceintures/" + newClasse.id });
    }
  },
  computed: {
    chipEleveList() {
      if (this.eleveList === undefined || this.eleveList.length === 0)
        return null;
      let list = this.eleveList.split(",").map(name => {
        let trim = name.trim();
        return trim.charAt(0).toUpperCase() + trim.slice(1);
      });
      return list.filter(eleve => eleve.length > 0);
    },
    multiProgr() {
      return this.programsSkills.length > 1 ? true : false;
    }
  }
};
</script>
<style lang="sass">
#NewClasse
  .add-progr 
    margin-top: -3rem
  #level-colors
    span.skill-name
      font-size: 1rem
      margin-top: .3rem
    label.v-label.theme--light
      top: 25px
      left: -25px !important
    .v-input.theme--light.v-input--selection-controls.v-input--checkbox
      margin-top: 0
      .v-input__slot
        margin-bottom: 0 !important
      .v-messages.theme--light
        display: none
    .level-number
      font-size: 1rem
      font-weight: bold
      display: block
      margin-left: 1rem
      text-align: center
      margin-top: -1.7rem
      cursor: pointer
    .custom-color 
      border: .1rem solid
      border-radius: .3rem
      width: 2rem
      height: 2rem
      display: flex
      justify-content: center
      margin-left: 1rem
      cursor: pointer
      &.colorized 
        .v-icon.edit
          display: none
        &:hover .v-icon
          display: block
    .v-color-picker__alpha
      display: none
    .v-color-picker.v-sheet.theme--light.theme--light
      position: absolute
      z-index: 20
  .p-static 
    position: static

</style>