<template>
  <v-speed-dial
    id="BeltActions"
    v-model="fab"
    direction="right"
    :open-on-hover="false"
    transition="scale-transition"
  >
    <template v-slot:activator>
      <v-btn v-if="fab" small v-model="fab" color="light" fab>
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <slot v-else>
        <v-btn small v-model="fab" color="light" fab>
          <v-icon>mdi-play</v-icon>
        </v-btn>
      </slot>
    </template>
    <v-btn fab dark small color="secondary">
      <v-icon v-if="fakeCollapse">mdi-pencil</v-icon>
    </v-btn>
    <v-btn class="middle" fab dark small color="success">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn fab dark small color="error">
      <v-icon v-if="fakeCollapse">mdi-close</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  data() {
    return {
      fab: false,
      fakeCollapse: true
    };
  },
  methods: {
    fake() {
      this.fakeCollapse = !this.fakeCollapse;
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
</style>