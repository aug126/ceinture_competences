import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);



import ClassNew from "../components/pages/ClassNew";
import CeintureTable from "../components/pages/CeintureTable";

const routes = [{
    path: "/new-classe",
    component: ClassNew
  },
  {
    path: "/ceintures/:classe",
    component: CeintureTable
  },
]

export default new VueRouter({
  routes
});