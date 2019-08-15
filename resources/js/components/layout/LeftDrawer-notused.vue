<template>
  <v-navigation-drawer
    v-model="primaryDrawer.model"
    :clipped="true"
    :mini-variant="primaryDrawer.mini"
    app
    overflow
  >
    <v-list dense>
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
</template>

<script>
export default {
  data() {
    return {
      primaryDrawer: {
        model: false,
        mini: false
      },
      items: [
        { title: "Home", icon: "mdi-arrow-split-horizontal" },
        { title: "About", icon: "question_answer" }
      ]
    };
  }
};
</script>