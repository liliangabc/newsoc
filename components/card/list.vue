<template>
<div class="com-card-list" :class="{isMarket}">
  <com-moment-pubbar v-if="hasPubbar"></com-moment-pubbar>
  <ul class="card-wrapper">
    <component :is="curView" v-for="(item, index) in listData.list" :key="index" :list-data="listData" :item="item" :type="type"></component>
  </ul>
</div>
</template>
<script>
import ComCardBox from './card'
import ComMomentPubbar from './moment-pubbar'
import ComUserBox from './user-box'
import { isMarket, isMoment, isUser } from '~/plugins'
export default {
  components: { ComCardBox, ComMomentPubbar, ComUserBox },
  props: {
    type: [String, Number],
    listData: {
      type: Object,
      default: () => ({ list: [] })
    }
  },
  computed: {
    curView() {
      return isUser(this.type) ? ComUserBox : ComCardBox
    },
    hasPubbar() {
      return isMoment(this.type) && this.$route.name == 'index-type'
    },
    isMarket() {
      return isMarket(this.type) && this.$route.name == 'index-type'
    }
  }
}
</script>
<style lang="scss">
.com-card-list {
  &.isMarket {
    .card-wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .com-card {
        width: calc(50% - 32px);
      }
    }
  }
}
</style>