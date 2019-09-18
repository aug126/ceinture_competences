<template>
  <v-app id="App">
    <all-global-components></all-global-components>
    <!-- <left-drawer-notused></left-drawer-notused> -->
    <v-app-bar :clipped-left="true" app dark color="primary" :class="{'mt--64': fullScreen}">
      <v-app-bar-nav-icon :class="{'mb--64 mt-64': fullScreen}" class="ml-1">
        <btn-options></btn-options>
      </v-app-bar-nav-icon>
      <v-toolbar-title :class="{'d-none': fullScreen}">Ceintures de Compétences</v-toolbar-title>
      <div class="flex-grow-1"></div>

      <v-menu :class="{'d-none': fullScreen}" left bottom>
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

    <v-content :class="{'full-screen': fullScreen}">
      <v-container fluid>
        <v-row class="justify-evenly">
          <v-col :class="{'full-screen': fullScreen}" cols="2" id="sidebar-nav">
            <floating-drawer></floating-drawer>
          </v-col>
          <v-col
            :class="{'full-screen' : fullScreen}"
            class="router-view-container col-md-9 col-sm-12"
          >
            <!-- ROUTER
            =======================-->
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app color="primary" :class="{'mb--64': fullScreen}">
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
  },
  computed: {
    fullScreen() {
      return this.$store.state.options.fullScreen;
    }
  }
};
</script>

<style lang="sass">
// @import '../../sass/app.sass'
$anim-time: .4s
#App 
  #sidebar-nav
    z-index: 3
    justify-content: center
    display: flex
    transition: all linear $anim-time
    padding: 1rem
    &.full-screen
      flex: 0
      padding-left: 0
      padding-right: 0
      transform: translateX(-256px)
  .router-view-container
    transition: all linear $anim-time
    &.full-screen
      max-width: 100%
      flex: 0 0 100%
  .v-content
    transition: padding $anim-time linear
    &.full-screen
      padding: 0 5rem .5rem 5rem !important
  button.v-app-bar__nav-icon
    transform: translateY(-4px)
  .v-app-bar
    margin: 0
    transition: linear $anim-time
  .v-footer 
    transition: linear $anim-time


#App
  h1 
    color: #a25da2
    margin-left: 2rem
  hr
    border-color: transparentize(#a25da2, .5)
    margin-bottom: 3rem
  .w-100
    width: 100%
  .mt--64
    margin-top: -64px !important
  .mt-64
    margin-top: 64px !important
  .mb--64
    margin-bottom: -64px !important
  .justify-evenly
    justify-content: space-evenly

</style>