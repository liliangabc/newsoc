<template>
<el-dialog custom-class="com-posts-share" title="Share to" width="240px" :visible.sync="isOpen" :before-close="close">
  <ul class="share-to-list">
    <li tabindex="0" v-for="item in shareToList" :key="item.label" :class="item.site" @click="onItemClick(item)">
      <i class="icon"></i>
      <span>{{item.label}}</span>
    </li>
  </ul>
</el-dialog>
</template>
<script>
export default {
  data() {
    return {
      shareToList: [
        { site: 'facebook', label: 'FaceBook' },
        { site: 'twitter', label: 'Twitter' },
        { site: 'linkedin', label: 'Linkedin' },
        { site: 'google', label: 'Google+' },
        // { site: 'instagram', label: 'Instagram' },
        // { site: 'line', label: 'Line' },
        // { site: 'whatsapp', label: 'WhatsApp' },
        // { site: 'messager', label: 'Messager' },
        // { site: 'email', label: 'Email' },
        // { site: 'wechat', label: 'WeChat' }
      ]
    }
  },
  computed: {
    shareParams() {
      return this.$store.state.menuActions.share
    },
    isOpen() {
      return !!this.shareParams
    }
  },
  methods: {
    close() {
      this.$store.commit('actions/toggleModal', { cmd: 'share' })
    },
    getShareUrl() {
      let { origin } = location
      let { id, type } = this.shareParams
      return `${origin}/posts/${type}?id=${id}`
    },
    onItemClick(item) {
      let { site } = item
      let { title } = this.shareParams
      let shareUrl = this.getShareUrl()
      if (site == 'facebook') {
        window.open(`http://www.facebook.com/sharer/sharer.php?u=${shareUrl}`)
      } else if (site == 'twitter') {
        window.open(`http://twitter.com/home?status=${encodeURIComponent(shareUrl)} ${encodeURIComponent(title)}`)
      } else if (site == 'linkedin') {
        window.open(`http://www.linkedin.com/shareArticle?url=${shareUrl}`)
      } else if (site == 'google') {
        window.open(`https://plus.google.com/share?url=${shareUrl}`)
      }
      this.close()
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-posts-share.el-dialog {
  .el-dialog__body {
    padding: 6px 0 20px;
    user-select: none;
  }
  .share-to-list {
    li {
      height: 42px;
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0 20px;
      outline: none;
      &:hover, &:focus {
        background-color: #f6f6f6;
        span {
          color: $themeBlueColor;
        }
      }
      .icon {
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100%;
        margin-right: 12px;
      }
      &.wechat .icon {
        background-image: url(~/assets/img/share/wechat.png);
      }
      &.facebook .icon {
        background-image: url(~/assets/img/share/facebook.png);
      }
      &.twitter .icon {
        background-image: url(~/assets/img/share/twitter.png);
      }
      &.email .icon {
        background-image: url(~/assets/img/share/email.png);
      }
      &.instagram .icon {
        background-image: url(~/assets/img/share/Instagram.png);
      }
      &.line .icon {
        background-image: url(~/assets/img/share/line.png);
      }
      &.whatsapp .icon {
        background-image: url(~/assets/img/share/whatsapp.png);
      }
      &.messager .icon {
        background-image: url(~/assets/img/share/messager.png);
      }
      &.linkedin .icon {
        background-image: url(~/assets/img/share/linkedin.png);
      }
      &.google .icon {
        background-image: url(~/assets/img/share/google.png);
      }
    }
  }
}
</style>