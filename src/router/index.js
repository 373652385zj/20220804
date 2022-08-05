/*
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-08-04 10:07:47
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-08-05 15:18:20
 * @FilePath: /person/20220804/src/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
