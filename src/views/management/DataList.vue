<template>
  <management-slot>
    <template #title>
      <h4>{{label}}</h4>
    </template>
    <template #info>
      <span>
        {{title}}在运输计划输入时自动添加，也可以在此处添加及维护。
        <br />
        {{title}}改变及增加仅作用于将来新增加的运输计划
      </span>
    </template>
    <template #list>
      <el-table :data="configurations[type]" style="width: 100%">
        <el-table-column :label="title" width="200">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span v-show="edittingIndex !== scope.$index">{{ scope.row }}</span>
              <el-input
                v-show="scope.$index === edittingIndex"
                v-model="edittingData"
                size="mini"
                :placeholder="title"
                @keyup.native.13="handleUpdate(scope.$index, scope.row)"
              ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="edittingIndex !== scope.$index"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              v-else
              @click="handleUpdate(scope.$index, scope.row)"
            >保存</el-button>
            <el-popover placement="top" width="200" :ref="`popover-${scope.$index}`">
              <p>删除以后不可恢复，确定吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
                >取消</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleRemove(scope.$index, scope.row)"
                >确定</el-button>
              </div>
              <el-button slot="reference" size="mini" type="danger" style="margin-left: 12px">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template>
      <el-form status-icon :inline="true" :rules="rules" ref="formInline" :model="formInline">
        <el-form-item :label="title" prop="name">
          <el-input v-model="formInline.name" :placeholder="title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSaveNew('formInline')">增加</el-button>
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
  props: ["type", "label", "title"],
  components: {
    "management-slot": ManagementSlot
  },
  computed: {
    ...mapGetters(["configurations"])
  },
  data() {
    const checkInputValue = (_, value, callback) => {
      if (!value) {
        return callback(new Error(`请输入${this.title}`));
      } else if (
        this.configurations[this.type].findIndex(item => item === value) >= 0
      ) {
        return callback(new Error(`已存在相同${this.title}`));
      }
      callback();
    };
    return {
      edittingIndex: null,
      edittingData: "",
      formInline: {
        name: ""
      },
      rules: {
        name: [
          { required: true, validator: checkInputValue, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    async handleRemove(index, data) {
      this.$refs[`popover-${index}`].doClose();
      const content = new Set(
        JSON.parse(JSON.stringify(this.configurations[this.type]))
      );
      content.delete(data);
      const payload = {
        type: this.type,
        content: { data: Array.from(content) }
      };
      const result = await this.$store.dispatch(
        "management/saveConfigurations",
        payload
      );
      if (result) {
        this.$message({
          type: "success",
          message: "删除成功"
        });
      }
    },
    handleEdit(index, data) {
      this.edittingIndex = index;
      this.edittingData = data;
    },
    async handleUpdate(index, data) {
      if (this.edittingData !== data) {
        const sameDataList = this.configurations[this.type].filter(
          item => item === this.edittingData
        );
        if (sameDataList.length > 0) {
          this.$message({
            type: "error",
            message: `存在重复的${this.title}, 请重新输入`
          });
          return;
        }
        const content = JSON.parse(
          JSON.stringify(this.configurations[this.type])
        );
        content[index] = this.edittingData;
        const payload = {
          type: this.type,
          content: { data: content }
        };
        const result = await this.$store.dispatch(
          "management/saveConfigurations",
          payload
        );
        if (result) {
          this.$message({
            type: "success",
            message: "更新成功"
          });
        }
      }
      this.edittingIndex = null;
      this.edittingData = null;
    },
    async handleSaveNew(formInline) {
      let result = await this.$refs[formInline].validate().catch(err => err);
      if (result) {
        const data = new Set(
          JSON.parse(JSON.stringify(this.configurations[this.type]))
        );
        data.add(this.formInline.name);
        const payload = {
          type: this.type,
          content: { data: Array.from(data) }
        };
        const result = await this.$store.dispatch(
          "management/saveConfigurations",
          payload
        );
        if (result) {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.$refs["formInline"].resetFields();
        }
      }
    }
  }
};
</script>
