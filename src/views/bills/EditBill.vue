<template>
  <el-dialog :title="title" :visible="status" @close="closeModal" fullscreen center>
    <el-form :model="form" status-icon :rules="rules" ref="form">
      <el-row :gutter="12">
        <el-col :span="5">
          <el-tooltip effect="dark" content="选择场站后输入提单号，点击按钮可自动查询并填充信息" placement="top">
            <el-form-item label="场站名称" :label-width="formLabelWidth" prop="yard">
              <el-select v-model="form.yard" placeholder="请选择场站">
                <el-option
                  v-for="item in yardOption"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-tooltip>
        </el-col>
        <el-col :span="9">
          <el-tooltip effect="dark" content="输入提单号，失去焦点后会自动查询是否有重复提单记录" placement="top">
            <el-form-item label="提 单 号" :label-width="formLabelWidth" prop="bill">
              <el-input
                v-model="billComputed"
                placeholder="请填写提单号"
                clearable
                @blur="handleBlurAndCheck"
              ></el-input>
            </el-form-item>
          </el-tooltip>
        </el-col>
        <el-col :span="3">
          <el-button class="w-100" type="success" icon="el-icon-search" @click="closeModal">查询提单信息</el-button>
        </el-col>
        <el-col :span="7">
          <el-alert close-text="知道了" v-if="info" :closable="false" v-html="info">
            {{info}}
            <br />
            {{info}}
          </el-alert>
        </el-col>
      </el-row>
      <el-row :gutter="12">
        <el-col :span="4">
          <el-form-item label="英文船名" prop="vessel">
            <el-input v-model="form.vessel" placeholder="请填写英文船名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="中文船名">
            <el-input v-model="form.vesselCN" placeholder="请填写中文船名" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="航次" prop="voyage">
            <el-input v-model="form.voyage" placeholder="请填写航次" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="箱型" prop="containerSpec">
            <el-tooltip effect="dark" content="选择或输入箱型，新增箱型会保存到选项中供下次使用" placement="top">
              <el-autocomplete
                class="w-100"
                v-model="containerSpecComputed"
                :fetch-suggestions="(querySearchString,cb)=>querySearch(querySearchString,cb,containerSpecOption)"
                placeholder="请输入或选择箱型"
              ></el-autocomplete>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="船期" prop="shippingSchedule">
            <el-date-picker
              class="w-100"
              v-model="form.shippingSchedule"
              type="date"
              placeholder="选择船期"
              :clearable="false"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="测温码头">
            <el-select class="w-100" v-model="form.measureDock" placeholder="请选择测温码头" clearable>
              <el-option label="QQCT" value="QQCT"></el-option>
              <el-option label="QQCTU" value="QQCTU"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="12">
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
          <el-form-item label="托运单位(客户名称)" prop="clientName">
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
        <el-col :span="4">
          <el-form-item label="分配车辆">
            <el-tooltip effect="dark" content="如所选车辆不在列表中，需要到选择配置页面添加，可稍候分配车辆" placement="top">
              <el-select class="w-100" v-model="form.vehicleNumber" placeholder="请选择车辆" clearable>
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="驾驶员">
            <el-select class="w-100" v-model="form.vehicleDriver" placeholder="请选择驾驶员" clearable>
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="备注">
          <el-input
            placeholder="添加备注"
            type="textarea"
            :autosize="{ minRows: 2}"
            v-model="form.memo"
          ></el-input>
        </el-form-item>
      </el-row>
    </el-form>保存更改，删除此记录
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
      return "增加" + this.direction + "计划";
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
