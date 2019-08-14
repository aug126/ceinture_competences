<template>
  <v-card elevation="12" id="FloatingDrawer" class="mx-auto" width="256">
    <v-navigation-drawer floating permanent>
      <v-list dense rounded>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
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