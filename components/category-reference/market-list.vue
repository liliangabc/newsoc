<template>
<ul class="clearfix com-category-reference-market-list">
  <li v-for="item in list" :key="item.id">
    <nuxt-link class="link" replace :to="`/category-reference/market?code=${item.code}`">
      <h3 class="title">第{{item.code || 'null'}}类 {{item.name}}</h3>
      <p class="content">{{item.describe}}</p>
    </nuxt-link>
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
.com-category-reference-market-list {
  margin: 0 -8px;
  li {
    float: left;
    width: 33.33%;
    padding: 0 8px;
    margin-bottom: 16px;
    .link {
      display: block;
      border: 1px solid $primaryColor;
      .title {
        height: 36px;
        line-height: 36px;
        font-size: 15px;
        color: #fff;
        background-color: $primaryColor;
        text-align: center;
      }
      .content {
        height: 300px;
        padding: 15px;
        font-size: 14px;
        line-height: 1.6;
        color: $primaryTextColor;
      }
    }
  }
}
@media screen and (max-width: 480px) {
  .com-category-reference-market-list {
    li {
      width: 100%;
    }
  }
}
@media screen and (min-width: 481px) and (max-width: 768px) {
  .com-category-reference-market-list {
    li {
      width: 50%;
    }
  }
}
</style>