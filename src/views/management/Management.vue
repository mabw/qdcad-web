<template>
  <el-tabs tab-position="left">
    <el-tab-pane label="用户管理">用户管理</el-tab-pane>
    <el-tab-pane label="场站管理">场站管理</el-tab-pane>
    <el-tab-pane label="箱型管理">箱型管理</el-tab-pane>
    <el-tab-pane label="起点管理">起点管理</el-tab-pane>
    <el-tab-pane label="终点管理">终点管理</el-tab-pane>
    <el-tab-pane label="云港通管理">云港通管理</el-tab-pane>
    <el-tab-pane label="客户名称管理">客户名称管理</el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      tabPosition: "left"
    };
  }
};
</script>