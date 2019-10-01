<template>
  <v-speed-dial
    id="BeltActions"
    v-model="fab"
    direction="right"
    :open-on-hover="false"
    transition="scale-transition"
  >
    <template v-slot:activator>
      <!-- <v-btn v-if="fab" small v-model="fab" color="light" fab>
        <v-icon>mdi-close</v-icon>
      </v-btn>-->
      <div
        @click="focusInput"
        class="cursor-pointer"
        @mouseenter="startColor='info'"
        @mouseleave="startColor='primary'"
      >
        <slot>
          <v-icon :color="startColor" v-if="!fab">mdi-play</v-icon>
          <v-btn v-else small v-model="fab" color="info" fab class="transition-color close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </slot>
      </div>
    </template>
    <v-btn @click="updateCompetence('practice')" fab dark small color="secondary">
      <!-- <v-icon v-if="fakeCollapse">mdi-pencil</v-icon> -->
      <!-- <v-icon>mdi-dumbbell</v-icon> -->
      <v-icon>mdi-timer-sand</v-icon>
    </v-btn>
    <v-btn @click="updateCompetence('success')" class="middle" fab dark small color="success">
      <!-- <v-icon>mdi-plus</v-icon> -->
      <!-- <v-icon>mdi-arrow-up</v-icon> -->
      <v-icon>mdi-emoticon-happy-outline</v-icon>
    </v-btn>
    <v-text-field
      ref="inputMessage"
      @click.stop
      v-model="message"
      class="input input-info-border"
      label="Commentaire ou note"
      solo
    ></v-text-field>
    <v-btn @click="updateCompetence('fail')" fab dark small color="error">
      <!-- <v-icon>mdi-close</v-icon> -->
      <!-- <v-icon>mdi-minus</v-icon> -->
      <v-icon>mdi-emoticon-sad-outline</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  props: {
    competence: Object,
    classeId: Number,
    studentId: Number
  },
  // beforeUpdate() {
  //   console.log("update");
  // },
  data() {
    return {
      fab: false,
      fakeCollapse: true,
      startColor: "primary",
      message: ""
    };
  },
  methods: {
    fake() {
      this.fakeCollapse = !this.fakeCollapse;
    },
    updateCompetence(status) {
      this.$store.dispatch("updateCompetence", {
        competenceObj: this.competence,
        message: this.message,
        status,
        classeId: this.classeId,
        studentId: this.studentId
      });
      this.message = "";
    },
    focusInput() {
      setTimeout(() => {
        this.$refs.inputMessage.$el.querySelector("input").focus();
      }, 0);
    }
  }
};
</script>

<style lang="sass">
#BeltActions 
  height: 100%
  display: flex
  justify-content: center
  button.close:first-child
    z-index: 1
    // margin-top: -.8rem
  .v-speed-dial__list
    z-index: 5
    left: 50%
    transform: translateX(-50%)
    .v-speed-dial--direction-left
      right: 55%
    .v-speed-dial--direction-right
      left: 55%
    .v-btn.middle 
      margin-top: -6rem
    .input
      width: 200px !important
      position: absolute
      z-index: 10
      top: 3rem !important
      transition: transform .2s ease .2s !important
      caret-color: #4057b5 !important
  .v-speed-dial
    .v-speed-dial--is-active
      transform: scale(2)

  .cursor-pointer
    display: flex
    justify-content: center
  
#BeltActions
  button.transition-color 
    transition: background ease .3s !important
  .input-info-border .v-input__slot
    border: 1px solid #4057b5
    box-shadow: 0 6px 6px -3px rgba(0,0,0,.2),0 10px 14px 1px rgba(0,0,0,.14),0 4px 18px 3px rgba(0,0,0,.12)!important // == elevation-10
  .close.v-btn--active:before
    opacity: 0 !important
</style>