<template>
<div class="com-index-sidebar">
  <com-navbar></com-navbar>
  <com-filterbar v-if="hasFilterbar"></com-filterbar>
  <com-spreadbar v-if="hasSpreadbar"></com-spreadbar>
  <com-footerbar></com-footerbar>
</div>
</template>
<script>
import ComNavbar from './navbar'
import ComFilterbar from './filterbar'
import ComSpreadbar from './spreadbar'
import ComFooterbar from './footerbar'
import { isMarket, isClass, isMoment } from '~/plugins'
export default {
  components: { ComNavbar, ComFilterbar, ComSpreadbar, ComFooterbar },
  computed: {
    type() {
      return this.$route.params.type
    },
    keyWords() {
      let { keyWords } = this.$route.query
      return keyWords ? keyWords.trim() : ''
    },
    hasFilterbar() {
      return isClass(this.type) ? !!this.keyWords : !isMoment(this.type)
    },
    hasSpreadbar() {
      return isMarket(this.type)
    }
  }
}
</script>
<style lang="scss">
.com-index-sidebar {
  width: 240px;
  padding-bottom: 180px;
  > div {
    margin-bottom: 36px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>