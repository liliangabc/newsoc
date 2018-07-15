<template>
<div class="com-member-top-tabs">
  <router-link class="button link" to="/member/trade-list" :replace="replace" v-if="hasTrade">管理我的商标</router-link>
  <router-link class="button link" to="/member/applicant-list" :replace="replace" v-if="hasApplicant">管理我的申请人</router-link>
</div>
</template>
<script>
export default {
  props: {
    hasTrade: {
      type: Boolean,
      default: true
    },
    hasApplicant: {
      type: Boolean,
      default: true
    },
    replace: Boolean
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
.com-member-top-tabs {
  margin-bottom: 16px;
  border-bottom: 2px solid $primaryColor;
  .link {
    + .link {
      margin-left: 12px;
    }
    &:hover {
      background-color: $primaryActiveColor;
    }
    &.nuxt-link-exact-active {
      background-color: $warningColor;
    }
  }
}
</style>