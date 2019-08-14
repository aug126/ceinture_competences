<template>
  <v-card elevation="12" id="FloatingDrawer" class="mx-auto" width="256">
    <v-navigation-drawer floating permanent>
      <v-list :dense="false" rounded>

        <v-list-item active-class="active" link>
          <v-list-item-icon>
            <v-icon>mdi-lock-open</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Se Connecter</v-list-item-title>
        </v-list-item>

        <v-list-group no-action v-model="classListOpen" :prepend-icon="classListOpen ? 'mdi-folder-open' : 'mdi-folder'">
          <template v-slot:activator>
            <v-list-item-title>Mes Classes</v-list-item-title>
          </template>


          <v-list-item link to="">
            <v-list-item-title>ma première classe</v-list-item-title>
          </v-list-item>
          <v-list-item link to="">
            <v-list-item-title>2019</v-list-item-title>
          </v-list-item>

        </v-list-group>

      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      classListOpen: true,
      items: [
        { title: "Se Connecter", icon: "mdi-lock-open" },
        { title: "Gérer mes classes", icon: "mdi-folder-open" }
      ]
    };
  }
};
</script>

<style lang="sass" scoped>
#FloatingDrawer
  position: fixed
  margin-top: 3rem
</style>