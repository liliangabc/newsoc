<template>
<li class="com-comment-reply-item">
  <com-comment-header :detail="item" avator-size="36">
    <el-dropdown slot="right" trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="delete" v-if="isMine">Delete</el-dropdown-item>
        <el-dropdown-item command="report" v-else>Report</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <footer slot="bottom">
      <a href="javascript:;" class="btn btn-zan" :class="{active: item.isLike == '1'}" @click="onToggleZan"></a>
      <span>{{item.likeCount}}</span>
    </footer>
  </com-comment-header>
</li>
</template>
<script>
import ComCommentHeader from './header'
import { getReportType } from '~/components/card/menu-actions/utils'
export default {
  components: { ComCommentHeader },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userData.userInfo
    },
    isMine() {
      return this.item.stu_id === this.userInfo.id
    }
  },
  methods: {
    handleCommand(cmd) {
      let { type } = this.$route.params, { id } = this.item
      if (cmd == 'delete') {
        this.$confirm('Do you want to delete it?', 'Delete', {
          type: 'warning',
          confirmButtonText: 'YES',
          cancelButtonText: 'NO'
        }).then(() => {
          this.$store.dispatch('home/deleteComment', {
            route: this.$route, id
          }).then(data => {
            this.$parent.refresh('delete')
          }).catch(err => this.$alert(err.message, 'Error'))
        })
      } else if (cmd == 'report') {
        this.$store.commit('actions/toggleModal', {
          cmd, params: { relateId: id, type: getReportType(type, false, true) }
        })
      }
    },
    onToggleZan() {
      let { item } = this
        let { isLike, likeCount, id } = item
      this.$store.dispatch('home/toggleCommentZan', {
        route: this.$route, id
      }).then(data => {
        if (isLike == '-1') {
          item.isLike = '1'
          item.likeCount = +likeCount + 1
        } else {
          item.isLike = '-1'
          item.likeCount = +likeCount - 1
        }
      })
    }
  }
}
</script>
<style lang="scss">
.com-comment-reply-item {
  footer {
    display: flex;
    align-items: center;
    margin-top: 12px;
    color: #aaa;
    font-size: 12px;
    line-height: 1;
    .btn {
      width: 15px;
      height: 15px;
      background: no-repeat center center/15px;
      &.btn-zan {
        background-image: url(~/assets/img/posts/x3/ic_zan@3x.png);
        &.active {
          background-image: url(~/assets/img/posts/x3/zan_select@3x.png);
        }
      }
    }
    span {
      margin-left: 2px;
    }
  }
}
</style>