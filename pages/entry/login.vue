<template>
<div class="com-container page-login">
  <h3 class="title">sign in</h3>
  <div class="form-container">
    <input class="input" placeholder="USERNAME" v-model.trim="userName">
    <input class="input" type="password" placeholder="PASSWORD" v-model.trim="password">
    <div class="forget">
      <router-link to="/entry/find-pwd" replace>Forgot Password?</router-link>
    </div>
    <router-link class="link-signup" to="/entry/register" replace>New to Circcus? Sign Up</router-link>
    <button class="btn-submit" @click="submit" :disabled="disabled">let's go</button>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return { userName: '', password: '' }
  },
  computed: {
    disabled() {
      return !(this.userName && this.password)
    }
  },
  methods: {
    submit() {
      const $loading = this.$loading({ target: this.$el })
      this.$store.dispatch('login', {
        userName: this.userName,
        password: this.password
      }).then(data => {
        $loading.close()
        this.$notify.success({ title: 'Notification', message: data.info })
        this.$router.replace('/index/5')
      }).catch(err => {
        $loading.close()
        this.$message.error(err.message)
        console.log('error')
      })
    }
  }
}
</script>