<template>
<div class="com-query-search-box">
  <div class="clearfix wrapper">
    <div class="logo"></div>
    <div class="searchbox">
      <input type="text" v-model.trim="keyword" @keyup.enter="onSearch">
      <button class="button warning" :disabled="disabled" @click="onSearch">查询一下</button>
    </div>
  </div>
</div>
</template>
<script>
import { replaceQuery } from '~/plugins'
export default {
  data() {
    return {
      keyword: ''
    }
  },
  computed: {
    disabled() {
      return !this.keyword
    }
  },
  methods: {
    onSearch() {
      if (this.disabled) return
      if (this.$route.name == 'query') {
        location.replace(replaceQuery(this.$route, { keyword: this.keyword, searchType: 4 }))
      } else {
        location.href = `/query?keyword=${this.keyword}&searchType=4`
      }
    }
  },
  mounted() {
    this.keyword = this.$route.query.keyword
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
.com-query-search-box {
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  z-index: 10;
  height: 100px;
  padding: 12px 0;
  background-color: #fff;
  border-bottom: 1px solid $warningColor;
  > .wrapper {
    height: 100%;
    max-width: $maxWidth;
    margin: auto;
    padding: 0 12px;
    .logo {
      height: 100%;
      width: 100px;
      float: left;
      background: url(~/assets/img/logo.png) no-repeat center center;
      background-size: contain;
    }
    .searchbox {
      height: 40px;
      margin-left: 120px;
      top: 17.5px;
      position: relative;
      input {
        width: 100%;
        height: 100%;
        border: 1px solid $warningColor;
        padding: 0 122px 0 12px;
        font-size: 15px;
        color: $normalTextColor;
      }
      .button {
        width: 110px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
}
@media (max-width: 480px) {
  .com-query-search-box {
    > .wrapper {
      .logo {
        display: none;
      }
      .searchbox {
        margin-left: 0;
      }
    }
  }
}
</style>