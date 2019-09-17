<template>
  <v-app id="App">
    <all-global-components></all-global-components>
    <!-- <left-drawer-notused></left-drawer-notused> -->
    <v-app-bar :clipped-left="true" app dark color="primary">
      <v-app-bar-nav-icon class="ml-1">
        <btn-options></btn-options>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Ceintures de Compétences</v-toolbar-title>
      <div class="flex-grow-1"></div>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <!-- <v-icon>mdi-dots-vertical</v-icon> -->
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Se déconnecter</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
import axios from "axios";
export default {
  components: {
    FloatingDrawer,
    BtnOptions,
    AllGlobalComponents
  },
  async mounted() {
    await this.$store.dispatch("getClasses");
  },
  data: () => ({}),
  methods: {
    async logout() {
      let origin = window.location.origin;
      try {
        await axios.post(`${origin}/logout`);
      } catch {
        window.location.reload();
      }
    }
  }
};
</script>

<style lang="sass">
// @import '../../sass/app.sass'
#sidebar-nav
  justify-content: center
  display: flex
#App
  button.v-app-bar__nav-icon
    margin-top: -8px !important
  h1 
    color: #a25da2
  hr
    border-color: transparentize(#a25da2, .5)
    margin-bottom: 3rem

  .w-100
    width: 100%
</style>