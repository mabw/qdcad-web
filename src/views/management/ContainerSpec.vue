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
        <el-table-column label="类型" width="150" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-radio-group
                v-if="scope.$index === edittingIndex"
                v-model="edittingFrozenComputed"
                size="mini"
                style="vertical-align: top"
              >
                <el-radio-button label="冻柜"></el-radio-button>
                <el-radio-button label="普柜"></el-radio-button>
              </el-radio-group>
              <el-tag v-else-if="scope.row.isFrozen" disable-transitions>冻柜</el-tag>
              <el-tag v-else-if="!scope.row.isFrozen" disable-transitions type="success">普柜</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="尺寸" width="150" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span v-if="edittingIndex !== scope.$index">{{ scope.row.size }}</span>
              <el-radio-group
                v-else
                v-model="edittingData.size"
                size="mini"
                style="vertical-align: top"
              >
                <el-radio-button label="20"></el-radio-button>
                <el-radio-button label="40"></el-radio-button>
              </el-radio-group>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="型号" width="100" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span v-show="edittingIndex !== scope.$index">{{ scope.row.type }}</span>
              <el-input
                v-show="scope.$index === edittingIndex"
                v-model="edittingTypeComputed"
                size="mini"
                placeholder="型号"
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
      <el-form
        status-icon
        :inline="true"
        :rules="rules"
        ref="formInline"
        :model="formInline"
        style="margin-top: 32px"
      >
        <el-form-item label="类型" prop="isFrozen" required>
          <el-radio-group v-model="isFrozenComputed" style="vertical-align: top">
            <el-radio-button label="冻柜"></el-radio-button>
            <el-radio-button label="普柜"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="尺寸" prop="size">
          <el-radio-group v-model="formInline.size" style="vertical-align: top">
            <el-radio-button label="20"></el-radio-button>
            <el-radio-button label="40"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="型号" prop="type">
          <el-input v-model.trim="typeComputed" placeholder="型号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSaveNew('formInline')">增加</el-button>
        </el-form-item>
      </el-form>
    </template>
  </management-slot>
</template>

<script>
// 箱型大写
// 是否支持查询
// 可排序
import ManagementSlot from "@template/ManagemengSlot";
import { mapGetters } from "vuex";

export default {
  props: ["type", "label", "title"],
  components: {
    "management-slot": ManagementSlot
  },
  computed: {
    ...mapGetters(["configurations"]),
    typeComputed: {
      get: function() {
        return this.formInline.type;
      },
      set: function(value) {
        this.formInline.type = value.toUpperCase();
      }
    },
    edittingTypeComputed: {
      get: function() {
        return this.edittingData.type;
      },
      set: function(value) {
        this.edittingData.type = value.toUpperCase();
      }
    },
    isFrozenComputed: {
      get: function() {
        if (this.formInline.isFrozen) {
          return "冻柜";
        }
        return "普柜";
      },
      set: function(value) {
        if (value === "冻柜") this.formInline.isFrozen = true;
        if (value === "普柜") this.formInline.isFrozen = false;
      }
    },
    edittingFrozenComputed: {
      get: function() {
        if (this.edittingData.isFrozen) {
          return "冻柜";
        }
        return "普柜";
      },
      set: function(value) {
        if (value === "冻柜") this.edittingData.isFrozen = true;
        if (value === "普柜") this.edittingData.isFrozen = false;
      }
    }
  },
  data() {
    const checkInputValue = (_, value, callback) => {
      if (!value) {
        return callback(new Error("请输入尺寸或类型名称"));
      }
      const sameSizeList = this.configurations[this.type].filter(
        item => item.size === this.formInline.size
      );
      const sameTypeList = sameSizeList.filter(
        item => item.type === this.formInline.type
      );
      if (sameTypeList.length > 0) {
        return callback(new Error("已存在相同箱型"));
      }
      callback();
    };
    return {
      edittingIndex: null,
      edittingData: {
        size: "",
        type: "",
        isFrozen: true
      },
      formInline: {
        size: "40",
        type: "",
        isFrozen: true
      },
      rules: {
        type: [
          { required: true, validator: checkInputValue, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    async handleRemove(index, rowData) {
      this.$refs[`popover-${index}`].doClose();
      const content = JSON.parse(
        JSON.stringify(this.configurations[this.type])
      );
      const data = content.filter(
        item => !(item.size === rowData.size && item.type === rowData.type)
      );
      const payload = {
        type: this.type,
        content: { data }
      };
      const result = await this.$store.dispatch("saveConfigurations", payload);
      if (result) {
        this.$message({
          type: "success",
          message: "删除成功"
        });
      }
    },
    handleEdit(index, data) {
      this.edittingIndex = index;
      this.edittingData = JSON.parse(JSON.stringify(data));
    },
    async handleUpdate(index, data) {
      if (JSON.stringify(this.edittingData) !== JSON.stringify(data)) {
        const sameSizeList = this.configurations[this.type].filter(
          item => item.size === this.edittingData.size
        );
        const sameTypeList = sameSizeList.filter(
          item => item.type === this.edittingData.type
        );
        if (sameTypeList.length > 0) {
          this.$message({
            type: "error",
            message: "存在重复的尺寸和型号, 请重新输入"
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
          "saveConfigurations",
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
      this.edittingData = { size: "", type: "", isFrozen: true };
    },
    async handleSaveNew(formInline) {
      let result = await this.$refs[formInline].validate().catch(err => err);
      if (result) {
        const data = JSON.parse(JSON.stringify(this.configurations[this.type]));
        data.push({ ...this.formInline });
        const payload = {
          type: this.type,
          content: { data }
        };
        result = await this.$store.dispatch("saveConfigurations", payload);
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
