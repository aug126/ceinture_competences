<template>
  <v-app style="display: auto" id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Formulaire d'enregistrement</v-toolbar-title>
                <div class="flex-grow-1"></div>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn href="http://augustin-doat.be" icon large target="_blank" v-on="on">
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Dévelopeur du site</span>
                </v-tooltip>
              </v-toolbar>

              <v-card-text>
                <v-form method="POST" :action="this.registerUrl">
                  <input type="hidden" name="_token" :value="csrf" />
                  <v-text-field
                    label="Nom complet"
                    name="name"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="name"
                  ></v-text-field>

                  <v-text-field
                    label="Identifiant (Email)"
                    name="email"
                    prepend-icon="mdi-at"
                    type="email"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Mot de passe"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                  <v-text-field
                    id="password-confirm"
                    label="Confirmation mot de passe"
                    name="password_confirmation"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="passwordConfirm"
                  ></v-text-field>
                </v-form>
                <ul class="no-bullet">
                  <li v-for="(error, i) in errors" :key="i" class="error--text">
                    {{error}}
                  </li>
                </ul>

              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn @click="registerUser" color="primary">Enregistrement</v-btn>
                <v-btn outlined @click="() => goTo('/login')" color="primary">Se connecter</v-btn>
                <!-- <v-btn title="Mot de passe oublié ?" outlined @click="() => goTo('/password/reset')" color="primary"><v-icon>mdi-account-question</v-icon></v-btn> -->
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  props: ["register-url"],
  // name: "vue-login",
  mounted() {
  },
  data: () => ({
    csrf: document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content"),
    name: '',
    email: '',
    password: '', 
    passwordConfirm: '',
    errors: []
    //-----
  }),
  methods: {
    async registerUser() {
      let formData = new FormData;
      formData.append('name', this.name);
      formData.append('email', this.email);
      formData.append('password', this.password);
      formData.append('password_confirmation', this.passwordConfirm);
      formData.append('_token', this.csrf);

      let resp = await axios.post(this.registerUrl, formData);

      if (resp.data.errors) {
        this.errors = resp.data.errors;
      } else
        this.goTo();
    },
    goTo(subUrl = '/') {
     let origin = window.location.origin;
     let url = origin + subUrl
      window.location.href = url;
    }
  }
};
</script>


<style lang="sass">
  .no-bullet
    list-style-type: none
</style>