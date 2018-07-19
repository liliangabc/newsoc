<template>
<div class="com-profile-followers">
  <div class="clearfix tabs">
    <router-link replace :to="`/profile/${userId}/6?tab=followers`">Followers</router-link>
    <router-link replace :to="`/profile/${userId}/6?tab=following`">Following</router-link>
  </div>
  <ul class="list-view">
    <li v-for="item in list" :key="item.id">
      <div class="avator" :style="setAvaStyle(item)"></div>
      <div class="group">
        <h3 class="nickname">{{ item.nickName }}</h3>
        <p class="college">at {{ item.collegeName }}</p>
        <button class="btn success" v-if="item.isFollow=='0'" @click="toggleFollow(item)">follow</button>
        <button class="btn primary" v-else-if="item.followEach=='1'" @click="toggleFollow(item)">Friends</button>
        <button class="btn danger" v-else @click="toggleFollow(item)">following</button>
      </div>
    </li>
  </ul>
</div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    }
  },
  methods: {
    setAvaStyle(item) {
      return { backgroundImage: `url(${item.userHeadImage}?imageView2/1/w/240)` }
    },
    toggleFollow(item) {
      this.$store.dispatch('post', {
        api: 'student_follow',
        data: { followed_id: item.id }
      }).then(data => {
        this.$set(item, 'isFollow', item.isFollow == '1' ? '0' : '1')
      }).catch(err => this.$message.error(err.message))
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-profile-followers {
  flex: 1;
  padding-top: 74px;
  margin: 0 -12px;
  .tabs {
    border-bottom: 1px solid $boxBorderColor;
    a {
      width: 186px;
      height: 60px;
      line-height: 58px;
      font-size: 19px;
      color: #585858;
      text-align: center;
      background-color: #fff;
      position: relative;
      top: 1px;
      float: left;
      border: 1px solid #fff;
      border-bottom-color: $boxBorderColor;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      &.nuxt-link-exact-active {
        border-color: $boxBorderColor;
        border-bottom-color: #fff;
      }
    }
  }
  .list-view {
    padding: 60px 0 12px 0;
    display: flex;
    flex-wrap: wrap;
    li {
      width: calc(20% - 34px);
      margin-left: 42px;
      margin-bottom: 48px;
      border-radius: 6px;
      overflow: hidden;
      background-color: rgb(246, 246, 246);
      text-align: center;
      &:nth-child(5n+1) {
        margin-left: 0;
      }
      .avator {
        display: block;
        width: 100%;
        height: 188px;
        background-color: #ccc;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: cover;
      }
      .group {
        padding: 15px 12px 20px;
      }
      .nickname, .college {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .nickname {
        font-size: 17px;
        color: #4183d7;
        font-weight: bold;
      }
      .college {
        font-size: 12px;
        color: #9b9a9a;
        display: block;
      }
      .btn {
        width: 132px;
        height: 35px;
        margin: auto;
        text-transform: capitalize;
        margin-top: 12px;
        font-size: 15px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        &.success {
          background-color: #7cc576;
        }
        &.primary {
          background-color: #ff973a;
        }
        &.danger {
          background-color: #ee5050;
        }
        &:before {
          content: '';
          width: 21px;
          height: 20px;
          margin-right: 8px;
          background: url(~/assets/img/profile/Follow-icon.png) no-repeat 0 0/21px;
        }
      }
    }
  }
}
</style>