<template>
<el-dropdown class="com-drop-menu" trigger="click" @command="handleCommand">
  <span class="el-dropdown-link">
    <i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item v-for="op in menuOptions" :key="op.action" :command="op.action">{{op.label}}</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
</template>
<script>
import { getReportType, getGiftType } from './utils'
import { isPostsDetail } from '~/plugins'
export default {
  props: {
    type: [String, Number],
    item: {
      type: Object,
      default: () => ({})
    },
    menuOptions: {
      type: Array,
      default: () => []
    },
    listData: {
      type: Object,
      default: () => ({ list: [] })
    }
  },
  methods: {
    // 动作命令处理
    handleCommand(cmd) {
      let params, { id, title, subContent, picUrls, stu_id } = this.item
      let imageUrl = picUrls.split(',')[0]
      // 分享
      if (cmd == 'share') {
        params = { type: this.type, id, title, description: subContent, imageUrl }
      // 举报
      } else if (cmd == 'report') {
        params = { relateId: id, type: getReportType(this.type) }
      // 编辑
      } else if (cmd == 'edit') {
        if (isPostsDetail(this.$route)) {
          params = { type: this.type, posts: this.item }
        } else {
          params = { type: this.type, id }
        }
      // 删除
      } else if (cmd == 'delete') {
        this.$confirm('Do you want to delete it?', 'Delete', {
          type: 'warning',
          confirmButtonText: 'YES',
          cancelButtonText: 'NO'
        }).then(() => {
          this.$store.dispatch('home/deletePosts', {
            posts: this.item,
            list: this.listData.list,
            type: this.type
          }).then(data => {
            this.$message({ type: 'success', message: data.info })
            if (!this.listData.list.length) {
              this.$router.back()
            }
          }).catch(err =>
            this.$message.error(err.message)
          )
        })
      // 送礼物
      } else if (cmd == 'gift') {
        params = { type: getGiftType(this.type), receiver: stu_id, relateId: id }
      // 已出售
      } else if (cmd == 'sold') {
        this.$store.dispatch('home/marketSoldChange', this.item).then(data =>
          this.$message({ type: 'success', message: data.info })
        ).catch(err => this.$message.error(err.message))
      // 邀请
      } else if (cmd == 'invite') {
        params = { courseId: this.item.courseId, postId: id }
      }

      this.$store.commit('actions/toggleModal', { cmd, params })
    }
  }
}
</script>
<style lang="scss">
.el-dropdown.com-drop-menu {
  .el-dropdown-link i {
    font-size: 15px;
    font-weight: bold;
  }
}
</style>