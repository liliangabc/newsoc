<template>
<el-dialog custom-class="com-pic-preview" :visible.sync="isVisible" :append-to-body="true" :fullscreen="true" :before-close="onBeforeClose" @open="onDialogOpen">
  <el-carousel arrow="always" :autoplay="false" :initial-index="curIndex">
    <el-carousel-item v-for="item in pics" :key="item">
      <div class="picture" @click="onPicBoxClick">
        <img :src="item">
      </div>
    </el-carousel-item>
  </el-carousel>
</el-dialog>
</template>
<script>
export default {
  computed: {
    previewParams() {
      return this.$store.state.previewParams || {}
    },
    isVisible() {
      return !!Object.keys(this.previewParams).length
    },
    curIndex() {
      return this.previewParams.curIndex || 0
    },
    pics() {
      return this.previewParams.pics
    },
    videoUrl() {
      return this.previewParams.videoUrl
    }
  },
  methods: {
    close() {
      this.$store.commit('togglePreview')
    },
    onBeforeClose() {
      this.close()
      // this.$router.back()
    },
    onPicBoxClick(event) {
      if (event.target.tagName.toLowerCase() == 'img') return
      this.onBeforeClose()
    },
    onDialogOpen() {
      // this.$router.push(this.$route.fullPath + '#preview')
    }
  },
  mounted() {
    // window.addEventListener('hashchange', this.close)
  },
  beforeDestroy() {
    // window.removeEventListener('hashchange', this.close)
  }
}
</script>
<style lang="scss">
.el-dialog.com-pic-preview {
  background-color: transparent;
  .el-dialog__header {
    padding: 0;
    .el-dialog__headerbtn {
      .el-dialog__close {
        color: #fff;
        font-size: 24px;
      }
    }
  }
  .el-dialog__body {
    height: 100%;
    padding: 80px 20px;
    .el-carousel {
      height: 100%;
      .el-carousel__container {
        height: 100%;
        .picture {
          height: 100%;
          padding: 0 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
      }
    }
  }
}
</style>