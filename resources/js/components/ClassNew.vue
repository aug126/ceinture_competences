<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="9">
        <v-card>
          <v-card-text>
            <h1>Créez une classe avec des élèves.</h1>
            <v-form v-model="valid">
              <v-container>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="className"
                      :rules="classRules"
                      label="Nom de la classe"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="eleveList"
                      label="Elève 1, élève 2, ..."
                      :rules="eleveRules"
                    ></v-text-field>
                  </v-col>

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
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn disabled text>Annuler</v-btn>
            <v-btn text color="primary">Créer</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      className: "Nouvelle classe",
      classRules: [v => !!v || "Le nom de la classe est requis."],
      eleveList: "",
      eleveRules: [
        v => this.validUniqueEleve(v) || "Il ne peut pas y avoir 2 même noms"
      ]
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
      console.log("charcode = ", eleve.charCodeAt(0));
      let letter = eleve.charCodeAt(0) - 65;
      let num = letter * 9;
      let num2 = 255 - num;
      let num3 = num > num2 ? num : num2;
      return `rgb(${num}, ${num2}, ${num3})`;
    }
  },
  computed: {
    chipEleveList() {
      if (this.eleveList.length === 0) return null;
      let list = this.eleveList.split(",").map(name => {
        let trim = name.trim();
        return trim.charAt(0).toUpperCase() + trim.slice(1);
      });
      return list.filter(eleve => eleve.length > 0);
    }
  }
};
</script>