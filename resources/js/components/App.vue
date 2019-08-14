<template>
  <v-app id="sandbox">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="true"
      :mini-variant="primaryDrawer.mini"
      app
      overflow
    ></v-navigation-drawer>

    <v-app-bar :clipped-left="true" app dark color="primary">
      <v-app-bar-nav-icon @click.stop="primaryDrawer.model = !primaryDrawer.model"></v-app-bar-nav-icon>
      <v-toolbar-title>Ceintures de Compétences</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <class-new></class-new>
    </v-content>

    <v-footer app color="primary">
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import ClassNew from "./ClassNew";
export default {
  components: {
    ClassNew
  },
  data: () => ({
    primaryDrawer: {
      model: null,
      mini: false
    }
  })
};
</script>
