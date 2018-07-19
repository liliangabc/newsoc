<template>
<div class="page-inbox">
  <h3 class="title">Inbox</h3>
  <div class="layout-container">
    <com-user-list></com-user-list>
    <div class="talk-field" v-if="$route.params.user">
      <com-chat-header></com-chat-header>
      <com-chat-history ref="history" :emoji-list="emojiList"></com-chat-history>
      <com-chat-form :emoji-list="emojiList"></com-chat-form>
    </div>
  </div>
</div>
</template>
<script>
import ComUserList from '~/components/inbox/user-list'
import ComChatHeader from '~/components/inbox/chat-header'
import ComChatHistory from '~/components/inbox/chat-history'
import ComChatForm from '~/components/inbox/chat-form'
import { emojiMap } from '~/components/inbox/core/emoji'
const _require = name => require(`~/assets/img/faces/${name}.png`)
const emojiList = []
Object.keys(emojiMap).forEach(key => {
  emojiList.push({ key, value: _require(emojiMap[key]) })
})
export default {
  components: { ComUserList, ComChatHeader, ComChatHistory, ComChatForm },
  data() {
    return { emojiList }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('im/toggleAddCount', {})
    next()
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.page-inbox {
  height: calc(100vh - 88px);
  padding-top: 66px;
  position: relative;
  > .title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 66px;
    padding-left: 30px;
    font-size: 20px;
    color: #272727;
    background-color: $boxBorderColor;
  }
  .layout-container {
    height: 100%;
    display: flex;
    .talk-field {
      flex: 1;
      position: relative;
      padding-top: 129px;
      padding-bottom: 91px;
    }
  }
}
</style>