<template>
<header class="com-profile-header" :style="styles">
  <div class="clearfix bottom-wrapper">
    <div class="left-box">
      <com-avator size="210" :src="profile.userHeadImage"></com-avator>
      <div class="group">
        <h2 class="username">{{profile.alias || profile.nickName}}</h2>
        <p class="school">at <span>{{profile.collegeName}}</span></p>
      </div>
    </div>
    <div class="right-box">
      <template v-if="!ismy">
        <button class="btn btn-follow followed" v-if="profile.isFollow == '1'" @click="toggleFollow"><i></i>following</button>
        <button class="btn btn-follow" v-else @click="toggleFollow"><i></i>follow</button>
        <button class="btn btn-gift"><i></i>send gift</button>
        <button class="btn btn-message" @click="onMessageClick"><i></i>message</button>
      </template>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <button class="btn btn-more"><i class="el-icon-more"></i></button>
        </span>
        <el-dropdown-menu slot="dropdown">
          <template v-if="ismy">
            <el-dropdown-item command="privacy">Privacy</el-dropdown-item>
            <el-dropdown-item command="background">Change Background</el-dropdown-item>
          </template>
          <template v-else>
            <el-dropdown-item command="alias">Set Alias</el-dropdown-item>
            <el-dropdown-item command="block">{{isInBlocks ? 'Unblock' : 'Block'}}</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <input type="file" ref="file" accept="image/gif,image/jpeg,image/jpg,image/png" @change="onFileChange">
  </div>
</header>
</template>
<script>
import ComAvator from '~/components/common/avator'
export default {
  components: { ComAvator },
  computed: {
    profile() {
      return this.$store.state.profile.profile
    },
    userInfo() {
      return this.$store.state.userData.userInfo
    },
    ismy() {
      return this.userInfo.id == this.$route.params.id
    },
    styles() {
      return this.profile.background ? { backgroundImage: `url(${this.profile.background})` } : {}
    },
    isInBlocks() {
      let blocks = this.$store.state.blocks.pblockList.split(',')
      return blocks.indexOf(this.$route.params.id) != -1
    }
  },
  methods: {
    // 切换关注和取消关注
    toggleFollow() {
      let { profile } = this
      let { id: followed_id } = this.$route.params
      this.$store.dispatch('post', {
        api: 'student_follow',
        data: { followed_id }
      }).then(data => {
        this.$message({ type: 'success', message: data.info })
        let isFollow = profile.isFollow == '1'
        let followers = ~~profile.followers
        this.$set(profile, 'isFollow', isFollow ? '0' : '1')
        this.$set(profile, 'followers', isFollow ? followers - 1 : followers + 1)
      })
    },
    // 消息单击处理
    onMessageClick() {
      let { nickName, easemobUserName: userName, userHeadImage: userPic } = this.profile
      this.$store.commit('im/addUser', {
        nickName, userName, userPic
      })
      this.$router.push(`/inbox/${userName}`)
    },
    // 下拉菜单命令处理
    handleCommand(cmd) {
      let { dispatch, commit } = this.$store
      // 背景
      if (cmd == 'background') {
        this.$refs.file.click()
      // 备注
      } else if (cmd == 'alias') {
        this.setAlias()
      // 黑名单
      } else if (cmd == 'block') {
        this.addToBlack()
      }
    },
    // 文件改变事件处理 | 修改背景
    onFileChange(event) {
      const { dispatch } = this.$store
      let file = event.target.files[0]
      if (!file || file.type.indexOf('image')) return
      const comLoading = this.$loading({ target: this.$el })
      dispatch('upload', { file }).then(url => {
        dispatch('post', {
          api: 'student_update_info',
          data: { background: url }
        }).then(data => {
          comLoading.close()
          this.$set(this.profile, 'background', url)
        }).catch(err => {
          comLoading.close()
          this.$message.error(err.message)
        })
      }).catch(err => {
        comLoading.close()
        this.$message.error(err.message)
      })
    },
    // 设置备注名
    setAlias() {
      let inputValue = this.profile.alias || this.profile.nickName
      this.$prompt('', 'Set Alias', { inputValue }).then(({ value }) => {
        let alias = value ? value.trim() : ''
        if (alias == inputValue) return
        this.$store.dispatch('post', {
          api: 'set_alias_of_friends',
          data: { alias, person_id: this.$route.params.id }
        }).then(data => {
          this.$set(this.profile, 'alias', alias)
        }).catch(err => this.$message.error(err.message))
      })
    },
    // 加入黑名单
    addToBlack() {
      let { id } = this.$route.params
      let api = this.isInBlocks ? 'student_profileBlockDrop' : 'student_profileBlockSave'
      this.$store.dispatch('post', {
        api, data: { friend: id }
      }).then(data => {
        this.$message(data.info)
        this.$store.commit('updateBlocks', { type: 'p', user: id })
      })
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-profile-header {
  height: 428px;
  background: linear-gradient(135deg, #83aee5, #4183d7) no-repeat center center;
  background-size: cover;
  position: relative;
  margin-bottom: 36px;
  .bottom-wrapper {
    width: 100%;
    height: 118px;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0 36px;
    .left-box, .right-box {
      height: 100%;
      display: flex;
      align-items: center;
    }
    .left-box {
      float: left;
      .com-avator {
        border: 5px solid #fff;
        box-shadow: $boxShadowDepth2;
        margin-right: 15px;
        align-self: flex-end;
        position: relative;
        top: -20px;
      }
      .group {
        color: #585858;
        .username {
          font-size: 35px;
          margin-bottom: 6px;
        }
        .school {
          font-size: 17px;
          span {
            color: $themeBlueColor;
          }
        }
      }
    }
    .right-box {
      float: right;
      .btn {
        height: 42px;
        padding: 0 20px;
        margin-left: 10px;
        text-transform: capitalize;
        font-size: 15px;
        display: flex;
        align-items: center;
        background-color: #ebebeb;
        i {
          margin-right: 8px;
          background-repeat: no-repeat;
          background-position: 0 center;
        }
        &.btn-follow {
          color: #fff;
          background-color: #7cc576;
          i {
            width: 21px;
            height: 20px;
            background-size: 21px;
            background-image: url(~/assets/img/profile/Follow-icon.png);
          }
          &.followed {
            background-color: #ee5050;
          }
        }
        &.btn-gift {
          color: #fff;
          background-color: $themeBlueColor;
          i {
            width: 20px;
            height: 21px;
            background-size: 20px;
            background-image: url(~/assets/img/profile/gift.png);
          }
        }
        &.btn-message {
          color: $themeBlueColor;
          i {
            width: 29px;
            height: 24px;
            background-size: 29px;
            background-image: url(~/assets/img/profile/Message-icon.png);
          }
        }
        &.btn-more {
          color: #d3d3d3;
          font-size: 20px;
          i {
            margin-right: 0;
          }
        }
      }
    }
  }
  input[type=file] {
    display: none;
  }
}
</style>