<template>
  <el-tabs tab-position="left">
    <el-tab-pane label="场站管理">
      <yard-list />
    </el-tab-pane>
    <el-tab-pane label="箱型管理">
      <container-spec />
    </el-tab-pane>
    <el-tab-pane label="用户管理">
      <users-list />
    </el-tab-pane>
    <el-tab-pane label="起点管理">
      <departure-list />
    </el-tab-pane>
    <el-tab-pane label="终点管理">
      <arrival-list />
    </el-tab-pane>
    <el-tab-pane label="云港通管理">
      <yun-gang-tong />
    </el-tab-pane>
    <el-tab-pane label="客户名称管理">
      <client-name-list />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import UserList from "./Users";
import ArrivalList from "./Arrival";
import DepartureList from "./Departure";
import YunGangTong from "./YunGangTong";
import ContainerSpec from "./ContainerSpec";
import YardList from "./yard";
import ClientNameList from "./ClientName";

export default {
  components: {
    "users-list": UserList,
    "arrival-list": ArrivalList,
    "departure-list": DepartureList,
    "yun-gang-tong": YunGangTong,
    "container-spec": ContainerSpec,
    "yard-list": YardList,
    "client-name-list": ClientNameList
  }
};
</script>
