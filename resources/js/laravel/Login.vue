<template>
  <v-app style="display: auto" id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Formulaire de connexion</v-toolbar-title>
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
                <v-form method="POST" :action="this.loginUrl">
                  <input type="hidden" name="_token" :value="csrf" />
                  <v-text-field
                    label="Email"
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
                    @keypress.enter="checkUser"
                  ></v-text-field>
                  <v-checkbox v-model="checkboxRemember" label="Se souvenir de moi"></v-checkbox>
                </v-form>
                <ul class="no-bullet">
                  <li v-for="(error, i) in errors" :key="i" class="error--text">
                    {{error}}
                  </li>
                </ul>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn @click="checkUser" color="primary">Connexion</v-btn>
                <v-btn outlined @click="() => goTo('/register')" color="primary">S'enregistrer</v-btn>
                <v-btn title="Mot de passe oublié ?" outlined @click="() => goTo('/password/reset')" color="primary"><v-icon>mdi-account-question</v-icon></v-btn>
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
  props: ["login-url"],
  // name: "vue-login",
  mounted() {
  },
  data: () => ({
    csrf: document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content"),
    email: '',
    password: '', 
    checkboxRemember: true,
    errors: []
    //-----
  }),
  methods: {
    async checkUser() {
      let formData = new FormData;
      formData.append('email', this.email);
      formData.append('password', this.password);
      formData.append('remember', this.checkboxRemember);
      formData.append('_token', this.csrf);

      let resp = await axios.post(this.loginUrl, formData);
      if (resp.data.errors) {
        this.errors = resp.data.errors;
        // SHOW Errors
        return;
      } else
          this.goTo();
      return;
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
