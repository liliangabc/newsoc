<template>
<div class="com-category-reference-subclass-list" v-if="detail">
  <h3 class="title">{{detail.name}}</h3>
  <p class="desc">{{detail.describe}}</p>
  <ul>
    <li v-for="item in detail.list" :key="item.id">【{{item.code}}】 -{{item.name}}</li>
  </ul>
</div>
</template>
<script>
export default {
  props: ['detail']
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
.com-category-reference-subclass-list {
  padding-top: 20px;
  .title {
    font-size: 20px;
    color: $primaryColor;
  }
  .desc, ul {
    line-height: 1.6;
    color: $primaryTextColor;
  }
  .desc {
    margin: 1em 0;
  }
  ul {
    font-size: 15px;
  }
}
</style>