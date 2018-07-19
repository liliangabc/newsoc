<template>
<div class="com-profile-endrosments">
  <div class="titlebar">
    <div class="title">Endrosments - <b>0</b></div>
    <button class="btn btn-add">+</button>
  </div>
  <ul class="clearfix list" v-if="endrosments.length">
    <li v-for="item in endrosments" :key="item.id">
      <span class="label">{{item.srcimpression}}</span>
      <span class="count">{{item.cnt}}</span>
    </li>
  </ul>
</div>
</template>
<script>
export default {
  computed: {
    endrosments() {
      return this.$store.state.profile.endrosments
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-profile-endrosments {
  border: 1px solid $boxBorderColor;
  .btn-add {
    border-radius: 50%;
    border: 1px solid $themeBorderGreyColor;
  }
  .list {
    padding: 10px 0 0 10px;
    border-top: 1px solid $boxBorderColor;
    li {
      height: 30px;
      padding: 0 10px;
      border: 1px solid $boxBorderColor;
      float: left;
      font-size: 13px;
      display: flex;
      align-items: center;
      text-transform: capitalize;
      margin-right: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      border-radius: 2px;
      .label {
        color: #585858;
        margin-right: 10px;
      }
      .count {
        color: $themeBlueColor;
      }
      &:hover {
        background-color: $themeBlueColor;
        border-color: $themeBlueColor;
        .label, .count {
          color: #fff;
        }
      }
    }
  }
}
</style>