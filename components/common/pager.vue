<template>
<div class="com-pager">
  <ul class="wrapper">
    <li class="icon-btn prev" :class="{disabled: prevDisabled}" @click="onGoPrev"></li>
    <li v-for="page in showedPages" :key="page" :class="{active: page == curPage}" @click="onGoPage(page)">{{page}}</li>
    <li class="icon-btn next" :class="{disabled: nextDisabled}" @click="onGoNext"></li>
  </ul>
</div>
</template>
<script>
export default {
  data() {
    return {
      curPage: 1
    }
  },
  props: {
    pageSize: {
      type: [Number, String],
      default: 50
    },
    total: {
      type: [Number, String],
      default: 0
    },
    currentPage: {
      type: [Number, String],
      default: 1
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.pageSize)
    },
    showedPages() {
      let min = 1, arr = []
      let { pageCount, curPage } = this
      if (pageCount < 6) {
        for (let i = 0; i < pageCount; i++) arr.push(i + 1)
        return arr
      }
      if (curPage - 2 > 0) {
        min = curPage - 2
      } else if (curPage - 1 > 0) {
        min = curPage - 1
      }
      if (curPage + 1 > this.pageCount) {
        min -= 1
      }
      if (curPage + 2 > this.pageCount) {
        min -= 1
      }
      for (let i = 0; i < 5; i++) arr.push(min + i)
      return arr
    },
    prevDisabled() {
      return this.curPage <= 1
    },
    nextDisabled() {
      return this.curPage >= this.pageCount
    }
  },
  watch: {
    currentPage(newval) {
      this.curPage = +newval
    }
  },
  methods: {
    onGoPrev() {
      if (this.prevDisabled) return
      this.curPage -= 1
      this.$emit('update:currentPage', this.curPage)
      this.$emit('current-change', this.curPage)
    },
    onGoNext() {
      if (this.nextDisabled) return
      this.curPage += 1
      this.$emit('update:currentPage', this.curPage)
      this.$emit('current-change', this.curPage)
    },
    onGoPage(page) {
      if (this.curPage === page) return
      this.curPage = page
      this.$emit('update:currentPage', page)
      this.$emit('current-change', page)
    }
  },
  mounted() {
    this.currentPage && (this.curPage = +this.currentPage)
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
.com-pager {
  padding: 32px 0;
  .wrapper {
    text-align: center;
    li {
      min-width: 36px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      font-size: 12px;
      display: inline-block;
      margin: 0 5px;
      padding: 0 5px;
      vertical-align: middle;
      cursor: pointer;
      user-select: none;
      color: $normalTextColor;
      background-color: $level3BorderColor;
      &:not(.disabled):not(.active):hover {
        background-color: $level1BorderColor;
      }
      &.icon-btn {
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 16px;
      }
      &.prev {
        background-image: url(~/assets/img/prev.png);
      }
      &.next {
        background-image: url(~/assets/img/next.png);
      }
      &.active {
        color: #fff;
        background-color: $primaryColor;
      }
      &.disabled {
        opacity: .5;
        cursor: not-allowed;
      }
    }
  }
}
</style>