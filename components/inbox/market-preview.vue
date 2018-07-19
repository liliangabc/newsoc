<template>
  <el-dialog custom-class="com-inbox-market-preview-dialog" width="400px" :visible.sync="visible">
    <div class="items my-items">
      <h3 class="title">My Items</h3>
      <ul class="list">
        <li v-for="item in markets.my" :key="item.id">
          <div class="image" :style="{backgroundImage: `url(${getThumb(item.picUrls)})`}"></div>
          <div class="group">
            <h4>{{item.title}}</h4>
            <span>${{+item.price}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="items your-items">
      <h3 class="title">The item of {{markets.yourName}}</h3>
      <ul class="list">
        <li v-for="item in markets.your" :key="item.id">
          <div class="image" :style="{backgroundImage: `url(${getThumb(item.picUrls)})`}"></div>
          <div class="group">
            <h4>{{item.title}}</h4>
            <span>${{+item.price}}</span>
          </div>
        </li>
      </ul>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return { visible: false }
  },
  props: {
    markets: {
      type: Object,
      default: () => ({ your: [], my: [] })
    }
  },
  methods: {
    // 设置对话框是否可见
    setVisible(visible = false) {
      this.visible = visible
    },
    // 获取缩略图
    getThumb(picUrls, size = 60) {
      return picUrls.split(',')[0].replace('?imageslim', `?imageView2/1/w/${size * 2}`)
    }
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/colors.scss';
.com-inbox-market-preview-dialog {
  .items {
    &.my-items {
      border-bottom: 1px solid $boxBorderColor;
    }
    > .title {
      font-size: 15px;
      font-weight: bold;
      color: #363636;
      padding: 3px 0;
    }
    .list {
      li {
        display: flex;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid $boxBorderColor;
        &:last-child {
          border-bottom: none;
        }
        .image {
          width: 60px;
          height: 60px;
          margin-right: 12px;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
        }
        .group {
          h4 {
            font-size: 14px;
            color: #6f6f6f;
          }
          span {
            font-size: 12px;
            color: $themeBlueColor;
          }
        }
      }
    }
  }
}
</style>