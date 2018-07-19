<template>
<div class="com-inbox-chat-form">
  <com-avator size="58" :src="userInfo.userHeadImage"></com-avator>
  <div class="form">
    <el-input type="textarea"
      placeholder="Write message And Ctrl + Enter to send ."
      :autosize="{maxRows: 6}"
      v-model.trim="message"
      @keyup.native.enter.ctrl="onKeyup">
    </el-input>
    <div class="icon-btns">
      <a class="btn btn-camera" @click="onCameraClick"></a>
      <el-popover placement="top-end" offset="-28">
        <!-- 表情列表盒子 -->
        <ul class="com-inbox-chat-form-emoji-popover">
          <li v-for="item in emojiList" :key="item.key">
            <img :src="item.value" @click="onEmojiClick(item.key)">
          </li>
        </ul>
        <a class="btn btn-emoji" slot="reference"></a>
      </el-popover>
    </div>
  </div>
  <input type="file" ref="file" accept="image/gif,image/jpeg,image/jpg,image/png" @change="onFileChange">
</div>
</template>
<script>
import ComAvator from '~/components/common/avator'
import { getToUserByMessages } from './core/utils'
export default {
  components: { ComAvator },
  data() {
    return { message: '' }
  },
  props: {
    emojiList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userData.userInfo
    },
    toUser() {
      return getToUserByMessages(this.$route.params.user, this.$store.state.im.messages)
    }
  },
  methods: {
    onKeyup() {
      let { message, toUser } = this
      if (!message) return
      this.$store.dispatch('im/sendText', { message, toUser }).then(() => {
        this.message = ''
        this.$parent.$refs.history.scrollToBottom()
      })
    },
    onCameraClick() {
      this.$refs.file.click()
    },
    onFileChange(event) {
      let fileEl = event.target, { toUser } = this
      if (!fileEl.files.length) return
      this.$store.dispatch('im/sendImage', { fileEl, toUser }).then(() => {
        this.$parent.$refs.history.scrollToBottom()
      }).catch(err => {
        this.$notify.error({ title: 'Error', message: err.message })
      })
    },
    onEmojiClick(key) {
      this.message += key
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-inbox-chat-form {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f0f0f0;
  padding: 16px 87px;
  display: flex;
  .com-avator {
    border: 4px solid #dddcdc;
  }
  input[type=file] {
    display: none;
  }
  .form {
    width: 558px;
    height: min-content;
    border-radius: 5px;
    margin-left: 41px;
    background-color: #fff;
    padding: 8px 28px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    .el-textarea {
      textarea {
        flex: 1;
        resize: none;
        color: #8b8a8a;
        font-size: 15px;
        border: none;
        padding-left: 0;
        &::placeholder {
          color: #8b8a8a;
        }
      }
    }
    .icon-btns {
      white-space: nowrap;
      align-self: flex-end;
      margin-bottom: 3px;
      margin-left: 6px;
      .btn {
        width: 22px;
        height: 22px;
        background: no-repeat center center/100%;
        &.btn-camera {
          margin-right: 12px;
          background-image: url(~/assets/img/common/Camera-icon.png);
        }
        &.btn-emoji {
          background-image: url(~/assets/img/common/Smile-icon.png);
        }
      }
    }
  }
}
// 表情列表弹出盒子
.com-inbox-chat-form-emoji-popover {
  width: 300px;
  li {
    float: left;
    width: 10%;
    text-align: center;
    img {
      width: 26px;
      cursor: pointer;
      border: 1px solid transparent;
      &:hover {
        border-color: $themeBlueColor;
      }
    }
  }
}
</style>