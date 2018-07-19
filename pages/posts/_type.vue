<template>
<div class="page-posts">
  <com-card-class-header v-if="isClass" :item="detail"></com-card-class-header>
  <com-card :item="detail" :type="type" :attends="attends"></com-card>
</div>
</template>
<script>
import { isEvent, isMarket, isClass, isMeetup, isMoment } from '~/plugins'
import ComCard from '~/components/card/card'
import ComCardClassHeader from '~/components/card/class-header'
import logoIcon from '~/assets/img/logo.png'
export default {
  asyncData({ route, store }) {
    return store.dispatch('home/getPosts', { route })
  },
  components: { ComCard, ComCardClassHeader },
  data() {
    return {
      detail: {},
      attends: {}
    }
  },
  computed: {
    type() {
      return this.$route.params.type
    },
    isClass() {
      return isClass(this.type)
    }
  },
  head() {
    let { picUrls, subContent } = this.detail
    let image = picUrls ? picUrls.split(',')[0] : logoIcon
    let typeName
    if (isEvent(this.type)) {
      typeName = 'Event'
    } else if (isMarket(this.type)) {
      typeName = 'Market'
    } else if (isClass(this.type)) {
      typeName = 'Class'
    } else if (isMeetup(this.type)) {
      typeName = 'Meetup'
    } else if (isMoment(this.type)) {
      typeName = 'Moment'
    }
    let title = `${typeName} | ${this.detail.title || ''}`
    return {
      title,
      meta: [
        // facebook | linkedin
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:image', property: 'og:image', content: image },
        { hid: 'og:description', property: 'og:description', content: subContent },
        // twitter
        { hid: 'twitter:site:id', name: 'twitter:site:id', content: '' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:site', name: 'twitter:site', content: '' },
        { hid: 'twitter:image', name: 'twitter:image', content: image },
        { hid: 'twitter:description', name: 'twitter:description', content: subContent }
      ]
    }
  }
}
</script>
<style lang="scss">
.page-posts {
  width: 600px;
  margin: auto;
  padding: 36px 0;
  .com-card {
    margin-bottom: 0;
  }
}
</style>