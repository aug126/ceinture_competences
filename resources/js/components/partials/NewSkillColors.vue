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
      <span
        class="level-number"
        :class="{'dont-hide': editing !== '' || addingColor, 'hide': editing === i}"
      >{{i + 1}}</span>
      <div
        @click="deleteColor(i)"
        v-if="editing === i"
        class="custom-color error--text delete-color"
      >
        <v-icon color="error">mdi-delete</v-icon>
      </div>
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
    deleteColor(i) {
      this.skill.colors.splice(i, 1);
      this.editing = "";
      this.showColorPicker = false;
      this.$emit("switchEditColor");
    },
    positionPicker(action, e, i) {
      console.log('test');
      let picker = this.$refs.colorPicker.firstChild;
      if (action === 'hide') {
        picker.style.left = "auto";
        picker.style.top = "auto";
        this.skill.colors[i] = this.currentColor;
        this.editing = "";
      } else if (action === 'show') {
        let rect = e.target.getBoundingClientRect();
        let left = `calc(${rect.left}px - 300px - 1.3rem)`;
        let top = `calc(${rect.top}px - 2.8rem)`;
        picker.style.left = left;
        picker.style.top = top;
      }
    },
    editColor(color, i, e) {
      if (this.addingColor === true) return;
      let picker = this.$refs.colorPicker.firstChild;
      if (this.editingColor === true) {
        // on click sur v
        if (this.editing !== i) return;
        this.positionPicker('hide', e, i);
      } else {
        this.editing = i;
        this.currentColor = color;
        this.positionPicker('show', e);
      }
      this.$emit("switchEditColor");
      this.showColorPicker = !this.showColorPicker;
      this.pushHistoryColor();
    },
    addColor() {
      if (this.editingColor === true) return;
      let newLevel;
      this.skill.colors.push(this.currentColor);
      this.pushHistoryColor();
    },
    pushHistoryColor() {
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
      console.log(window.devicePixelRatio);
      if (this.editingColor === true) return;
      if (this.addingColor === true) {
        this.addColor();
      } else 
        this.positionPicker('show', e);
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
  .level-number.dont-hide:hover
    display: block !important
  .custom-color:hover + .level-number.dont-hide
    display: block !important
  .level-number.hide
    display: none !important
  .custom-color:hover + .level-number.hide
    display: none !important

  .delete-color
    position: absolute
    margin-top: .5rem
    background-color: white
</style>