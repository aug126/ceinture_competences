<template>
  <v-speed-dial
    id="BtnOptions"
    v-model="fab"
    direction="right"
    :open-on-hover="false"
    transition="scale-transition"
    :class="{'full-screen': fullScreen}"
  >
    <template v-slot:activator>
      <v-btn v-if="fullScreen" @click.stop="setFullScreen" color="green" fab title="Quitter">
        <v-icon>mdi-monitor-screenshot</v-icon>
      </v-btn>
      <v-btn v-else v-model="fab" color="info" dark fab>
        <v-icon v-if="fab">mdi-close</v-icon>
        <v-icon v-else>mdi-cogs</v-icon>
      </v-btn>
    </template>

    <!-- <v-btn @click.stop="fake" fab dark small color="green">
        <v-icon v-if="fakeCollapse">mdi-arrow-split-horizontal</v-icon>
        <v-icon v-else>mdi-arrow-collapse-vertical</v-icon>
    </v-btn>-->
    <v-btn @click.stop="setFullScreen" fab dark small color="green">
      <v-icon>mdi-monitor-screenshot</v-icon>
    </v-btn>
    <v-btn @click.stop fab dark small color="grey">
      <v-icon v-if="fakeCollapse">mdi-eye-off</v-icon>
      <v-icon v-else>mdi-eye-plus</v-icon>
    </v-btn>
    <v-btn @click.stop fab dark small color="grey">
      <v-icon>mdi-printer</v-icon>
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
    },
    setFullScreen() {
      this.$store.commit("fullScreenToggle");
      this.fab = false;
    }
  },
  computed: {
    fullScreen() {
      return this.$store.state.options.fullScreen;
    }
  }
};
</script>

<style lang="sass">
#BtnOptions
  .v-speed-dial__list
    left: -1rem
    margin-top: 4rem
  &.full-screen
    .v-speed-dial__list
      left: -1rem
      margin-top: 0rem
@media screen and (max-width: 959px)
  #BtnOptions
    display: none

</style>