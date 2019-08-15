<template>
  <v-app id="App">
    <!-- <options-drawer></options-drawer> -->
    <v-app-bar :clipped-left="true" app dark color="primary">
      <v-app-bar-nav-icon class="ml-1">
        <btn-options></btn-options>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Ceintures de Compétences</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="2" id="sidebar-nav">
            <floating-drawer></floating-drawer>
          </v-col>
          <v-col cols="9">
            <!-- ROUTER
              ======================= -->
              <router-view></router-view>
            <!-- <class-new></class-new> -->
            <!-- <ceinture-table></ceinture-table> -->
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app color="primary">
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import FloatingDrawer from "./drawers/FloatingDrawer";
import OptionsDrawer from "./drawers/OptionsDrawer";
import BtnOptions from "./BtnOptions";
import ProvisoireTest from "./Test";
export default {
  components: {
    FloatingDrawer,
    OptionsDrawer,
    BtnOptions,
    ProvisoireTest
  },
  data: () => ({})
};
</script>

<style lang="sass" scoped>
#sidebar-nav
  justify-content: center
  display: flex
#App
  button.v-app-bar__nav-icon
    margin-top: -8px !important
</style>