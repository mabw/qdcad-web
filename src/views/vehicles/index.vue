<template>
  <management-slot>
    <template #title>
      <h4>车辆信息管理</h4>
    </template>
    <template #info>
      <span>车辆信息的改变及增加仅作用于将来新增加的运输计划</span>
    </template>
    <template #list>
      <el-table :data="vehicleList" style="width: 100%" stripe>
        <el-table-column label="车牌号" prop="vehicleNumber" align="center"></el-table-column>
        <el-table-column label="驾驶员姓名" prop="driverName" align="center"></el-table-column>
        <el-table-column label="驾驶员手机号" prop="driverMobile" align="center"></el-table-column>
        <el-table-column label="车主" prop="vehicleOwner" align="center"></el-table-column>
        <el-table-column>
          <template slot="header">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-truck"
              @click="showModal = true"
            >增加新车辆</el-button>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popover placement="top" width="200" :ref="`popover-${scope.$index}`">
              <p>确定要删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
                >取消</el-button>
                <el-button type="primary" size="mini" @click="handleRemove(scope.row.id)">确定</el-button>
              </div>
              <el-button slot="reference" size="mini" type="danger" style="margin-left: 12px">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <modal-edit-vehicle v-if="showModal" :status.sync="showModal" :data="edittingData"></modal-edit-vehicle>
    </template>
  </management-slot>
</template>

<script>
import EditVehicle from "./EditVehicle";
import ManagementSlot from "@template/ManagemengSlot";

export default {
  components: {
    "management-slot": ManagementSlot,
    "modal-edit-vehicle": EditVehicle
  },
  computed: {
    vehicleList() {
      return this.$store.state.vehicles.data;
    }
  },
  data() {
    return {
      showModal: false,
      edittingData: null
    };
  },
  methods: {
    handleEdit(data) {
      this.edittingData = JSON.parse(JSON.stringify(data));
      this.showModal = true;
    },
    handleRemove(id) {
      this.$store.dispatch("deleteVehicle", id);
    }
  }
};
</script>
