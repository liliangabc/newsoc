<template>
<ul class="clearfix com-category-reference-tabs">
  <li>
    <router-link replace to="/category-reference/market">商标类别参考</router-link>
  </li>
  <li>
    <router-link replace to="/category-reference/trade">行业类别参考</router-link>
  </li>
</ul>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
.com-category-reference-tabs {
  height: 30px;
  border-bottom: 2px solid $primaryColor;
  li {
    float: left;
    height: 100%;
    line-height: 28px;
    + li {
      margin-left: 12px;
    }
    a {
      background-color: $primaryColor;
      color: #fff;
      font-size: 12px;
      padding: 0 12px;
      &.nuxt-link-active {
        background-color: $warningColor;
      }
    }
  }
}
</style>