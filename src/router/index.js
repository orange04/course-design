import Vue from "vue";
import Router from "vue-router";
import home from "@/components/home";
import Login from "@/components/Login";
import Register from "@/components/Register";
import SearchResult from "@/components/SearchResult";
import editPhoto from "@/components/editPhoto";
import collect from "@/components/collect";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: home
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/SearchResult",
      name: "SearchResult",
      component: SearchResult
    },
    {
      path: "/editPhoto",
      name: "editPhoto",
      component: editPhoto
    },
    {
      path: "/collect",
      name: "collect",
      component: collect
    }
  ]
});
