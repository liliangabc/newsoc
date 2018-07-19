<template>
<div class="com-container page-find-pwd">
  <h3 class="title">found password</h3>
  <p class="hint">Enter your email address and we'll send you a link to rest your password.</p>
  <div class="form-container">
    <input class="input" placeholder="USERNAME" v-model.trim="userName">
    <div class="forget">
      <router-link to="/entry/login">Log In</router-link>
    </div>
    <button class="btn-submit" @click="submit" :disabled="disabled">send</button>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return { userName: '' }
  },
  computed: {
    disabled() {
      return !this.userName
    }
  },
  methods: {
    submit() {
      const $loading = this.$loading({ target: this.$el })
      this.$store.dispatch('findpwd', { userName: this.userName }).then(data => {
        $loading.close()
        this.$message({ type: 'success', message: data.info })
        this.$router.replace('/entry/login')
      }).catch(err => {
        $loading.close()
        this.$message.error(err.message)
      })
    }
  }
}
</script>
