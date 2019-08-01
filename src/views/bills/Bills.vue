<template>
  <div class="bills-container">
    <div class="bills-title">
      <div>
        <el-button type="text" @click="handleShowFilter"
          >展开/折叠筛选条件</el-button
        >
      </div>
      <div>
        <strong>运输计划</strong>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-edit" size="small"
          >新增出口计划</el-button
        >
        <el-button type="primary" icon="el-icon-edit" size="small"
          >新增进口计划</el-button
        >
        <el-button type="primary" icon="el-icon-download" size="small"
          >导出Excel</el-button
        >
      </div>
    </div>
    <div class="bills-filter" v-show="showFilter">
      <el-date-picker
        v-model="rangDate"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="small"
        @change="handleDateChange"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <el-input
        placeholder="按提单号搜索"
        size="small"
        v-model="searchBillById"
        class="input-with-select"
        clearable
      >
        <el-select
          v-model="searchType"
          slot="prepend"
          placeholder="请选择"
          class="bill-search-type"
        >
          <el-option label="当前页搜索" value="a1"></el-option>
          <el-option label="全站搜索" value="a2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-select
        v-model="vesselNumbers"
        multiple
        collapse-tags
        size="small"
        style="margin-left: 20px;"
        placeholder="按车号筛选"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select
        v-model="clientName"
        multiple
        collapse-tags
        size="small"
        style="margin-left: 20px;"
        placeholder="按客户名称筛选"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select
        v-model="direction"
        multiple
        collapse-tags
        size="small"
        style="margin-left: 20px;"
        placeholder="按进出口类型筛选"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select
        v-model="containerType"
        multiple
        collapse-tags
        size="small"
        style="margin-left: 20px;"
        placeholder="按箱型筛选"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-edit" size="small"
        >清除所有筛选条件</el-button
      >
    </div>
    <div class="bills-list">list</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFilter: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      rangDate: "",
      searchBillById: "",
      searchType: "a1",
      vesselNumbers: [],
      clientName: [],
      direction: [],
      containerType: []
    };
  },
  methods: {
    handleDateChange(e) {
      console.log("e: ", e);
    },
    handleShowFilter() {
      this.showFilter = !this.showFilter;
    }
  }
};
</script>

<style lang="scss" scoped>
.bills-title {
  display: flex;
  justify-content: space-between;
  align-content: center;
  line-height: 36px;
  margin-top: 16px;
}
.bills-filter {
  background: #f2f2f2;
  border-radius: 4px;
  width: 100%;
  padding: 16px;
  margin: 16px 0;
  .bill-search-type {
    width: 125px;
  }
}
.bills-list {
  height: 100vh;
}
</style>
