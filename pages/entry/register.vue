<template>
<div class="com-container page-register">
  <h3 class="title">sign up</h3>
  <div class="form-container">
    <input class="input" type="email" placeholder="SCHOOL EMAIL" v-model.trim="email">
    <input class="input" placeholder="USERNAME" v-model.trim="userName">
    <input class="input" type="password" placeholder="PASSWORD" v-model.trim="password">
    <input class="input" type="password" placeholder="CONFIRM PASSWORD" v-model.trim="confirmPwd">
    <router-link class="link-signin" to="/entry/login">Has account? Sign In</router-link>
    <button class="btn-submit" @click="submit" :disabled="disabled">let's go</button>
  </div>
</div>
</template>
<script>
import { isEduEmail } from '../../plugins'
export default {
  data() {
    return { email: '', userName: '', password: '', confirmPwd: '' }
  },
  computed: {
    disabled() {
      return !(this.email && this.userName && this.password && this.confirmPwd)
    }
  },
  methods: {
    submit() {
      let validResult = this.validate()
      if (!validResult.ok) return this.$message.error(validResult.errorText)
      let { email, userName, password } = this
      const $loading = this.$loading({ target: this.$el })
      this.$store.dispatch('register', {
        email, userName, password
      }).then(data => {
        $loading.close()
        this.$message({ type: 'success', message: data.info })
        this.$router.replace('/entry/login')
      }).catch(err => {
        $loading.close()
        this.$message.error(err.message)
      })
    },
    validate() {
      let errorText = '', { email, userName, password, confirmPwd } = this
      if (!isEduEmail(email)) {
        errorText = 'Please enter your school e-mail address.'
      } else if (/\s+/.test(userName)) {
        errorText = 'Invalid username.Please don\'t enter space.'
      } else if (password.length < 6) {
        errorText = 'Password can not be less than 6 characters.'
      } else if (password !== confirmPwd) {
        errorText = 'Passwords do not match.'
      }
      return { errorText, ok: !errorText }
    }
  }
}
</script>