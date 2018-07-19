<template>
<div class="com-index-navbar">
  <header>
    <com-avator size="134" :src="userInfo.userHeadImage" :to="profileLink"></com-avator>
    <h3 class="username">{{userInfo.nickName}}</h3>
    <router-link class="link" to="/index/5">View Activities</router-link>
  </header>
  <ul class="nav">
    <li v-for="item in navItems" :key="item.type">
      <router-link class="link" replace :to="`/index/${item.type}${kw? '?keyWords=' + kw : ''}`">
        <i class="icon" :style="setIcon(item)"></i> {{ item.label }}
      </router-link>
      <a class="btn-add" v-if="item.hasAdd" @click="onAddClick(item.type)">+</a>
    </li>
  </ul>
</div>
</template>
<script>
import ComAvator from '~/components/common/avator'
const _require = name => require(`~/assets/img/index/${name}.png`)
const navItems = [
  {
    label: 'marketplace', type: '2', hasAdd: true, icon: _require('Marketplace'), activeIcon: _require('Marketplace_white')
  },{
    label: 'events', type: '1', hasAdd: true, icon: _require('events'), activeIcon: _require('events_white')
  },{
    label: 'classes', type: '3', hasAdd: false, icon: _require('Classes'), activeIcon: _require('Classes_white')
  },{
    label: 'meetup', type: '4', hasAdd: true, icon: _require('Meetup'), activeIcon: _require('Meetup_white')
  }
]
export default {
  components: { ComAvator },
  computed: {
    userInfo() {
      return this.$store.state.userData.userInfo
    },
    profileLink() {
      let { id } = this.userInfo
      return id && `/profile/${id}/5`
    },
    kw() {
      let { keyWords } = this.$route.query
      return keyWords ? keyWords.trim() : ''
    },
    navItems() {
      return this.kw ? navItems.concat([{
        label: 'users', type: '7', hasAdd: false, icon: _require('user1@2'), activeIcon: _require('user2@2')
      }]) : [{
        label: 'updates', type: '5', hasAdd: false, icon: _require('Timeline'), activeIcon: _require('Timeline_white')
      }].concat(navItems)
    }
  },
  methods: {
    setIcon(item) {
      let { type } = this.$route.params
      let icon = item.type == type ? item.activeIcon : item.icon
      return { backgroundImage: `url(${icon})` }
    },
    onAddClick(type) {
      this.$store.commit('actions/toggleModal', { cmd: 'edit', params: { type } })
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-index-navbar {
  margin-top: 44px;
  background-color: #fff;
  border: 1px solid $boxBorderColor;
  > header {
    padding: 0 20px 30px;
    text-align: center;
    margin-top: -44px;
    .com-avator {
      margin: auto;
      border: 6px solid #fff;
      box-shadow: $boxShadowDepth2;
    }
    .username {
      font-size: 20px;
      color: #5c5c5c;
      margin: 12px 0;
    }
    .link {
      font-size: 14px;
      color: #95d0ff;
      text-decoration: underline;
    }
  }
  > .nav {
    padding: 30px 20px;
    border-top: 1px solid $boxBorderColor;
    li {
      height: 40px;
      margin-bottom: 18px;
      position: relative;
      .link {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        border-radius: 20px;
        padding: 0 20px;
        font-size: 15px;
        color: #aaa;
        text-transform: capitalize;
        &:hover {
          background-color: #f3f3f3;
        }
        &.nuxt-link-active {
          color: #fff;
          background-color: $themeBlueColor;
          + .btn-add {
            display: block;
          }
        }
        .icon {
          width: 24px;
          height: 24px;
          margin-right: 16px;
          background: no-repeat 0 center/24px;
        }
      }
      .btn-add {
        width: 70px;
        height: 70px;
        line-height: 57px;
        border-radius: 50px;
        border: 5px solid #fff;
        text-align: center;
        background-color: $themeBlueColor;
        color: #fff;
        font-size: 32px;
        position: absolute;
        top: 50%;
        right: -55px;
        margin-top: -35px;
        box-shadow: $boxShadowDepth2;
        display: none;
        user-select: none;
        transition: box-shadow .3s cubic-bezier(.23,1,.32,1);
        &:hover {
          box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
        }
      }
    }
  }
}
</style>