<template>
<li class="com-card">
  <com-card-header :type="type" :list-data="listData" :item="item" :attends="attends"></com-card-header>
  <com-card-footer :type="type" :item="item"></com-card-footer>
</li>
</template>
<script>
import ComCardHeader from './header'
import ComCardFooter from './footer'
export default {
  components: { ComCardHeader, ComCardFooter },
  props: {
    type: [String, Number],
    item: {
      type: Object,
      default: () => ({})
    },
    attends: {
      type: Object,
      default: () => ({})
    },
    listData: {
      type: Object,
      default: () => ({ list: [] })
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-card {
  margin-bottom: 36px;
  > div {
    border-radius: 4px;
    border: 1px solid $boxBorderColor;
    &.com-card-footer {
      border-top: none;
    }
  }
}
</style>