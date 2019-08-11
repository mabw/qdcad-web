<template>
  <div class="container">
    <div class="title">
      <el-button type="text" @click="showFilter = !showFilter">展开/折叠筛选条件</el-button>
      <strong>
        <slot name="title"></slot>
      </strong>
      <div>
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="filter" v-show="showFilter">
      <slot name="filter"></slot>
    </div>
    <slot name="list" class="list"></slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFilter: false
    };
  }
};
</script>


<style lang="scss" scoped>
@import "../theme/_variables.scss";

.container {
  margin: 32px 16px;
}
.title {
  line-height: 36px;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.filter {
  width: 100%;
  padding: 16px;
  margin: 16px 0;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 4px;
  background: $grey;
}
.list {
  margin: 16px;
}
</style>
