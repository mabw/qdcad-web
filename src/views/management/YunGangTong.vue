<template>
  <management-slot>
    <template #title>
      <h4>云港通账号管理</h4>
    </template>
    <template #info>
      <span>需要正确的云港通账号来保证测温、船期查询的正常运行</span>
    </template>
    <el-form status-icon :inline="true" :rules="rules" ref="formInline" :model="formInline">
      <el-form-item label="云港通账号" prop="user">
        <el-input v-model.trim="formInline.user" placeholder="云港通账号"></el-input>
      </el-form-item>
      <el-form-item label="云港通密码" prop="password">
        <el-input v-model.trim="formInline.password" placeholder="云港通密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSaveData('formInline')">保存</el-button>
      </el-form-item>
    </el-form>
  </management-slot>
</template>

<script>
import ManagementSlot from "@template/ManagemengSlot";
import { mapGetters } from "vuex";

export default {
  components: {
    "management-slot": ManagementSlot
  },
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      },
      rules: {
        user: [
          { required: true, message: "请输入云港通账号", trigger: "change" },
          { len: 11, message: "手机号位数不正确" }
        ],
        password: [
          {
            required: true,
            message: "请输入云港通密码",
            trigger: "change"
          },
          { max: 25, min: 6, message: "长度必须处于6到25位之间" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["configurations"])
  },
  methods: {
    handleSaveData(formInline) {
      this.$refs[formInline].validate(valid => {
        if (valid) {
          const { user, password } = this.formInline;
          const payload = {
            type: "yun_gang_tong",
            content: { data: { user, password } }
          };
          this.$store.dispatch("saveConfigurations", payload);
        }
      });
    }
  },
  watch: {
    configurations: {
      handler(data) {
        if (data && data.yun_gang_tong) {
          this.formInline.user = data.yun_gang_tong.user;
          this.formInline.password = data.yun_gang_tong.password;
        }
      },
      immediate: true
    }
  }
};
</script>

<style></style>
