<template>
  <el-dialog
    title="车辆分配"
    :visible="status"
    @close="closeModal"
    center
    :close-on-click-modal="false"
  >
    <el-form :model="form" status-icon :rules="rules" ref="form">
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="车牌号" prop="vehicleNumber">
            <el-input v-model.trim="vehicleNumberComputed" placeholder="请填写车牌号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="驾驶员姓名" prop="driverName">
            <el-input v-model.trim="form.driverName" placeholder="请填写驾驶员姓名" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item label="驾驶员手机号" prop="driverMobile">
            <el-input v-model.trim="form.driverMobile" placeholder="请填写驾驶员手机号" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车主" prop="vehicleOwner">
            <el-autocomplete
              class="w-100"
              v-model.trim="form.vehicleOwner"
              :fetch-suggestions="(querySearchString,cb)=>querySearch(querySearchString,cb,vehicleOwnerOption)"
              placeholder="请输入或选择车主"
            ></el-autocomplete>
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
export default {
  props: ["status", "data"],
  data() {
    const checkUniqVehicleNumber = (_, value, callback) => {
      if (!value) {
        return callback(new Error("请填写车牌号"));
      } else if (
        this.$store.state.vehicles.data.findIndex(
          item => item.vehicleNumber === value.trim()
        ) > -1 &&
        !this.edittingIndex
      ) {
        return callback(new Error("已存在相同车号"));
      }
      callback();
    };
    return {
      edittingIndex: null,
      form: {
        vehicleNumber: "",
        driverName: "",
        vehicleOwner: "",
        driverMobile: ""
      },
      rules: {
        vehicleNumber: [
          {
            required: true,
            validator: checkUniqVehicleNumber,
            trigger: "change"
          }
        ],
        driverName: [
          { required: true, message: "请填写驾驶员姓名", trigger: "change" }
        ],
        vehicleOwner: [
          { required: true, message: "请输入或选择车主", trigger: "change" }
        ],
        driverMobile: [
          {
            required: true,
            pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
            transform(value) {
              return value.trim();
            },
            message: "请正确填写驾驶员手机号",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    vehicleNumberComputed: {
      get: function() {
        return this.form.vehicleNumber;
      },
      set: function(value) {
        this.form.vehicleNumber = value.toUpperCase();
      }
    },
    vehicleOwnerOption() {
      const ownerList = this.$store.state.vehicles.data.map(
        item => item.vehicleOwner
      );
      return Array.from(new Set(ownerList)).map(item => ({
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
    async saveNewVehicle() {
      let result = await this.$refs["form"].validate().catch(err => err);
      if (result) {
        const payload = this.form;
        payload.id = this.edittingIndex;
        if (this.edittingIndex) {
          result = await this.$store.dispatch("updateVehicle", payload);
        } else {
          result = await this.$store.dispatch("addNewVehicle", payload);
        }
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
      const result = await this.saveNewVehicle();
      if (result) this.closeModal();
    },
    async handleSaveAndContinue() {
      const result = await this.saveNewVehicle();
      if (result) this.$refs["form"].resetFields();
      this.edittingIndex = false;
      this.form.vehicleNumber = "";
      this.form.driverName = "";
      this.form.driverMobile = "";
      this.form.vehicleOwner = "";
    }
  },
  watch: {
    data: {
      handler(value) {
        if (value) {
          this.edittingIndex = value.id;
          this.form.vehicleNumber = value.vehicleNumber;
          this.form.driverName = value.driverName;
          this.form.driverMobile = value.driverMobile;
          this.form.vehicleOwner = value.vehicleOwner;
        }
      },
      immediate: true
    }
  }
};
</script>
