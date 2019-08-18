<template>
  <div id="NotifyInfo" class="text-center ma-2">
    <v-snackbar top color="secondary" :timeout="5000" v-model="showInfo.show">
      {{ showInfo.message }}
      <v-btn color="primary" outlined @click="hideInfo">Close</v-btn>
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
  }
};
</script>

<style lang="sass" scoped>
#NotifyInfo 
  // margin-top: 5rem !important
</style>