<template>
<ul class="clearfix com-query-category-list">
  <li v-for="i in 22" :key="i">
    <button :class="{active: i == 9}">全类查询</button>
  </li>
</ul>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
.com-query-category-list {
  padding: 16px 0;
  border-bottom: 1px solid $level3BorderColor;
  li {
    width: 14.28%;
    float: left;
    padding: 6px;
    button {
      width: 100%;
      height: 26px;
      border: none;
      font-size: 12px;
      color: $normalTextColor;
      background-color: $level3BorderColor;
      cursor: pointer;
      &:hover {
        background-color: $level1BorderColor;
      }
      &.active {
        color: #fff;
        background-color: $warningColor;
      }
    }
  }
}
@media (max-width: 1000px) {
  .com-query-category-list {
    li {
      width: auto;
      button {
        padding: 0 12px;
      }
    }
  }
}
</style>