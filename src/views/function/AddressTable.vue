<!--
 * @Author: 张泽基 m15105958776_1@163.com
 * @Date: 2022-06-28 15:12:09
 * @LastEditors: 张泽基 m15105958776_1@163.com
 * @LastEditTime: 2022-08-10 19:55:18
 * @FilePath: /20220611/src/views/home/userManage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="table-block user-manage">
    <div class="table-todo">
        <el-button type="primary" @click="createTable">添加表</el-button>
        <el-button type="primary" @click="refreshList">刷新列表</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="表码"> </el-table-column>
      <el-table-column prop="tableNo" label="表号"> </el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
    </el-table>
    <!-- 表单弹框 -->
    <el-dialog
      :title="dialogForm.title"
      :visible.sync="dialogForm.dialogVisible"
      width="60%"
      :before-close="closeDialogForm"
    >
      <el-form ref="dialogForm" :model="form" label-width="100px">
        <el-form-item label="表格编号">
          <el-input v-model="form.tableNo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogFormHandle">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dialogForm: {
        type: "",
        dialogVisible: false,
        title: "编辑",
      },
      form: {
        tableNo: "",
      }
    };
  },
  mounted() {
    this.refreshList();
  },
  methods: {
    refreshList() {
      this.$axios
      .post(process.env.VUE_APP_BASE_API + "getProductTable", {
        phone: this.$store.state.userInfo.phone,
      })
      .then((res) => {
        this.tableData = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    },
    closeDialogForm() {
      this.dialogForm.dialogVisible = false
    },
    createTable() {
      this.dialogForm.dialogVisible = true
    },
    dialogFormHandle() {
      this.$axios
      .post(process.env.VUE_APP_BASE_API + "addProductTable", {
        phone: this.$store.state.userInfo.phone,
        tableNo: this.form.tableNo,
      })
      .then((res) => {
        console.log(res)
        this.$message(res.data.message)
        this.closeDialogForm()
        this.refreshList()
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
};
</script>

<style lang="less" scoped>
.user-manage {
  padding: 10px;
  .table-todo {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
