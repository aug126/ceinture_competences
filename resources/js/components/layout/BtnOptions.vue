<template>
  <div>
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

        <v-btn
          v-else-if="editable"
          @click.stop="setEditable"
          color="warning"
          fab
          title="Quitter"
          dark
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <v-btn v-else v-model="fab" color="info" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else title="Options">mdi-cogs</v-icon>
        </v-btn>
      </template>

      <!-- <v-btn @click.stop="fake" fab dark small color="green">
        <v-icon v-if="fakeCollapse">mdi-arrow-split-horizontal</v-icon>
        <v-icon v-else>mdi-arrow-collapse-vertical</v-icon>
      </v-btn>-->
      <v-btn @click.stop="setFullScreen" fab dark small color="green" title="Grand écran">
        <v-icon>mdi-monitor-screenshot</v-icon>
      </v-btn>
      <v-btn @click.stop fab dark small color="grey" title="Non disponible">
        <v-icon v-if="fakeCollapse">mdi-eye-off</v-icon>
        <v-icon v-else>mdi-eye-plus</v-icon>
      </v-btn>
      <v-btn @click.stop fab dark small color="grey" title="Non disponible">
        <v-icon>mdi-printer</v-icon>
      </v-btn>
      <v-btn @click.stop="setEditable" fab dark small color="grey" title="Non disponible">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-speed-dial>
    <section>
    <v-fab-transition>
      <div v-show="fullScreen" id="zoom-btns">
        <v-btn @click="zoomPlus" fab dark small color="green lighten-2" title="Agrandir">
          <v-icon>mdi-magnify-plus</v-icon>
        </v-btn>
        <v-btn @click="zoomMinus" fab dark small color="green lighten-2" title="Diminuer">
          <v-icon>mdi-magnify-minus</v-icon>
        </v-btn>
      </div>
    </v-fab-transition>
</section>
  </div>
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
      let isFullScreen = this.$store.state.options.fullScreen;
      if (isFullScreen) {
        // document.body.style.zoom = "100%";
      } else {
        // let coef = this.$store.state.options.zoomCoef;
        // document.body.style.zoom = 100 * coef + "%";
      }
      this.$store.commit("fullScreenToggle");
      this.fab = false;
    },
    setEditable() {
      this.$store.commit("editableToggle");
      this.fab = false;
    },
    zoomPlus() {
      this.$store.commit("incrementZoom");
      // let coef = this.$store.state.options.zoomCoef;
      // document.body.style.zoom = 100 * coef + "%";
    },
    zoomMinus() {
      this.$store.commit("decrementZoom");
      // let coef = this.$store.state.options.zoomCoef;
      // document.body.style.zoom = 100 * coef + "%";
    }
  },
  computed: {
    fullScreen() {
      return this.$store.state.options.fullScreen;
    },
    editable() {
      return this.$store.state.options.editable;
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
#zoom-btns 
  display: flex
  flex-direction: column
  align-items: center
  button
    margin-top: .5rem
@media screen and (max-width: 959px)
  #BtnOptions
    display: none

</style>