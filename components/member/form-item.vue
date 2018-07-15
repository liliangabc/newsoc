<template>
<div class="com-member-form-item">
  <div class="form-item__label">{{label}}</div>
  <div class="clearfix form-item__box" :class="boxClass">
    <slot></slot>
  </div>
</div>
</template>
<script>
export default {
  props: {
    label: String,
    boxClass: String
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
.com-member-form-item {
  margin-bottom: 16px;
  .form-item__label {
    font-size: 15px;
    margin-bottom: 6px;
    font-weight: bold;
    color: $normalTextColor;
  }
  .form-item__box {
    min-height: 40px;
    border: 1px solid $level3BorderColor;
    &.noBorder {
      border: none;
    }
  }
}
</style>