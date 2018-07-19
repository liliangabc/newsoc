<template>
<div class="com-profile-sidebar">
  <com-profile-bio></com-profile-bio>
  <com-profile-endrosments></com-profile-endrosments>
  <com-footerbar></com-footerbar>
</div>
</template>
<script>
import ComProfileBio from './bio'
import ComProfileEndrosments from './endrosments'
import ComFooterbar from '~/components/index/sidebar/footerbar'
export default {
  components: { ComProfileBio, ComProfileEndrosments, ComFooterbar }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-profile-sidebar {
  width: 323px;
  padding-bottom: 50px;
  > div {
    margin-bottom: 50px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .titlebar {
    height: 66px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 17px;
      color: #747474;
      b {
        color: $themeBlueColor;
        font-weight: normal;
      }
    }
    .btn {
      width: 24px;
      height: 24px;
      line-height: 1;
      background-color: transparent;
      font-size: 20px;
      color: $themeBorderGreyColor;
    }
  }
}
</style>