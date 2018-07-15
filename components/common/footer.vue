<template>
<div class="com-footer">
  Copyright © 2017, www.tmzhijia.com, All Rights Reserved 网址备案号：豫ICP备17047557号-2
</div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
.com-footer {
  padding: 30px 0;
  text-align: center;
  color: $normalTextColor;
  background-color: #fff;
  &.fixed {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
  }
}
</style>