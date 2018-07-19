<template>
<el-dialog custom-class="com-posts-invite" title="Invite" width="480px"
  :close-on-click-modal="false"
  :visible.sync="isOpen"
  :before-close="onBeforeClose"
  @open="onOpen">
  <!-- 搜索框 -->
  <el-input placeholder="Search" v-model.trim="kw" class="input-with-select" @keyup.native.enter="onSearch">
    <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
  </el-input>
  <!-- 列表 -->
  <ul class="common-dialog-user-list list">
    <li v-for="item in listData.list" :key="item.id">
      <com-avator size="40" :src="item.userHeadImage"></com-avator>
      <div class="middle">
        <h3 class="username">{{item.nickName}}</h3>
        <h4 class="school">{{item.collegeName}}</h4>
      </div>
      <el-button type="primary" size="mini" plain round @click="invite(item)">Invite</el-button>
    </li>
  </ul>
</el-dialog>
</template>
<script>
import ComAvator from '~/components/common/avator'
export default {
  components: { ComAvator },
  data() {
    return {
      kw: '',
      keyWords: '',
      listData: { page: 1, rows: 15, hasNext: false, list: [] }
    }
  },
  computed: {
    inviteParams() {
      return this.$store.state.menuActions.invite
    },
    isOpen() {
      return !!this.inviteParams
    }
  },
  watch: {
    keyWords(newVal) {
      this.inviteParams && this.getData()
    }
  },
  methods: {
    close() {
      this.$store.commit('actions/toggleModal', { cmd: 'invite' })
    },
    onBeforeClose() {
      this.keyWords = this.kw = ''
      this.close()
    },
    getData(action) {
      let { keyWords } = this
      let { courseId, postId: post_id } = this.inviteParams
      this.listData.page = action == 'load' ? this.listData.page + 1 : 1
      let { page, rows } = this.listData
      return this.$store.dispatch('post', {
        api: 'class_invite_solve',
        data: { page, rows, courseId, post_id, keyWords }
      }).then(data => {
        if (action == 'load') {
          this.listData.list.push(...data.data.result)
        } else {
          this.listData.list = data.data.result
        }
        this.listData.hasNext = data.data.hasNext == '1'
      })
    },
    invite(item) {
      this.$store.dispatch('post', {
        api: 'confirm_intive_users',
        data: { postId: this.inviteParams.postId, invitedId: item.id }
      }).then(data => {
        this.$message({ type: 'success', message: data.info })
        let index = this.listData.list.indexOf(item)
        this.listData.list.splice(index, 1)
        if (this.listData.list.length < this.listData.rows) this.getData()
      }).catch(err => this.$message.error(err.message))
    },
    onSearch() {
      this.keyWords = this.kw
    },
    onOpen() {
      this.getData()
    }
  }
}
</script>