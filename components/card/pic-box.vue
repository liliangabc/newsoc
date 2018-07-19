<template>
  <div class="com-card-pic-box">
    <div v-if="item.videoUrl" class="videobox" @click.stop>
      <video :poster="poster" :src="item.videoUrl" type="video/mp4" controls @play="playHandler"></video>
    </div>
    <div class="image" v-else-if="thumbs.length == 1" :style="setStyles(thumbs[0])" @click.stop="openPreview(0)"></div>
    <ul v-else-if="thumbs.length == 2" class="c2">
      <li class="image" v-for="(item, index) in thumbs" :key="index" :style="setStyles(item)" @click.stop="openPreview(index)"></li>
    </ul>
    <ul v-else-if="thumbs.length > 2" class="c3">
      <li class="image" :style="setStyles(thumbs[0])" @click.stop="openPreview(0)"></li>
      <li>
        <div class="image" v-for="(item, index) in thumbs.slice(1, 3)" :key="index" :style="setStyles(item, 1)" @click.stop="openPreview(index + 1)">
          <span v-if="index == 1 && pics.length > 3" class="shade">+{{ pics.length - 3 }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return { height: 0 }
  },
  props: {
    type: [String, Number],
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    pics() {
      return this.item.picUrls ? this.item.picUrls.split(',') : []
    },
    poster() {
      return (this.pics[0] || '').replace('imageslim', 'imageView2/0/w/480')
    },
    thumbs() {
      if (!this.item.picUrls) return this.type == '2' ? [''] : []
      let arr = this.item.picUrls.split(','), returnArr = [], len = arr.length
      if (len == 1) {
        returnArr.push(this.setSize(arr[0], 600, 290))
      } else if (len == 2) {
        arr.forEach(item => {
          returnArr.push(this.setSize(item, 300, 290))
        })
      } else {
        returnArr.push(this.setSize(arr[0], 425, 290))
        for (let i = 1; i < 3; i++) {
          returnArr.push(this.setSize(arr[i], 240, 270))
        }
      }
      return returnArr
    }
  },
  methods: {
    setSize(str, w, h) {
      return str.replace('imageslim', `imageView2/1/w/${w}/h/${h}`)
    },
    playHandler(event) {
      let videoEls = document.body.querySelectorAll('video')
      for (let i = 0, len = videoEls.length; i < len; i++) {
        let videoEl = videoEls[i]
        if (event.target != videoEl) videoEl.pause()
      }
    },
    setHeight() {
      let width = this.$el.offsetWidth
      this.height = width * .5
    },
    setStyles(url, isV) {
      let obj = { backgroundImage: `url(${url})` }
      if (isV) {
        obj.width = obj.height = this.height / 2 - 3 + 'px'
      } else {
        obj.height = this.height + 'px'
      }
      return obj
    },
    openPreview(curIndex) {
      this.$store.commit('togglePreview', { curIndex, pics: this.pics })
    }
  },
  mounted() {
    this.setHeight()
  }
}
</script>
<style lang="scss">
.com-card-pic-box {
  margin-top: 6px;
  .image {
    position: relative;
    background-color: #eee;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
  }
  .videobox {
    position: relative;
    height: 240px;
    overflow: hidden;
    video {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
    }
  }
  .c2, .c3, .c3 li:last-child {
    display: flex;
    justify-content: space-between;
  }
  .c2 .image {
    width: calc(50% - 3px);
  }
  .c3 li {
    &:first-child {
      flex: 1;
      margin-right: 6px;
    }
    &:last-child {
      flex-direction: column;
      .image {
        height: calc(50% - 3px);
      }
    }
    .shade {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0,0,0,.26);
      font-size: 32px;
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>