<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-08-04 10:07:47
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-08-05 15:36:19
 * @FilePath: /person/20220804/src/views/About.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="address">
    <div class="">
      <el-button type="primary" @click="getData">刷新列表</el-button>
      <el-button type="primary" @click="addAddress">添加地址</el-button>
      <el-button type="primary" @click="printHandle">导出表格</el-button>
      <el-button type="primary" @click="logout">退出登录</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="addressName"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="addressPhone"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="detailAddress"
        label="详细地址">
      </el-table-column>
      <el-table-column
        prop="productContent"
        label="发货内容">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="editAddress(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="delAddress(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 导出的表格格式 -->
    <el-table
      v-show="false"
      :data="tableData"
      id="selectTable"
      stripe
      style="width: 100%;">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="addressName"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="addressPhone"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="detailAddress"
        label="详细地址">
      </el-table-column>
    </el-table>

    <!-- 普通弹框 -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.dialogVisible"
      width="30%"
      :before-close="closeDialog">
      <span>{{ dialog.content }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogHandle">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 表单弹框 -->
    <el-dialog
      :title="dialogForm.title"
      :visible.sync="dialogForm.dialogVisible"
      width="60%"
      :before-close="closeDialogForm">
      <el-form ref="dialogForm" :model="form" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="form.addressName"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.addressPhone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.detailAddress"></el-input>
        </el-form-item>
        <el-form-item label="发货内容">
          <el-input v-model="form.productContent"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogFormHandle">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import toExcel from '@/utils/excel.js'
  export default {
    data() {
      return {
        tableData: [],
        form: {
          addressName: '',
          addressPhone: '',
          address: '',
          detailAddress: '',
          productContent: '默认发货两颗柚子（一红一白）'
        },
        dialog: {
          type: '',
          dialogVisible: false,
          title: "温馨提示",
          content: "确定退出登录吗？",
        },
        dialogForm: {
          type: '',
          dialogVisible: false,
          title: "编辑",
        },
        selAddressItem: {}
      }
    },
    mounted() {
      setTimeout(() => {
        if (this.$store.state.userInfo) {
          console.log(this.$store.state.userInfo)
          this.getData()
        }
      },500)
    },
    methods: {
      getData() {
        this.$axios
          .post(process.env.VUE_APP_BASE_API + "getAddressList", {
            phone: this.$store.state.userInfo.phone,
            tableNo: '001',
          })
          .then((res) => {
            console.log(res);
            this.tableData = res.data.data
            console.log(this.tableData)
          })
          .catch((err) => {
            console.log(err);
          });
      },
      printHandle() {
        toExcel.getExcel('#selectTable','导出的自定义标题')
      },
      logout() {
        this.dialog.type = 'logout'
        this.dialog.dialogVisible = true
        this.dialog.content = '确定退出登录吗？'
      },
      logoutHandle() {
        this.dialog.dialogVisible = false;
        this.$axios
          .post(process.env.VUE_APP_BASE_API + "logout", this.$store.state.userInfo)
          .then((res) => {
            if (res.data.code === 666) {
              this.$store.state.isLogin = false;
              this.$store.commit("clearUserInfo");
              this.$router.push({ path: "/" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      closeDialog() {
        this.dialog.dialogVisible = false;
      },
      closeDialogForm() {
        this.dialogForm.dialogVisible = false;
      },
      dialogHandle() {
        if (this.dialog.type === 'logout') {
          this.logoutHandle()
        } else if (this.dialog.type === 'delete') {
          this.$axios
            .post(process.env.VUE_APP_BASE_API + "delAddress", {
              id: this.selAddressItem.id,
            })
            .then((res) => {
              console.log(res);
              this.getData()
            })
            .catch((err) => {
              console.log(err);
            });
        }
        this.closeDialog()
      },
      dialogFormHandle() {
        if (this.dialogForm.type === 'add') {
          this.$axios
            .post(process.env.VUE_APP_BASE_API + "addAddress", {
              phone: this.$store.state.userInfo.phone,
              tableNo: '001',
              dateTime: this.$dayjs().format('YYYY-MM-DD hh:mm') + ':00',
              addressName: this.form.addressName,
              addressPhone: this.form.addressPhone,
              address: this.form.address,
              detailAddress: this.form.detailAddress,
              productContent: this.form.productContent
            })
            .then((res) => {
              console.log(res);
              this.getData()
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (this.dialogForm.type === 'edit') {
          this.$axios
            .post(process.env.VUE_APP_BASE_API + "editAddress", {
              id: this.form.id,
              addressName: this.form.addressName,
              addressPhone: this.form.addressPhone,
              address: this.form.address,
              detailAddress: this.form.detailAddress
            })
            .then((res) => {
              console.log(res);
              this.getData()
            })
            .catch((err) => {
              console.log(err);
            });
        }
        this.dialogForm.dialogVisible = false
      },
      addAddress() {
        this.dialogForm.type = 'add'
        this.dialogForm.title = '添加'
        this.dialogForm.dialogVisible = true
        this.form = {
          addressName: '',
          addressPhone: '',
          address: '',
          detailAddress: ''
        }
      },
      editAddress(item) {
        this.dialogForm.type = 'edit'
        this.dialogForm.title = '编辑'
        this.dialogForm.dialogVisible = true
        this.form = item
        console.log('editAddress', item)
      },
      delAddress(item) {
        console.log('delAddress', item)
        this.dialog.type = 'delete'
        this.dialog.content = '确定删除该地址吗？'
        this.dialog.dialogVisible = true
        this.selAddressItem = item
      }
    }
  }
</script>

<style lang="less" scoped>
</style>