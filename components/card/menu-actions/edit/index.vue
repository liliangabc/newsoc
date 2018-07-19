<template>
<el-dialog custom-class="com-posts-edit" :title="curView.title" top="10vh"
  :center="true"
  :close-on-click-modal="false"
  :visible.sync="isOpen"
  :before-close="onBeforeClose"
  @open="onOpen">
  <component :is="curView.view" :detail="detail" :categories="categories" @submiting="onSubmiting" @submited="onSubmited"></component>
</el-dialog>
</template>
<script>
import ComMarketEdit from './market'
import ComMeetupEdit from './meetup'
import ComEventEdit from './event'
import { isEvent, isMarket, isClass, isMeetup, isPostsDetail } from '~/plugins'
export default {
  data() {
    return { curView: { view: null, title: '' }, detail: {}, categories: [] }
  },
  computed: {
    editParams() {
      return this.$store.state.menuActions.edit
    },
    isOpen() {
      return !!this.editParams
    }
  },
  methods: {
    // 获取目标视图模型
    getCurView() {
      let view, title = ''
      if (!this.editParams) return { view, title }
      let { type } = this.editParams
      if (isEvent(type)) {
        view = ComEventEdit
        title = 'New Post'
      } else if (isMarket(type)) {
        view = ComMarketEdit
        title = 'New Item'
      } else if (isClass(type)) {
        view = ComMarketEdit
        title = 'New Post'
      } else if (isMeetup(type)) {
        view = ComMeetupEdit
        title = 'Create Meetup'
      }
      return { view, title }
    },
    // 获取帖子详情
    getDetail() {
      let { type, id, posts } = this.editParams
      if (id) {
        this.$store.dispatch('home/getPosts', { type, id }).then(data => this.detail = data.detail)
      } else if (posts) {
        this.$nextTick(() => this.detail = posts)
      } else {
        this.detail = {}
      }
    },
    // 获取帖子类别
    getCategories() {
      let { type } = this.editParams
      return this.$store.dispatch('home/getCategory', type).then(data => {
        this.categories = data.slice(1)
      })
    },
    // 对话框打开事件
    onOpen() {
      this.curView = this.getCurView()
      this.getCategories()
      this.getDetail()
    },
    // 对话框关闭之前
    onBeforeClose() {
      this.detail = {}
      this.$store.commit('actions/toggleModal', { cmd: 'edit' })
    },
    // 提交中
    onSubmiting() {
      this.comLoading = this.$loading({
        target: this.$el.querySelector('.el-dialog'),
        background: 'rgba(255, 255, 255, .7)'
      })
    },
    // 提交完成
    onSubmited({ status, message }) {
      this.comLoading && this.comLoading.close()
      this.comLoading = null
      if (status == 'ok') {
        this.onBeforeClose()
        this.$message({ type: 'success', message })
      } else {
        return this.$message.error(message)
      }
      // 刷新数据
      if (isPostsDetail(this.$route)) {
        location.reload()
      } else {
        this.$store.dispatch('home/getList', { route: this.$route })
      }
    }
  }
}
</script>
<style lang="scss" src="./style.scss"></style>