<template>
<div class="com-loading" :class="{fullscreen}">
  <div class="inner"></div>
</div>
</template>
<script>
export default {
  props: {
    size: String,
    fullscreen: Boolean
  },
  methods: {
    getSize() {
      let { size } = this, width = 10, radius = 16
      if (size == 'small') {
        width = 8
        radius = 12
      } else if (size == 'big') {
        width = 12
        radius = 20
      }
      return { width, radius }
    },
    init() {
      let { width, radius } = this.getSize()
      const Spinner = require('spin')
      const target = this.$el.querySelector('.inner')
      this.spinner = new Spinner({
        lines: 8, length: 0, width, radius
      }).spin(target)
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.spinner && this.spinner.stop()
  }
}
</script>
<style lang="scss">
.com-loading {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 11;
  text-align: center;
  background-color: rgba(255, 255, 255, .7);
  &.fullscreen {
    position: fixed;
  }
  .inner {
    width: 120px;
    height: 120px;
    margin: auto;
    position: relative;
    top: 50%;
    margin-top: -60px;
  }
}
</style>