import Vue from "vue";
import Router from "vue-router";
import BillList from "./views/bills";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home,
      children: [
        { path: "/", component: BillList },
        {
          path: "collected",
          component: () => import("./views/collected/Collected.vue")
        },
        {
          path: "payment",
          component: () => import("./views/payment/Payment.vue")
        },
        {
          path: "management",
          component: () => import("./views/management/index.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    }
  ]
});
