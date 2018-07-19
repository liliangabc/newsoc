<template>
<ul class="com-inbox-user-list">
  <li v-for="item in recentMsgs" :key="item.msg.id" class="user-item" :class="{active: user == item.userName, hasNew: item.count}" @click="onItemClick(item)">
    <com-avator size="64" :src="item.userPic"></com-avator>
    <div class="middle">
      <h3 class="username">{{item.nickName}}</h3>
      <span class="content">{{item.msg.data}}</span>
    </div>
    <span v-if="item.count" class="count">{{item.count}}</span>
    <i class="el-icon-arrow-down icon"></i>
  </li>
</ul>
</template>
<script>
import ComAvator from '~/components/common/avator'
export default {
  components: { ComAvator },
  computed: {
    user() {
      return this.$route.params.user
    },
    messages() {
      return this.$store.state.im.messages
    },
    recentMsgs() {
      return this.messages.map(item => {
        let { nickName, userName, userPic, newCount: count, list } = item
        let len = list.length
        let msg = len ? list[len - 1] : ''
        return { nickName, userName, userPic, count, msg }
      })
    }
  },
  methods: {
    clearCount(userName) {
      const { commit } = this.$store
      commit('im/clearNewCount', userName)
      commit('im/toggleAddCount', { isAddCount: false, userName })
    },
    onItemClick(item) {
      this.$router.replace(`/inbox/${item.userName}`)
    }
  },
  mounted() {
    this.clearCount(this.user)
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-inbox-user-list {
  width: 329px;
  min-width: 329px;
  height: 100%;
  overflow: auto;
  padding-bottom: 120px;
  background-color: #fff;
  border: 1px solid $boxBorderColor;
  .user-item {
    display: flex;
    align-items: center;
    padding: 14px 7px 14px 14px;
    border-bottom: 1px solid $boxBorderColor;
    cursor: pointer;
    &:hover {
      background-color: #f6f6f6;
    }
    &.active {
      background-color: #d9e6f7;
    }
    &.hasNew {
      .middle {
        .username {
          font-weight: bold;
        }
      }
    }
    .middle {
      flex: 1;
      margin-left: 12px;
      &, .username, .content {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .username {
        color: #606060;
        font-size: 16px;
        text-transform: capitalize;
      }
      .content {
        color: #606060;
        font-size: 15px;
      }
    }
    .count {
      width: 29px;
      height: 29px;
      line-height: 29px;
      min-width: 29px;
      background-color: #fbb700;
      font-size: 12px;
      color: #fff;
      text-align: center;
      border-radius: 50%;
      margin-left: 7px;
    }
    .icon {
      color: #d7d7d7;
      font-weight: bold;
      font-size: 15px;
      margin-left: 10px;
    }
  }
}
</style>