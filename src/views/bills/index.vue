<template>
  <table-list-slot>
    <template #title>运输计划</template>
    <template #actions>
      <el-button
        type="primary"
        icon="el-icon-edit"
        size="small"
        @click="showEditBillModal = true"
      >新增出口计划</el-button>
      <el-button
        type="primary"
        icon="el-icon-edit"
        size="small"
        @click="showCarriageModal = true"
      >新增进口计划</el-button>
      <el-button type="primary" icon="el-icon-download" size="small">导出Excel</el-button>
    </template>
    <template #filter="scope">
      <filter-form @onSearch="handleOnSearch"></filter-form>
    </template>
    <template #list>
      <bill-list />
    </template>
    <modal-edit-bill v-if="showEditBillModal" :status.sync="showEditBillModal" direction="出口" />
  </table-list-slot>
</template>

<script>
import TableListSlot from "@template/TableListSlot";
import Filter from "./Filter";
import Bills from "./Bills";
import EditBill from "./EditBill";

export default {
  components: {
    "table-list-slot": TableListSlot,
    "filter-form": Filter,
    "bill-list": Bills,
    "modal-edit-bill": EditBill
  },
  created() {
    this.$store.dispatch("getBillList");
  },
  data() {
    return {
      showEditBillModal: false
    };
  },
  methods: {
    handleOnSearch(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
