<template>
<div class="page-index">
  <com-sidebar></com-sidebar>
  <com-card-container>
    <com-loadmore slot="loadmore" v-if="hasNext" :loading="loading" @load="getList('load')"></com-loadmore>
  </com-card-container>
</div>
</template>
<script>
import ComSidebar from '~/components/index/sidebar'
import ComCardContainer from '~/components/index/card-container'
import ComLoadmore from '~/components/common/loadmore'
export default {
  transition: 'list-view',
  asyncData({ route, store }) {
    return store.dispatch('home/getList', { route })
  },
  components: { ComSidebar, ComCardContainer, ComLoadmore },
  data() {
    return { loading: false }
  },
  computed: {
    hasNext() {
      return this.$store.state.home.listData.hasNext
    }
  },
  watch: {
    $route(newVal) {
      this.getList()
    }
  },
  methods: {
    getList(action) {
      this.loading = true
      this.$store.dispatch('home/getList', {
        route: this.$route, action
      }).then(() => this.loading = false).catch(err => this.loading = false)
    }
  }
}
</script>
<style lang="scss">
.page-index {
  display: flex;
  justify-content: space-between;
  padding-top: 36px;
}
</style>