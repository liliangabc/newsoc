<template>
<div class="com-index-lovebar">
  <p class="title"><i class="icon"></i>Circcus love</p>
  <ul class="list">
    <li v-for="item in list" :key="item.id" :title="item.title">
      <router-link class="link" :to="`/posts/${item.type || type}?id=${item.id}`">
        <com-avator size="36" :src="item.userHeadImage"></com-avator>
        <div class="middle">
          <p class="username">{{item.userName || item.collegeName}}</p>
          <p class="title">{{item.title}}</p>
        </div>
        <el-tag type="info" size="mini" v-if="isMoment">
          {{getTag(item)}}
          <span class="price" v-if="isMarket(item)">${{+item.price}}</span>
        </el-tag>
      </router-link>
    </li>
  </ul>
</div>
</template>
<script>
import ComAvator from '~/components/common/avator'
import { isEvent, isMarket, isClass, isMeetup, isMoment } from '~/plugins'
export default {
  components: { ComAvator },
  data() {
    return {
      list: []
    }
  },
  computed: {
    type() {
      return this.$route.params.type
    },
    isMoment() {
      return isMoment(this.type)
    }
  },
  watch: {
    type(newVal) {
      this.getData()
    }
  },
  methods: {
    getData() {
      let api, { type } = this
      if (isClass(type)) {
        api = 'student_recommend_class'
      } else if (isMoment(type)) {
        api = 'student_recommend_updates'
      } else {
        return Promise.resolve()
      }
      return this.$store.dispatch('post', { api }).then(data => this.list = data.data.result)
    },
    getTag(item) {
      let { type } = item
      if (isEvent(type)) {
        return 'Events'
      } else if (isMarket(type)) {
        return 'Marketplace'
      } else if (isClass(type)) {
        return 'Classes'
      } else if (isMeetup(type)) {
        return 'Meetup'
      } else if (isMoment(type)) {
        return 'Moment'
      }
    },
    isMarket(item) {
      return isMarket(item.type)
    }
  },
  beforeMount() {
    this.getData()
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-index-lovebar {
  > .title {
    color: #3b3b3b;
    height: 28px;
    line-height: 28px;
    .icon {
      width: 20px;
      height: 100%;
      float: left;
      background: url(~/assets/img/common/tj.png) no-repeat 0 center/16px;
    }
  }
  .list {
    border: 1px solid $boxBorderColor;
    background-color: #fff;
    min-height: 200px;
    li {
      border-bottom: 1px solid $boxBorderColor;
      &:last-child {
        border-bottom: none;
      }
      .link {
        display: flex;
        align-items: center;
        padding: 24px 12px 12px;
        position: relative;
        &:hover {
          background-color: #fafafa;
        }
        .middle {
          margin-left: 12px;
          &, .username, .title {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .username {
            color: #aaa;
          }
          .title {
            font-size: 13px;
            color: #3b3b3b;
            margin: 3px 0;
          }
        }
        .el-tag {
          position: absolute;
          top: 2px;
          right: 2px;
          .price {
            color: #67C23A;
          }
        }
      }
    }
  }
}
</style>