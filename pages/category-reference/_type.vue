<template>
<div class="page-category-reference">
  <com-tabs></com-tabs>
  <com-subclass-list :detail="detail"></com-subclass-list>
  <component class="list" :is="curView" :list="sortedList"></component>
</div>
</template>
<script>
import ComTabs from '~/components/category-reference/tabs'
import ComMarketList from '~/components/category-reference/market-list'
import ComTradeList from '~/components/category-reference/trade-list'
import ComSubclassList from '~/components/category-reference/subclass-list'
export default {
  components: { ComTabs, ComSubclassList },
  asyncData({ route, store }) {
    return store.dispatch('get-category-reference', { route }).then(data => {
      return { list: data.list }
    }).catch(err => ({ errmsg: err.message }))
  },
  data() {
    return {
      list: [],
      detail: null
    }
  },
  computed: {
    type() {
      return this.$route.params.type || 'market'
    },
    curView() {
      return ({ market: ComMarketList, trade: ComTradeList })[this.type]
    },
    sortedList() {
      if (this.type == 'market') {
        this.list.sort((a, b) => {
          let value = +a.code - +b.code
          return value > 0 ? 1 : value < 0 ? -1 : 0
        })
      }
      return this.list
    }
  },
  watch: {
    $route(newval) { this.getSubClass() }
  },
  methods: {
    getSubClass() {
      let { code } = this.$route.query, curItem
      if (!(code && code.trim())) {
        this.detail = null
        return
      }
      for (let i = 0, len = this.list.length; i < len; i++) {
        let item = this.list[i]
        if (item.code == code) {
          curItem = item
          break
        }
      }
      if (!curItem) return
      this.$store.dispatch('get-sub-class-list', {
        route: this.$route
      }).then(data => {
        if (data) {
          window.scrollTo(0, 0)
          this.detail = {
            list: data.list,
            describe: curItem.describe,
            name: `第${curItem.code}类 ${curItem.name}`
          }
        }
      }).catch(err => alert(err.message))
    }
  },
  mounted() {
    this.getSubClass()
  }
}
</script>
<style lang="scss">
.page-category-reference {
  padding-top: 30px;
  > .list {
    padding: 50px 0;
  }
}
</style>