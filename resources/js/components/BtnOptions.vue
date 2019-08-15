<template>
  <v-speed-dial
    v-model="fab"
    direction="bottom"
    :open-on-hover="false"
    transition="scale-transition"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" color="info" dark fab>
        <v-icon v-if="fab">mdi-close</v-icon>
        <v-icon v-else>mdi-cogs</v-icon>
      </v-btn>
    </template>
    <v-btn @click.stop="fake" fab dark small color="green">
      <v-icon v-if="fakeCollapse">mdi-arrow-split-horizontal</v-icon>
      <v-icon v-else>mdi-arrow-collapse-vertical</v-icon>
    </v-btn>
    <v-btn @click.stop="fake" fab dark small color="green">
      <v-icon>mdi-monitor-screenshot</v-icon>
    </v-btn>
    <v-btn @click.stop fab dark small color="indigo">
      <v-icon v-if="fakeCollapse">mdi-eye-off</v-icon>
      <v-icon v-else>mdi-eye-plus</v-icon>
    </v-btn>
    <v-btn fab dark small color="red">
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
    }
  }
};
</script>