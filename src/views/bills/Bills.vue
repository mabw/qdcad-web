<template>
  <el-table :data="tableData" style="width: 100%" height="250">
    <el-table-column fixed prop="date" label="船期" width="150"></el-table-column>
    <el-table-column prop="name" label="派车日期" width="120"></el-table-column>
    <el-table-column prop="province" label="到厂日期" width="120"></el-table-column>
    <el-table-column prop="city" label="托运单位" width="120"></el-table-column>
    <el-table-column prop="address" label="类型" width="300"></el-table-column>
    <el-table-column prop="zip" label="箱型" width="120"></el-table-column>
    <el-table-column prop="date" label="船名" width="150"></el-table-column>
    <el-table-column prop="name" label="航次" width="120"></el-table-column>
    <el-table-column fixed prop="province" label="提单号" width="120"></el-table-column>
    <el-table-column prop="city" label="托运单位" width="120"></el-table-column>
    <el-table-column prop="address" label="场站/起点" width="300"></el-table-column>
    <el-table-column prop="zip" label="止点地址" width="120"></el-table-column>
    <el-table-column prop="address" label="车号" width="300"></el-table-column>
    <el-table-column prop="zip" label="驾驶员" width="120"></el-table-column>
    <el-table-column prop="date" label="运费" width="150"></el-table-column>
    <el-table-column prop="name" label="代垫费用" width="120"></el-table-column>
    <el-table-column prop="province" label="外派运费" width="120"></el-table-column>
    <el-table-column prop="city" label="外派单位" width="120"></el-table-column>
    <el-table-column prop="address" label="备注" width="300"></el-table-column>
    <el-table-column prop="zip" label="管理" width="120"></el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  }
};
</script>