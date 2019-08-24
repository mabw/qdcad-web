<template>
  <div>
    <modal-edit-carriage
      v-if="showEditCarriageModal"
      :status.sync="showEditCarriageModal"
      :bill="currentRow"
    />
    <el-table :data="tableListData" height="100vh" max-height="78vh" highlight-current-row border>
      <el-table-column fixed label="派车日期" width="100" align="center">
        <el-table-column label="到厂日期" width="100" align="center">
          <template slot-scope="scope">
            <div>
              <div>{{scope.row.assignTime}}</div>
              <div>{{scope.row.arrivalTime}}</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column fixed label="提单号" width="200" align="center">
        <el-table-column label="类型" width="200" align="center">
          <template slot-scope="scope">
            <div>
              <div>{{scope.row.bill}}</div>
              <el-tag size="mini">{{scope.row.direction}}</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="clientName" label="托运单位" width="100" align="center"></el-table-column>
      <el-table-column label="场站/起点" width="120" align="center">
        <el-table-column label="止点地址" width="120" align="center">
          <template slot-scope="scope">
            <div>
              <div>{{scope.row.yard}}</div>
              <div style="border-top: 1px solid #EBEEF5; width: 100%">{{scope.row.arrival}}</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="assignTime" label="船期" width="100" align="center"></el-table-column>
      <el-table-column prop="containerSpec" label="箱型" width="60" align="center"></el-table-column>
      <el-table-column label="英文船名" align="center">
        <el-table-column label="中文船名" align="center">
          <template slot-scope="scope">
            <div>
              <div>{{scope.row.vessel}}</div>
              <div>{{scope.row.vesselCn}}</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="voyage" label="航次" align="center"></el-table-column>
      <el-table-column label="车号" width="120" align="center">
        <el-table-column label="驾驶员" width="120" align="center">
          <template slot-scope="scope">
            <div>
              <div>{{scope.row.vehicleNumber}}</div>
              <div>{{scope.row.vehicleDriver}}</div>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="freightCharge" label="运费" align="center"></el-table-column>
      <el-table-column prop="prepaidFee" label="代垫费用" align="center"></el-table-column>
      <el-table-column prop="assignmentExpense" label="外派运费" align="center"></el-table-column>
      <el-table-column prop="vehicleOwner" label="外派单位" width="120" align="center"></el-table-column>
      <el-table-column prop="memo" label="备注" max-width="300" align="center"></el-table-column>
      <el-table-column fixed="right" label="管理" align="center" width="100">
        <template slot-scope="scope">
          <el-dropdown trigger="click" @command="(action)=>handleActionClick(action, scope.row)">
            <el-button type="primary" size="mini" class="el-dropdown-link">
              动作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-circle-plus-outline" command="addCarriage">添加配货</el-dropdown-item>
              <el-dropdown-item icon="el-icon-truck" command="assignvehicle">分配车辆</el-dropdown-item>
              <el-dropdown-item icon="el-icon-message" command="sendMessage">发送短信</el-dropdown-item>
              <el-dropdown-item icon="el-icon-search" command="queryTemperature">查询测温</el-dropdown-item>
              <el-dropdown-item icon="el-icon-tickets" command="editMemo">修改备注</el-dropdown-item>
              <el-dropdown-item icon="el-icon-edit-outline" command="editBill" divided>修改本条</el-dropdown-item>
              <el-dropdown-item icon="el-icon-delete" command="deleteBill">删除本条</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import EditCarriage from "./EditCarriage";

export default {
  components: {
    "modal-edit-carriage": EditCarriage
  },
  data() {
    return {
      showEditCarriageModal: false,
      currentRow: null
    };
  },
  computed: {
    tableListData() {
      const result = this.$store.getters.filteredBillList();
      return result;
    }
  },
  methods: {
    handleActionClick(action, rowData) {
      this.currentRow = rowData;
      switch (action) {
        case "addCarriage":
          this.showEditCarriageModal = true;
          break;
        default:
          console.log("e: ", action, rowData);
          break;
      }
    }
  }
};
</script>