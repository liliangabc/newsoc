<template>
<div class="page-query">
  <com-search-box></com-search-box>
  <!-- <com-category-list></com-category-list> -->
  <com-search-result :list="list"></com-search-result>
  <com-pager v-if="list.length" :total="total" :currentPage="currentPage" @current-change="onCurrentChange"></com-pager>
  <com-loading fullscreen v-if="loading"></com-loading>
</div>
</template>
<script>
import ComSearchBox from '~/components/query/search-box'
import ComCategoryList from '~/components/query/category-list'
import ComSearchResult from '~/components/query/search-result'
import { replaceQuery } from '~/plugins'
export default {
  components: { ComSearchBox, ComCategoryList, ComSearchResult },
  asyncData({ route, store, req, isServer }) {
    if (isServer) {
      let randstr = Math.random().toString(36).substr(2)
      req.session.randstr = randstr
      return { randstr }
    }
  },
  data() {
    return {
      currentPage: 1,
      total: 0,
      list: [],
      loading: false
    }
  },
  methods: {
    onCurrentChange(page) {
      location.replace(replaceQuery(this.$route, { pageNo: page }))
    },
    onQuery() {
      this.loading = true
      this.$store.dispatch('query-trade-list', { route: this.$route, randstr: this.randstr }).then(data => {
        this.loading = false
        this.total = +data.result.total
        this.list = data.result.data
        window.scrollTo(0, 0)
      }).catch(err => {
        this.loading = false
        let { code } = JSON.parse(err.message)
        if (code == 504) {
          location.reload()
        } else {
          alert(err.message)
          if (code == 403) {
            this.$router.replace(`/entry/login?to=${this.$route.fullPath}`)
          }
        }
      })
    }
  },
  mounted() {
    this.currentPage = this.$route.query.pageNo
    this.onQuery()
  }
}
</script>
<style lang="scss">
.page-query {
  padding-top: 100px;
}
</style>