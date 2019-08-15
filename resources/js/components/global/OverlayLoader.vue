<template>
  <v-overlay :value="overlayLoader">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["overlayLoader"])
};
</script>