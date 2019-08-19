<template>
  <v-app id="App">
    <all-global-components></all-global-components>
    <!-- <left-drawer-notused></left-drawer-notused> -->
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
            =======================-->
            <router-view></router-view>
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
import FloatingDrawer from "./layout/FloatingDrawer";
import BtnOptions from "./layout/BtnOptions";
import AllGlobalComponents from "./global/AllGlobalComponents";
export default {
  components: {
    FloatingDrawer,
    BtnOptions,
    AllGlobalComponents
  },
  data: () => ({})
};
</script>

<style lang="sass">
@import '../../sass/app.sass'
#sidebar-nav
  justify-content: center
  display: flex
#App
  button.v-app-bar__nav-icon
    margin-top: -8px !important
</style>