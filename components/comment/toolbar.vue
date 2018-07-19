<template>
<ul class="com-comment-toolbar">
  <li class="comment">{{item.comments}}</li>
  <li class="zan" :class="{active: item.isLike == '1'}" @click="toggleZan">{{item.likeCount}}</li>
  <li class="cai" :class="{active: item.isLike == '0'}" @click="toggleCai">{{item.caiCount}}</li>
</ul>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    toggleZan() {
      this.$store.dispatch('home/commentToggleZan', { route: this.$route }).then(data => {
        let { item } = this
        let { isLike, likeCount, caiCount } = item
        if (isLike == '0') {
          item.caiCount = +caiCount - 1
          item.likeCount = +likeCount + 1
        } else if (isLike == '-1') {
          item.likeCount = +likeCount + 1
        } else {
          item.likeCount = +likeCount - 1
        }
        item.isLike = isLike == '1' ? '-1' : '1'
      }).catch(err => this.$alert(err.message, 'Error'))
    },
    toggleCai() {
      this.$store.dispatch('home/commentToggleCai', { route: this.$route }).then(data => {
        let { item } = this
        let { isLike, likeCount, caiCount } = item
        if (isLike == '0') {
          item.caiCount = +caiCount - 1
        } else if (isLike == '-1') {
          item.caiCount = +caiCount + 1
        } else {
          item.likeCount = +likeCount - 1
          item.caiCount = +caiCount + 1
        }
        item.isLike = isLike == '0' ? '-1' : '0'
      }).catch(err => this.$alert(err.message, 'Error'))
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-comment-toolbar {
  padding: 16px 0;
  display: flex;
  align-items: center;
  font-size: 13px;
  li {
    cursor: pointer;
    color: $themeBlueColor;
    padding-left: 20px;
    margin-right: 24px;
    background: no-repeat 0 center/15px;
    &.comment {
      cursor: default;
      background-size: 14px;
      background-image: url(~/assets/img/posts/Bubble-icon.png);
    }
    &.zan {
      background-image: url(~/assets/img/posts/up.png);
      &.active {
        background-image: url(~/assets/img/posts/up2.png);
      }
    }
    &.cai {
      background-image: url(~/assets/img/posts/down.png);
      &.active {
        background-image: url(~/assets/img/posts/down2.png);
      }
    }
  }
}
</style>