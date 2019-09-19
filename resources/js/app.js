// /**
//  * First we will load all of this project's JavaScript dependencies which
//  * includes Vue and other libraries. It is a great starting point when
//  * building robust, powerful web applications using Vue and Laravel.
//  */


// /**
//  * The following block of code may be used to automatically register your
//  * Vue components. It will recursively scan this directory for the Vue
//  * components and automatically register them with their "basename".
//  *
//  * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
//  */

// // const files = require.context('./', true, /\.vue$/i);
// // files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

// Vue.component('app-root', require('./components/AppRoot.vue').default);

// /**
//  * Next, we will create a fresh Vue application instance and attach it to
//  * the page. Then, you may begin adding components to this application
//  * or customize the JavaScript scaffolding to fit your unique needs.
//  */

// const app = new Vue({Vuetify}).$mount('#app');

import Vue from 'vue';

// modules
import vuetify from './modules/vuetify';
import router from './modules/router';
import store from './modules/vuex';

// Root Component
import App from './components/App.vue';

if (document.getElementById('app')) {

  new Vue({
    vuetify,
    router,
    store,
    el: "#app",
    components: {
      App
    },
    template: "<App/>"
  });
  window.stop();
}


import VueLogin from './laravel/Login.vue'
Vue.component(VueLogin);
if (document.getElementById('app-login')) {

  new Vue({
    vuetify,
    el: "#app-login",
    components: {
      VueLogin
    },
    // template: "<vue-login/>"
  })
}