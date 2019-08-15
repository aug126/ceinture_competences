import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);



import ClassNew from "../components/ClassNew";
import CeintureTable from "../components/CeintureTable";

export default new VueRouter({
  routes: [
    {path: "/new-classe", component: ClassNew},
    {path: "/ceintures/:classe", component: CeintureTable},
  ]
});