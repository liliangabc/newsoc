<template>
<div class="com-home-card-container">
  <div class="wrapper">
    <component :is="curView"></component>
    <slot name="loadmore"></slot>
  </div>
  <div class="right-sidebar" v-if="hasSpreadbar">
    <com-spreadbar></com-spreadbar>
    <com-lovebar v-if="hasLovebar"></com-lovebar>
  </div>
</div>
</template>
<script>
import ComSpreadbar from './sidebar/spreadbar'
import ComLovebar from './sidebar/lovebar'
import { CreateListView } from './create-list-view'
import { isClass, isMoment } from '~/plugins'
export default {
  components: { ComSpreadbar, ComLovebar },
  computed: {
    type() {
      return this.$route.params.type
    },
    curView() {
      return CreateListView(this.type)
    },
    hasSpreadbar() {
      return this.type != '2'
    },
    hasLovebar() {
      return isClass(this.type) || isMoment(this.type)
    },
    listData() {
      return this.$store.state.home.listData
    }
  }
}
</script>
<style lang="scss">
.com-home-card-container {
  width: 865px;
  display: flex;
  word-break: break-all;
  > .wrapper {
    flex: 1;
  }
  > .right-sidebar {
    width: 246px;
    min-width: 246px;
    margin-left: 40px;
    & > div {
      margin-bottom: 36px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>