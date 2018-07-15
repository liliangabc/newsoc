<template>
<div class="com-layout-detault">
  <com-header></com-header>
  <div class="page-main-container" ref="body">
    <nuxt/>
  </div>
  <com-footer ref="com-footer" :class="{fixed}"></com-footer>
  <com-servicebar></com-servicebar>
</div>
</template>
<script>
import ComHeader from '~/components/common/header'
import ComFooter from '~/components/common/footer'
import ComServicebar from '~/components/common/servicebar'
export default {
  components: {
    ComHeader, ComFooter, ComServicebar
  },
  data() {
    return {
      fixed: false
    }
  },
  methods: {
    winResize() {
      let contentHeight = this.$refs.body.offsetHeight
      let winHeight = window.innerHeight
      let footerHeight = this.$refs['com-footer'].$el.offsetHeight
      this.fixed = contentHeight + footerHeight < winHeight
    }
  },
  mounted() {
    this.winResize()
    window.addEventListener('resize', this.winResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.winResize)
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
.page-main-container {
  max-width: $maxWidth;
  margin: auto;
  padding: 50px 12px 100px;
}
</style>