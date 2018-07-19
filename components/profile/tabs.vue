<template>
<div class="com-profile-tabs">
  <ul class="tabview">
    <li class="tab-item" v-for="tab in tabs" :key="tab.type">
      <router-link replace :to="setLink(tab)">{{tab.label}}</router-link>
    </li>
  </ul>
  <slot></slot>
</div>
</template>
<script>
export default {
  data() {
    return {
      tabs: [
        { label: 'moments', type: '5' },
        { label: 'marketplace', type: '2' },
        { label: 'events', type: '1' },
        { label: 'class', type: '3' },
        { label: 'meetup', type: '4' },
        { label: 'followers/following', type: '6' }
      ],
      userId: this.$route.params.id
    }
  },
  methods: {
    setLink(tab) {
      return `/profile/${this.userId}/${tab.type}${tab.type == '6' ? '?tab=followers' : ''}`
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-profile-tabs {
  background-color: #fff;
  .tabview {
    height: 60px;
    display: flex;
    border: 1px solid $boxBorderColor;
    .tab-item {
      width: 16.66%;
      height: 100%;
      text-transform: capitalize;
      border-left: 1px solid $boxBorderColor;
      &:first-child {
        border-left: none;
      }
      &:last-child {
        width: 20%;
      }
      a {
        display: block;
        height: 100%;
        text-align: center;
        line-height: 58px;
        margin: 0 -1px;
        position: relative;
        font-size: 19px;
        color: #585858;
        &.nuxt-link-active {
          border-bottom: 4px solid $themeBlueColor;
        }
      }
    }
  }
}
</style>