<template>
<el-dropdown slot="right" trigger="click" @command="handleCommand">
  <span class="el-dropdown-link">
    <i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="accept" v-if="detail.viewType == 'a'">Accept</el-dropdown-item>
    <el-dropdown-item command="refund" v-else-if="detail.viewType == 'r'">Request refund</el-dropdown-item>
    <el-dropdown-item command="buy" v-else-if="detail.viewType == 'b'">Buy</el-dropdown-item>
    <el-dropdown-item command="cancelRefund" v-else-if="detail.viewType == 'c'">Cancel the refund request</el-dropdown-item>
    <el-dropdown-item command="approve" v-else-if="detail.viewType == 'p'">Approve</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
</template>
<script>
import { isClass } from '~/plugins'
export default {
  data() {
    return { coins: {} }
  },
  props: {
    detail: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    // 命令处理
    handleCommand(cmd) {
      if (cmd == 'accept') {
        this.onAccept()
      } else if (cmd == 'refund') {
        this.onRefund()
      } else if (cmd == 'buy') {
        this.onBuy()
      } else if (cmd == 'cancelRefund') {
        this.onCancelRefund()
      } else if (cmd == 'approve') {
        this.onApprove()
      }
    },
    // 接受最佳答案
    onAccept() {
      this.$confirm(
        'Once you accept it, the reward points will go this commenter.',
        'Do you accept this comment?',
        { type: 'info'}
      ).then(() => {
        this.$store.dispatch('post', {
          api: 'student_accept_answer',
          data: { commentId: this.detail.id }
        }).then(data => {
          this.$message({ message: data.info, type: 'success' })
          this.detail.viewType = 'r'
        }).catch(err => this.$alert(err.message, 'Error'))
      })
    },
    // 退款
    onRefund() {
      this.$prompt('', 'refund reason', {
        inputValidator: value => !!value.trim(),
        inputErrorMessage: 'Reason cannot be empty.'
      }).then(({ value }) => {
        this.$store.dispatch('post', {
          api: 'student_applyRefund_comment',
          data: { commentId: this.detail.id, reason: value }
        }).then(data => {
          this.$message({ message: data.info, type: 'success' })
          this.detail.viewType = 'c'
        }).catch(err => this.$alert(err.message, 'Error'))
      })
    },
    // 获取帖子积分信息
    getCoins() {
      if (!isClass(this.$route.params.type)) return
      this.$store.dispatch('post', {
        api: 'get_commentsCoins_balance',
        data: { id: this.detail.id }
      }).then(data => this.coins = data.data)
    },
    // 购买答案
    onBuy() {
      let { needCoins, balance } = this.coins
      let styleStr = 'font-size: 15px; color: #4183d7;'
      this.$confirm(
        `<div>
            Do you want to pay <b style="${styleStr}">${needCoins}</b> points to unblock this comment?
            Current Available Points: <b style="${styleStr}">${balance}</b>
          </div>`, 'Buy', {
          confirmButtonText: 'CONFIRM',
          cancelButtonText: 'CANCEL',
          type: 'info',
          dangerouslyUseHTMLString: true
        }
      ).then(() => {
        this.$store.dispatch('post', {
          api: 'student_view_comment',
          data: { commentId: this.detail.id }
        }).then(data => {
          this.$message({ message: data.info, type: 'success' })
          this.$emit('bought')
        }).catch(err => this.$alert(err.message, 'Error'))
      })
    },
    // 取消退款
    onCancelRefund() {
      this.$store.dispatch('post', {
        api: 'student_cancelRefund_comment',
        data: { commentId: this.detail.id }
      }).then(data => {
        this.$message({ message: data.info, type: 'success' })
        this.detail.viewType = 'r'
      }).catch(err => this.$alert(err.message, 'Error'))
    },
    // 同意退款
    onApprove() {
      this.$confirm(this.detail.reason, 'Approve', {
        confirmButtonText: 'CONFIRM',
        cancelButtonText: 'CANCEL',
        type: 'info'
      }).then(() => {
        this.$store.dispatch('post', {
          api: 'student_agreeRefund_comment',
          data: {
            commentId: this.detail.id,
            applyer: this.detail.whosId
          }
        }).then(data => {
          this.$message({ message: data.info, type: 'success' })
          this.detail.viewType = ''
        }).catch(err => this.$alert(err.message, 'Error'))
      })
    }
  },
  beforeMount() {
    this.getCoins()
  }
}
</script>