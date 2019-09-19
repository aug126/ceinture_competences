import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);



import NewClasse from "../components/pages/NewClasse";
import BeltTable from "../components/pages/BeltTable";
import Accueil from "../components/pages/Accueil.vue"

const routes = [{
  path: "/accueil",
  component: Accueil
}, {
  path: "/new-classe",
  component: NewClasse
}, {
  path: "/ceintures/:id",
  component: BeltTable
}, {
  path: "/",
  redirect: '/accueil'
}]

export default new VueRouter({
  routes
});