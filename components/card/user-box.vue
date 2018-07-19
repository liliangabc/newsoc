<template>
<div class="com-card-user-box">
  <com-avator size="60" :src="item.userHeadImage" :to="`/profile/${item.id}/5`"></com-avator>
  <div class="middle">
    <h3 class="username">{{item.nickName}}</h3>
    <span class="college">{{item.collegeName}}</span>
  </div>
</div>
</template>
<script>
import ComAvator from '~/components/common/avator'
export default {
  components: { ComAvator },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-card-user-box {
  padding: 12px 16px;
  background-color: #fff;
  border: 1px solid $boxBorderColor;
  border-top: none;
  display: flex;
  align-items: center;
  &:first-child {
    border-top: 1px solid $boxBorderColor;
  }
  .middle {
    margin-left: 30px;
    .username {
      font-size: 16px;
      color: $themeBlueColor;
      margin-bottom: 3px;
    }
    .college {
      font-size: 12px;
      color: $themeBorderGreyColor;
    }
  }
}
</style>