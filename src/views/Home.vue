<template>
  <el-container class="main-container">
    <el-header class="nav-menu-container">
      <div class="logo-title">青岛畅安达货运管理平台</div>
      <el-menu
        :default-active="activeIndex"
        class="nav-menu"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">运输计划</el-menu-item>
        <el-submenu index="2">
          <template slot="title"
            >对账管理</template
          >
          <el-menu-item index="2-1">集箱货对账</el-menu-item>
          <el-menu-item index="2-2">配散货对账</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            >账单管理</template
          >
          <el-menu-item index="3-1">应收账</el-menu-item>
          <el-menu-item index="payment">应付账</el-menu-item>
          <el-menu-item index="3-4">收入汇总</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"
            >车辆管理</template
          >
          <el-menu-item index="4-1">车辆信息</el-menu-item>
          <el-menu-item index="4-2">出车明细</el-menu-item>
        </el-submenu>
        <el-menu-item index="management">选项配置</el-menu-item>
      </el-menu>
      <div class="user-info">
        用户:马炳文
        <a href="#">退出</a>
      </div>
    </el-header>
    <el-main class="main-body">
      <router-view />
    </el-main>
  </el-container>
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

<style lang="scss" scoped>
.main-container {
  min-width: 1024px;
}
.main-body {
  padding-top: 60px;
}
.nav-menu-container {
  display: flex;
  background: #545c64;
  height: 60px;
  justify-content: space-around;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1500;
  min-width: 1024px;
  .logo-title {
    line-height: 60px;
    font-size: 24px;
    color: white;
    padding-left: 24px;
  }
  .user-info {
    color: white;
    font-size: 12px;
    line-height: 60px;
    a {
      color: white;
      text-decoration: none;
    }
    a:hover {
      color: #ffd04b;
    }
  }
}
</style>
