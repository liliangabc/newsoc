<template>
<div class="com-main-footer">
  <ul class="list-container">
    <li v-for="item in listItems" :key="item.title">
      <h4 class="title">{{item.title}}</h4>
      <ul class="sub-list">
        <li v-for="subItem in item.list" :key="subItem.title">
          <router-link v-if="isRouteLink(subItem.path)" :to="subItem.path">{{subItem.title}}</router-link>
          <a v-else target="_blank" :href="subItem.path">{{subItem.title}}</a>
        </li>
      </ul>
    </li>
  </ul>
  <div class="bottom-container">
    <span class="left">&copy; {{(year - 1) + '-' + year}} Circcus,Inc or its affilliltes</span>
    <div class="links">
      <a class="facebook" target="_blank" href="https://www.facebook.com/circcus/"></a>
      <a class="twitter" target="_blank" href="https://twitter.com/circcuscircle"></a>
      <a class="instagram" target="_blank" href="https://www.instagram.com/circcuscommunity/"></a>
    </div>
  </div>
</div>
</template>
<script>
const listItems = [
  {
    title: 'circcus',
    list: [
      { title: 'about us', path: '/' },
      { title: 'features', path: '/' },
      { title: 'news', path: '/' },
      { title: 'blogs', path: '/' }
    ]
  }, {
    title: 'legal',
    list: [
      { title: 'privacy policy', path: '/' },
      { title: 'terms of use', path: '/' }
    ]
  }, {
    title: 'contact',
    list: [
      { title: 'concact us', path: '/' },
      { title: 'career', path: '/' }
    ]
  }, {
    title: 'our app',
    list: [
      { title: 'google play store', path: 'https://play.google.com/store/apps/details?id=com.xcyz.circcus' },
      { title: 'apple app store', path: 'https://itunes.apple.com/cn/app/circcus/id1141284635?l=en&mt=8' }
    ]
  }
]
export default {
  data() {
    return { listItems }
  },
  computed: {
    year: () => new Date().getFullYear()
  },
  methods: {
    isRouteLink(link) {
      return link && link.indexOf('/') == 0
    }
  }
}
</script>
<style lang="scss">
@import "~/assets/scss/colors.scss";
@import '~/assets/scss/sizes.scss';
.com-main-footer {
  max-width: $pageMinWidth;
  min-width: 1000px;
  margin: auto;
  .list-container {
    display: flex;
    justify-content: space-between;
    padding: 20px 60px;
    border-bottom: 1px solid $themeBorderGreyColor;
    > li {
      .title {
        color: $blueColor;
        font-size: 12px;
        margin-bottom: 8px;
        text-transform: capitalize;
      }
      ul.sub-list {
        li {
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          &:before {
            content: "";
            display: block;
            width: 2px;
            height: 2px;
            border-radius: 50%;
            background-color: $themeBorderGreyColor;
            margin-right: 3px;
          }
          a {
            color: $themeBorderGreyColor;
            font-size: 12px;
            text-transform: capitalize;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
  .bottom-container {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    color: $themeBorderGreyColor;
    font-size: 12px;
    .links {
      a {
        width: 40px;
        height: 40px;
        background: no-repeat center center/30px;
        &.facebook {
          background-image: url(~/assets/img/common/fb.png);
        }
        &.twitter {
          background-image: url(~/assets/img/common/twitter.png);
        }
        &.instagram {
          background-image: url(~/assets/img/common/instagram.png);
        }
      }
    }
  }
}
</style>