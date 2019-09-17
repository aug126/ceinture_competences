<template>
  <div id="NewSkillColors" class="d-flex justify-start">
    <span class="skill-name">{{skill.name}} :</span>
    <div v-for="(color, i) in skill.colors" :key="i">
      <div
        @click="(e) => editColor(color, i, e)"
        :style="{backgroundColor: color}"
        class="custom-color colorized dark--text"
      >
        <v-icon
          class="edit"
          v-if="editingColor === false && addingColor === false"
          color="black"
        >mdi-pencil</v-icon>
        <v-icon v-if="editing === i" color="black">mdi-check</v-icon>
      </div>
      <span class="level-number">{{i + 1}}</span>
    </div>

    <div @click="chooseColor" class="custom-color info--text">
      <v-icon v-if="addingColor === false" class="icon-set-color info--text">mdi-format-color-fill</v-icon>
      <v-icon v-else class="icon-set-color info--text">mdi-check</v-icon>
    </div>

    <div ref="colorPicker">
      <v-color-picker
        v-show="showColorPicker"
        :swatches="previewsColors"
        class="ma-2"
        show-swatches
        :hide-inputs="true"
        mode="hexa"
        v-model="currentColor"
      ></v-color-picker>
    </div>
  </div>
</template>
</template>

<script>
export default {
  props: {
    skill: Object,
    editingColor: Boolean,
    previewsColors: Array
  },
  data() {
    return {
      showColorPicker: false,
      currentColor: "#EDDC00FF",
      addingColor: false,
      editing: ""
    };
  },
  methods: {
    editColor(color, i, e) {
      if (this.addingColor === true) return;
      let picker = this.$refs.colorPicker.firstChild;
      if (this.editingColor === true) {
        // on click sur v
        if (this.editing !== i) return;
        picker.style.left = "auto";
        this.skill.colors[i] = this.currentColor;
        this.editing = "";
      } else {
        this.editing = i;
        this.currentColor = color;
        let widthBtn = e.currentTarget.clientWidth;
        let mousePos = e.clientX + widthBtn - e.offsetX;
        picker.style.left = mousePos + "px";
      }
      this.$emit("switchEditColor");
      this.showColorPicker = !this.showColorPicker;
    },
    addColor() {
      if (this.editingColor === true) return;
      let newLevel;
      this.skill.colors.push(this.currentColor);
      let allColors = this.previewsColors.reduce(
        (all, col) => [...all, ...col],
        []
      );
      if (allColors.indexOf(this.currentColor) === -1)
        allColors.push(this.currentColor);
      this.previewsColors.length = 0;
      this.previewsColors.push([], [], [], [], []);
      let finder = 0;
      allColors.forEach((color, i) => {
        if (finder === 5) finder = 0;
        this.previewsColors[finder].push(color);
        finder++;
      });
    },
    chooseColor(e) {
      if (this.editingColor === true) return;
      if (this.addingColor === true) this.addColor();
      this.addingColor = !this.addingColor;
      this.showColorPicker = !this.showColorPicker;
    }
  }
};
</script>

<style lang="sass">
#NewSkillColors
  margin-bottom: .5rem
  >span.skill-name
    min-width: 8rem
  .custom-color:hover + .level-number
    display: none !important
  .custom-color + .level-number:hover
    display: none !important
</style>