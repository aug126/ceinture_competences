import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);



import NewClasse from "../components/pages/NewClasse";
import CeintureTable from "../components/pages/CeintureTable";
import Welcome from "../components/pages/Welcome.vue"

const routes = [{
    path: "/new-classe",
    component: NewClasse
  },
  {
    path: "/ceintures/:id",
    component: CeintureTable
  },
  {
    path: "/",
    component: Welcome
  }
]

export default new VueRouter({
  routes
});