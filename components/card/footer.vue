<template>
<div class="com-card-footer" :class="{isMarket}">
  <ul class="toolbar market" v-if="isMarket">
    <li class="fav active" v-if="isFav" @click="toggleFav">added</li>
    <li class="fav" v-else @click="toggleFav">add</li>
    <li class="comment" @click="toggleCommentList">comment</li>
    <li class="exchange" v-if="!ismy" @click="onExchange">exchange</li>
    <li class="share">share</li>
  </ul>
  <ul class="toolbar other" v-else>
    <li class="fav" :class="{active: isFav}" @click="toggleFav"></li>
    <li class="comment" v-if="!isMeetup" @click="toggleCommentList">{{item.comments}}</li>
    <template v-if="!(isMoment || isMeetup)">
      <li class="zan" :class="{active: item.isLike == '1'}" @click="toggleZan">{{item.likeCount}}</li>
      <li class="cai" :class="{active: item.isLike == '0'}" @click="toggleCai">{{item.caiCount}}</li>
      <li class="share"></li>
    </template>
    <li class="coins" v-if="isClass">{{item.coins}}</li>
  </ul>
  <com-comment-box v-if="!isMeetup" :item="item" :type="itemType" :showList.sync="isShowCommentList"></com-comment-box>
</div>
</template>
<script>
import ComCommentBox from './comment-box'
import { isMarket, isClass, isMeetup, isMoment, isPostsDetail } from '~/plugins'
export default {
  components: { ComCommentBox },
  data() {
    return { isShowCommentList: isPostsDetail(this.$route) }
  },
  props: {
    type: [String, Number],
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    itemType() {
      return this.item.type || this.type
    },
    userInfo() {
      return this.$store.state.userData.userInfo
    },
    ismy() {
      return this.userInfo.id == this.item.stu_id
    },
    isMarket() {
      return isMarket(this.itemType)
    },
    isClass() {
      return isClass(this.itemType)
    },
    isMeetup() {
      return isMeetup(this.itemType)
    },
    isMoment() {
      return isMoment(this.itemType)
    },
    isFav() {
      return this.item[this.isMoment ? 'isLike' : 'isFavorite'] == '1'
    }
  },
  methods: {
    toggleFav() {
      this.$store.dispatch('home/togglePostFavorite', { item: this.item, route: this.$route })
    },
    toggleCommentList() {
      this.isShowCommentList = !this.isShowCommentList
    },
    toggleZan() {
      this.$store.dispatch('home/togglePostZan', { item: this.item, route: this.$route })
    },
    toggleCai() {
      this.$store.dispatch('home/togglePostCai', { item: this.item, route: this.$route })
    },
    onExchange() {
      if (this.item.sold == '1') return this.$message('This item is has been sold!')
      this.$store.commit('actions/toggleModal', { cmd: 'exchange', params: { posts: this.item } })
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-card-footer {
  padding: 0 48px 12px 57px;
  background-color: #fbfbfb;
  & > .toolbar {
    padding: 18px 0;
    display: flex;
    align-items: center;
    font-size: 13px;
    position: relative;
    li {
      min-height: 14px;
      background-repeat: no-repeat;
      background-position: 0 50%;
      background-size: auto 14px;
      padding-left: 20px;
      cursor: pointer;
      text-transform: capitalize;
      &:last-child {
        margin-right: 0 !important;
      }
      &.zan, &.cai {
        background-size: 15px auto;
      }
    }
    &.market {
      li {
        color: #a1a1a1;
        margin-right: 12px;
        &.fav {
          background-image: url(~/assets/img/posts/add.png);
          &.active {
            color: $themeBlueColor;
            background-image: url(~/assets/img/posts/added_blue.png);
          }
        }
        &.comment {
          background-image: url(~/assets/img/posts/Comment.png);
        }
        &.exchange {
          background-image: url(~/assets/img/posts/Exchange.png);
        }
        &.share {
          background-image: url(~/assets/img/posts/Share-icon.png);
        }
      }
    }
    &.other {
      li {
        color: $themeBlueColor;
        margin-right: 24px;
        &.fav {
          background-image: url(~/assets/img/posts/Like-icon2.png);
          &.active {
            background-image: url(~/assets/img/posts/Like-icon.png);
          }
        }
        &.comment {
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
        &.share {
          background-size: auto 14px;
          background-image: url(~/assets/img/posts/Share-icon-active.png);
        }
        &.coins {
          position: absolute;
          right: 0;
          cursor: default;
          background-image: url(~/assets/img/posts/Vector-Smart-Object-copy-6.png);
        }
      }
    }
  }
  &.isMarket {
    padding: 0 22px 12px;
  }
}
</style>