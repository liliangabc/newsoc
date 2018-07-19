<template>
<div class="com-card-event-info">
  <el-button class="btn-interest" size="mini" type="primary" round
    :disabled="disabled" :plain="detail.attended != '1'" @click="onInterestClick">
    {{detail.attended == '1' ? 'interested' : 'interest'}}
  </el-button>
  <ul class="list-layout">
    <li class="when" v-if="detail.eventTime">
      <span class="label">When:</span>
      <span class="value">{{detail.eventTime}}</span>
    </li>
    <template v-if="isEvent">
      <li class="address" v-if="detail.eventAddress">
        <span class="label">Address:</span>
        <a class="value link" @click="openMap">{{detail.eventAddress}}</a>
      </li>
    </template>
    <template v-else>
      <li class="cost">
        <span class="label">Cost:</span> 
        <span class="value">{{detail.cost}}</span>
      </li>
      <li class="gender">
        <span class="label">Gender:</span> 
        <span class="value">{{detail.gender}}</span>
      </li>
      <li class="age">
        <span class="label">Age:</span> 
        <span class="value">{{detail.age}}</span>
      </li>
      <li class="transportation">
        <span class="label">Transportation:</span> 
        <span class="value">{{detail.transportation}}</span>
      </li>
      <li class="address" v-if="detail.eventAddress">
        <span class="label">Address:</span>
        <a class="value link" @click="openMap">{{detail.eventAddress}}</a>
      </li>
      <li class="friends" v-if="detail.allowFriend == '1'">
        <span class="label">Friends:</span> 
        <span class="value">Okay to bring friends</span>
      </li>
    </template>
  </ul>
  <div class="attendbox">
    <div class="attends">
      <span class="label">Attendance <b>{{attends.attendsCount}}</b></span>
      <div class="avators">
        <com-avator size="32" v-for="avator in avators" :key="avator" :src="avator"></com-avator>
        <button title="see more..." class="el-icon-d-arrow-right btn" @click="onOpenAttendList"></button>
      </div>
    </div>
  </div>
  <com-attend-list :visible.sync="attendListVisible" :type-name="typeName"></com-attend-list>
  <el-dialog custom-class="confirm-dialog" width="420px" top="" :visible.sync="dialogVisible">
    <span>Do you want to attend anonymously?</span>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="toggleInterest('1')">YES</el-button>
      <el-button size="small" type="primary" @click="toggleInterest('0')">NO</el-button>
    </span>
  </el-dialog>
  <com-gmap ref="com-gmap"></com-gmap>
</div>
</template>
<script>
import { isEvent, isMeetup } from '~/plugins'
import ComAvator from '~/components/common/avator'
import ComAttendList from './attend-list'
import ComGmap from '~/components/gmap'
export default {
  components: { ComAvator, ComAttendList, ComGmap },
  data() {
    return {
      dialogVisible: false,
      attendListVisible: false
    }
  },
  props: {
    type: [String, Number],
    detail: {
      type: Object,
      default: () => ({})
    },
    attends: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userData.userInfo
    },
    isEvent() {
      return isEvent(this.type)
    },
    isMeetup() {
      return isMeetup(this.type)
    },
    typeName() {
      return this.isEvent ? 'event' : this.isMeetup ? 'meetup' : ''
    },
    avators() {
      if(!this.attends.userHeadImages) return []
      const arr = []
      this.attends.userHeadImages.split(',').forEach(item => {
        let inStr = item.indexOf('imageView2') != -1
        arr.push(inStr ? item : (item + '?imageView2/1/w/64'))
      })
      return arr.slice(0, 5)
    },
    disabled() {
      // 如果是我自己的发布的 那么禁用
      if (this.detail.stu_id == this.userInfo.id) return true
      // 如果 报名时间存在 那么当前时间大于报名时间 说明截至报名日期已过 禁用
      if (this.detail.attendTime) {
        return new Date > new Date(this.detail.attendTime)
      // 否则如果 活动时间存在 那么当前时间大于活动时间 说明活动已过期 禁用
      } else if (this.detail.eventTime) {
        return new Date > new Date(this.detail.eventTime)
      }
      // 否则 如果报名时间和活动时间都不存在 启用
      return false
    }
  },
  methods: {
    // 打开报名用户列表对话框
    onOpenAttendList() {
      let stuId = this.detail.stu_id
      let userId = this.userInfo.id
      if (this.isEvent || (this.isMeetup && stuId == userId)) {
        this.attendListVisible = true
      }
    },
    // 切换报名和取消报名
    toggleInterest(anonymous = '0') {
      this.dialogVisible = false
      const curAPI = {
        event: {
          key: 'eventId',
          api: 'student_attend_events'
        }, meetup: {
          key: 'meetId',
          api: 'student_attend_meetings'
        }
      }
      let { key, api } = curAPI[this.typeName]
      let { id, attended } = this.detail
      this.$store.dispatch('post', {
        api, data: { [key]: id, anonymous }
      }).then(data => {
        this.$set(this.detail, 'attended', attended == '1' ? '0' : '1')
        this.updateAttends()
      }).catch(err => this.$alert(err.message, 'Error'))
    },
    // 更新报名列表
    updateAttends() {
      let { attended } = this.detail,
      count = +this.attends.attendsCount,
      attends = this.attends.userHeadImages.split(',')
      if (attended == '1') {
        attends.unshift(this.userInfo.userHeadImage)
        this.$set(this.attends, 'attendsCount', count + 1)
      } else {
        this.$set(this.attends, 'attendsCount', count - 1)
        let avator = attends.find(item => item == this.userInfo.userHeadImage)
        if (avator) {
          let index = attends.indexOf(avator)
          attends.splice(index, 1)
        }
      }
      this.$set(this.attends, 'userHeadImages', attends.join(','))
    },
    // 报名按钮单击
    onInterestClick() {
      let { attended } = this.detail
      if (attended == '1' || this.isMeetup) return this.toggleInterest('0')
      this.dialogVisible = true
    },
    // 打开谷歌地图
    openMap() {
      this.$refs['com-gmap'].onOpen(this.detail.eventAddress)
    }
  }
}
</script>
<style lang="scss">
.com-card-event-info {
  position: relative;
  .btn-interest {
    text-transform: uppercase;
    position: absolute;
    top: 12px;
    right: 0;
  }
  .list-layout {
    padding: 12px 0;
    min-height: 78px;
    li {
      padding: 5px 0 5px 32px;
      background: no-repeat 0 center/25px;
      span, a {
        font-size: 12px;
      }
      .link {
        text-decoration: underline;
      }
      .label {
        color: #8bbef3;
        margin-right: 8px;
      }
      .value {
        color: #aaa;
      }
      &.when {
        background-image: url(~/assets/img/posts/x3/Calendar-icon.png);
      }
      &.address {
        background-image: url(~/assets/img/posts/x3/address.png);
      }
      &.cost {
        background-image: url(~/assets/img/posts/x3/cost.png);
      }
      &.gender {
        background-image: url(~/assets/img/posts/x3/male.png);
      }
      &.age {
        background-image: url(~/assets/img/posts/x3/age.png);
      }
      &.transportation {
        background-image: url(~/assets/img/posts/x3/trans.png);
      }
      &.friends {
        background: url(~/assets/img/posts/x3/Persons_Icon.png) no-repeat 5px center/16px;
      }
    }
  }
  .attendbox {
    .attends {
      min-height: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .label {
        font-size: 12px;
        color: #b7b7b7;
        b {
          color: #8bbef3;
        }
      }
      .avators {
        display: flex;
        .com-avator {
          cursor: default;
        }
        .com-avator, .btn {
          margin-left: 6px;
        }
        .btn {
          width: 32px;
          height: 32px;
          font-size: 20px;
          color: #b7b7b7;
          background-color: transparent;
        }
      }
    }
  }
  .confirm-dialog.el-dialog {
    margin: -78px auto 0;
    top: 50%;
  }
}
</style>