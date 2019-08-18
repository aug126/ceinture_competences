import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);



import NewClasse from "../components/pages/NewClasse";
import BeltTable from "../components/pages/BeltTable";
import Welcome from "../components/pages/Welcome.vue"

const routes = [{
    path: "/new-classe",
    component: NewClasse
  },
  {
    path: "/ceintures/:id",
    component: BeltTable
  },
  {
    path: "/",
    component: Welcome
  }
]

export default new VueRouter({
  routes
});