<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-08-04 10:07:47
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-08-10 15:56:57
 * @FilePath: /person/20220804/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$axios
      .get(process.env.VUE_APP_BASE_API + "test")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.$axios
      .get(process.env.VUE_APP_BASE_API + "isLogin")
      .then((res) => {
        console.log(res);
        if (res.data.data.role === "merchants") {
          // 已经登录的情况下直接进入home页面
          this.$store.state.isLogin = res.data.data.isLogin;
          console.log(this.$store.state.isLogin)
          console.log(this.$route.path)
          if (!res.data.data.isLogin) {
            if (this.$route.path !== "/") {
              this.$router.push({ path: "/" });
            }
          } else {
            this.$store.commit("setUserInfo", res.data.data)
            // 获取用户信息
            if (this.$route.path !== "/home") {
              this.$router.push({ path: "/home" });
            }
          }
        } else {
          if (this.$route.path !== "/") {
            this.$router.push({ path: "/" });
          }
          this.$message('权限不足')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>

<style lang="less">
html,body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
