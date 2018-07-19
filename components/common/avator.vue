<template>
<div class="com-avator" :style="styleObj">
  <img :src="avatorUrl">
  <router-link class="link" v-if="to" :to="to"></router-link>
</div>
</template>
<script>
import tempAvator from '~/assets/img/touxiang-zw@3x.png'
export default {
  props: {
    src: String,
    to: [String, Object],
    item: { type: Object, default: () => ({}) },
    size: { type: [Number, String], default: 49 }
  },
  computed: {
    styleObj() {
      let size = this.size + 'px'
      return { width: size, height: size, minWidth: size }
    },
    userInfo() {
      return this.$store.state.userData.userInfo
    },
    isAnonymous() {
      return this.userInfo.easemobUserName != this.item.easemobUserName
        && this.userInfo.userName != this.item.userName
        && this.item.anonymous == '1'
    },
    avatorUrl() {
      if (this.isAnonymous) return tempAvator
      let src = this.src || this.item.userHeadImage
      if (src && src.indexOf('?imageView2') == -1) {
        src += `?imageView2/1/w/${(this.size || 49) * 2}`
      }
      return src || this.item.userPic || tempAvator
    }
  }
}
</script>
<style lang="scss">
.com-avator {
  border-radius: 50%;
  overflow: hidden;
  background-color: #f6f6f6;
  cursor: pointer;
  position: relative;
  img, .link {
    width: 100%;
    height: 100%;
  }
  .link {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>