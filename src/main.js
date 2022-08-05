/*
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-08-04 10:07:47
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-08-04 18:26:28
 * @FilePath: /person/20220804/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import dayjs from 'dayjs'

Vue.config.productionTip = false;
Vue.prototype.$message = ElementUI.Message;
Vue.prototype.$dialog = ElementUI.Dialog;

Vue.use(ElementUI);

console.log('process1', process.env.VUE_APP_BASE_API);
Vue.prototype.$dayjs = dayjs

Vue.prototype.$axios = axios.create({
  baseURL: "/",
  timeout: 6000,
  withCredentials: true, // 跨域请求时发送Cookie
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
