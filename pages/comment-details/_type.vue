<template>
<div class="page-comment-details">
  <div class="details-wrapper">
    <com-comment-header :detail="detail">
      <com-answer-dropmenu v-if="hasDropmenu" slot="right" :detail="detail" @bought="getDetail"></com-answer-dropmenu>
      <com-attach-list slot="attach" :detail="detail"></com-attach-list>
    </com-comment-header>
  </div>
  <div class="reply-box" ref="reply-box">
    <com-comment-toolbar :item="detail"></com-comment-toolbar>
    <div v-if="listData.list.length">
      <ul>
        <com-reply-item v-for="item in listData.list" :key="item.id" :item="item"></com-reply-item>
      </ul>
      <el-pagination layout="prev, pager, next"
        :total="listData.totalCount"
        :page-size="listData.pageSize"
        :current-page.sync="listData.currentPage"
        @current-change="onCurrentChange">
      </el-pagination>
    </div>
    <div class="no-comment" v-else>Write the first comment.</div>
    <com-editor v-model.trim="content">
      <el-button slot="submit" type="primary" size="mini" @click="onSubmit">Submit</el-button>
    </com-editor>
  </div>
</div>
</template>
<script>
import ComCommentHeader from '~/components/comment/header'
import ComCommentToolbar from '~/components/comment/toolbar'
import ComReplyItem from '~/components/comment/reply-item'
import ComAnswerDropmenu from '~/components/comment/answer-dropmenu'
import ComAttachList from '~/components/comment/attach-list'
import ComEditor from '~/components/common/editor'
import { getOffset, isClass } from '~/plugins'
export default {
  asyncData({ route, store }) {
    return store.dispatch('home/getComment', { route }).then(data => ({ detail: data.data }))
  },
  components: { ComCommentHeader, ComCommentToolbar, ComReplyItem, ComAnswerDropmenu, ComAttachList, ComEditor },
  data() {
    return {
      content: '',
      detail: {},
      listData: { totalCount: 0, pageSize: 10, currentPage: 1, list: [] }
    }
  },
  computed: {
    isClass() {
      return isClass(this.$route.params.type)
    },
    hasDropmenu() {
      return this.isClass && this.detail.viewType
    }
  },
  methods: {
    getDetail() {
      return this.$store.dispatch('home/getComment', {
        route: this.$route
      }).then(data => this.detail = data.data)
    },
    // 获取回复列表
    getReplyList(page) {
      this.$store.dispatch('home/getReplyList', { route: this.$route, page }).then(data => {
        this.listData.totalCount = +data.data.totalCount
        this.listData.pageSize = +data.data.pageSize
        this.listData.currentPage = +data.data.pageNo
        this.listData.list = data.data.result
      })
    },
    // 目标页改变
    onCurrentChange(page) {
      this.scrollToCommentTop()
      this.getReplyList(page)
    },
    // 滚动到评论区顶部
    scrollToCommentTop() {
      let oTop = getOffset(this.$refs['reply-box']).top
      let mainHeaderHeight = document.body.querySelector('.com-main-header').offsetHeight
      window.scrollTo(0, oTop - mainHeaderHeight)
    },
    // 刷新评论列表
    refresh(cmd) {
      if (cmd == 'delete') {
        this.$set(this.detail, 'comments', +this.detail.comments - 1)
      }
      let { totalCount, pageSize, currentPage } = this.listData
      let count = Math.ceil((totalCount)/pageSize) || 1
      let newCount = Math.ceil((totalCount - 1)/pageSize) || 1
      this.getReplyList(count >= newCount ? currentPage : currentPage - 1)
    },
    // 提交
    onSubmit() {
      if (!this.content) return
      let comLoading = this.$loading()
      this.$store.dispatch('home/editReply', {
        route: this.$route,
        content: this.content
      }).then(data => {
        comLoading.close()
        this.content = ''
        this.onCurrentChange()
      }).catch(err => {
        comLoading.close()
        this.$alert(err.message, 'Error')
      })
    }
  },
  beforeMount() {
    this.getReplyList()
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.page-comment-details {
  width: 600px;
  margin: auto;
  padding: 36px 0;
  .details-wrapper, .reply-box {
    border-radius: 4px;
    padding: 0 20px 20px;
    border: 1px solid $boxBorderColor;
  }
  .details-wrapper {
    background-color: #fff;
  }
  .reply-box {
    border-top: none;
    background-color: #fbfbfb;
    .el-pagination {
      text-align: center;
      padding: 16px 0;
      button, .el-pager li {
        min-width: 30px;
        background-color: transparent;
      }
    }
    .no-comment {
      height: 100px;
      line-height: 100px;
      text-align: center;
      color: #aaa;
    }
  }
  .com-comment-reply-item {
    section {
      padding-left: 48px;
    }
  }
}
</style>