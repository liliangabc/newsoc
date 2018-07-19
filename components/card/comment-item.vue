<template>
<li class="com-card-comment-item">
  <header>
    <div class="avator-wrapper" :class="{isBest}">
      <com-avator size="36" :item="item" :to="isAnonymous ? '' : `/profile/${item.replyer || item.stu_id}/5`"></com-avator>
    </div>
    <div class="middle">
      <h3 class="title"><span>{{nickName}}</span> at {{item.collegeName}}</h3>
      <span class="date">{{item.lastModifyTime}}</span>
    </div>
    <div class="right">
      <router-link class="link-open-in-new" title="see details" v-if="!isMoment" :to="`/comment-details/${type}?id=${item.id}`"></router-link>
      <el-dropdown trigger="click" v-if="menuOptions.length" @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="op in menuOptions" :key="op.action" :command="op.action">{{op.label}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
  <section>
    <div class="content"><span class="to" v-if="item.toUserName">@{{item.toUserName}}:</span>{{item.subContent || item.repContent}}</div>
    <ul class="clearfix image-list" v-if="item.picUrls">
      <li v-for="(pic, index) in picUrls.slice(0, 3)" :key="index" :style="{backgroundImage: `url(${toThumb(pic)})`}" @click="onPicClick(index)"></li>
    </ul>
    <div class="bottombar" v-if="!isMoment">
      <span>{{item.likeCount}} Like</span>
      <span>{{item.comments}} Reply</span>
    </div>
  </section>
  <ul v-if="item.repList && item.repList.length" class="rep-list">
    <com-card-comment-item v-for="rep in item.repList" :key="rep.id" :item="rep" :type="type"></com-card-comment-item>
  </ul>
</li>
</template>
<script>
import ComAvator from '~/components/common/avator'
import { isClass, isMoment } from '~/plugins'
import { createCommentMenuOptions, getReportType, getGiftType } from './menu-actions/utils'
export default {
  name: 'com-card-comment-item',
  components: { ComAvator },
  props: {
    type: [String, Number],
    item: {
      type: Object,
      default: () => ({})
    },
    comments: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userData.userInfo
    },
    isAnonymous() {
      return this.userInfo.id != this.item.stu_id && this.item.anonymous == '1'
    },
    nickName() {
      return this.isAnonymous ? 'Anonymous' : this.item.nickName
    },
    picUrls() {
      return this.item.picUrls ? this.item.picUrls.split(',') : []
    },
    isMoment() {
      return isMoment(this.type)
    },
    isBest() {
      return isClass(this.type) && this.item.isBest == '1'
    },
    menuOptions() {
      return createCommentMenuOptions({
        route: this.$route,
        comment: this.item,
        isMine: this.userInfo.id === this.item.stu_id
      })
    }
  },
  methods: {
    toThumb(pic, size = 90) {
      return pic.replace('?imageslim', `?imageView2/1/w/${size * 2}`)
    },
    onPicClick(curIndex) {
      this.$store.commit('togglePreview', { curIndex, pics: this.picUrls })
    },
    handleCommand(cmd) {
      let params, { id, stu_id } = this.item
      // 举报
      if (cmd == 'report') {
        params = { relateId: id, type: getReportType(this.type, true) }
      // 礼物
      } else if (cmd == 'gift') {
        params = { type: getGiftType(this.type, true), receiver: stu_id, relateId: id }
      // 删除
      } else if (cmd == 'delete') {
        this.$confirm('Do you want to delete it?', 'Delete', {
          type: 'warning',
          confirmButtonText: 'YES',
          cancelButtonText: 'NO'
        }).then(() => {
          this.$store.dispatch('post',  {
            api: 'delete_post_comments',
            data: {
              id, type: this.isMoment ? '4' : this.type
            }
          }).then(data => {
            this.$parent.refresh('delete')
            this.$message({ type: 'success', message: data.info })
          }).catch(err =>
            this.$message.error(err.message)
          )
        })
      // 编辑
      } else if (cmd == 'edit') {
        this.$emit('edit', id)
      }

      this.$store.commit('actions/toggleModal', { cmd, params })
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-card-comment-item {
  margin-bottom: 20px;
  > header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    .avator-wrapper {
      position: relative;
      &.isBest:before {
        content: '';
        position: absolute;
        top: -15px;
        left: 0;
        right: 0;
        height: 20px;
        z-index: 1;
        background: url(~/assets/img/posts/x3/cld_huangguan.png) no-repeat center center/auto 100%;
      }
    }
    .middle {
      flex: 1;
      margin: 0 12px;
      white-space: nowrap;
      &, .title {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .title, .date {
        font-size: 12px;
        color: $themeBorderGreyColor;
      }
      .title span {
        font-size: 15px;
        color: $themeBlueColor;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .link-open-in-new {
        width: 20px;
        height: 20px;
        background: url(~/assets/img/posts/ic_open_in_new_tab.png) no-repeat center center/20px;
      }
      .el-dropdown {
        margin-left: 8px;
        i {
          font-size: 15px;
          font-weight: bold;
        }
      }
    }
  }
  > section {
    padding-left: 46px;
    .content {
      font-size: 13px;
      color: #3b3b3b;
      .to {
        color: #8bbef3;
        margin-right: 3px;
      }
    }
    .image-list, .bottombar {
      margin-top: 8px;
    }
    .image-list {
      li {
        width: 90px;
        height: 90px;
        float: left;
        margin-right: 12px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .bottombar {
      span {
        color: #8596b0;
        font-size: 12px;
        margin-right: 10px;
      }
    }
  }
  > .rep-list {
    padding-left: 46px;
    margin-top: 12px;
  }
}
</style>