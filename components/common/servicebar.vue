<template>
<div class="com-servicebar">
  <ul class="wrapper">
    <li class="item kefu">
      <a href="javascript:;">
        <p class="icon"></p>
        <p class="text">在线客服</p>
      </a>
      <div class="box">
        <div class="box-border">
          <div class="topbox">
            <h2 class="title">在线客服</h2>
            <span class="serv-time">服务时间: 9:00-18:30</span>
          </div>
          <ul class="clearfix kefu-list">
            <li v-for="item in list" :key="item.id">
              <a target="__blank" :href="`http://wpa.qq.com/msgrd?v=3&uin=${item.qq}&site=qq&menu=yes`">{{item.type}}</a>
            </li>
          </ul>
          <span class="arrow-right"></span>
        </div>
      </div>
    </li>
    <li class="item tel">
      <a href="javascript:;">
        <p class="icon"></p>
        <p class="text">客服热线</p>
      </a>
      <div class="box">
        <div class="box-border">
          <div class="topbox">
            <h2 class="title">0371-60108856</h2>
            <span class="serv-time">7*24小时客服服务热线</span>
          </div>
          <span class="arrow-right"></span>
        </div>
      </div>
    </li>
    <li class="item weixin">
      <a href="javascript:;">
        <p class="icon"></p>
        <p class="text">关注微信</p>
      </a>
      <div class="box">
        <div class="box-border">
          <div class="qrcode">
            <img src="~/assets/img/gzhh_qrcode.jpg">
            <p class="title">关注官方微信</p>
          </div>
          <span class="arrow-right"></span>
        </div>
      </div>
    </li>
    <li class="item weibo">
      <a target="__blank" href="https://weibo.com/lielai">
        <p class="icon"></p>
        <p class="text">关注微博</p>
      </a>
    </li>
  </ul>
</div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    }
  },
  methods: {
    getKefu() {
      return this.$store.dispatch('getKefu').then(data => {
        this.list = data.list
      }).catch(err => alert(err))
    }
  },
  mounted() {
    this.getKefu()
  }
}
</script>
<style lang="scss">
.com-servicebar {
  position: fixed;
  right: 2%;
  top: 50%;
  z-index: 9;
  .wrapper {
    .item {
      position: relative;
      + .item {
        margin-top: 8px;
      }
      > a {
        display: block;
        width: 50px;
        height: 50px;
        background-color: #fff;
        border: 1px solid #ccc;
        .icon, .text {
          width: 100%;
          height: 100%;
        }
        .icon {
          display: block;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: contain;
        }
        .text {
          font-size: 14px;
          color: #ff6800;
          padding: 0 3px;
          align-items: center;
          text-align: center;
          display: none;
        }
      }
      .box {
        display: none;
        position: absolute;
        top: -15px;
        right: 50px;
        padding-right: 25px;
        .box-border {
          border: 1px solid #ccc;
          border-top: 4px solid #ff6800;
          padding: 20px;
          width: 342px;
          background-color: #fff;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
          position: relative;
          .topbox {
            padding-left: 70px;
            background: no-repeat 0 center/50px;
            .title {
              font-size: 24px;
              color: #ff6800;
              line-height: 28px;
            }
            .serv-time {
              font-size: 14px;
              color: #aaa;
            }
          }
          .kefu-list {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #e4e4e4;
            li {
              float: left;
              width: 33.33%;
              a {
                color: #999;
                line-height: 36px;
                padding-left: 36px;
                background: url(~/assets/img/kefu/q1.gif) no-repeat 0 center;
              }
            }
          }
          .arrow-right {
            position: absolute;
            right: -13px;
            top: 26px;
            width: 13px;
            height: 16px;
            background: url(~/assets/img/kefu/arrow.png) no-repeat 0 center;
            background-size: contain;
          }
        }
      }
      &:hover {
        > a {
          .text {
            display: flex;
          }
          .icon {
            display: none;
          }
        }
        .box {
          display: block;
        }
      }
      &.kefu {
        > a {
          border-color: #ff6800;
          background-color: #ff6800;
          .icon {
            background-size: 36px;
            background-image: url(~/assets/img/kefu/02index-banner-8.gif);
          }
          .text {
            color: #fff;
          }
        }
        .box {
          .box-border {
            .topbox {
              background-image: url(~/assets/img/kefu/kef.png);
            }
          }
        }
      }
      &.weixin {
        > a {
          .icon {
            background-image: url(~/assets/img/kefu/erw.png);
          }
        }
        .box {
          .box-border {
            width: auto;
            padding: 10px 20px;
            .qrcode {
              text-align: center;
              img {
                width: 150px;
                height: 150px;
              }
              .title {
                font-size: 17px;
                color: #ff6800;
              }
            }
          }
        }
      }
      &.tel {
        > a {
          .icon {
            background-image: url(~/assets/img/kefu/icdh.png);
          }
        }
        .box {
          .box-border {
            .topbox {
              background-image: url(~/assets/img/kefu/icdh.png);
            }
          }
        }
      }
      &.weibo > a {
        .icon {
          background-size: 36px;
          background-image: url(~/assets/img/kefu/weibo.png);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .com-servicebar {
    display: none;
  }
}
</style>