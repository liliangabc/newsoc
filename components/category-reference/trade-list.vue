<template>
<ul class="clearfix com-category-reference-trade-list">
  <li v-for="item in list" :key="item.id">
    <h3 class="title">{{item.name}}</h3>
    <div class="links">
      <nuxt-link v-for="code in item.classList" replace :key="code" :to="`/category-reference/market?code=${code}`">{{code}}</nuxt-link>
    </div>
  </li>
</ul>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
.com-category-reference-trade-list {
  li {
    float: left;
    width: 50%;
    margin-bottom: 28px;
    line-height: 36px;
    .title {
      width: 160px;
      text-align: center;
      font-size: 15px;
      color: #fff;
      background-color: $primaryColor;
      float: left;
      margin-right: 12px;
    }
    .links {
      margin-left: 172px;
      a {
        height: 28px;
        line-height: 28px;
        padding: 0 12px;
        margin-right: 12px;
        background-color: $level3BorderColor;
        color: $primaryTextColor;
        font-size: 12px;
        &:hover {
          background-color: $level1BorderColor;
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .com-category-reference-trade-list {
    li {
      width: 100%;
    }
  }
}
</style>