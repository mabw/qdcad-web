<template>
  <el-tabs tab-position="left">
    <el-tab-pane label="场站管理">
      <yard-list />
    </el-tab-pane>
    <el-tab-pane label="箱型管理">
      <container-spec type="container_spec" title="箱型" label="箱型管理" />
    </el-tab-pane>
    <el-tab-pane label="用户管理">
      <users-list />
    </el-tab-pane>
    <el-tab-pane label="云港通管理">
      <yun-gang-tong />
    </el-tab-pane>
    <el-tab-pane label="起点管理">
      <data-list type="departure" title="起点名称" label="起点管理" />
    </el-tab-pane>
    <el-tab-pane label="终点管理">
      <data-list type="arrival" title="终点名称" label="终点管理" />
    </el-tab-pane>
    <el-tab-pane label="客户名称管理">
      <data-list type="client_name" title="客户名称" label="客户名称管理" />
    </el-tab-pane>
    <el-tab-pane label="常用货物名称">
      <data-list type="carriage_name" title="货物名称" label="常用货物名称" />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import UserList from "./Users";
import DataList from "./DataList";
import YunGangTong from "./YunGangTong";
import ContainerSpec from "./ContainerSpec";
import YardList from "./yard";

export default {
  components: {
    "users-list": UserList,
    "data-list": DataList,
    "yun-gang-tong": YunGangTong,
    "container-spec": ContainerSpec,
    "yard-list": YardList
  }
};
</script>
