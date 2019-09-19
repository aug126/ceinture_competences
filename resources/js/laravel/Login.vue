<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Formulaire de connexion</v-toolbar-title>
                <div class="flex-grow-1"></div>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn href="http://augustin-doat.be" icon large target="_blank" v-on="on">
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Portfolio</span>
                </v-tooltip>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      href="https://codepen.io/johnjleider/pen/pMvGQO"
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-email</v-icon>
                    </v-btn>
                  </template>
                  <span>Contact</span>
                </v-tooltip>
              </v-toolbar>

              <v-card-text>
                <v-form method="POST" :action="this.loginUrl">
                  <input type="hidden" name="_token" :value="csrf" />
                  <v-text-field
                    label="Identifiant"
                    name="email"
                    prepend-icon="mdi-account"
                    type="email"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Mot de passe"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                  <v-checkbox v-model="checkbox" label="Se souvenir de moi"></v-checkbox>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <a class="btn btn-link" href>Mot de passe oublié ?</a>
                <v-btn color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: ["login-url"],
  // name: "vue-login",
  mounted() {
    console.log(this.loginUrl, this.csrf);
  },
  data: () => ({
    csrf: document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content"),
    checkbox: true
  }),
  methods: {
    checkUser() {}
  }
};
</script>


<style scoped>
/**
<template>
  <div id="Login">
    <h1>LOGIN</h1>
    

<div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">

                <div class="card">
                    <div class="card-header">@lang('auth.login')</div>

                    <div class="card-body">
                        <form method="POST" action="{{ route('login') }}">
                              <input type="hidden" name="_token" :value="csrf">


                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">@lang('auth.email_address')</label>

                                <div class="col-md-6">
                                    <!-- <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus> -->

                                    <!-- @error('email')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror -->
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">@lang('auth.password')</label>

                                <div class="col-md-6">
                                    <!-- <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password"> -->

                                    <!-- @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror -->
                                </div>
                            </div>

                            <!-- <div class="form-group row">
                                <div class="col-md-6 offset-md-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                        <label class="form-check-label" for="remember">
                                            @lang('auth.remember_me')
                                        </label>
                                    </div>
                                </div>
                            </div> -->

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        @lang('auth.login')
                                    </button>

                                    <!-- @if (Route::has('password.request'))
                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                        @lang('auth.forgot_password')
                                    </a>
                                    @endif
                                </div> -->
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  data: () => ({})
};
</script>
 */
</style>