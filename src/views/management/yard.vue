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
        <br />标识符用于抓取场站信息，创建后不可删除及更改。
      </span>
    </template>
    <template #list>
      <el-table :data="configurations.yard" style="width: 100%">
        <el-table-column label="场站名称" width="200">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span v-show="edittingIndex !== scope.$index">{{ scope.row.name }}</span>
              <el-input
                v-show="scope.$index === edittingIndex"
                v-model="edittingData"
                size="mini"
                placeholder="场站名称"
                ref="scope.$index.toString()"
                @keyup.native.13="handleUpdateYard(scope.$index, scope.row)"
              ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="场站标识符" width="200">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">{{ scope.row.identity }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="edittingIndex !== scope.$index"
              @click="handleEditYard(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              v-else
              @click="handleUpdateYard(scope.$index, scope.row)"
            >保存</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template>
      <el-form status-icon :inline="true" :rules="rules" ref="formInline" :model="formInline">
        <el-form-item label="场站名称" prop="name">
          <el-input v-model="formInline.name" placeholder="场站名称"></el-input>
        </el-form-item>
        <el-form-item label="场站标识符" prop="identity">
          <el-input v-model="formInline.identity" placeholder="场站标识符"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSaveNewYard('formInline')">增加</el-button>
        </el-form-item>
      </el-form>
    </template>
  </management-slot>
</template>

<script>
import ManagementSlot from "@template/ManagemengSlot";
import { createNamespacedHelpers } from "vuex";

const { mapGetters } = createNamespacedHelpers("management");

export default {
  components: {
    "management-slot": ManagementSlot
  },
  computed: {
    ...mapGetters(["configurations"])
  },
  data() {
    return {
      edittingIndex: null,
      edittingData: "",
      formInline: {
        name: "",
        identity: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入场站名称", trigger: "change" }
        ],
        identity: [
          { required: true, message: "请输入标识符", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    handleEditYard(index, data) {
      this.edittingIndex = index;
      this.edittingData = data.name;
      console.log(this.$refs);
    },
    handleUpdateYard(index, data) {
      if (this.edittingData !== data.name) {
        const content = JSON.parse(
          JSON.stringify(this.configurations.yard)
        ).map(item => {
          if (item.identity === data.identity) {
            item.name = this.edittingData;
          }
          return item;
        });
        const payload = {
          type: "yard",
          content: { data: content }
        };
        this.$store.dispatch("management/saveConfigurations", payload);
      }
      this.edittingIndex = null;
      this.edittingData = null;
    },
    handleSaveNewYard(formInline) {
      this.$refs[formInline].validate(valid => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.configurations.yard));
          data.push({
            name: this.formInline.name,
            identity: this.formInline.identity
          });
          const payload = {
            type: "yard",
            content: { data }
          };
          this.$store.dispatch("management/saveConfigurations", payload);
        }
      });
    }
  }
};
</script>

<style></style>
