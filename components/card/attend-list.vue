<template>
<el-dialog custom-class="com-event-attend-list" title="Members List" width="480px"
  :visible.sync="isOpen"
  :before-close="onBeforeClose"
  @open="onOpen">
  <ul class="common-dialog-user-list list">
    <li v-for="item in listData.list" :key="item.id">
      <com-avator size="40" :item="item"></com-avator>
      <div class="middle">
        <h3 class="username">{{getUserName(item)}}</h3>
        <h4 class="school">{{item.collegeName}}</h4>
      </div>
    </li>
  </ul>
  <com-loadmore height="45" v-if="scroller && listData.hasNext" :scroller="scroller" :loading="loading" @load="getData('load')"></com-loadmore>
</el-dialog>
</template>
<script>
import ComAvator from '~/components/common/avator'
import ComLoadmore from '~/components/common/loadmore'
export default {
  components: { ComAvator, ComLoadmore },
  data() {
    return {
      isOpen: false,
      loading: false,
      scroller: null,
      listData: { page: 1, rows: 15, hasNext: false, list: [] }
    }
  },
  props: {
    visible: Boolean,
    typeName: String
  },
  computed: {
    curAPI() {
      return ({
        event: {
          key: 'eventId',
          api: 'student_hasAttended_events'
        }, meetup: {
          key: 'meetId',
          api: 'student_hasAttended_meeting'
        }
      })[this.typeName]
    },
    userInfo() {
      return this.$store.state.userData.userInfo
    }
  },
  watch: {
    visible(newVal) { this.isOpen = newVal }
  },
  methods: {
    onBeforeClose(done) {
      this.$emit('update:visible', false)
      done()
    },
    onOpen() {
      this.getData()
      this.$nextTick(() => {
        if (!this.scroller) {
          this.scroller = this.$el.querySelector('.el-dialog__body')
        }
      })
    },
    getData(action) {
      if (!this.curAPI) return
      this.listData.page = action == 'load' ? this.listData.page + 1 : 1
      let { api, key } = this.curAPI
      let { id } = this.$route.query
      let { page, rows } = this.listData
      this.loading = true
      this.$store.dispatch('post', {
        api, data: { [key]: id, page, rows }
      }).then(data => {
        this.loading = false
        if (action == 'load') {
          this.listData.list.push(...data.data.result)
        } else {
          this.listData.list = data.data.result
        }
        this.listData.hasNext = data.data.hasNext == '1'
      }).catch(err => {
        this.loading = false
        this.$alert(err.message, 'Error')
      })
    },
    getUserName(item) {
      return this.userInfo.id != item.userId && item.anonymous == '1' ? 'anonymous' : item.nickName
    }
  },
  beforeMount() {
    this.isOpen = this.visible
  }
}
</script>
<style lang="scss">
.com-event-attend-list.el-dialog {
  .el-dialog__body {
    max-height: 420px;
    overflow: auto;
    .com-loadmore {
      margin-top: 7px;
    }
  }
}
</style>