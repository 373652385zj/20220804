<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-08-05 15:16:53
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-08-05 15:45:00
 * @FilePath: /person/20220804/src/views/Product.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="product">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="发货内容">
          <el-input 
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.productContent"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateHandle">提交修改</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        productContent: ''
      },
      frontContent: ''
    }
  },
  mounted() {
      setTimeout(() => {
        if (this.$store.state.userInfo) {
          console.log(this.$store.state.userInfo)
          this.getProductContent()
        }
      },500)
  },
  methods: {
    getProductContent() {
      this.$axios
        .post(process.env.VUE_APP_BASE_API + "getProductContent", {
          phone: this.$store.state.userInfo.phone,
          tableNo: '001'
        })
        .then((res) => {
          if (res.data.code === 666) {
            console.log('getProductContent', res.data)
            this.form.productContent = res.data.data[0].productContent
            this.frontContent = res.data.data[0].productContent
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateHandle() {
      console.log(this.form)
      if (!this.form.productContent) {
        this.$message('请输入发货内容！')
        return
      }
      if (this.form.productContent === this.frontContent) {
        this.$message('请修改后再提交！')
        return
      }
      this.$axios
        .post(process.env.VUE_APP_BASE_API + "setProductContent", {
          phone: this.$store.state.userInfo.phone,
          tableNo: '001',
          productContent: this.form.productContent
        })
        .then((res) => {
          console.log(res)
          this.getProductContent()
          this.$message('修改成功！')
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
</script>