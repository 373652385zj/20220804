<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-08-04 14:15:22
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-08-04 16:22:47
 * @FilePath: /person/20220804/src/views/Login.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="login">
    <div class="login-form">
      <h2 style="margin-left: 50px;">Login</h2>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginHandle">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: '',
        password: '',
      }
    }
  },
  methods: {
    loginHandle() {
      if (!this.form.phone) {
        this.$message('请输入手机号！')
        return
      }
      if (!this.form.password) {
        this.$message('请输入密码！')
        return
      }
      // /sit/test
      this.$axios
        .post(process.env.VUE_APP_BASE_API + "login", {
          phone: this.form.phone,
          password: this.form.password,
        })
        .then((res) => {
          if (res.data.code === 666) {
            this.$store.state.isLogin = true;
            this.$store.commit("setUserInfo", res.data.data)
            this.$router.push({ path: "/home" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
</script>

<style lang="less" scoped>
.login-form {
  width: 500px;
  margin: 100px auto;
}
</style>