<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/">运输计划</el-menu-item>
      <el-submenu index="2">
        <template slot="title">账单管理</template>
        <el-menu-item index="2-1">应收账</el-menu-item>
        <el-menu-item index="2-2">应付账</el-menu-item>
        <el-menu-item index="2-3">配货汇总</el-menu-item>
        <el-menu-item index="2-4">收入汇总</el-menu-item>
      </el-submenu>
      <el-menu-item index="/login">车辆管理</el-menu-item>
      <el-menu-item index="payment">选项配置</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "/"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key;
    }
  }
};
</script>
