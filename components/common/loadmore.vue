<template>
<div class="com-loadmore">
  <div :style="styles" v-loading="loading" element-loading-background="transparent"></div>
</div>
</template>
<script>
export default {
  props: {
    loading: Boolean,
    scroller: {},
    height: {
      type: [Number, String],
      default: 60
    }
  },
  computed: {
    styles() {
      return { height: parseInt(this.height) + 'px' }
    }
  },
  methods: {
    onScroll() {
      if (this.loading) return
      if (this.realScroller instanceof Window) {
        var viewH = window.innerHeight
        var scrH = document.body.scrollHeight
        var scrTop = document.body.scrollTop || document.documentElement.scrollTop
      } else {
        var { offsetHeight: viewH, scrollHeight: scrH, scrollTop: scrTop } = this.realScroller
      }
      if (scrH - viewH - scrTop < 50) this.$emit('load')
    }
  },
  mounted() {
    this.realScroller = this.scroller || window
    this.realScroller.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    this.realScroller.removeEventListener('scroll', this.onScroll)
  }
}
</script>