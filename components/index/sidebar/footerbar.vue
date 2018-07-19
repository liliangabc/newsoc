<template>
<div class="com-index-footerbar">
  <a href="/index/5" target="_blank">terms</a> &middot;
  <a href="/index/5" target="_blank">privacy</a> &middot;
  <a href="/index/5" target="_blank">q&a</a>
</div>
</template>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-index-footerbar {
  text-align: center;
  color: #909090;
  font-size: 15px;
  a {
    color: $themeBlueColor;
    text-transform: capitalize;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>