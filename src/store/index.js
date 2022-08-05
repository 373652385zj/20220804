/*
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-08-04 10:07:47
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-08-04 16:25:37
 * @FilePath: /person/20220804/src/store/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {}, // 用户信息
  },
  mutations: {
    async setUserInfo(context) {
      // 解析cookie，从中获取当前用户的手机号
      let cookieInfo = {};
      let cookieAccount = decodeURIComponent(document.cookie).replace(/[ ]/g,'');
      // console.log("cookieAccount", cookieAccount);
      await cookieAccount.split(";").map((item) => {
        cookieInfo[item.split("=")[0]] = item.split("=")[1].indexOf("j:") > -1 ? JSON.parse(
          item.split("=")[1].split("j:")[1]
        ) : item.split("=")[1];
      });
      console.log("cookie", cookieInfo);
      context.userInfo = cookieInfo.userInfo.data;
    },
    clearUserInfo(context) {
      context.userInfo = {};
    },
  },
  actions: {},
  modules: {},
});
