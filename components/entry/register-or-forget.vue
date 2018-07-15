<template>
<div class="page-entry-container page-register">
  <div class="form-wrapper">
    <h2 class="title">{{title}}</h2>
    <div class="form-control">
      <i class="icon icon-tel"></i>
      <input type="text" placeholder="手机号码" v-model.trim="postData.mobile">
    </div>
    <div class="form-control validcode">
      <input type="text" placeholder="验证码" v-model.trim="postData.code">
      <button class="btn-sendcode" :disabled="validcodeDisabled" @click="sendValidcode">
        {{timing ? `倒计时${timing}s`: '发送验证码'}}
      </button>
    </div>
    <div class="form-control">
      <i class="icon icon-pwd"></i>
      <input type="password" :placeholder="pwdHint" v-model.trim="postData.password">
    </div>
    <div class="form-control">
      <i class="icon icon-pwd"></i>
      <input type="password" :placeholder="confirmPwdHint" v-model.trim="confirmPassword">
    </div>
    <button class="button block big" :disabled="disabled" @click="onSubmit">{{btnSubmitName}}</button>
  </div>
  <com-loading v-if="loading"></com-loading>
</div>
</template>
<script>
import { isPhone } from '~/plugins'
export default {
  data() {
    return {
      postData: {
        mobile: '',
        password: '',
        code: ''
      },
      confirmPassword: '',
      loading: false,
      timing: 0
    }
  },
  props: {
    type: {
      type: String,
      default: 'register'
    }
  },
  computed: {
    disabled() {
      let { confirmPassword } = this
      let { mobile, password, code } = this.postData
      return !(mobile && password && code && confirmPassword)
    },
    validcodeDisabled() {
      let { timing } = this
      let { mobile } = this.postData
      return timing || !mobile
    },
    // 是否注册页面
    isRegister() {
      return this.type == 'register'
    },
    // 标题
    title() {
      return this.isRegister ? '注册新用户' : '填写信息找回密码'
    },
    // 派发动作名字
    actionName() {
      return this.isRegister ? 'register' : 'forget'
    },
    // 提交按钮名字
    btnSubmitName() {
      return this.isRegister ? '注册' : '确认信息'
    },
    // 密码提示文本
    pwdHint() {
      return this.isRegister ? '输入密码' : '输入新密码'
    },
    confirmPwdHint() {
      return this.isRegister ? '确认密码' : '确认新密码'
    }
  },
  methods: {
    onSubmit() {
      if (this.disabled || !this.validData()) return
      this.loading = true
      this.$store.dispatch(this.actionName, this.postData).then(() => {
        this.loading = false
        this.$router.push('/entry/login')
      }).catch(err => {
        this.loading = false
        alert(err.message)
      })
    },
    validData() {
      let { confirmPassword } = this
      let { mobile, password } = this.postData
      if (!isPhone(mobile)) {
        return alert('请输入正确的手机号码.')
      } else if (confirmPassword !== password) {
        return alert('两次输入的密码不一致.')
      }
      return true
    },
    sendValidcode() {
      if (this.validcodeDisabled) return
      if (isPhone(this.postData.mobile)) {
        this.startCountdown()
        this.$store.dispatch('validcode', {
          phoneNo: this.postData.mobile
        }).catch(err => {
          alert(err.message)
          this.stopCountdown()
        })
      } else {
        alert('请输入正确的手机号码.')
      }
    },
    startCountdown() {
      this.stopCountdown()
      this.timing = 60
      this.tid = setInterval(() => {
        if (this.timing > 0) {
          this.timing -= 1
        } else {
          this.stopCountdown()
        }
      }, 1000)
    },
    stopCountdown() {
      if (this.tid) {
        clearInterval(this.tid)
        this.tid = null
      }
      this.timing = 0
    }
  }
}
</script>
<style lang="scss" src="~/components/entry/style.scss"></style>