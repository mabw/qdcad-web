<template>
  <div class="login-background">
    <el-card class="box-card">
      <el-form
        :model="ruleForm"
        :inline="true"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
      >
        <el-form-item label="用户名">
          <el-select v-model="ruleForm.userName" placeholder="请选择" prop="userName">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" prop="password" v-model="ruleForm.Password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <img src="https://open.saintic.com/api/bingPic/" height="100%" />
  </div>
</template>

<script>
export default {
  data() {
    var validateUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      ruleForm: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [{ validator: validateUserName, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../theme/_variables.scss";

.login-background {
  height: 100vh;
  width: 100vw;
  background-color: $grey;
  overflow: hidden;
}
.box-card {
  width: 610px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-305px, -200px);
}
</style>
