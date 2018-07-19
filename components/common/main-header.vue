<template>
<div class="com-main-header" :style="{left}">
  <div class="wrapper">
    <a class="logo" href="/"></a>
    <div class="right-box">
      <div class="search">
        <input type="search" placeholder="Search People,Pages or Circles..." v-model.trim="keyWords" @keyup.enter="onSearch">
        <i class="icon-search"></i>
      </div>
      <div class="tools">
        <div class="icon-btns">
          <a class="btn btn-people"></a>
          <el-popover trigger="click" @show="onPopoverShow">
            <com-notification :list-data="notifications" @current-change="onPageChange"></com-notification>
            <a class="btn btn-notification" slot="reference"></a>
          </el-popover>
          <a class="btn btn-message" @click="onMessageClick">
            <span class="count" v-if="msgCount">{{msgCount}}</span>
          </a>
        </div>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <com-avator :src="userInfo.userHeadImage"></com-avator>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu class="com-main-header-icon-menu-list" slot="dropdown">
            <el-dropdown-item v-for="item in menuItems" :key="item.cmd" :command="item.cmd">
              <i class="icon" :style="{backgroundImage: `url(${item.icon})`}"></i>
              <span class="label">{{item.label}}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import ComAvator from '~/components/common/avator'
import ComNotification from './notification'
import { isMoment, isUser } from '~/plugins'
const _require = name => require(`~/assets/img/common/${name}.png`)
const menuItems = [
  { cmd: 'myclasses', label: 'My Classes', icon: _require('myclasses') },
  { cmd: 'mypoints', label: 'My Points', icon: _require('mypoints') },
  { cmd: 'mygifts', label: 'My Gifts', icon: _require('mygifts') },
  { cmd: 'favorites', label: 'Favorites', icon: _require('favorites') },
  { cmd: 'subscription', label: 'SubScription', icon: _require('subscription') },
  { cmd: 'activity', label: 'Activity Log', icon: _require('activitylog') },
  { cmd: 'answerquestions', label: 'Answer Questions', icon: _require('answerquestions') },
  { cmd: 'settings', label: 'Settings', icon: _require('settings') },
  { cmd: 'logout', label: 'Logout', icon: _require('logout') }
]
export default {
  components: { ComAvator, ComNotification },
  data() {
    return {
      left: '',
      keyWords: '',
      menuItems,
      notifications: { total: 0, rows: 5, list: [] }
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userData.userInfo
    },
    messages() {
      return this.$store.state.im.messages
    },
    msgCount() {
      let count = 0
      Object.values(this.messages).filter(item => item.newCount).forEach(sub => count += sub.newCount)
      return count
    }
  },
  methods: {
    // 视口滚动处理
    onWinScroll() {
      let scrLeft = document.documentElement.scrollLeft || document.body.scrollLeft
      this.left = -scrLeft + 'px'
    },
    // 全局搜索
    onSearch() {
      let { name } = this.$route,
        { type } = this.$route.params,
        { keyWords: kw } = this.$route.query,
        { keyWords } = this

      if (!(kw || keyWords)) return

      if (isMoment(type)) {
        // 跳转到商品列表
        keyWords && this.$router.replace(`/index/2?keyWords=${keyWords}`)
      } else if (isUser(type) && !keyWords) {
        // 跳转到动态列表
        this.$router.replace('/index/5')
      } else {
        // 当前列表
        this.$router.replace(`/index/${type}?keyWords=${keyWords}`)
      }
    },
    // 消息按钮单击处理
    onMessageClick() {
      let user
      let { messages } = this.$store.state.im
      user = messages.length ? messages[0].userName : ''
      this.$router.push(`/inbox/${user}`)
    },
    // 目标页改变事件处理
    onPageChange(page = 1) {
      return this.$store.dispatch('post', {
        api: 'student_notification_list',
        data: { page, rows: this.notifications.rows }
      }).then(data => {
        this.notifications.list = data.data.result
        this.notifications.total = +data.data.totalCount
      })
    },
    // 弹出框显示处理
    onPopoverShow() {
      if (!this.notifications.list.length) this.onPageChange()
    },
    handleCommand(cmd) {
      const { dispatch, commit } = this.$store
      if (cmd == 'logout') {
        this.$confirm('Do you want to log out?', 'Confirm').then(() => 
          dispatch('logout').then(() => location.reload()).catch(err => this.$message.error(err.message))
        )
      } else if (cmd == 'myclasses') {
        this.$router.push(`/myclasses`)
      }
    }
  },
  mounted() {
    let { keyWords } = this.$route.query
    this.keyWords = keyWords ? keyWords.trim() : ''
    this.onWinScroll()
    window.addEventListener('scroll', this.onWinScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onWinScroll)
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
@import '~/assets/scss/sizes.scss';
$searchBoxHeight: 49px;
@mixin flex-center {
  height: 100%;
  display: flex;
  align-items: center;
}
.com-main-header {
  width: 100%;
  height: $pageHeaderHeight;
  min-width: $pageMinWidth;
  position: fixed;
  top: 0;
  z-index: 10;
  background-color: #fff;
  border-bottom: 1px solid $boxBorderColor;
  > .wrapper {
    width: $pageMinWidth;
    height: 100%;
    padding: 0 16px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      width: 166px;
      height: 31px;
      background: url(~/assets/img/logo.png) no-repeat center center/100%;
    }
    .right-box {
      @include flex-center;
      .search {
        width: 480px;
        height: $searchBoxHeight;
        background-color: #e9e9e9;
        border-radius: 6px;
        position: relative;
        padding-right: $searchBoxHeight;
        margin-right: 36px;
        input {
          display: block;
          width: 100%;
          height: 100%;
          padding: 0 12px;
          background-color: transparent;
          color: #3b3b3b;
          font-size: 15px;
          &::placeholder {
            color: #cccbcb;
          }
        }
        .icon-search {
          width: $searchBoxHeight;
          height: $searchBoxHeight;
          position: absolute;
          top: 0;
          right: 0;
          background: url(~/assets/img/common/Search-icon.png) no-repeat center center/19px;
        }
      }
      .tools {
        @include flex-center;
        .icon-btns {
          @include flex-center;
          border-right: 1px solid $boxBorderColor;
          padding-right: 20px;
          margin-right: 30px;
          .btn {
            width: $searchBoxHeight;
            height: $searchBoxHeight;
            border-radius: 50%;
            background: no-repeat center center/auto 23px;
            position: relative;
            &.btn-people {
              background-image: url(~/assets/img/common/People-icon.png);
            }
            &.btn-notification {
              background-image: url(~/assets/img/common/Notification-icon.png);
            }
            &.btn-message {
              background-image: url(~/assets/img/common/Message-icon.png);
            }
            .count {
              position: absolute;
              top: 0;
              right: 0;
              width: 24px;
              height: 24px;
              line-height: 24px;
              border-radius: 50%;
              text-align: center;
              font-size: 12px;
              color: #fff;
              background-color: #f56c6c;
              transform: scale(.8);
            }
          }
        }
        .el-dropdown-link {
          display: flex;
          align-items: center;
          cursor: pointer;
          &:focus {
            outline: none;
          }
          .el-icon-arrow-down {
            color: $blueColor;
            font-weight: bold;
            font-size: 15px;
            margin-left: 16px;
          }
        }
      }
    }
  }
}
.com-main-header-icon-menu-list {
  li {
    display: flex;
    align-items: center;
    .icon {
      width: 16px;
      height: 16px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
      margin-right: 15px;
    }
  }
}
</style>