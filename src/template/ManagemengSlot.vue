<template>
  <div class="container">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="info">
      <slot name="info"></slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../theme/_variables.scss";

.container {
  margin: 32px 16px;
}
.info {
  padding: 16px;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 4px;
  background: $grey;
}
.content {
  margin: 32px 0;
}
</style>
