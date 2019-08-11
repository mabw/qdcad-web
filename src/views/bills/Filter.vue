<template>
  <div>
    <el-date-picker
      v-model="rangDate"
      type="daterange"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      size="small"
      @change="$emit('onSearch',$event)"
      :picker-options="pickerOptions"
    ></el-date-picker>
    <el-input
      placeholder="按提单号搜索"
      size="small"
      v-model="searchBillById"
      class="input-with-select"
      clearable
    >
      <el-select v-model="searchType" slot="prepend" placeholder="请选择" class="bill-search-type">
        <el-option label="当前页搜索" value="currentPage"></el-option>
        <el-option label="全站搜索" value="wholeSite"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-select v-model="vesselNumbers" multiple collapse-tags size="small" placeholder="按车号筛选">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-select v-model="clientName" multiple collapse-tags size="small" placeholder="按客户名称筛选">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-select v-model="direction" multiple collapse-tags size="small" placeholder="按进出口类型筛选">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-select v-model="containerType" multiple collapse-tags size="small" placeholder="按箱型筛选">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-button type="primary" icon="el-icon-edit" size="small">清除所有筛选条件</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      searchType: "currentPage",
      vesselNumbers: [],
      clientName: [],
      direction: [],
      containerType: []
    };
  }
};
</script>

<style lang="scss" scoped>
.bill-search-type {
  width: 125px;
}
</style>

