<template>
<div class="com-modal-dialog" v-if="visible">
  <div class="overlay" @click="onOverlayClick"></div>
  <div class="dialog" :class="dialogClass">
    <div class="dialog-title" v-if="title">{{title}}</div>
    <div class="dialog-body">
      <slot name="body"></slot>
    </div>
    <div class="dialog-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: {
    title: String,
    visible: Boolean,
    isModal: false,
    dialogClass: String
  },
  methods: {
    open() {
      this.$emit('update:visible', true)
    },
    close() {
      this.$emit('update:visible', false)
    },
    onOverlayClick() {
      if (!this.isModal) this.close()
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/vars.scss';
.com-modal-dialog {
  position: fixed;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  &, > .overlay {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  > .overlay {
    position: absolute;
    background-color: rgba(0, 0, 0, .5);
  }
  > .dialog {
    position: relative;
    width: 480px;
    background-color: #fff;
    color: $primaryTextColor;
    border-radius: 2px;
    z-index: 1;
    .dialog-title, .dialog-body, .dialog-actions {
      padding: 20px;
    }
    .dialog-title {
      font-size: 19px;
      + .dialog-body {
        padding-top: 0;
      }
    }
    .dialog-body {
      + .dialog-actions {
        padding-top: 0;
      }
    }
    .dialog-actions {
      text-align: right;
      button + button {
        margin-left: 15px;
      }
    }
  }
}
</style>