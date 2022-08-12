<template>
  <div class="home">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">地址管理</el-menu-item>
      <el-menu-item index="2">收获内容</el-menu-item>
      <el-menu-item index="3">表格管理</el-menu-item>
    </el-menu>
    <div class="menu-content">
      <Address v-show="pageIndex === '1'" />
      <Product v-show="pageIndex === '2'" />
      <AddressTable v-show="pageIndex === '3'" />
    </div>
  </div>
</template>

<script>
import Address from './function/Address'
import Product from './function/Product'
import AddressTable from './function/AddressTable'

export default {
  name: "Home",
  components: {
    Address,
    Product,
    AddressTable,
  },
  data() {
    return {
      activeIndex2: '1',
      pageIndex: '1'
    }
  },
  methods: {
    handleSelect(val) {
      this.pageIndex = val
    }
  }
};
</script>

<style lang="less" scoped>
.menu-content {
  padding: 10px;
}
</style>
