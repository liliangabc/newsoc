<template>
<div class="com-card-header">
  <header>
    <com-avator size="82" :item="item" :to="isAnonymous ? '' : `/profile/${item.stu_id}/5`"></com-avator>
    <div class="middle">
      <h3 class="title"><span>{{nickName}}</span> at {{item.collegeName}}</h3>
      <span class="date">{{item.lastModifyTime}}</span>
    </div>
    <router-link class="link-open-in-new" title="see details" v-if="!isPostsDetail" :to="`/posts/${itemType}?id=${item.id}`"></router-link>
    <com-drop-menu v-if="menuOptions.length" :list-data="listData" :item="item" :type="itemType" :menu-options="menuOptions"></com-drop-menu>
  </header>
  <section :class="{isMarket}">
    <div class="title" v-if="item.title">{{item.title}}</div>
    <div class="content" v-html="postsContent"></div>
    <com-pic-box v-if="hasPicbox" :item="item" :type="itemType"></com-pic-box>
    <div class="clearfix market-params" v-if="isMarket">
      <span class="price">${{item.price || 0}}</span>
      <div class="right">
        <el-tag type="danger" size="mini" v-if="item.sold == '1' && listData.list.length">{{item.btmStr}}</el-tag>
        <span class="category">{{item.categoryName}}</span>
        <span class="new">{{item.isNew == '1' ? 'New' : 'Used'}}</span>
        <span class="offer">{{item.offer == '1' ? 'Offer' : 'Need'}}</span>
      </div>
    </div>
    <h4 class="category-name" v-else>{{categoryName}}</h4>
    <com-event-info v-if="hasEventInfo" :detail="item" :attends="attends" :type="itemType"></com-event-info>
  </section>
  <a class="btn-chat" v-if="hasChat" @click="onChatClick"></a>
</div>
</template>
<script>
import ComAvator from '~/components/common/avator'
import ComPicBox from './pic-box'
import ComEventInfo from './event-info'
import { isEvent, isMarket, isClass, isMeetup, isPostsDetail } from '~/plugins'
import { createMenuOptions } from './menu-actions/utils'
import ComDropMenu from './menu-actions/drop-menu'
export default {
  components: { ComAvator, ComPicBox, ComEventInfo, ComDropMenu },
  props: {
    type: [String, Number],
    item: {
      type: Object,
      default: () => ({})
    },
    attends: {
      type: Object,
      default: () => ({})
    },
    listData: {
      type: Object,
      default: () => ({ list: [] })
    }
  },
  computed: {
    itemType() {
      return this.item.type || this.type
    },
    isMarket() {
      return isMarket(this.itemType)
    },
    isMeetup() {
      return isMeetup(this.itemType)
    },
    categoryName() {
      return ({ 3: 'class', 5: 'moment' })[this.itemType] || this.item.categoryName
    },
    userInfo() {
      return this.$store.state.userData.userInfo
    },
    ismy() {
      return this.item.stu_id == this.userInfo.id
    },
    isAnonymous() {
      return !this.ismy && this.item.anonymous == '1'
    },
    nickName() {
      return this.ismy || this.item.anonymous == '0' ? this.item.nickName : 'anonymous'
    },
    isPostsDetail() {
      return isPostsDetail(this.$route)
    },
    postsContent() {
      return this.isPostsDetail ? this.item.content : this.item.subContent
    },
    hasEventInfo() {
      return (isEvent(this.itemType) || isMeetup(this.itemType)) && this.isPostsDetail
    },
    hasPicbox() {
      return !(this.isPostsDetail && (isEvent(this.itemType) || isClass(this.itemType)))
    },
    hasChat() {
      return !this.ismy && (this.isMarket || this.isMeetup) && this.item.anonymous != '1'
    },
    menuOptions() {
      return createMenuOptions({
        route: this.$route,
        posts: this.item,
        isMine: this.userInfo.id === this.item.stu_id
      })
    }
  },
  methods: {
    onChatClick() {
      let { nickName, userHeadImage: userPic } = this.item
      let userName = this.item.userName.toLowerCase()
      this.$store.commit('im/addUser', {
        nickName, userName, userPic
      })
      this.$router.push(`/inbox/${userName}`)
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-card-header {
  position: relative;
  background-color: #fff;
  padding-top: 10px;
  border-bottom: 1px solid $boxBorderColor;
  > header {
    display: flex;
    align-items: center;
    margin-left: -41px;
    padding-right: 27px;
    .com-avator {
      border: 5px solid #fff;
      box-shadow: $boxShadowDepth2;
    }
    .middle {
      flex: 1;
      margin: 0 16px;
      white-space: nowrap;
      &, .title {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .title, .date {
        font-size: 12px;
        color: #a1a1a1;
      }
      .title span {
        font-size: 16px;
        color: $themeBlueColor;
      }
    }
    .link-open-in-new {
      width: 20px;
      height: 20px;
      margin-right: 8px;
      background: url(~/assets/img/posts/ic_open_in_new_tab.png) no-repeat center center/20px;
    }
  }
  > section {
    padding: 0 48px 20px 57px;
    margin-top: -10px;
    > .title {
      font-size: 15px;
      color: #8596b0;
      margin-bottom: 6px;
    }
    .content {
      font-size: 13px;
      color: #3b3b3b;
      margin-bottom: 10px;
      line-height: 1.6;
    }
    .com-card-pic-box {
      margin-bottom: 10px;
    }
    .category-name, .price {
      font-size: 16px;
      color: #7cc576;
      text-transform: capitalize;
    }
    .market-params {
      .price {
        float: left;
      }
      .right {
        float: right;
        font-size: 12px;
        line-height: 23px;
        span {
          margin-left: 12px;
        }
        .category {
          color: #a1a1a1;
          text-decoration: underline;
        }
        .new {
          color: #ffa73f;
        }
        .offer {
          color: $themeBlueColor;
        }
      }
    }
    &.isMarket {
      padding-right: 22px;
      .market-params, .com-card-pic-box {
        margin-left: -35px;
      }
    }
  }
  > .btn-chat {
    position: absolute;
    top: 102px;
    left: -19px;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 2px solid #fff;
    background: #d3d3d3 url(~/assets/img/posts/chat.png) no-repeat center center/19px;
    box-shadow: $boxShadowDepth2;
  }
}
</style>