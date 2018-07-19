<template>
<el-dialog custom-class="com-posts-report" title="Report" width="400px"
  :close-on-click-modal="false"
  :visible.sync="isOpen"
  :before-close="onBeforeClose">
  <div class="title">Choose a report reason</div>
  <ul class="reason-list">
    <li>
      <span class="label">{{reason1.label}}</span>
      <el-checkbox v-model="reason1.checked"></el-checkbox>
    </li>
    <li>
      <span class="label">{{reason2.label}}</span>
      <el-checkbox v-model="reason2.checked"></el-checkbox>
    </li>
  </ul>
  <textarea class="content-editor" placeholder="Tell us more..." rows="3" v-model.trim="content"></textarea>
  <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="onBeforeClose">Cancel</el-button>
    <el-button type="primary" size="mini" :disabled="disabled" @click="submit">Submit</el-button>
  </span>
</el-dialog>
</template>
<script>
export default {
  data() {
    return {
      content: '',
      reason1: { checked: false, label: 'It"s spam' },
      reason2: { checked: false, label: 'Inapporopriate content' }
    }
  },
  computed: {
    reportParams() {
      return this.$store.state.menuActions.report
    },
    isOpen() {
      return !!this.reportParams
    },
    reason() {
      let arr = []
      this.reason1.checked && arr.push(this.reason1.label)
      this.reason2.checked && arr.push(this.reason2.label)
      return arr.join(';')
    },
    disabled() {
      return !(this.content && this.reason)
    }
  },
  methods: {
    init() {
      this.content = ''
      this.reason1.checked = this.reason2.checked = false
    },
    close() {
      this.$store.commit('actions/toggleModal', { cmd: 'report' })
    },
    onBeforeClose() {
      this.init()
      this.close()
    },
    submit() {
      let { content, reason } = this
      let { relateId, type } = this.reportParams
      let $loading = this.$loading()
      this.$store.dispatch('post', {
        api: 'student_customer_report',
        data: { relateId, type, content, reason }
      }).then(data => {
        $loading.close()
        this.init()
        this.close()
        this.$message({ type: 'success', message: data.info })
      }).catch(err => {
        $loading.close()
        this.$message.error(err.message)
      })
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.el-dialog.com-posts-report {
  .el-dialog__body {
    .title {
      font-size: 17px;
      color: #757575;
    }
    .reason-list {
      padding: 12px 0;
      li {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > .label {
          font-size: 15px;
          color: #6f6f6f;
        }
      }
    }
    .content-editor {
      width: 100%;
      resize: none;
      padding: 8px;
      color: #757575;
      border: 1px solid $boxBorderColor;
    }
  }
}
</style>