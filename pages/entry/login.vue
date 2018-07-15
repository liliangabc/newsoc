<template>
<div class="page-entry-container page-login">
  <div class="form-wrapper">
    <h2 class="title">商标之家会员登录</h2>
    <div class="form-control">
      <i class="icon icon-user"></i>
      <input type="text" placeholder="输入用户名/手机号" v-model.trim="postData.mobile">
    </div>
    <div class="form-control">
      <i class="icon icon-pwd"></i>
      <input type="password" placeholder="输入密码" v-model.trim="postData.password">
    </div>
    <div class="form-control captcha-box">
      <input type="text" placeholder="输入右图计算结果" v-model.trim="postData.captcha" @keyup.enter="onSubmit">
      <img class="captcha" ref="captcha" src="/api/captcha" @click="onRefreshCaptcha">
    </div>
    <div class="clearfix float-layout">
      <div class="rightbox">
        <router-link class="link forget" to="/entry/forget">忘记密码？</router-link>
        <router-link class="link register" to="/entry/register">立即免费注册</router-link>
      </div>
    </div>
    <button class="button block big" :disabled="disabled" @click="onSubmit">登录</button>
  </div>
  <com-loading v-if="loading"></com-loading>
</div>
</template>
<script>
export default {
  data() {
    return {
      postData: {
        mobile: '',
        password: '',
        captcha: ''
      },
      loading: false
    }
  },
  computed: {
    disabled() {
      return !(this.postData.mobile && this.postData.password && this.postData.captcha)
    }
  },
  methods: {
    onSubmit() {
      if (this.disabled) return
      let { to } = this.$route.query
      this.loading = true
      this.$store.dispatch('login', this.postData).then(() => {
        this.loading = false
        location.replace(to ? to : '/')
      }).catch(err => {
        this.loading = false
        alert(err.message)
        this.onRefreshCaptcha()
      })
    },
    onRefreshCaptcha() {
      this.$refs.captcha.src = `/api/captcha?t=${Date.now()}`
    }
  }
}
</script>
<style lang="scss" src="~/components/entry/style.scss"></style>