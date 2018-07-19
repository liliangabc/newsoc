<template>
<div class="com-inbox-chat-header">
  <com-avator size="97" :src="user.userPic"></com-avator>
  <h3 class="username">{{user.nickName}}</h3>
  <el-dropdown trigger="click" @command="handleCommand">
    <span class="el-dropdown-link">
      <i class="el-icon-more icon"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="block">{{isInBlocks ? 'Unblock' : 'Block'}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</div>
</template>
<script>
import ComAvator from '~/components/common/avator'
import { getToUserByMessages } from './core/utils'
export default {
  components: { ComAvator },
  computed: {
    user() {
      return getToUserByMessages(this.$route.params.user, this.$store.state.im.messages)
    },
    isInBlocks() {
      let blocks = this.$store.state.blocks.mblockList.split(',')
      let { userName } = this.user
      return userName && blocks.indexOf(userName) != -1
    }
  },
  methods: {
    handleCommand(cmd) {
      // 切换加入和取消加入黑名单
      if (cmd == 'block') {
        let api = this.isInBlocks ? 'student_messageBlockDrop' : 'student_messageBlockSave'
        let friend = this.user.userName
        const { commit, dispatch } = this.$store
        dispatch('post', {
          api, data: { friend }
        }).then(data => {
          this.$message({ type: 'success', message: data.info })
          commit('updateBlocks', { type: 'm', user: friend })
        }).catch(err => this.$message.error(err.message))
      }
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-inbox-chat-header {
  display: flex;
  align-items: center;
  height: 129px;
  color: #fff;
  background-color: $themeBlueColor;
  padding: 16px 21px 16px 27px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  .username {
    flex: 1;
    margin-left: 37px;
    text-transform: capitalize;
    font-size: 27px;
  }
  .icon {
    color: #fff;
    font-size: 21px;
    cursor: pointer;
  }
}
</style>