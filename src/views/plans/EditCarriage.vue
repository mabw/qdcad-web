<template>
  <el-dialog :title="title" :visible="status" @close="closeModal" fullscreen center>
    <el-row>
      <el-col :span="24">
        <el-table :data="billData" style="width: 100%" border>
          <el-table-column prop="assignTime" label="派车日期"></el-table-column>
          <el-table-column prop="arrivalTime" label="到厂日期"></el-table-column>
          <el-table-column prop="bill" label="提单号"></el-table-column>
          <el-table-column prop="clientName" label="托运单位"></el-table-column>
          <el-table-column prop="yard" label="场站"></el-table-column>
          <el-table-column prop="arrival" label="止点地址"></el-table-column>
          <el-table-column prop="shippingSchedule" label="船期"></el-table-column>
          <el-table-column prop="containerSpec" label="箱型"></el-table-column>
          <el-table-column prop="vehicleNumber" label="车号"></el-table-column>
          <el-table-column prop="vehicleDriver" label="驾驶员"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-form :model="form" status-icon :rules="rules" ref="form" class="carriage-form">
      <el-row :gutter="12">
        <el-col :span="4" :offset="4">
          <el-form-item label="托运单位（客户名称）" prop="clientName">
            <el-tooltip effect="dark" content="选择或输入客户名称，新增客户名称会保存到选项中供下次使用" placement="top">
              <el-autocomplete
                class="w-100"
                v-model="form.clientName"
                :fetch-suggestions="(querySearchString,cb)=>querySearch(querySearchString,cb,clientNameOption)"
                placeholder="请输入或选择客户名称"
              ></el-autocomplete>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="货物名称" prop="carriageName">
            <el-tooltip effect="dark" content="选择或输入货物名称，新增货物名称会保存到选项中供下次使用" placement="top">
              <el-autocomplete
                class="w-100"
                v-model="form.carriageName"
                :fetch-suggestions="(querySearchString,cb)=>querySearch(querySearchString,cb,clientNameOption)"
                placeholder="请输入或选择货物名称"
              ></el-autocomplete>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="货物重量(吨）" prop="carriageWeight">
            <el-tooltip effect="dark" content="选择或输入货物重量，新增货物重量会保存到选项中供下次使用" placement="top">
              <el-input placeholder="请输入货物重量" v-model="form.carriageWeight"></el-input>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="运费单价" prop="carriagePricePerTon">
            <el-input placeholder="请输入运费单价" v-model="form.carriagePricePerTon"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="4" :offset="4">
          <el-form-item label="起点" prop="departure">
            <el-tooltip effect="dark" content="选择或输入起点，新增起点会保存到选项中供下次使用" placement="top">
              <el-autocomplete
                class="w-100"
                v-model="form.departure"
                :fetch-suggestions="(querySearchString,cb)=>querySearch(querySearchString,cb,clientNameOption)"
                placeholder="请输入或选择起点"
              ></el-autocomplete>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="终点" prop="arrival">
            <el-tooltip effect="dark" content="选择或输入终点，新增终点会保存到选项中供下次使用" placement="top">
              <el-autocomplete
                class="w-100"
                v-model="form.arrival"
                :fetch-suggestions="(querySearchString,cb)=>querySearch(querySearchString,cb,arrivalOption)"
                placeholder="请输入或选择终点"
              ></el-autocomplete>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="派车日期" prop="assignTime">
            <el-date-picker
              class="w-100"
              v-model="form.assignTime"
              type="date"
              placeholder="请选择派车日期"
              :clearable="false"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="到厂日期" prop="arrivalTime">
            <el-date-picker
              class="w-100"
              v-model="form.arrivalTime"
              type="date"
              placeholder="请选择到厂日期"
              :clearable="false"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form-item label="备注">
            <el-input
              placeholder="添加备注"
              type="textarea"
              :autosize="{ minRows: 2}"
              v-model="form.memo"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModal">取消并返回</el-button>
      <el-button @click="handleSaveAndClose" type="primary">保存后返回</el-button>
      <el-button @click="handleSaveAndContinue" type="primary">保存后再新添</el-button>
    </div>
  </el-dialog>
</template>

<script>
import dayjs from "dayjs";

// TODO: 增货物重和货运单位的输入限制和数字验证, 改变下拉项的选项
// 焦点自动全选，位置靠右
// 转换场站名字为中文

export default {
  props: ["status", "bill"],
  data() {
    const checkAssignTime = (_, value, callback) => {
      if (!value) {
        return callback(new Error("请选择派车时间"));
      } else if (dayjs(value).isAfter(dayjs(this.form.arrivalTime))) {
        return callback(new Error("派车日期不能晚于到厂日期"));
      } else if (this.form.arrivalTime) {
        this.$refs["form"].clearValidate("arrivalTime");
      }
      callback();
    };
    const checkArrivalTime = (_, value, callback) => {
      if (!value) {
        return callback(new Error("请选择到厂时间"));
      } else if (dayjs(value).isBefore(dayjs(this.form.assignTime))) {
        return callback(new Error("到厂日期不能早于派车日期"));
      } else if (this.form.assignTime) {
        this.$refs["form"].clearValidate("assignTime");
      }
      callback();
    };
    return {
      isChecking: false,
      form: {
        carriageName: "",
        carriageWeight: "",
        carriagePricePerTon: "",
        departure: "",
        arrival: "",
        clientName: "",
        assignTime: "",
        arrivalTime: "",
        memo: ""
      },
      rules: {
        carriageName: [
          { required: true, message: "请选择货物名称", trigger: "change" }
        ],
        carriageWeight: [
          {
            required: true,
            message: "请输入货物重量",
            trigger: "change"
          }
        ],
        carriagePricePerTon: [
          {
            required: true,
            message: "请输入运费单价",
            trigger: "change"
          }
        ],
        departure: [
          { required: true, message: "请输入起点", trigger: "change" }
        ],
        arrival: [
          {
            required: true,
            message: "请选择或输入终点",
            trigger: "change"
          }
        ],
        clientName: [
          {
            required: true,
            message: "请选择或输入客户名称",
            trigger: "change"
          }
        ],
        assignTime: [
          {
            required: true,
            validator: checkAssignTime,
            trigger: "change"
          }
        ],
        arrivalTime: [
          { required: true, validator: checkArrivalTime, trigger: "change" }
        ]
      },
      duplicatedBills: {},
      formLabelWidth: "80px"
    };
  },
  computed: {
    billData() {
      return [this.bill];
    },
    title() {
      return "增加配货计划";
    },
    arrivalOption() {
      return this.$store.getters["configurations"].arrival.map(item => ({
        value: item
      }));
    },
    clientNameOption() {
      return this.$store.getters["configurations"].client_name.map(item => ({
        value: item
      }));
    }
  },
  methods: {
    createFilter(queryString) {
      return option => {
        return (
          option.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    closeModal() {
      this.$emit("update:status", false);
    },
    querySearch(queryString, cb, option) {
      const result = queryString
        ? option.filter(this.createFilter(queryString))
        : option;
      cb(result);
    },
    async saveNewCarriage() {
      let result = await this.$refs["form"].validate().catch(err => err);
      if (result) {
        const payload = this.form;
        payload.billId = this.bill.id;
        payload.operator = "马";
        result = await this.$store.dispatch("addNewCarriage", payload);
        if (result) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
        }
      }

      return result;
    },
    async handleSaveAndClose() {
      const result = await this.saveNewCarriage();
      if (result) this.closeModal();
      this.$store.dispatch("getPlanList");
    },
    async handleSaveAndContinue() {
      const result = await this.saveNewCarriage();
      if (result) this.$refs["form"].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.carriage-form {
  margin-top: 48px;
}
</style>
