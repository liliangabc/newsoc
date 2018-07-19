<template>
<div class="com-main-layout">
  <com-main-header></com-main-header>
  <div class="slot-container">
    <nuxt/>
  </div>
  <com-pic-preview></com-pic-preview>
  <com-menu-actions></com-menu-actions>
</div>
</template>
<script>
import ComMainHeader from '~/components/common/main-header'
import ComPicPreview from '~/components/common/pic-preview'
import ComMenuActions from '~/components/card/menu-actions'
export default {
  components: { ComMainHeader, ComPicPreview, ComMenuActions },
  watch: {
    $route(newVal) {
      this.$store.commit('actions/closeAll')
    }
  },
  mounted() {
    this.$store.dispatch('im/login')
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/sizes.scss';
.com-main-layout {
  min-width: $pageMinWidth;
  min-height: 100vh;
  background-color: #f6f6f6;
  padding-top: $pageHeaderHeight;
  > .slot-container {
    width: $pageMinWidth;
    margin: auto;
    padding: 0 16px;
  }
}
</style>