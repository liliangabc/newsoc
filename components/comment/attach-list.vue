<template>
<ul class="com-answer-attach-list">
  <li v-for="item in fileUrls" :key="item.name">
    <i class="el-icon-document"></i>
    <a class="link" target="_blank" :href="item.url" :download="item.name">{{item.name}}</a>
  </li>
</ul>
</template>
<script>
export default {
  props: {
    detail: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    fileUrls() {
      let { fileUrls } = this.detail
      return fileUrls ? fileUrls.split(',').map(url => ({
        name: url.split('/').reverse()[0], url
      })) : []
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-answer-attach-list {
  li {
    display: flex;
    align-items: center;
    line-height: 2.4;
    &, .link {
      color: #8bbef3;
    }
    .link {
      flex: 1;
      margin-left: 6px;
      border-bottom: 1px solid $boxBorderColor;
    }
    &:last-child {
      margin-bottom: 12px;
    }
  }
}
</style>