<template>
<div class="page-entry">
  <div class="container">
    <div class="wrapper" :style="{ minHeight }">
      <nuxt-child></nuxt-child>
      <div class="right"></div>
    </div>
  </div>
  <com-main-footer ref="footer"></com-main-footer>
</div>
</template>
<script>
import ComMainFooter from '~/components/common/main-footer'
export default {
  components: { ComMainFooter },
  layout: 'entry-layout',
  data() {
    return { minHeight: '' }
  },
  methods: {
    onWinResize() {
      let winHeight = window.innerHeight, footerHeight = this.$refs.footer.$el.offsetHeight
      this.minHeight = `${winHeight - footerHeight}px`
    }
  },
  mounted() {
    this.onWinResize()
    window.addEventListener('resize', this.onWinResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWinResize)
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.page-entry {
  > .container {
    min-width: 1000px;
    background: linear-gradient(135deg, #83aee5, #4183d7);
    > .wrapper {
      padding: 95px 16px;
      width: 1000px;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > .right {
        width: 311px;
        height: 95px;
        background-image: url(~/assets/img/login_icon.png);
        background-repeat: no-repeat;
        background-size: 100%;
      }
      // 表单盒子样式
      .com-container {
        width: 432px;
        padding: 80px 70px;
        background-color: #fff;
        text-align: center;
        border-radius: 6px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
        position: relative;
        > .title {
          color: $blueColor;
          font-size: 18px;
          margin-bottom: 60px;
          text-transform: uppercase;
        }
        .form-container {
          .input {
            width: 100%;
            height: 32px;
            margin-top: 32px;
            font-size: 12px;
            color: $blueColor;
            border-bottom: 1px solid $inputHitColor;
            &:first-child {
              margin-top: 0;
            }
            &::placeholder {
              color: $inputHitColor;
            }
            &:focus {
              border-bottom-color: $blueColor;
            }
          }
          a {
            color: $blueColor;
            font-size: 12px;
            &:hover {
              text-decoration: underline;
            }
          }
          .forget {
            text-align: right;
            line-height: 32px;
          }
          .link-signup, .link-signin {
            margin: 50px 0;
          }
          .btn-submit {
            color: #fefefe;
            font-size: 18px;
            background-color: $blueColor;
            display: block;
            width: 200px;
            height: 55px;
            margin: auto;
            text-transform: uppercase;
            border-radius: 3px;
            transition: box-shadow .2s ease;
            will-change: box-shadow;
            &:hover {
              box-shadow: 0 6px 12px rgba(53, 117, 189, 0.48);
            }
            &:active {
              background-color: rgb(43, 107, 179);
            }
            &[disabled] {
              opacity: .5;
              box-shadow: none;
              cursor: not-allowed;
            }
          }
        }
        // 找回密码
        &.page-find-pwd {
          .form-container .btn-submit {
            margin-top: 50px;
          }
          .hint {
            color: #6f6f6f;
            margin-bottom: 40px;
          }
        }
      }
    }
  }
}
</style>