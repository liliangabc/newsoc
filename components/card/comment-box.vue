<template>
<div class="com-card-comment-box">
  <div class="comment-list" v-if="showList">
    <ul>
      <com-card-comment-item v-for="item in comments" :key="item.id" :type="type" :item="item" :comments="comments" @edit="onEdit"></com-card-comment-item>
    </ul>
    <el-pagination layout="prev, pager, next" v-if="totalCount" :total="totalCount" :page-size="pageSize" :current-page.sync="currentPage" @current-change="onCurrentChange"></el-pagination>
  </div>
  <com-editor ref="com-editor" :isRichText="isRichText" :hasAttach="hasAttach" v-model="content">
    <template slot="submit">
      <el-button size="mini" v-if="curId" @click="onCancelEdit">Cancel</el-button>
      <el-button size="mini" type="primary" @click="onSubmit">Post</el-button>
    </template>
  </com-editor>
</div>
</template>
<script>
import ComCardCommentItem from './comment-item'
import ComEditor from '~/components/common/editor'
import { isClass, isMoment, getOffset } from '~/plugins'
export default {
  components: { ComCardCommentItem, ComEditor },
  data() {
    return {
      content: '',
      comments: [],
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      curId: undefined
    }
  },
  props: {
    type: [String, Number],
    item: {
      type: Object,
      default: () => ({})
    },
    showList: Boolean
  },
  computed: {
    isRichText() {
      return !isMoment(this.type)
    },
    hasAttach() {
      return isClass(this.type)
    }
  },
  watch: {
    showList(newVal) {
      newVal && this.getComments()
    }
  },
  methods: {
    // 获取评论列表
    getComments(page = 1) {
      let { type } = this, { id } = this.item
      return this.$store.dispatch('home/getComments', { id, type, page, rows: this.pageSize }).then(data => {
        let { result, totalCount } = data.moment ? data.moment : data.data && data.data.recentList ? data.data.recentList : data.data
        this.comments = result
        this.totalCount = ~~totalCount
      })
    },
    // 刷新评论列表
    refresh(cmd) {
      if (cmd == 'delete') {
        this.$set(this.item, 'comments', +this.item.comments - 1)
      }
      let count = Math.ceil((this.totalCount)/this.pageSize) || 1
      let newCount = Math.ceil((this.totalCount - 1)/this.pageSize) || 1
      this.getComments(count >= newCount ? this.currentPage : this.currentPage - 1)
    },
    // 目标页改变
    onCurrentChange(page) {
      this.scrollToCommentTop()
      this.getComments(page)
    },
    // 滚动到评论区顶部
    scrollToCommentTop() {
      let oTop = getOffset(this.$el.parentNode).top
      let mainHeaderHeight = document.body.querySelector('.com-main-header').offsetHeight
      window.scrollTo(0, oTop - mainHeaderHeight)
    },
    // 提交完成处理
    handleSubmited(data, $loading) {
      $loading.close()
      if (this.curId) {
        this.curId = undefined
      } else {
        this.$set(this.item, 'comments', +this.item.comments + 1)
      }
      this.$message({ type: 'success', message: data.info })
      this.$emit('update:showList', true)
      this.getComments()
      this.scrollToCommentTop()
    },
    // 提交错误处理
    onSubmitError(err, $loading) {
      $loading.close()
      this.$notify({ type: 'error', title: 'Error', message: err.message })
    },
    // 提交
    onSubmit() {
      let { dispatch } = this.$store, postId = this.item.id
      let loadingOptions = { background: 'rgba(255, 255, 255, .3)' }
      if (isMoment(this.type)) {
        if (!this.content) return
        let $loading = this.$loading(loadingOptions)
        dispatch('home/editMomentComment', {
          content: this.content, postId
        }).then(data => {
          this.content = ''
          this.handleSubmited(data, $loading)
        }).catch(err => this.onSubmitError(err, $loading))
      } else {
        let comEditor = this.$refs['com-editor']
        if (comEditor.isEmpty()) return
        let $loading = this.$loading(loadingOptions)
        comEditor.upload().then(([picUrls, fileUrls]) => {
          let content = comEditor.getHTML()
          dispatch('home/editComment', {
            type: this.type, content, postId, picUrls, fileUrls, commentId: this.curId
          }).then(data => {
            comEditor.init()
            this.handleSubmited(data, $loading)
          }).catch(err => this.onSubmitError(err, $loading))
        }).catch(err => this.onSubmitError(err, $loading))
      }
    },
    // 获取评论详情
    getDetail(id) {
      return this.$store.dispatch('home/getComment', { type: this.type, id })
    },
    // 评论编辑
    onEdit(id) {
      this.getDetail(id).then(data => {
        this.curId = id
        let { content, picUrls } = data.data
        let comEditor = this.$refs['com-editor']
        comEditor.setInitContent(content, picUrls)
        window.scrollTo(0, getOffset(comEditor.$el).top - 92)
      })
    },
    // 取消编辑
    onCancelEdit() {
      let comEditor = this.$refs['com-editor']
      this.curId = undefined
      comEditor.init()
    }
  },
  beforeMount() {
    if (this.showList) this.getComments()
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-card-comment-box {
  .comment-list > ul {
    min-height: 120px;
  }
  .el-pagination {
    padding: 16px 0;
    text-align: center;
    .el-pager li, button {
      min-width: 30px;
      background-color: transparent;
    }
  }
}
</style>