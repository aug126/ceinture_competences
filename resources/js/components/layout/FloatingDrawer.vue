<template>
  <v-card
    :elevation="hideNav ? '' : '12'"
    id="FloatingDrawer"
    :class="{'hide-nav': hideNav}"
    class="mx-auto"
    width="256"
  >
    <v-navigation-drawer floating permanent>
      <v-list :dense="false" rounded>
        <!-- <v-list-item active-class="active" link>
          <v-list-item-icon>
            <v-icon color="info">mdi-lock-open</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Se Connecter</v-list-item-title>
        </v-list-item>-->

        <v-list-item active-class="active" link to="/accueil">
          <v-list-item-icon>
            <v-icon color="info">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Accueil</v-list-item-title>
        </v-list-item>

        <v-list-group
          no-action
          v-model="classListOpen"
          :prepend-icon="classListOpen ? 'mdi-folder-open' : 'mdi-folder'"
        >
          <template v-slot:activator>
            <v-list-item-title>Mes Classes</v-list-item-title>
          </template>

          <v-list-item
            v-for="(classe, id) in classes"
            :key="id"
            link
            :to="'/ceintures/' + id"
            @click="hideNav = true"
          >
            <v-list-item-title>{{classe.classe_name}}</v-list-item-title>
          </v-list-item>

          <v-list-item @click="hideNav = true" class="text-center" link to="/new-classe">
            <v-list-item-title class="new-class">Nouvelle classe</v-list-item-title>
            <v-list-item-action>
              <v-icon color="info">mdi-plus-circle</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-btn @click="hideNav = !hideNav" class="btn-hide-nav" fab color="info" small>
      <v-icon v-if="hideNav">mdi-arrow-right</v-icon>
      <v-icon v-else>mdi-arrow-left</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      classListOpen: true,
      items: [
        // { title: "Se Connecter", icon: "mdi-lock-open" },
        { title: "Gérer mes classes", icon: "mdi-folder-open" }
      ],
      hideNav: true
    };
  },
  computed: mapState(["classes"])
};
</script>

<style lang="sass">
#FloatingDrawer
  position: fixed
  margin-top: 3rem
  z-index: 10
  transition: right ease .4s
  .v-list-group.v-list-group--active.v-list-group--no-action.primary--text
    max-height: 60vh
  .btn-hide-nav
    display: none
    position: absolute
    right: -1.5rem
    bottom: 1.5rem
    transition: right ease .4s
  .new-class 
    margin-left: -1rem
@media screen and (max-width: 959px)
  #FloatingDrawer
    z-index: 10
    height: calc(100% - 58px - 38px)
    top: 0
    right: calc(100% - 256px)
    margin-top: 58px
    &.hide-nav 
      right: 100% !important
    &.hide-nav .btn-hide-nav 
      right: -3.3rem
    .btn-hide-nav
      display: block
@media screen and (max-width: 425px)
  

</style>