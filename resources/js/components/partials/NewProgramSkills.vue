<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-text-field v-model="program.name" label="Programmes (ex: mathématiques)" required></v-text-field>
    </v-col>
    <v-col cols="12" md="8">
      <v-text-field
        @focus="skillsFocus = true"
        @blur="skillsFocus = false"
        v-model="program.competences"
        label="Compétences (ex: calcul, géo, ...)"
      ></v-text-field>

      <!-- Levels and colors -->
      <div v-for="(skill, i) in competenceSplit" :key="skill + i" id="level-colors">
        <NewSkillColors
          :previews-colors="previewsColors"
          :editing-color="editingColor"
          :skill="program.skills[i]"
          @switchEditColor="$emit('switchEditColor')"
          :getHistoryColors="getHistoryColors"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import NewSkillColors from "./NewSkillColors";
export default {
  components: {
    NewSkillColors
  },
  props: {
    program: Object,
    previewsColors: Array,
    editingColor: Boolean,
    getHistoryColors: Function
  },
  data() {
    return {
      skillsFocus: false
    };
  },
  methods: {},
  computed: {
    competenceSplit() {
      let skills = this.program.competences
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => !!skill);

      // for add
      if (skills.length > this.program.countSkills) {
        this.program.skills.push({
          name: skills[skills.length - 1],
          colors: []
        });
        this.program.countSkills++;
        return skills;
      }
      // modifcation
      else {
        for (let i = 0; i < this.program.skills.length; i++) {
          let level = this.program.skills[i];
          let notModified = skills.filter(skill => level.name === skill);
          // for delete
          if (notModified.length === 0) {
            if (skills.length < this.program.countSkills) {
              this.program.skills.splice(i, 1);
              this.program.countSkills--;
              return skills;
            }
            // le nom a été modifié dans la ligne {level}
            let oldName = level.name;
            let toModify = this.program.skills.find(
              level => level.name === oldName
            );
            let iToModify = this.program.skills.indexOf(toModify);
            for (let i = 0; i < skills.length; i++) {
              let skill = skills[i];
              let notModified = this.program.skills.filter(
                level => skill === level.name
              );
              if (notModified.length === 0) {
                this.program.skills[iToModify].name = skills[iToModify];
                return skills;
              }
            }
          }
        }
        return skills;
      }
    }
  }
};
</script>