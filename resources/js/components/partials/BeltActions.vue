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
      <slot>
        <v-btn
          small
          v-model="fab"
          :color="startColor"
          fab
          class="transition-color"
          @mouseenter="startColor='info'"
          @mouseleave="startColor='primary'"
        >
          <v-icon v-if="!fab">mdi-play</v-icon>
          <v-icon v-else>mdi-close</v-icon>
        </v-btn>
      </slot>
    </template>
    <v-btn @click="updateCompetence('practice')" fab dark small color="secondary">
      <!-- <v-icon v-if="fakeCollapse">mdi-pencil</v-icon> -->
      <v-icon>mdi-dumbbell</v-icon>
    </v-btn>
    <v-btn @click="updateCompetence('success')" class="middle" fab dark small color="success">
      <!-- <v-icon>mdi-plus</v-icon> -->
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
    <v-btn @click="updateCompetence('fail')" fab dark small color="error">
      <!-- <v-icon>mdi-close</v-icon> -->
      <v-icon>mdi-minus</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  props: {
    competenceUpdates: Array,
    competenceName: String
  },
  data() {
    return {
      fab: false,
      fakeCollapse: true,
      startColor: "primary"
    };
  },
  methods: {
    fake() {
      this.fakeCollapse = !this.fakeCollapse;
    },
    updateCompetence(status) {
      this.$store.dispatch("updateCompetence", {
        competenceUpdates: this.competenceUpdates,
        competenceName: this.competenceName,
        status
      });
    }
  }
};
</script>

<style lang="sass">
#BeltActions .v-speed-dial__list
  z-index: 5
  left: 50%
  transform: translateX(-50%)
  .v-speed-dial--direction-left
    right: 55%
  .v-speed-dial--direction-right
    left: 55%
  .v-btn.middle 
    margin-top: -180%
#BeltActions
  button.transition-color 
    transition: background ease .3s !important
</style>