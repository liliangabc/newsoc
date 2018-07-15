<template>
<div class="com-header">
  <div class="clearfix header-wrapper">
    <div class="leftbox">
      <router-link class="link" to="/">首页</router-link>
    </div>
    <div class="rightbox">
      <template v-if="token">
        <router-link class="link" to="/member/trade-list">个人中心</router-link>
        <span class="fgline">|</span>
        <a href="javascript:;" class="link" @click="onLogout">退出</a>
      </template>
      <template v-else>
        <router-link class="link" to="/entry/login">登录</router-link>
        <span class="fgline">|</span>
        <router-link class="link" to="/entry/register">注册</router-link>
      </template>
    </div>
  </div>
</div>
</template>
<script>
export default {
  computed: {
    token() {
      return this.$store.state.token
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout').then(data => {
        location.reload()
      }).catch(err => alert(err.message))
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
.com-header {
  height: 50px;
  line-height: 50px;
  background-color: $primaryColor;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  .header-wrapper {
    height: 100%;
    max-width: $maxWidth;
    margin: auto;
    padding: 0 12px;
    .leftbox {
      float: left;
    }
    .rightbox {
      float: right;
    }
    .link {
      color: #fff;
      font-weight: bold;
    }
    .fgline {
      margin: 0 12px;
      color: #fff;
    }
  }
}
</style>