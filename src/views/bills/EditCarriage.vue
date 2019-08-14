<template>
  <el-dialog :title="title" :visible="status" @close="closeModal" fullscreen center>
    <el-form :model="form" status-icon :rules="rules" ref="form">
      <el-row :gutter="12">
        <el-col :span="5" :offset="4">
          <el-form-item label="托运单位（客户名称)" prop="departure">
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
        <el-col :span="7">
          <el-form-item label="货物名称" prop="departure">
            <el-tooltip effect="dark" content="选择或输入货物名称，新增货物名称会保存到选项中供下次使用" placement="top">
              <el-autocomplete
                class="w-100"
                v-model="form.clientName"
                :fetch-suggestions="(querySearchString,cb)=>querySearch(querySearchString,cb,clientNameOption)"
                placeholder="请输入或选择货物名称"
              ></el-autocomplete>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="货物重量(吨）" prop="departure">
            <el-tooltip effect="dark" content="选择或输入货物重量，新增货物重量会保存到选项中供下次使用" placement="top">
              <el-input placeholder="请输入重量" v-model="form.memo"></el-input>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="运费" prop="departure">
            <el-input placeholder="请输入运费" v-model="form.memo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="4" :offset="4">
          <el-form-item label="起点" prop="departure">
            <el-tooltip effect="dark" content="选择或输入起点，新增起点会保存到选项中供下次使用" placement="top">
              <el-autocomplete
                class="w-100"
                v-model="form.clientName"
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
import API from "@utils/apiService";
import dayjs from "dayjs";

export default {
  props: ["status", "direction"],
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
        yard: "",
        bill: "",
        vessel: "",
        vesselCN: "",
        voyage: "",
        containerSpec: "",
        shippingSchedule: "",
        measureDock: null,
        arrival: "",
        clientName: "",
        assignTime: "",
        arrivalTime: "",
        vehicleNumber: "",
        vehicleDriver: "",
        memo: ""
      },
      rules: {
        yard: [{ required: true, message: "请选择场站", trigger: "change" }],
        bill: [{ required: true, message: "请输入提单号", trigger: "change" }],
        vessel: [{ required: true, message: "请输入船名", trigger: "change" }],
        voyage: [{ required: true, message: "请输入航次", trigger: "change" }],
        containerSpec: [
          {
            required: true,
            message: "请选择或输入箱型",
            trigger: "change"
          }
        ],
        shippingSchedule: [
          { required: true, message: "请选择船期", trigger: "change" }
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
    info() {
      if (this.isChecking) {
        return "正在查询有无重复提单号...";
      } else if (this.duplicatedBills.count > 0) {
        return `查询到<strong>${this.duplicatedBills.count}</strong>条重复记录，点击查看`;
      } else if (this.duplicatedBills.count === 0) {
        return `没有相同提单号记录`;
      }
      return "";
    },
    title() {
      return "增加配货计划";
    },
    vehicleOwner() {
      return "畅安达";
    },
    containerSpecOption() {
      return this.$store.getters[
        "management/configurations"
      ].container_spec.map(item => ({ value: item.size + item.type }));
    },
    arrivalOption() {
      return this.$store.getters["management/configurations"].arrival.map(
        item => ({ value: item })
      );
    },
    clientNameOption() {
      return this.$store.getters["management/configurations"].client_name.map(
        item => ({ value: item })
      );
    },
    yardOption() {
      return this.$store.getters["management/configurations"].yard.map(
        item => ({ value: item.identity, label: item.name })
      );
    },
    billComputed: {
      get: function() {
        return this.form.bill;
      },
      set: function(value) {
        this.form.bill = value.toUpperCase();
      }
    },
    containerSpecComputed: {
      get: function() {
        return this.form.containerSpec;
      },
      set: function(value) {
        this.form.containerSpec = value.toUpperCase();
      }
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
    async saveNewBill() {
      let result = await this.$refs["form"].validate().catch(err => err);
      if (result) {
        const payload = this.form;
        payload.vehicleOwner = this.vehicleOwner;
        payload.direction = this.direction;
        payload.operator = "马";
        result = await this.$store.dispatch("bill/addNewBill", payload);
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
      const result = await this.saveNewBill();
      if (result) this.closeModal();
    },
    async handleSaveAndContinue() {
      const result = await this.saveNewBill();
      if (result) this.$refs["form"].resetFields();
    },

    async handleBlurAndCheck() {
      this.isChecking = true;
      const response = await API.get(
        `/check-bill/${this.form.bill.toUpperCase()}`
      );
      this.isChecking = false;
      if (response.ok) {
        this.duplicatedBills = response.data;
      } else {
        this.$message({
          message: "查询是否存在相同提单号失败，请稍候修改提单号后再试",
          type: "error"
        });
      }
    }
  }
};
</script>
