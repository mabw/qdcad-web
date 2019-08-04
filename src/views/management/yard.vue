<template>
  <management-slot>
    <template #title>
      <h4>场站管理</h4>
    </template>
    <template #info>
      <span>
        场站标识符必须唯一。
        <br />场站创建后，只可以更改显示名称。
        <br />名称用于显示，一旦创建运输计划后，不会因此处名称更新而在运输计划内自动改变。
        <br />标识符用于抓取场站信息，创建后不可删除及更新。
      </span>
    </template>
    <template>
      <el-form
        status-icon
        :inline="true"
        :rules="rules"
        ref="formInline"
        :model="formInline"
      >
        <el-form-item label="场站名称" prop="yard">
          <el-input v-model="formInline.yard" placeholder="场站名称"></el-input>
        </el-form-item>
        <el-form-item label="场站标识符" prop="yard">
          <el-input
            v-model="formInline.yard"
            placeholder="场站标识符"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSaveData('formInline')"
            >增加</el-button
          >
        </el-form-item>
      </el-form>
    </template>
  </management-slot>
</template>

<script>
import ManagementSlot from "@template/ManagemengSlot";
export default {
  components: {
    "management-slot": ManagementSlot
  },
  data() {
    return {
      formInline: {
        yard: "",
        identity: ""
      },
      rules: {
        yard: [{ required: true, message: "请输入标识符", trigger: "blur" }],
        identity: [{ required: true, message: "请输入标识符", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSaveData(formInline) {
      this.$refs[formInline].validate(valid => {
        if (valid) {
          const { yard } = this.formInline;
          this.$emit("saveConfig", { yard });
        }
      });
    }
  }
};
</script>

<style></style>
