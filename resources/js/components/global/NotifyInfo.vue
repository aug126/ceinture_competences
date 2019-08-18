<template>
  <div id="NotifyInfo" class="text-center ma-2">
    <v-snackbar top color="secondary" :timeout="8000" v-model="showInfo.show">
      <v-icon v-if="color === 'warning'" class="warning--text">mdi-exclamation</v-icon>
      <span>{{ showInfo.message }}</span>
      <v-btn :color="color" outlined @click="hideInfo">Close</v-btn>
    </v-snackbar>
  </div>
</template>


<script>
export default {
  props: {
    showInfo: Object
  },
  methods: {
    hideInfo() {
      this.$store.commit("hideInfo");
    }
  },
  computed: {
    color() {
      return this.showInfo.status || "primary";
    }
  }
};
</script>

<style lang="sass" scoped>
#NotifyInfo 
  // margin-top: 5rem !important
</style>