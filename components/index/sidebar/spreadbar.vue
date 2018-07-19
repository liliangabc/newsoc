<template>
<div class="com-index-spreadbar">
  <h4 class="title">advertising</h4>
  <a class="link" href="/" target="_blank">
    <img src="~/assets/img/Circcus-Mail-Campaign-(iPad)-800x640.png">
  </a>
</div>
</template>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-index-spreadbar {
  background-color: #fff;
  border: 1px solid $boxBorderColor;
  .title {
    height: 44px;
    line-height: 44px;
    padding: 0 20px;
    font-size: 12px;
    color: #9e9e9e;
    text-transform: capitalize;
  }
  .link {
    display: block;
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>